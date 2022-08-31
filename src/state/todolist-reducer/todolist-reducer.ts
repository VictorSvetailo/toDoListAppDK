import {FilterValuesType, ToDoListType} from '../../App';
import {v1} from 'uuid';

type RemoveTodoListActionType = {
    type: 'REMOVE-TODOLIST',
    id: string
}

export type AddTodolistActionType = {
    type: 'ADD-TODOLIST',
    title: string
}

export type ChangeTodolistTitleActionType = {
    type: 'CHANGE-TODOLIST-TITLE',
    id: string
    title: string
}
export type ChangeTodolistFilterActionType = {
    type: 'CHANGE-TODOLIST-FILTER',
    id: string
    filter: FilterValuesType
}

type ActionsType =  RemoveTodoListActionType | AddTodolistActionType | ChangeTodolistTitleActionType | ChangeTodolistFilterActionType

export const todolistsReducer = (state: Array<ToDoListType>, action: ActionsType): Array<ToDoListType> => {
    switch (action.type) {
        case 'REMOVE-TODOLIST': {
            return state.filter(tl => tl.id !== action.id)
        }
        case 'ADD-TODOLIST': {
            return [...state, {
                filter: 'all',
                id: v1(),
                title: action.title
            }]
        }
        case 'CHANGE-TODOLIST-TITLE': {
            const toDoList = state.find(tl => tl.id === action.id)
            if (toDoList) {
                toDoList.title = action.title
            }
            return [...state]
        }
        case 'CHANGE-TODOLIST-FILTER': {
            const toDoList = state.find(tl => tl.id === action.id);
            if (toDoList) {
                toDoList.filter = action.filter;
            }
            return [...state]
        }
        default:
            throw  new Error('I dont understand type!')
    }
}


export const RemoveTodoListAC = (toDoListId: string): RemoveTodoListActionType => {
    return { type:  'REMOVE-TODOLIST', id: toDoListId}
}

export const TodolistsReducerAC = (title: string): AddTodolistActionType => {
    return { type:  'ADD-TODOLIST', title: title}
}

export const ChangeTodolistTitleAC = (id: string, title: string): ChangeTodolistTitleActionType => {
    return { type: 'CHANGE-TODOLIST-TITLE', id: id, title: title}
}

export const ChangeTodolistFilterAC = (id: string, filter: FilterValuesType): ChangeTodolistFilterActionType => {
    return { type: 'CHANGE-TODOLIST-FILTER', id: id, filter: filter}
}

