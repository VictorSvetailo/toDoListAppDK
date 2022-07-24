import React, {useState} from 'react';
import './App.css';
import {TaskType, TodoList} from "./TodoList";


export type FilterValuesType = 'all' | 'completed' | 'active';


// const tasks2 = [
//     {id: 1, title: 'Hello world', isDone: true},
//     {id: 2, title: 'I am Happy', isDone: false},
//     {id: 3, title: 'Yo', isDone: false},
// ]

// Components
function App() {
    // data for App
    let titleProps1 = 'What to learn';
    // let titleProps2 = 'Songs';

    let [tasks1, setTasks1] = useState<Array<TaskType>>([
        {id: 1, title: 'HTML&CSS', isDone: true},
        {id: 2, title: 'JS', isDone: true},
        {id: 3, title: 'ReactJS', isDone: false},
        {id: 4, title: 'Redux', isDone: false},
    ])
    let [filter, setFilter] = useState<FilterValuesType>('all');

    function removeTask(id: number) {
        let filteredTasks1 = tasks1.filter(t => t.id !== id)
        setTasks1(filteredTasks1)
    }


    function changeFilter(value: FilterValuesType) {
        setFilter(value);
    }


    let tasksForTodolist = tasks1;
    if (filter === 'completed') {
        tasksForTodolist = tasks1.filter(t => t.isDone === true);
    }

    if (filter === 'active') {
        tasksForTodolist = tasks1.filter(t => t.isDone === false);
    }


    return (
        <div className="App">
            <TodoList
                title={titleProps1}
                tasks={tasksForTodolist}
                removeTask={removeTask}
                changeFilter={changeFilter}
            />
            {/*<TodoList title={titleProps2} tasks={tasks2}/>*/}
            {/*<TodoList title={'What to read'} tasks={tasks}/>*/}
        </div>
    );
}

export default App;