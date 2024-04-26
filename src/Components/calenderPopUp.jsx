import Popup from 'reactjs-popup'
import * as PropTypes from 'prop-types'
import { Component } from 'react'

class CalendarPopup extends Component {
    render() {
        let { open, onClose, selectedDate, tasks } = this.props
        const taskElements = Array.isArray(tasks)
            ? // eslint-disable-next-line react/prop-types
              tasks.map((item) => (
                  <h2 key={item.taskId}>
                      {item.taskName} - {item.description} - {item.customerId} -{' '}
                      {item.deadlineDate}
                  </h2>
              ))
            : null

        return (
            <Popup className={'pop'} open={open} onClose={onClose}>
                <div className={'PopUp'}>
                    <h1>{selectedDate || 'No Date Selected'}</h1>
                    {taskElements}
                </div>
            </Popup>
        )
    }
}

CalendarPopup.propTypes = {
    open: PropTypes.any,
    onClose: PropTypes.any,
    selectedDate: PropTypes.any,
    tasks: PropTypes.any,
}

export default CalendarPopup
