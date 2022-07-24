import React from 'react';
import './App.css';
import {TodoList} from "./TodoList";


const tasks1 = [
    {id: 1, title: 'HTML&CSS', isDone: true},
    {id: 2, title: 'JS', isDone: true},
    {id: 3, title: 'ReactJS', isDone: false},
    {id: 4, title: 'Redux', isDone: false},
]
const tasks2 = [
    {id: 1, title: 'Hello world', isDone: true},
    {id: 2, title: 'I am Happy', isDone: false},
    {id: 3, title: 'Yo', isDone: false},
]

function App() {
    return (
        <div className="App">
            <TodoList title={'What to learn'} tasks={tasks1}/>
            <TodoList title={'Songs'} tasks={tasks2}/>
            {/*<TodoList title={'What to read'} tasks={tasks}/>*/}
        </div>
    );
}

export default App;