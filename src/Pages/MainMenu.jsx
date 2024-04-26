import './Login.css'
import CustomButton from '../Components/Button/CustomButton';
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
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';



function MainMenu() {

    let token = Cookies.get("Token")

    const payload = parseJwt(token);
    let userName = payload.customerName;
    let userId = payload.customerId;
    const [customerCrib, setCustomerCrib] = useState(null);
    const [shoppingItemName, setShoppingItemName] = useState("  ");
    const [taskName, setTaskName] = useState("  ");
    const [dateValue, setDateValue] = useState(null);
    const [shoppingItemDescription, setShoppingItemDescription] = useState("  ");
    const [taskDescription, setTaskDescription] = useState("  ");
    const [customerCribName, setCustomerCribName] = useState(null);
    const [shoppingListItems, setShoppingListItems] = useState([]);
    const [taskItems, setTaskItems] = useState([]);
    const [cribMembers, setCribMembers] = useState([]);
    const [cribTasks, setCribTasks] = useState([]);
    const [showPopup, setShowPopup] = useState(false);
    const [showTaskPopup, setShowTaskPopup] = useState(false);
    const [selectedMemberId, setSelectedMemberId] = useState("");



    function getCustomerCrib(userId) {
        api.get(`/customer/${userId}`)
            .then(response => {
                setCustomerCrib(response.data.cribId);
                console.log("CustomerCribID = " + customerCrib)
            })
            .catch(error => {
                console.error('Error fetching customer crib:', error);
            });
    }

    function getCrib(cribId) {
        api.get(`/cribs/${cribId}`)
            .then(response => {
                setCustomerCribName(response.data.cribName);
                console.log("customerCribName = " + customerCribName)
                getShoppingListItems(cribId)
                getTaskItems(cribId)
                getCribMembers(cribId)

            })
            .catch(error => {
                console.error('Error fetching customer crib name:', error);
            });
    }

    function getCribMembers(cribId){
        api.get(`/cribs/${cribId}/members`).then(response=>{

            setCribMembers(response.data)
            }
        )
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
        api.delete(`/shopping/${shoppingId}`).then(() => {
                const updatedShoppingListItems = shoppingListItems.filter(item => item.shoppingListId !== shoppingId);
                setShoppingListItems(updatedShoppingListItems);
                getCrib(customerCrib)
            })
            .catch(error => {
                console.error('Error removing shopping list item:', error);
            });
    }

    function removeTask(taskId){
        api.delete(`/tasks/${taskId}`).then(() => {
            const updatedCribTasks = cribTasks.filter(item => item.taskId !== taskId)
            setCribTasks(updatedCribTasks)
            getCrib(customerCrib)
        }).catch(error => {
            console.log("error removing task", error)
            }
        )
    }

    let shoppingData = {
        "name": shoppingItemName,
        "description": shoppingItemDescription
    }

    function addShoppingItem(){

        api.post(`/shopping/crib/${customerCrib}`, shoppingData).then(response => {
            console.log(response.data)
            setShoppingItemName("")
            setShoppingItemDescription("")
            setShowPopup(false)
            getCrib(customerCrib)
            }
        ).catch(error => {
            console.log(error)
        })
    }

    function addTaskItem(){
        let taskData = {
            "title": taskName,
            "description": taskDescription,
            "deadlineDate": dateValue
        }
        api.post(`/tasks/${selectedMemberId}/${customerCrib}`, taskData).then(response => {
                console.log(response.data)
                setTaskName("")
                setTaskDescription("")
                getCrib(customerCrib)
                setShowTaskPopup(false)
            }
        ).catch(error => {
            console.log(error.data)
        })
    }


    function getShoppingListItems(cribId){
        api.get(`/cribs/${cribId}/shoppingListItems`).then(response =>{
            setShoppingListItems(response.data)
        })
    }

    function getTaskItems(cribId){
        api.get(`/cribs/${cribId}/tasks`).then(response =>{
            console.log(response.data)
            setTaskItems(response.data)
        })
    }

    function handleMemberSelect(event) {
        setSelectedMemberId(event.target.value);
    }

    function renderCalenderCell(date) {
        const dateKey = date.toISOString().split('T')[0];
        const dailyTasks = taskItems.filter(task => task.deadlineDate === dateKey);

        return (
            <div className="calendarCell">
                {dailyTasks && dailyTasks.length > 0 ? (
                    <>
                        <div className="taskEntry" style={{ textDecoration: dailyTasks[0].completed ? 'line-through' : 'none' }}>
                            {dailyTasks[0].taskName} - {dailyTasks[0].description}
                        </div>
                        {dailyTasks.length > 1 && (
                            <div className="showMore">
                                +{dailyTasks.length - 1} more tasks
                            </div>
                        )}
                    </>
                ) : (
                    <div className="noTasks"></div>
                )}
            </div>
        );
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
                        {taskItems.map(item => (
                            <p key={item.taskId}>
                                {item.taskName} -{item.description} - {item.customerId} - {item.deadlineDate}
                                <button onClick={() => removeTask(item.taskId)}>remove</button>
                            </p>
                        ))}
                    </ul>
                    <CustomButton text={"Add to list"} onClick={addTaskItemPopUp}/>


                </div>
                <div id={"shoppingList"}>
                    <p>SHOPPING LIST</p>
                    <ul>
                        {shoppingListItems.map(item => (
                            <p key={item.id}>
                                {item.name} ({item.description})
                                <button onClick={() => removeShoppingList(item.id)}>remove</button>
                            </p>
                        ))}
                    </ul>
                    <CustomButton text={"Add to list"} onClick={addShoppingItemPopUp} />
                </div>

            </div>

            <div className={"calenderContainer"}></div>
            <Calendar
                bordered={true}
                isoWeek={true}
                compact={true}
                renderCell={renderCalenderCell}
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
                    <CustomButton text={"Add to shopping list"} onClick={addShoppingItem}/>

                </div>
            </Popup>

            <Popup className={"pop"} closeOnDocumentClick={false} open={showTaskPopup} onClose={() => {
                setShowTaskPopup(false);}}>
                <div className={"PopUp"} >

                    <button onClick={() => {setShowTaskPopup(false);}}>close </button>


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


                    <DatePicker onChange={(newValue) => setDateValue(dayjs(newValue.$d).format('YYYY-MM-DD'))} />


                    <select value={selectedMemberId} onChange={handleMemberSelect}>
                        <option value="">Select a member</option>
                        {cribMembers.map(member => (
                            <option key={member.userId} value={member.userId}>
                                {member.userName}
                            </option>
                        ))}
                    </select>


                    <CustomButton text={"Add to task list"} onClick={addTaskItem}/>



                </div>
            </Popup>



        </div>
    )
}

export default MainMenu