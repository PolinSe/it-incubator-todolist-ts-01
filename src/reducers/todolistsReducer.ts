import {FilterValuesType, TodolistsType} from '../App';
import {v1} from 'uuid';

type ActionsType = changeTodolistTitleACType
    | removeTodolistACType
    | addTodolistACType
    | changeFilterACType

const initialState: Array<TodolistsType> = []

export const todolistsReducer = (state: Array<TodolistsType> = initialState, action: ActionsType) => {
    switch (action.type) {
        case 'CHANGE-TODOLIST-TITLE': {
            return state.map(el => el.id === action.payload.todolistId ? {...el, title: action.payload.title} : el)
        }
        case 'REMOVE-TODOLIST': {
            return state.filter(el => el.id !== action.payload.todolistId)
        }
        case 'ADD-TODOLIST': {
            let newTodolist: TodolistsType = {
                id: action.payload.todolistId, title: action.payload.title, filter: 'all'
            }
            return [newTodolist, ...state]
        }
        case 'CHANGE-FILTER': {
            return state.map(el => el.id === action.payload.todolistId ? {...el, filter: action.payload.value} : el)
        }
        default:
            return state
    }
}


type changeTodolistTitleACType = ReturnType<typeof changeTodolistTitleAC>
export const changeTodolistTitleAC = (todolistId: string, title: string) => {
    return {
        type: 'CHANGE-TODOLIST-TITLE',
        payload: {
            todolistId,
            title
        }
    } as const
}

export type removeTodolistACType = ReturnType<typeof removeTodolistAC>
export const removeTodolistAC = (todolistId: string) => {
    return {
        type: 'REMOVE-TODOLIST',
        payload: {
            todolistId
        }
    } as const
}

export type addTodolistACType = ReturnType<typeof addTodolistAC>
export const addTodolistAC = (title: string) => {
    return {
        type: 'ADD-TODOLIST',
        payload: {
            todolistId: v1(),
            title
        }
    } as const
}

type changeFilterACType = ReturnType<typeof changeFilterAC>
export const changeFilterAC = (todolistId: string, value: FilterValuesType) => {
    return {
        type: 'CHANGE-FILTER',
        payload: {
            todolistId,
            value
        }
    } as const
}

