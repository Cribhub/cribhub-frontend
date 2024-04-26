import Popup from 'reactjs-popup'
import Input from './TextInput'
import CustomButton from './Button/CustomButton'
import * as PropTypes from 'prop-types'
import { Component } from 'react'

// eslint-disable-next-line react/prop-types
class ShoppingItemPopup extends Component {
    render() {
        let {
            open,
            onClose,
            itemName,
            setItemName,
            itemDescription,
            setItemDescription,
            onAdd,
        } = this.props
        return (
            <Popup className={'pop'} open={open} onClose={onClose}>
                <div className={'PopUp'}>
                    <Input
                        type="email"
                        placeholder="Shopping Item"
                        value={itemName}
                        onChange={(e) => setItemName(e)}
                        size={'large'}
                        shape={'round'}
                    />
                    <Input
                        type="email"
                        placeholder="Shopping Item Description"
                        value={itemDescription}
                        onChange={(e) => setItemDescription(e)}
                        size={'large'}
                        shape={'round'}
                    />
                    <CustomButton text={'Add to shopping list'} onClick={onAdd} />
                </div>
            </Popup>
        )
    }
}

ShoppingItemPopup.propTypes = {
    open: PropTypes.any,
    onClose: PropTypes.any,
    itemName: PropTypes.any,
    setItemName: PropTypes.any,
    itemDescription: PropTypes.any,
    setItemDescription: PropTypes.any,
    onAdd: PropTypes.any,
}

export default ShoppingItemPopup
