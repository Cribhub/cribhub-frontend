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

        return (
            <Popup
                className="pop"
                open={open}
                onClose={onClose}
                closeOnDocumentClick={false}
            >
                <div className="PopUp">
                    <button className="close-btn" onClick={onClose}>
                        &times;
                    </button>
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
                            <CustomButton
                                text="Save Changes"
                                onClick={handleSave}
                            />
                        </>
                    ) : (
                        <>
                            <h2>{selectedTask?.taskName}</h2>
                            <p>{selectedTask?.description}</p>
                            <p>{selectedTask?.deadlineDate}</p>
                            <p>{selectedTask?.customerId}</p>
                            <CustomButton
                                text="Edit"
                                onClick={() => setEditMode(true)}
                            />
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
