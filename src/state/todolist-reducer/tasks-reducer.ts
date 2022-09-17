import {FilterValuesType, TasksStateType, ToDoListType} from '../../App';
import {v1} from 'uuid';
import {
    AddTodolistActionType,
    ChangeTodolistFilterActionType,
    ChangeTodolistTitleActionType,
    RemoveTodoListActionType, toDoListId1, toDoListId2
} from './todolist-reducer';

type RemoveTaskActionType = {
    type: 'REMOVE-TASK'
    toDoListId: string
    taskID: string
}

export type AddTaskActionType = {
    type: 'ADD-TASK'
    title: string
    toDoListId: string
}
export type ChangedStatusActionType = {
    type: 'CHANGE-TASK-STATUS'
    taskID: string
    toDoListId: string
    isDone: boolean
}

export type ChangedTitleActionType = {
    type: 'CHANGE-TASK-TITLE'
    taskID: string
    toDoListId: string
    title: string
}


type ActionsType = RemoveTaskActionType | AddTaskActionType
    | ChangedStatusActionType | ChangedTitleActionType
| AddTodolistActionType | RemoveTodoListActionType;

const initialState: TasksStateType = {
    [toDoListId1]: [
        {id: v1(), title: 'HTML&CSS', isDone: true},
        {id: v1(), title: 'JS', isDone: true},
        {id: v1(), title: 'ReactJS', isDone: false},],
    [toDoListId2]: [
        {id: v1(), title: 'Car', isDone: true},
        {id: v1(), title: 'Books', isDone: true},
        {id: v1(), title: 'Milk', isDone: false},],
}

export const tasksReducer = (state: TasksStateType = initialState, action: ActionsType): TasksStateType => {
    switch (action.type) {
        case 'REMOVE-TASK': {

            return {...state, [action.toDoListId]: state[action.toDoListId].filter(t => t.id !== action.taskID)}

            // const stateCopy = {...state}
            // const tasks = state[action.toDoListId]
            // const filteredTasks = tasks.filter(t => t.id !== action.taskID)
            // stateCopy[action.toDoListId] = filteredTasks
            // return stateCopy
        }
        case 'ADD-TASK': {
            const newTask = {id: v1(), title: action.title, isDone: false}
            const statesCopy = {...state}
            const tasks = statesCopy[action.toDoListId]
            const newTasks = [newTask, ...tasks]
            statesCopy[action.toDoListId] = newTasks
            return statesCopy
            // return {
            //     ...state,
            //     [action.toDoListId] : [newTask, ...state[action.toDoListId]]
            // };
        }
        case 'CHANGE-TASK-STATUS': {
            const stateCopy = {...state};
            const tasks = stateCopy[action.toDoListId];
            const task = tasks.find(t => t.id === action.taskID)
            if (task) {
                task.isDone = action.isDone
            }
            return stateCopy;

            // const statesCopy = {...state}
            // const tasks = statesCopy[action.toDoListId]
            // const newTasks = tasks.map(tf => tf.id !== action.taskID ? {...tf, isDone: action.isDone} : tf)
            //     statesCopy[action.toDoListId] = newTasks
            // return statesCopy

            // return {...state,[action.toDoListId]: state[action.toDoListId].map(s => s.id === action.taskID ? {...s, isDone: action.isDone} : s)}

        }
        case 'CHANGE-TASK-TITLE': {
            const stateCopy = {...state};
            const tasks = stateCopy[action.toDoListId];
            const task = tasks.find(t => t.id === action.taskID)
            if (task) {
                task.title = action.title
            }
            return stateCopy;
        }
        case 'ADD-TODOLIST': {
            const stateCopy = {...state}
            stateCopy[action.todolistId] = []
            return stateCopy
        }
        case 'REMOVE-TODOLIST': {
            const stateCopy = {...state};
            delete stateCopy[action.id]
            return stateCopy;
        }
        default:
            return state
    }
}

export const removeTaskAC = (taskID: string, toDoListId: string): RemoveTaskActionType => {
    return {type: 'REMOVE-TASK', toDoListId: toDoListId, taskID: taskID}
}

export const addTaskAC = (title: string, toDoListId: string): AddTaskActionType => {
    return {type: 'ADD-TASK', title, toDoListId: toDoListId}
}

export const changeTaskStatusAC = (taskID: string,
                                   isDone: boolean,
                                   toDoListId: string): ChangedStatusActionType => {
    return {type: 'CHANGE-TASK-STATUS', isDone, toDoListId, taskID}
}

export const changeTaskTitleAC = (taskID: string,
                                   title: string,
                                   toDoListId: string): ChangedTitleActionType => {
    return {type: 'CHANGE-TASK-TITLE', toDoListId, taskID, title}
}
