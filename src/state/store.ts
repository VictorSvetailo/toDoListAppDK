import {combineReducers, createStore} from 'redux';

import {tasksReducer} from './todolist-reducer/tasks-reducer';
import {todolistsReducer} from './todolist-reducer/todolist-reducer';




const rootReducer =  combineReducers({
    todolists: todolistsReducer,
    tasks: tasksReducer
})

// type AppRootState = {
//     todolists: Array<ToDoListType>
//     tasks: TasksStateType
// }
export type AppRootState = ReturnType<typeof rootReducer>

export const store = createStore(rootReducer)

// @ts-ignore
window.store = store;

