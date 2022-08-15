import React, {ChangeEvent, KeyboardEvent, MouseEvent, useState} from 'react';
import {strict} from 'assert';
import {FilterValuesType} from './App';
import {logDOM} from '@testing-library/react';
import './component/Eban.css'

export type PropsAllType = {
    id: string
    title: string
    tasks: Array<TaskType>
    removeTask: (id: string, toDoListId: string) => void
    changeFilter: (value: FilterValuesType, toDoListId: string) => void
    addTask: (title: string, toDoListId: string) => void
    changeTaskStatus: (tasksId: string, isDone: boolean, toDoListId: string) => void
    filter: FilterValuesType
    removeToDoList: (toDoListId: string)=>void
}

export type TaskType = {
    id: string,
    title: string,
    isDone: boolean,
}

// Handler означает обработчик

export function TodoList(props: PropsAllType) {
    const [newTaskTitle, setNewTaskTitle] = useState('')
    const [error, setError] = useState<string | null>(null) // state - error
    const onNewTitleChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setNewTaskTitle(e.currentTarget.value)
    }
    const onKeyPressHendler = (e: KeyboardEvent<HTMLInputElement>) => {
        setError(null)
        if (e.ctrlKey && e.charCode === 13) {
            props.addTask(newTaskTitle, props.id)
            setNewTaskTitle('')
        }
    }
    const addTask = (e: MouseEvent<HTMLButtonElement>) => {
        if (newTaskTitle.trim() !== ''){
            props.addTask(newTaskTitle.trim(), props.id)
        }else{
            setError('Field is required!')
        }

        // if(newTaskTitle === 'fake'){
        //     setNewTaskTitle('')
        //     return
        // }
        // newTaskTitle.trim() && props.addTask(newTaskTitle.trim())
        // newTaskTitle && props.addTask(newTaskTitle)
        setNewTaskTitle('')
    }
    const onClickAll = (e: MouseEvent<HTMLButtonElement>) => props.changeFilter('all', props.id)
    const onClickActive = (e: MouseEvent<HTMLButtonElement>) => props.changeFilter('active', props.id)
    const onClickCompleted = (e: MouseEvent<HTMLButtonElement>) => props.changeFilter('completed', props.id)
    const removeToDoList = () => {
        props.removeToDoList(props.id)
    }

    return (
        <div>
            <h3>{props.title} <button onClick={removeToDoList}>X</button></h3>
            <div>
                <input value={newTaskTitle}
                       onChange={onNewTitleChangeHandler}
                       onKeyPress={onKeyPressHendler}
                className={error ? 'error' : ''} //styles.error Field is required
                />
                <button onClick={addTask}>+</button>
                { error && <div className='error_message'>{error}</div>}
            </div>
            <ul>
                {
                    props.tasks.map((t) => {

                        const onRemoveHandler = () => {
                            props.removeTask(t.id, props.id)
                        }
                        const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
                            props.changeTaskStatus(t.id, e.currentTarget.checked, props.id)
                            // console.log(t.id + " я разъебу этот React" + e.currentTarget.checked)
                        }
                        return (
                            <li key={t.id} className={t.isDone ? 'is-done' : ''}>
                                <input onChange={onChangeHandler} type="checkbox" checked={t.isDone}/>
                                <span>{t.title}</span>
                                <button onClick={onRemoveHandler}>+</button>
                            </li>
                        )
                    })
                }
            </ul>
            <div>
                <button className={props.filter === 'all' ? 'active-filter' : ''} onClick={onClickAll}>All</button>
                <button className={props.filter === 'active' ? 'active-filter' : ''} onClick={onClickActive}>Active</button>
                <button className={props.filter === 'completed' ? 'active-filter' : ''} onClick={onClickCompleted}>Completed</button>
            </div>
        </div>
    )
        ;
}