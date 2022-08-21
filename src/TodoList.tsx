import React, {ChangeEvent, MouseEvent} from 'react';
import {FilterValuesType} from './App';
import './component/Eban.css'
import {AddItemForm} from './AddItemForm';
import {EditableSpan} from './EditableSpan';

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
    changeTaskTitle: (tasksId: string, newValue: string, toDoListId: string) => void
    changeToDoListTitle: (newTitle: string, id: string) => void
}

export type TaskType = {
    id: string,
    title: string,
    isDone: boolean,
}

// Handler означает обработчик

export function TodoList(props: PropsAllType) {
    const onClickAll = (e: MouseEvent<HTMLButtonElement>) => props.changeFilter('all', props.id)
    const onClickActive = (e: MouseEvent<HTMLButtonElement>) => props.changeFilter('active', props.id)
    const onClickCompleted = (e: MouseEvent<HTMLButtonElement>) => props.changeFilter('completed', props.id)
    const removeToDoList = () => {
        props.removeToDoList(props.id)
    }

    const addTask = (title: string) => {
      props.addTask(title, props.id);
        console.log('Hello')
    }
    
    const changeToDoListTitle = (newTitle: string) => {
      props.changeToDoListTitle(props.id, newTitle)
    }

    return (
        <div>
             <h3>
                 <EditableSpan title={props.title} onChange={changeToDoListTitle}/>
                 <button onClick={removeToDoList}>X</button></h3>
            <AddItemForm addItem={addTask}/>
            <ul>
                {
                    props.tasks.map((t) => {

                        const onRemoveHandler = () => {
                            props.removeTask(t.id, props.id)
                        }
                        const onChangeStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
                            props.changeTaskStatus(t.id, e.currentTarget.checked, props.id)
                        }
                        const onChangeTitleHandler = (newValue: string) => {
                            props.changeTaskTitle(t.id, newValue, props.id)
                        }
                        return (
                            <li key={t.id} className={t.isDone ? 'is-done' : ''}>
                                <input onChange={onChangeStatusHandler} type="checkbox" checked={t.isDone}/>
                               <EditableSpan title={t.title} onChange={onChangeTitleHandler}/>
                                <button onClick={onRemoveHandler}>x</button>
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

}

