import {ToDoListType} from '../../App';
import {v1} from 'uuid';

type ActionType = {
    type: string
    [key: string]: any
}


export const todolistsReducer = (state: Array<ToDoListType>, action: ActionType): Array<ToDoListType> => {
    switch (action.type) {
        case 'REMOVE-TODOLIST': {
            return state.filter(tl => tl.id !== action.id)
        }
        case 'ADDED-TODOLIST': {
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

