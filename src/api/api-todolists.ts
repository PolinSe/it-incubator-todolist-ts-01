import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.1/',
    withCredentials: true,
    // headers: {
    //     'API-KEY': 'fbe2a5ee-5667-40c3-b19b-e321be0a7ff2'
    // }
})

type TodolistType = {
    id: string,
    title: string,
    addedDate: string,
    order: number
}

type TaskType = {
    id: string
    title: string
    description: null
    todoListId: string
    order: number
    status: number
    priority: number
    startDate: string
    deadline: string
    addedDate: string
}

type GetTasksResponseType = {
    items: Array<TaskType>
    totalCount: number
    error: string
}

type ResponseType<T={}> = {
    messages: Array<string>
    fieldsErrors: Array<string>
    resultCode: number
    data: T
}


export const todolistApi = {
    getTodolists: () => instance.get<Array<TodolistType>>('todo-lists'),

    createTodolist: (title:string) => instance.post<ResponseType<{item: TodolistType}>>('todo-lists', {title}),

    deleteTodolist: (id: string) => instance.delete<ResponseType>(`todo-lists/${id}`),

    updateTodolistTitle: (id: string, title: string) => instance.put<ResponseType>(`todo-lists/${id}`, {title}),

    getTasks: (todolistId: string) => instance.get<GetTasksResponseType>(`/todo-lists/${todolistId}/tasks`),

    createTask: (todolistId: string, title: string) => instance.post<ResponseType<{item: TaskType}>>(`/todo-lists/${todolistId}/tasks`,{title}),

    deleteTask: (todolistId: string, id: string) => instance.delete<ResponseType>(`/todo-lists/${todolistId}/tasks/${id}`),

    updateTaskTitle: (todolistId: string, id: string, title: string) => instance.put<ResponseType>(`/todo-lists/${todolistId}/tasks/${id}`, {title}),
}