import {TaskType} from '../Todolist';
import {v1} from 'uuid';

type ActionsType = removeTaskACType
    | addTaskACType
    | editTaskACType
    | changeStatusACType
    | addEmptyTaskArrayACType

type StateType = { [key: string]: Array<TaskType> }

export const tasksReducer = (state: StateType, action: ActionsType) => {
    switch (action.type) {

        case 'REMOVE-TASK': {
            return {
                ...state,
                [action.payload.todolistId]: state[action.payload.todolistId].filter(el => el.id !== action.payload.taskId)
            }
        }
        case 'ADD-TASK': {
            let newTask = {id: v1(), title: action.payload.title, isDone: false}
            return {
                ...state, [action.payload.todolistId]: [newTask, ...state[action.payload.todolistId]]
            }
        }
        case 'EDIT-TASK': {
            return {
                ...state,
                [action.payload.todolistId]: state[action.payload.todolistId].map(el => el.id === action.payload.taskId ? {
                    ...el,
                    title: action.payload.newTitle
                } : el)
            }
        }
        case 'CHANGE-STATUS': {
            return {
                ...state,
                [action.payload.todolistId]: state[action.payload.todolistId].map(el => el.id === action.payload.taskId ? {
                    ...el,
                    isDone: action.payload.isDone
                } : el)
            }
        }
        case 'ADD-EMPTY-TASKS-ARRAY': {
            return {
                ...state, [action.payload.newTodolistId]: []
            }
        }

        default:
            return state
    }
}

// ActionCreators

type removeTaskACType = ReturnType<typeof removeTaskAC>
export const removeTaskAC = (todolistId: string, taskId: string) => {
    return {
        type: 'REMOVE-TASK',
        payload: {
            todolistId: todolistId,
            taskId: taskId
        }
    } as const
}

type addTaskACType = ReturnType<typeof addTaskAC>
export const addTaskAC = (todolistId: string, title: string) => {
    return {
        type: 'ADD-TASK',
        payload: {
            todolistId: todolistId,
            title: title
        }
    } as const
}

type editTaskACType = ReturnType<typeof editTaskAC>
export const editTaskAC = (todolistId: string, taskId: string, newTitle: string) => {
    return {
        type: 'EDIT-TASK',
        payload: {
            todolistId: todolistId,
            taskId: taskId,
            newTitle: newTitle
        }
    } as const
}

type changeStatusACType = ReturnType<typeof changeStatusAC>
export const changeStatusAC = (todolistId: string, taskId: string, isDone: boolean) => {
    return {
        type: 'CHANGE-STATUS',
        payload: {
            todolistId: todolistId,
            taskId: taskId,
            isDone: isDone
        }
    } as const
}

type addEmptyTaskArrayACType = ReturnType<typeof addEmptyTaskArrayAC>
export const addEmptyTaskArrayAC = (newTodolistId: string) => {
    return {
        type: 'ADD-EMPTY-TASKS-ARRAY',
        payload: {
            newTodolistId: newTodolistId,
        }
    } as const
}