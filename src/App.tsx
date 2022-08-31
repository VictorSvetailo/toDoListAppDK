import React, {useState} from 'react';
import './App.css';
import {TaskType, TodoList} from './TodoList';
import {v1} from 'uuid';
import {AddItemForm} from './AddItemForm';
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from '@mui/material';
import {Menu} from '@mui/icons-material';

export type FilterValuesType = 'all' | 'completed' | 'active';


export type ToDoListType = {
    id: string
    title: string
    filter: FilterValuesType
}

type TasksStateType = {
    [key: string]: Array<TaskType>
}

// Components
function App() {
    function removeTask(id: string, toDoListId: string) {
        const tasks = tasksObj[toDoListId];
        const filteredTasks = tasks.filter(t => t.id !== id)
        tasksObj[toDoListId] = filteredTasks
        setTasks({...tasksObj})
    }

    function addTask(title: string, toDoListId: string) {
        const task = {id: v1(), title: title, isDone: false};
        const tasks = tasksObj[toDoListId];
        const newTasks = [task, ...tasks];
        tasksObj[toDoListId] = newTasks
        setTasks({...tasksObj})
    }


    // Change checkbox
    function changeStatus(tasksId: string, isDone: boolean, toDoListId: string) {
        const tasks = tasksObj[toDoListId];
        const task = tasks.find(t => t.id === tasksId)
        if (task) {
            task.isDone = isDone
        }
        setTasks({...tasksObj})
    }

    function changeTaskTitle(tasksId: string, newValue: string, toDoListId: string) {
        // достаем нужный массив по toDoListId
        const tasks = tasksObj[toDoListId];
        //находим нужную task
        const task = tasks.find(t => t.id === tasksId)
        // изменяем task если она нашлась
        if (task) {
            task.title = newValue
        }
        setTasks({...tasksObj})
    }


////Sortirovka-------------------------------------
//     let [filter, setFilter] = useState<FilterValuesType>('all');

    function changeFilter(value: FilterValuesType, toDoListId: string) {
        const toDoList = toDoLists.find(tl => tl.id === toDoListId);
        if (toDoList) {
            toDoList.filter = value;
            setToDoLists([...toDoLists])
        }
    }


//--------------------------------------------------
// Data todoList
    const toDoListId1 = v1()
    const toDoListId2 = v1()
    const [toDoLists, setToDoLists] = useState<Array<ToDoListType>>([
        {id: toDoListId1, title: 'What to learn', filter: 'all'},
        {id: toDoListId2, title: 'What to buy', filter: 'all'}
    ])

    const removeToDoList = (toDoListId: string) => {
        const filteredToDoLists = toDoLists.filter(tl => tl.id !== toDoListId)
        setToDoLists(filteredToDoLists);
        delete tasksObj[toDoListId]
        setTasks({...tasksObj})
    }

    function changeToDoListTitle(id: string, newTitle: string) {
        const toDoList = toDoLists.find(tl => tl.id === id)
        if (toDoList) {
            toDoList.title = newTitle
            setToDoLists([...toDoLists])
        }
    }

    const [tasksObj, setTasks] = useState<TasksStateType>({
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
    function addTodoList(title: string) {
        const toDoList: ToDoListType = {
            id: v1(),
            filter: 'all',
            title: title,
        };
        setToDoLists([toDoList, ...toDoLists]);
        setTasks({
            ...tasksObj,
            [toDoList.id]: []

        })
    }

    return (
        <div className="App">
            <AppBar position={'static'}>
                <Toolbar>
                    <IconButton edge={'start'} color={'inherit'}>
                        <Menu/>
                    </IconButton>
                    <Typography variant={'h6'}>
                        News
                    </Typography>
                    <Button color={'inherit'}>Login</Button>
                </Toolbar>
            </AppBar>
            <Container fixed >
                <Grid style={{padding: "10px"}} container>
                    <AddItemForm addItem={addTodoList}/>
                </Grid>

                <Grid container spacing={5}>
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
                                <Grid key={tl.id} item>
                                    <Paper style={{padding: "10px"}}>
                                        <div>
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
                                                changeTaskTitle={changeTaskTitle}
                                                changeToDoListTitle={changeToDoListTitle}
                                            />
                                        </div>
                                    </Paper>
                                </Grid>
                            )
                        })
                    }
                </Grid>
            </Container>
        </div>
    )
        ;
}

export default App;