import React, {useState} from 'react';
import './App.css';
import {TaskType, TodoList} from './TodoList';
import {v1} from 'uuid';


export type FilterValuesType = 'all' | 'completed' | 'active';


type ToDoListType = {
    id: string
    title: string
    filter: FilterValuesType
}

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
    //
    // let [tasksObj, setTasks] = useState<Array<TaskType>>([
    //     {id: v1(), title: 'HTML&CSS', isDone: true},
    //     {id: v1(), title: 'JS', isDone: true},
    //     {id: v1(), title: 'ReactJS', isDone: false},
    //     {id: v1(), title: 'Redux', isDone: false},
    //     {id: v1(), title: 'BLL', isDone: false},
    // ])


    function removeTask(id: string, toDoListId: string) {
        let tasks = tasksObj[toDoListId];
        let filteredTasks = tasks.filter(t => t.id !== id)
        tasksObj[toDoListId]  = filteredTasks
        setTasks({...tasksObj})
    }

    function addTask(title: string, toDoListId: string) {
        let task = {id: v1(), title: title, isDone: false};
        let tasks = tasksObj[toDoListId];
        let newTasks = [task, ...tasks];
        tasksObj[toDoListId] = newTasks
        setTasks({...tasksObj})
    }


    // Change checkbox
    function changeStatus(tasksId: string, isDone: boolean, toDoListId: string) {
        let tasks = tasksObj[toDoListId];
        let task = tasks.find(t => t.id === tasksId)
        if (task) {
            task.isDone = isDone
        }
        setTasks({...tasksObj})
    }


////Sortirovka-------------------------------------
//     let [filter, setFilter] = useState<FilterValuesType>('all');

    function changeFilter(value: FilterValuesType, toDoListId: string) {
        let toDoList = toDoLists.find(tl => tl.id === toDoListId);
        if (toDoList) {
            toDoList.filter = value;
            setToDoLists([...toDoLists])
        }
    }


//--------------------------------------------------
// Data todoList
    let toDoListId1 = v1()
    let toDoListId2 = v1()
    let [toDoLists, setToDoLists] = useState<Array<ToDoListType>>([
        {id: toDoListId1, title: 'What to learn', filter: 'active'},
        {id: toDoListId2, title: 'What to buy', filter: 'completed'}
    ])

    let removeToDoList = (toDoListId: string) =>{
        let filteredToDoLists = toDoLists.filter(tl => tl.id !== toDoListId)
        setToDoLists(filteredToDoLists);
        delete tasksObj[toDoListId]
        setTasks({...tasksObj})
    }

    let [tasksObj, setTasks] = useState({
        [toDoListId1]: [
            {id: v1(), title: 'HTML&CSS', isDone: true},
            {id: v1(), title: 'JS', isDone: true},
            {id: v1(), title: 'ReactJS', isDone: false},
            {id: v1(), title: 'Redux', isDone: false},
            {id: v1(), title: 'BLL', isDone: false},],
        [toDoListId2]: [
            {id: v1(), title: 'Car', isDone: true},
            {id: v1(), title: 'Books', isDone: true},
            {id: v1(), title: 'Milk', isDone: false},],
    });
    //--------------------------------------------------
    return (
        <div className="App">
            {
                toDoLists.map((tl) => {
                    let tasksForTodolist = tasksObj[tl.id];
                    if (tl.filter === 'completed') {
                        tasksForTodolist = tasksForTodolist.filter(t => t.isDone === true);
                    }
                    if (tl.filter === 'active') {
                        tasksForTodolist = tasksForTodolist.filter(t => t.isDone === false);
                    }
                    return (
                        <div key={tl.id}>
                            <TodoList
                                id={tl.id}
                                title={tl.title}
                                tasks={tasksForTodolist}
                                removeTask={removeTask}
                                changeFilter={changeFilter}
                                addTask={addTask}
                                changeTaskStatus={changeStatus}
                                filter={tl.filter}
                                removeToDoList={removeToDoList}
                            />
                        </div>
                    )
                })
            }
        </div>
    );
}

export default App;