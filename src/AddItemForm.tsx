import React, {ChangeEvent, KeyboardEvent, MouseEvent, useState} from 'react';
import {Button, IconButton, TextField} from '@mui/material';
import {AddTask, ControlPoint} from '@mui/icons-material';

type AddItemFormType = {
    addItem: (title: string) => void
}

export function AddItemForm(props: AddItemFormType) {
    const [newTaskTitle, setNewTaskTitle] = useState('')
    const [error, setError] = useState<string | null>(null) // state - error
    const onNewTitleChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setNewTaskTitle(e.currentTarget.value)
    }
    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        setError(null)
        if (e.ctrlKey && e.charCode === 13) {
            props.addItem(newTaskTitle)
            setNewTaskTitle('')
        }
    }
    const addTask = (e: MouseEvent<HTMLButtonElement>) => {
        if (newTaskTitle.trim() !== '') {
            props.addItem(newTaskTitle.trim())
        } else {
            setError('Field is required!')
        }

        setNewTaskTitle('')
    }
    return (
        <div>
            <TextField value={newTaskTitle}
                       variant={'outlined'}
                       label={'Type value'}
                   onChange={onNewTitleChangeHandler}
                   onKeyPress={onKeyPressHandler}
                   error={!!error} //styles.error Field is required
                   helperText={error} //styles.error Field is required
            />
            <IconButton size={'small'} color={'primary'} onClick={addTask}>
                <AddTask/>
            </IconButton>
        </div>
    )
}