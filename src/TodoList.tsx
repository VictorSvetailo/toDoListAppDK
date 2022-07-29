import React from 'react';
import {strict} from "assert";
import {FilterValuesType} from "./App";

export type TaskType = {
    id: number,
    title: string,
    isDone: boolean,

}

export type PropsType = {
    title: string
    tasks: Array<TaskType>
    removeTask: (id: number) => void
    changeFilter: (value: FilterValuesType) => void
}


export function TodoList(props: PropsType) {
    return (
        <div>
            <h3>{props.title}</h3>
            <div>
                <input/>
                <button onClick={()=>{alert('Hello my name is Victor')}}>+</button>
            </div>
            <ul>

                {/*{*/}
                {/*    props.tasks.map(t => <li>*/}
                {/*            <input type="checkbox" checked={t.isDone}/>*/}
                {/*            <span>{t.title} </span>*/}
                {/*            <button onClick={()=>{alert('Иди в жопу')}}>+</button>*/}
                {/*        </li>*/}
                {/*    )*/}
                {/*}*/}
                {
                    props.tasks.map((t) => {
                        return (
                            <li>
                                <input type="checkbox" checked={t.isDone}/>
                                <span>{t.title}</span>
                                <button onClick={()=>{props.removeTask(t.id)}}>+</button>
                            </li>
                        )
                    })
                }
            </ul>
            <div>
                <button onClick={()=>{props.changeFilter('all')}}>All</button>
                <button onClick={()=>{props.changeFilter('active')}}>Active</button>
                <button onClick={()=>{props.changeFilter('completed')}}>Completed</button>
            </div>
        </div>
    )
        ;
}