import './Login.css'
import Button from '../Components/Button/Button'
import {Calendar} from 'rsuite';
import 'rsuite/dist/rsuite.min.css';
import "./MainMenu.css"
import Header from '../Components/Header/Header'
import Cookies from 'js-cookie';
import api from '../api';
import {useEffect, useState} from "react";
import parseJwt from "./parseJwt";
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import Input from "../Components/TextInput";


function MainMenu() {

    let token = Cookies.get("Token")

    const payload = parseJwt(token);
    let userName = payload.customerName;
    let userId = payload.customerId;
    const [customerCrib, setCustomerCrib] = useState(null);
    const [shoppingItemName, setShoppingItemName] = useState("  ");
    const [taskName, setTaskName] = useState("  ");
    const [shoppingItemDescription, setShoppingItemDescription] = useState("  ");
    const [taskDescription, setTaskDescription] = useState("  ");
    const [customerCribName, setCustomerCribName] = useState(null);
    const [shoppingListItems, setShoppingListItems] = useState([]);
    const [cribMember, setCribMembers] = useState([]);
    const [cribTasks, setCribTasks] = useState([]);
    const [customerTasks, setCustomerTasks] = useState([]);
    const [showPopup, setShowPopup] = useState(false);
    const [showTaskPopup, setShowTaskPopup] = useState(false);
    const [selectedMemberId, setSelectedMemberId] = useState("");







    function getCustomerCrib(userId) {
        api.get(`/customer/${userId}`)
            .then(response => {
                setCustomerCrib(response.data.cribId);
                setCustomerTasks(response.data.taskId || []);
            })
            .catch(error => {
                console.error('Error fetching customer crib:', error);
            });
    }

    function getCrib(cribId) {
        api.get(`/cribs/${cribId}`)
            .then(response => {
                setCustomerCribName(response.data.cribName);
                setShoppingListItems(response.data.shoppingListItems || []);
                setCribMembers(response.data.cribMembers || [])
                getTasks(response.data.taskId)})
            .catch(error => {
                console.error('Error fetching customer crib name:', error);
            });
    }

    useEffect(() => {
        getCustomerCrib(userId);
    }, [userId]);

    useEffect(() => {
        if (customerCrib) {
            getCrib(customerCrib);
        }
    }, [customerCrib]);

    function addShoppingItemPopUp(){
        setShowPopup(true)
    }

    function addTaskItemPopUp(){
        setShowTaskPopup(true)
    }

    function removeShoppingList(shoppingId){
        api.delete(`/shopping/${shoppingId}`).then(response => {
                const updatedShoppingListItems = shoppingListItems.filter(item => item.shoppingListId !== shoppingId);
                setShoppingListItems(updatedShoppingListItems);
            })
            .catch(error => {
                console.error('Error removing shopping list item:', error);
            });
    }

    function removeTask(taskId){
        api.delete(`/tasks/${taskId}`).then(response => {
            const updatedCribTasks = cribTasks.filter(item => item.taskId !== taskId)
            setCribTasks(updatedCribTasks)
        }).catch(error => {
            console.log("error removing task", error)
            }
        )
    }

    let shoppingData = {
        "shoppingName": shoppingItemName,
        "shoppingDescription": shoppingItemDescription
    }

    function addShoppingItem(){
        api.post(`/shopping/crib/${customerCrib}`, shoppingData).then(response => {
            console.log(response.data)
            setShoppingItemName("")
            setShoppingItemDescription("")
            getCrib(customerCrib)
            setShowPopup(false)
            }
        ).catch(error => {
            console.log(error)
        })
    }

    function addTaskItem(){
        let taskData = {
            "title": taskName,
            "description": taskDescription

        }
        api.post(`/tasks/${selectedMemberId}/${customerCrib}`, taskData).then(response => {
                console.log(response.data)
                setTaskName("")
                setTaskDescription("")
                getCrib(customerCrib)
                setShowTaskPopup(false)
            }
        ).catch(error => {
            console.log(error)
        })
    }

    function getTasks(taskIds) {
        setCribTasks([]); // Clear the existing tasks

        // Fetch all tasks
        Promise.all(taskIds.map(taskId => api.get(`/tasks/${taskId}`)))
            .then(responses => {
                // Extract task data from each response
                const tasks = responses.map(response => response.data);

                // Fetch the username for each task's customerId
                return Promise.all(tasks.map(task => {
                    return api.get(`/customer/${task.customerId}`)
                        .then(response => {
                            // Return the task with the username appended
                            return { ...task, username: response.data.userName };
                        });
                }));
            })
            .then(tasksWithUsernames => {
                // Update the state with the new tasks, which include usernames
                setCribTasks(tasksWithUsernames);
            })
            .catch(error => {
                console.error('Error fetching tasks:', error);
            });
    }

    function handleMemberSelect(event) {
        setSelectedMemberId(event.target.value);
    }


    return(
        <div className={"mainMenuContainer"}>
            <Header
                userName={userName}
                crib={customerCrib}
                cribname={customerCribName}
            />
            <div className={"firstrow"}>
                <div id={"taskList"}>
                    <p>TASK LIST</p>
                    <ul>
                        {cribTasks.map(item => (
                            <p key={item.taskId}>
                                {item.taskName} - {item.username}
                                <button onClick={() => removeTask(item.taskId)}>remove</button>
                            </p>
                        ))}
                    </ul>
                    <Button text={"Add to list"} onClick={addTaskItemPopUp}/>


                </div>
                <div id={"shoppingList"}>
                    <p>SHOPPING LIST</p>
                    <ul>
                        {shoppingListItems.map(item => (
                            <p key={item.shoppingListId}>
                                {item.shoppingName} ({item.shoppingDescription})
                                <button onClick={() => removeShoppingList(item.shoppingListId)}>remove</button>
                            </p>
                        ))}
                    </ul>
                    <Button text={"Add to list"} onClick={addShoppingItemPopUp} />
                </div>

            </div>

            <div className={"calenderContainer"}></div>
            <Calendar
                bordered={true}
                isoWeek={true}
                compact={true}
            />

            <Popup className={"pop"} open={showPopup} onClose={() => {
                setShowPopup(false);}}>
                <div className={"PopUp"} >

                    <Input
                        type="email"
                        placeholder="Shopping Item"
                        value={shoppingItemName}
                        onChange={setShoppingItemName}
                        size={"large"}
                        shape={"round"}
                    />
                    <Input
                        type="email"
                        placeholder="Shopping Item Description"
                        value={shoppingItemDescription}
                        onChange={setShoppingItemDescription}
                        size={"large"}
                        shape={"round"}
                    />
                    <Button text={"Add to shopping list"} onClick={addShoppingItem}/>

                </div>
            </Popup>

            <Popup className={"pop"} open={showTaskPopup} onClose={() => {
                setShowTaskPopup(false);}}>
                <div className={"PopUp"} >

                    <Input
                        type="email"
                        placeholder="Task Name"
                        value={taskName}
                        onChange={setTaskName}
                        size={"large"}
                        shape={"round"}
                    />
                    <Input
                        type="email"
                        placeholder="task description"
                        value={taskDescription}
                        onChange={setTaskDescription}
                        size={"large"}
                        shape={"round"}
                    />


                    <select value={selectedMemberId} onChange={handleMemberSelect}>
                        <option value="">Select a member</option>
                        {cribMember.map(member => (
                            <option key={member.id} value={member.id}>
                                {member.name}
                            </option>
                        ))}
                    </select>


                    <Button text={"Add to task list"} onClick={addTaskItem}/>

                </div>
            </Popup>



        </div>
    )
}

export default MainMenu