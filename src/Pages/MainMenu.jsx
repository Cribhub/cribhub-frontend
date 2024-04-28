import './Login.css'
import CustomButton from '../Components/Button/CustomButton'
import { Calendar } from 'rsuite'
import 'rsuite/dist/rsuite.min.css'
import './MainMenu.css'
import Header from '../Components/Header/Header'
import Cookies from 'js-cookie'
import api from '../api'
import { useEffect, useState } from 'react'
import parseJwt from './parseJwt'
import 'reactjs-popup/dist/index.css'
import ToxicityChecker from '../ToxicityChecker.js'
import { toast } from 'react-toastify'
import ShoppingItemPopup from '../Components/shoppingListPopUp.jsx'
import TaskItemPopup from '../Components/taskListPopUp.jsx'
import ViewTaskPopUp from '../Components/viewTaskPopUp.jsx'
import DeleteIcon from '@mui/icons-material/Delete'
import VisibilityIcon from '@mui/icons-material/Visibility'
import IconButton from '@mui/material/IconButton'
import { useQueryClient } from '@tanstack/react-query'

import CheckIcon from '@mui/icons-material/Check'

function MainMenu() {
    let token = Cookies.get('Token')
    const queryClient = useQueryClient()

    const payload = parseJwt(token)
    let userName = payload.customerName
    let userId = payload.customerId
    const [customerCrib, setCustomerCrib] = useState(null)
    const [shoppingItemName, setShoppingItemName] = useState('  ')
    const [taskName, setTaskName] = useState('  ')
    const [dateValue, setDateValue] = useState(null)
    const [shoppingItemDescription, setShoppingItemDescription] = useState('  ')
    const [taskDescription, setTaskDescription] = useState('  ')
    const [customerCribName, setCustomerCribName] = useState(null)
    const [shoppingListItems, setShoppingListItems] = useState([])
    const [taskItems, setTaskItems] = useState([])
    const [cribMembers, setCribMembers] = useState([])
    const [cribTasks, setCribTasks] = useState([])
    const [showPopup, setShowPopup] = useState(false)
    const [showTaskPopup, setShowTaskPopup] = useState(false)
    const [selectedMemberId, setSelectedMemberId] = useState('')
    const [editMode, setEditMode] = useState(false)

    function getCustomerCrib(userId) {
        api.get(`/customer/${userId}`)
            .then((response) => {
                setCustomerCrib(response.data.cribId)
            })
            .catch((error) => {
                console.error('Error fetching customer crib:', error)
            })
    }

    function getCrib(cribId) {
        api.get(`/cribs/${cribId}`)
            .then((response) => {
                setCustomerCribName(response.data.cribName)
                getShoppingListItems(cribId)
                getTaskItems(cribId)
                getCribMembers(cribId)
            })
            .catch((error) => {
                console.error('Error fetching customer crib name:', error)
            })
    }

    function getCribMembers(cribId) {
        api.get(`/cribs/${cribId}/members`).then((response) => {
            setCribMembers(response.data)
        })
    }

    useEffect(() => {
        getCustomerCrib(userId)
    }, [userId])

    useEffect(() => {
        if (customerCrib) {
            getCrib(customerCrib)
        }
    }, [customerCrib])

    function addShoppingItemPopUp() {
        setShowPopup(true)
    }
    function addTaskItemPopUp() {
        setShowTaskPopup(true)
    }
    function removeShoppingList(shoppingId) {
        api.delete(`/shopping/${shoppingId}`)
            .then(() => {
                const updatedShoppingListItems = shoppingListItems.filter(
                    (item) => item.shoppingListId !== shoppingId
                )
                setShoppingListItems(updatedShoppingListItems)
                getShoppingListItems(customerCrib)
            })
            .catch((error) => {
                console.error('Error removing shopping list item:', error)
            })
    }

    const removeTask = (taskId) => {
        api.delete(`/tasks/${taskId}`)
            .then(() => {
                const updatedCribTasks = cribTasks.filter(
                    (item) => item.taskId !== taskId
                )
                setCribTasks(updatedCribTasks)
                setViewTaskPopUp(false)

                setSelectedTask('')
                setTaskName('')
                setTaskDescription('')
                getTaskItems(customerCrib)
            })
            .catch((error) => {
                console.log('error removing task', error)
            })
    }

    function taskComplete(taskId) {
        api.put(`/tasks/${taskId}`, { completed: true }).then(() => {
            getTaskItems(customerCrib)
        })
    }

    const handleSaveTask = async () => {
        let taskData = {
            title: taskName,
            description: taskDescription,
            deadlineDate: dateValue,
        }
        api.put(`/tasks/${selectedTask.taskId}`, taskData)
            .then(() => {
                setEditMode(false)
                setViewTaskPopUp(false)
                setTaskName('')
                setTaskDescription('')
                getTaskItems(customerCrib)
            })
            .catch((error) => {
                console.error(error)
            })

        await queryClient.invalidateQueries({
            queryKey: ['notifications'],
        })
        const toxicityResultTask = await ToxicityChecker(taskName)
        const toxicityResultDescription = await ToxicityChecker(taskDescription)

        if (
            toxicityResultTask === 'true' ||
            toxicityResultDescription === 'true'
        ) {
            toast(
                'The task name is considered toxic. Please use be respectful.'
            )
            console.log('task id' + selectedTask.taskId)
            removeTask(selectedTask.taskId)
        }
    }

    const [viewTaskPopUp, setViewTaskPopUp] = useState(false)
    const [selectedTask, setSelectedTask] = useState('')

    function viewTask(task) {
        setSelectedTask(task)
        setViewTaskPopUp(true)
    }

    async function addShoppingItem() {
        let shoppingData = {
            name: shoppingItemName,
            description: shoppingItemDescription,
        }

        let shoppingId
        api.post(`/shopping/crib/${customerCrib}`, shoppingData)
            .then((response) => {
                console.log(response.data)
                shoppingId = response.data.id
                setShoppingItemName('')
                setShoppingItemDescription('')
                setShowPopup(false)
                getShoppingListItems(customerCrib)
            })
            .catch((error) => {
                console.log(error)
            })

        const toxicityResultItem = await ToxicityChecker(shoppingItemName)
        const toxicityResultDescription = await ToxicityChecker(
            shoppingItemDescription
        )

        if (
            toxicityResultItem === 'true' ||
            toxicityResultDescription === 'true'
        ) {
            toast(
                'The shopping list item name is considered toxic. Please use be respectful.'
            )
            console.log('toxic item detected with id: ' + shoppingId)
            removeShoppingList(shoppingId)
        }
    }

    async function addTaskItem() {
        let taskData = {
            title: taskName,
            description: taskDescription,
            deadlineDate: dateValue,
        }
        let taskId
        api.post(`/tasks/${selectedMemberId}/${customerCrib}`, taskData)
            .then((response) => {
                console.log(response.data)
                taskId = response.data.taskId
                setTaskName('')
                setTaskDescription('')
                getTaskItems(customerCrib)
                setShowTaskPopup(false)
                queryClient.invalidateQueries({ queryKey: ['notifications'] })
            })
            .catch((error) => {
                console.log(error.data)
            })

        const toxicityResultTask = await ToxicityChecker(taskName)
        const toxicityResultDescription = await ToxicityChecker(taskDescription)

        if (
            toxicityResultTask === 'true' ||
            toxicityResultDescription === 'true'
        ) {
            toast(
                'The task name is considered toxic. Please use be respectful.'
            )
            console.log('task id' + taskId)
            removeTask(taskId)
        }
    }

    useEffect(() => {
        if (selectedTask) {
            setTaskName(selectedTask.taskName)
            setTaskDescription(selectedTask.description)
            setDateValue(selectedTask.deadlineDate)
        }
    }, [selectedTask])

    function getShoppingListItems(cribId) {
        api.get(`/cribs/${cribId}/shoppingListItems`).then((response) => {
            setShoppingListItems(response.data)
        })
    }

    function getTaskItems(cribId) {
        api.get(`/cribs/${cribId}/tasks`).then((response) => {
            setTaskItems(response.data)
        })
    }

    function renderCalenderCell(date) {
        const dateKey = date.toISOString().split('T')[0]
        const dailyTasks = taskItems.filter(
            (task) => task.deadlineDate === dateKey
        )

        return (
            <div className="calendarCell">
                {dailyTasks && dailyTasks.length > 0 ? (
                    <>
                        <div
                            className="taskEntry"
                            style={{
                                textDecoration: dailyTasks[0].completed
                                    ? 'line-through'
                                    : 'none',
                            }}
                        >
                            {dailyTasks[0].taskName}
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
        )
    }

    const handleDateSelect = (newDate) => {
        const dateKey = newDate.toISOString().split('T')[0]
        const dailyTasks = taskItems.filter(
            (task) => task.deadlineDate === dateKey
        )
        console.log(dailyTasks.map((item) => viewTask(item)))
    }

    const completedLine = {
        false: '',
        true: 'line-through',
    }

    return (
        <div className={'mainMenuContainer'}>
            <Header
                userName={userName}
                crib={customerCrib}
                cribname={customerCribName}
                userID={userId}
            />
            <div className={'firstrow'}>
                <div id={'taskList'}>
                    <p className={'title'}>TASK LIST</p>
                    <ul>
                        {taskItems.map((item) => (
                            <p key={item.taskId}>
                                <span
                                    style={{
                                        textDecoration:
                                            completedLine[item.completed],
                                    }}
                                >
                                    {' '}
                                    {item.taskName}{' '}
                                </span>

                                <IconButton
                                    size="small"
                                    color="primary"
                                    aria-label="edit"
                                >
                                    <VisibilityIcon
                                        onClick={() => viewTask(item)}
                                    />
                                </IconButton>

                                <IconButton
                                    size="small"
                                    color="primary"
                                    aria-label="edit"
                                >
                                    <CheckIcon
                                        onClick={() =>
                                            taskComplete(item.taskId)
                                        }
                                    />
                                </IconButton>
                                <IconButton
                                    size="small"
                                    color="primary"
                                    aria-label="edit"
                                >
                                    <DeleteIcon
                                        onClick={() => removeTask(item.taskId)}
                                    />
                                </IconButton>
                            </p>
                        ))}
                    </ul>
                    <CustomButton
                        text={'Add to list'}
                        onClick={addTaskItemPopUp}
                    />
                </div>
                <div id={'shoppingList'}>
                    <p className={'title'}>SHOPPING LIST</p>
                    <ul>
                        {shoppingListItems.map((item) => (
                            <p key={item.id}>
                                {item.name} ({item.description})
                                <IconButton
                                    aria-label="delete"
                                    size={'small'}
                                    color="primary"
                                    onClick={() => removeShoppingList(item.id)}
                                >
                                    <DeleteIcon />
                                </IconButton>
                            </p>
                        ))}
                    </ul>
                    <CustomButton
                        text={'Add to list'}
                        onClick={addShoppingItemPopUp}
                    />
                </div>
            </div>

            <div className={'calenderContainer'}></div>
            <Calendar
                bordered={true}
                isoWeek={true}
                compact={true}
                renderCell={renderCalenderCell}
                onSelect={handleDateSelect}
            />

            <ViewTaskPopUp
                open={viewTaskPopUp}
                onClose={() => {
                    setSelectedTask('')
                    setTaskName('')
                    setTaskDescription('')
                    setEditMode(false)
                    setViewTaskPopUp(false)
                }}
                selectedTask={selectedTask}
                setDateValue={setDateValue}
                members={cribMembers}
                selectedMemberId={selectedMemberId}
                handleMemberSelect={(e) => setSelectedMemberId(e.target.value)}
                handleSave={handleSaveTask}
                taskName={taskName}
                setTaskName={setTaskName}
                taskDescription={taskDescription}
                setTaskDescription={setTaskDescription}
                dateValue={dateValue}
                editMode={editMode}
                setEditMode={setEditMode}
                deleteTask={removeTask}
            />

            <ShoppingItemPopup
                open={showPopup}
                onClose={() => setShowPopup(false)}
                itemName={shoppingItemName}
                setItemName={setShoppingItemName}
                itemDescription={shoppingItemDescription}
                setItemDescription={setShoppingItemDescription}
                onAdd={addShoppingItem}
            />

            <TaskItemPopup
                open={showTaskPopup}
                onClose={() => {
                    setShowTaskPopup(false)
                    setTaskName('')
                    setTaskDescription('')
                }}
                taskName={taskName}
                setTaskName={setTaskName}
                taskDescription={taskDescription}
                setTaskDescription={setTaskDescription}
                dateValue={dateValue}
                setDateValue={setDateValue}
                members={cribMembers}
                selectedMemberId={selectedMemberId}
                handleMemberSelect={(e) => setSelectedMemberId(e.target.value)}
                onAdd={addTaskItem}
            />
        </div>
    )
}

export default MainMenu
