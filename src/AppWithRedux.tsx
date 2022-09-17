import React, {useReducer, useState} from 'react';
import './App.css';
import {TaskType, TodoList} from './TodoList';
import {v1} from 'uuid';
import {AddItemForm} from './AddItemForm';
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from '@mui/material';
import {Menu} from '@mui/icons-material';
import {
    addTodolistsAC,
    changeTodolistFilterAC,
    changeTodolistTitleAC,
    removeTodoListAC, toDoListId1, toDoListId2,
    todolistsReducer
} from './state/todolist-reducer/todolist-reducer';
import {
    addTaskAC,
    changeTaskStatusAC,
    changeTaskTitleAC,
    removeTaskAC,
    tasksReducer
} from './state/todolist-reducer/tasks-reducer';
import {useDispatch, useSelector} from 'react-redux';
import {AppRootState} from './state/store';

export type FilterValuesType = 'all' | 'completed' | 'active';


export type ToDoListType = {
    id: string
    title: string
    filter: FilterValuesType
}

export type TasksStateType = {
    [key: string]: Array<TaskType>
}

// Components
function AppWithRedux() {

    const dispatch = useDispatch()
    const toDoLists = useSelector<AppRootState, Array<ToDoListType>>(state => state.todolists)
    const tasksObj = useSelector<AppRootState, TasksStateType>(state => state.tasks)

    function removeTask(id: string, toDoListId: string) {
        const action = removeTaskAC(id, toDoListId)
        dispatch(action)
    }

    function addTask(title: string, toDoListId: string) {
        const action = addTaskAC(title, toDoListId)
        dispatch(action)
    }


    // Change checkbox
    function changeStatus(id: string, isDone: boolean, toDoListId: string) {
        dispatch(changeTaskStatusAC(id, isDone, toDoListId))
    }

    function changeTaskTitle(toDoListId: string, id: string, title: string) {
        const action = changeTaskTitleAC(title, toDoListId, id)
        dispatch(action)
    }


////Sortirovka-------------------------------------
//     let [filter, setFilter] = useState<FilterValuesType>('all');

    function changeFilter(toDoListId: string, filter: FilterValuesType) {
        dispatch(changeTodolistFilterAC(toDoListId, filter))
    }


//--------------------------------------------------
// Data todoList

    const removeToDoList = (toDoListId: string) => {
        const action = removeTodoListAC(toDoListId)
        dispatch(action)
        dispatch(action)
    }

    function changeToDoListTitle(id: string, newTitle: string) {
        const action = changeTodolistTitleAC(id, newTitle)
        dispatch(action)
    }

    //--------------------------------------------------
    function addTodoList(title: string) {
        const action = addTodolistsAC(title);
        dispatch(action);
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

export default AppWithRedux;