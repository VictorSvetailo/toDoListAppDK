import React, {ChangeEvent, KeyboardEvent, MouseEvent, useState} from 'react';
import {strict} from "assert";
import {FilterValuesType} from "./App";


export type PropsAllType = {
    title: string
    tasks: Array<TaskType>
    removeTask: (id: string) => void
    changeFilter: (value: FilterValuesType) => void
    addTask: (title: string) => void
}

export type TaskType = {
    id: string,
    title: string,
    isDone: boolean,

}

// Handler означает обработчик

export function TodoList(props: PropsAllType) {
    const [newTaskTitle, setNewTaskTitle] = useState('')
    const onNewTitleChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setNewTaskTitle(e.currentTarget.value)
    }
    const onKeyPressHendler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.ctrlKey && e.charCode === 13) {
            props.addTask(newTaskTitle)
            setNewTaskTitle('')
        }
    }
    const addTask = (e: MouseEvent<HTMLButtonElement>) => {
        props.addTask(newTaskTitle)
        setNewTaskTitle('')
    }
    const onClickAll = (e: MouseEvent<HTMLButtonElement>) => props.changeFilter('all')
    const onClickActive = (e: MouseEvent<HTMLButtonElement>) => props.changeFilter('active')
    const onClickCompleted = (e: MouseEvent<HTMLButtonElement>) => props.changeFilter('completed')


    return (
        <div>
            <h3>{props.title}</h3>
            <div>
                <input value={newTaskTitle}
                       onChange={onNewTitleChangeHandler}
                       onKeyPress={onKeyPressHendler}/>
                <button onClick={addTask}>+</button>
            </div>
            <ul>
                {
                    props.tasks.map((t) => {
                        const onRemoveHandler =() => {
                            props.removeTask(t.id)
                        }
                        return (
                            <li key={t.id}>
                                <input type="checkbox" checked={t.isDone}/>
                                <span>{t.title}</span>
                                <button onClick={onRemoveHandler}>+</button>
                            </li>
                        )
                    })
                }
            </ul>
            <div>
                <button onClick={onClickAll}>All</button>
                <button onClick={onClickActive}>Active</button>
                <button onClick={onClickCompleted}>Completed</button>
            </div>
        </div>
    )
        ;
}