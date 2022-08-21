import React, {ChangeEvent, KeyboardEvent, MouseEvent, useState} from 'react';

type AddItemFormType = {
    addItem: (title: string) => void
}

export function AddItemForm(props: AddItemFormType) {
    const [newTaskTitle, setNewTaskTitle] = useState('')
    const [error, setError] = useState<string | null>(null) // state - error
    const onNewTitleChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setNewTaskTitle(e.currentTarget.value)
    }
    const onKeyPressHendler = (e: KeyboardEvent<HTMLInputElement>) => {
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
            <input value={newTaskTitle}
                   onChange={onNewTitleChangeHandler}
                   onKeyPress={onKeyPressHendler}
                   className={error ? 'error' : ''} //styles.error Field is required
            />
            <button onClick={addTask}>+</button>
            {error && <div className="error_message">{error}</div>}
        </div>
    )
}