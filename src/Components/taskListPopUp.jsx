import React from 'react'
import Popup from 'reactjs-popup'
import Input from './TextInput'
import CustomButton from './Button/CustomButton'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import dayjs from 'dayjs'
import * as PropTypes from 'prop-types'
import './taskListPopUp.css'

class TaskItemPopup extends React.Component {
    render() {
        let {
            open,
            onClose,
            taskName,
            setTaskName,
            taskDescription,
            setTaskDescription,
            setDateValue,
            members,
            selectedMemberId,
            handleMemberSelect,
            onAdd,
        } = this.props

        return (
            <Popup
                className={'pop'}
                open={open}
                closeOnDocumentClick={false}
                onClose={onClose}
            >
                <div className={'PopUp'}>
                    <button className={'closeButton '} onClick={onClose}>
                        close
                    </button>
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
                        onChange={(newValue) =>
                            setDateValue(dayjs(newValue).format('YYYY-MM-DD'))
                        }
                    />
                    <select
                        value={selectedMemberId}
                        onChange={handleMemberSelect}
                    >
                        <option value="">Select a member</option>
                        {members.map((member) => (
                            <option key={member.userId} value={member.userId}>
                                {member.userName}
                            </option>
                        ))}
                    </select>
                    <CustomButton text={'Add to task list'} onClick={onAdd} />
                </div>
            </Popup>
        )
    }
}

TaskItemPopup.propTypes = {
    open: PropTypes.any,
    onClose: PropTypes.any,
    taskName: PropTypes.any,
    setTaskName: PropTypes.any,
    taskDescription: PropTypes.any,
    setTaskDescription: PropTypes.any,
    dateValue: PropTypes.any,
    setDateValue: PropTypes.any,
    members: PropTypes.any,
    selectedMemberId: PropTypes.any,
    handleMemberSelect: PropTypes.any,
    onAdd: PropTypes.any,
}

export default TaskItemPopup
