import React from 'react'
import Popup from 'reactjs-popup'
import Input from './TextInput'
import CustomButton from './Button/CustomButton'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import dayjs from 'dayjs'
import * as PropTypes from 'prop-types'

class ViewTaskPopup extends React.Component {
    render() {
        let {
            open,
            onClose,
            selectedTask,
            handleSave,
            taskName,
            setTaskName,
            selectedMemberId,
            handleMemberSelect,
            taskDescription,
            setTaskDescription,
            dateValue,
            setDateValue,
            members,
            editMode,
            deleteTask,
            setEditMode,
        } = this.props

        const handleDelete = () => {
            if (selectedTask && selectedTask.taskId) {
                deleteTask(selectedTask.taskId)
            }
        }
        return (
            <Popup
                className="pop"
                open={open}
                onClose={onClose}
                closeOnDocumentClick={false}
            >
                <div className="PopUp">
                    <CustomButton text= "Close" className="close-btn" onClick={onClose}>
                        &times;
                    </CustomButton>
                    {editMode ? (
                        <>
                            <Input
                                type="email"
                                placeholder="Task Name"
                                value={taskName}
                                onChange={(e) => setTaskName(e)}
                                size={'large'}
                                shape={'round'}
                            />
                            <Input
                                type="email"
                                placeholder="Task Description"
                                value={taskDescription}
                                onChange={(e) => setTaskDescription(e)}
                                size={'large'}
                                shape={'round'}
                            />
                            <DatePicker
                                value={dateValue ? dayjs(dateValue) : null}
                                onChange={(newValue) =>
                                    setDateValue(
                                        dayjs(newValue).format('YYYY-MM-DD')
                                    )
                                }
                                renderInput={(props) => <Input {...props} />}
                            />
                            <select
                                value={selectedMemberId}
                                onChange={handleMemberSelect}

                            >
                                <option value="">Select a member</option>
                                {members.map((member) => (
                                    <option
                                        key={member.userId}
                                        value={member.userId}
                                    >
                                        {member.userName}
                                    </option>
                                ))}
                            </select>
                            <CustomButton text="Save Changes" onClick={handleSave} />
                        </>
                    ) : (
                        <>
                            <h2 style={{color : "#132d15"}}>{selectedTask?.taskName}</h2>
                            <h2 style={{color : "#132d15", fontSize: "2.0em"}}><p>{selectedTask?.description}</p></h2>
                            <span style={{ marginBottom: '20px' }} />
                            <h2 style={{color : "#132d15"}}><p><text>Due Date:</text>{selectedTask?.deadlineDate}</p></h2>
                            <h2 style={{color : "#132d15"}}><p><text>Task ID:</text>{selectedTask?.customerId}</p></h2>
                            <CustomButton
                                text="Edit"
                                onClick={() => setEditMode(true)}
                            />
                            <span style={{ marginBottom: '10px' }} />
                            <CustomButton
                                text={'Delete'}
                                onClick={() => deleteTask(selectedTask.taskId)}
                            />
                        </>
                    )}
                </div>
            </Popup>
        )
    }
}

ViewTaskPopup.propTypes = {
    open: PropTypes.any,
    onClose: PropTypes.any,
    selectedTask: PropTypes.any,
    handleSave: PropTypes.any,
    taskName: PropTypes.any,
    setTaskName: PropTypes.any,
    selectedMemberId: PropTypes.any,
    handleMemberSelect: PropTypes.any,
    taskDescription: PropTypes.any,
    setTaskDescription: PropTypes.any,
    dateValue: PropTypes.any,
    setDateValue: PropTypes.any,
    members: PropTypes.any,
    editMode: PropTypes.any,
    deleteTask: PropTypes.any,
    setEditMode: PropTypes.any,
}

export default ViewTaskPopup
