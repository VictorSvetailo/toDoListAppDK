import {v1} from 'uuid';
import {FilterValuesType, ToDoListType} from '../../App';
import {
    ChangeTodolistFilterActionType,
    removeTodoListAC,
    addTodolistsAC,
    todolistsReducer,
    changeTodolistTitleAC, changeTodolistFilterAC
} from './todolist-reducer';


test('correct todolist should be removed', () => {
    let toDoListId1 = v1();
    let toDoListId2 = v1();

    const startState: Array<ToDoListType> = [
        {id: toDoListId1, title: 'What to learn?', filter: 'all'},
        {id: toDoListId2, title: 'What to buy?', filter: 'all'}
    ]
    const endState = todolistsReducer(startState, removeTodoListAC(toDoListId1))
    // const endState = todolistsReducer(startState, {
    //     type: 'REMOVE-TODOLIST',
    //     id: toDoListId1
    // })

    expect(endState.length).toBe(1);
    expect(endState[0].id).toBe(toDoListId2);
});




test('correct todolist should be added', () => {
    let toDoListId1 = v1();
    let toDoListId2 = v1();

    let newToDoListTitle = 'New Todolist'

    const startState: Array<ToDoListType> = [
        {id: toDoListId1, title: 'What to learn?', filter: 'all'},
        {id: toDoListId2, title: 'What to buy?', filter: 'all'}
    ]
    const endState = todolistsReducer(startState, addTodolistsAC(newToDoListTitle))

    // const endState = todolistsReducer(startState, {
    //     type: 'ADD-TODOLIST',
    //     title: newToDoListTitle
    // })

    expect(endState.length).toBe(3);
    expect(endState[0].title).toBe(newToDoListTitle);
    expect(endState[0].filter).toBe('all');
});

test('correct todolist should its name', () => {
    let toDoListId1 = v1();
    let toDoListId2 = v1();

    let newToDoListTitle = 'New Todolist'

    const startState: Array<ToDoListType> = [
        {id: toDoListId1, title: 'What to learn?', filter: 'all'},
        {id: toDoListId2, title: 'What to buy?', filter: 'all'}
    ]
    const action = changeTodolistTitleAC(toDoListId2, newToDoListTitle)

    const endState = todolistsReducer(startState, action)

    expect(endState[0].title).toBe('What to learn?');
    expect(endState[1].title).toBe(newToDoListTitle);
});

test('correct filter of todolist should be change', () => {
    let toDoListId1 = v1();
    let toDoListId2 = v1();

    let newFilter: FilterValuesType = 'completed'

    const startState: Array<ToDoListType> = [
        {id: toDoListId1, title: 'What to learn?', filter: 'all'},
        {id: toDoListId2, title: 'What to buy?', filter: 'all'}
    ]
    const action = changeTodolistFilterAC(toDoListId2, newFilter)

    // const action: ChangeTodolistFilterActionType = {
    //     type: 'CHANGE-TODOLIST-FILTER',
    //     id: toDoListId2,
    //     filter: newFilter,
    // }

    const endState = todolistsReducer(startState, action)

    expect(endState[0].filter).toBe('all');
    expect(endState[1].filter).toBe(newFilter);
});



