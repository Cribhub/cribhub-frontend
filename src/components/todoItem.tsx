import { Button, Box, Typography, Checkbox } from '@mui/material'
import React from 'react'

export interface TodoItemProps {
    title: string
    completed: boolean
}

const TodoItem = ({title, completed}: TodoItemProps) => {
    const [checked, setChecked] = React.useState(completed)

    const handleChange = () => {
        setChecked(!checked)
    }

    return (
        <Box display="flex" alignItems="center" justifyContent='space-between' width="100%">
            <Typography variant="h6" style={{ textDecoration: checked ? 'line-through' : 'none' }}>{title}</Typography>
            <Box>
                <Checkbox checked={checked} onChange={handleChange}/>
                <Button variant="contained" color="error">Delete</Button>
            </Box>
        </Box>
    )
}

export default TodoItem
