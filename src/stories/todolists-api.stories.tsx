import React, {useEffect, useState} from 'react'
import {todolistApi} from '../api/api-todolists';
import {Meta, StoryObj} from '@storybook/react';
import {AddItemForm} from '../components/AddItemForm';


const meta: Meta<typeof AddItemForm> = {
    title: 'API',
    tags: ['autodocs'],
    argTypes: {}
};
export default meta


export const GetTodolists = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        // здесь мы будем делать запрос и ответ закидывать в стейт.
        // который в виде строки будем отображать в div-ке
        todolistApi.getTodolists()
            .then(res => setState(res.data))
    }, [])

    return <div>{JSON.stringify(state)}</div>
}
export const CreateTodolist = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const title = 'LaLaLa'
        todolistApi.createTodolist(title)
            .then(res => setState(res.data))
    }, [])

    return <div>{JSON.stringify(state)}</div>
}
export const DeleteTodolist = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const id = '19eaac0e-4e1a-4781-a48f-6136f8e6727a'
        todolistApi.deleteTodolist(id)
            .then(res => setState(res.data))
    }, [])

    return <div>{JSON.stringify(state)}</div>
}
export const UpdateTodolistTitle = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const id = '3f447e4d-3aa4-4f6d-b0ba-772c346c5598'
        const title = 'LaLaLa'
        todolistApi.updateTodolistTitle(id, title)
            .then(res => setState(res.data))
    }, [])

    return <div>{JSON.stringify(state)}</div>
}

export const GetTasks = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        // здесь мы будем делать запрос и ответ закидывать в стейт.
        // который в виде строки будем отображать в div-ке

        const todolistId = 'd86b7efc-4df2-4961-9316-ec9fa7d5bdd5'
        todolistApi.getTasks(todolistId)
            .then(res => setState(res.data))
    }, [])

    return <div>{JSON.stringify(state)}</div>
}

export const CreateTask = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const title = 'July'
        const todolistId = 'd86b7efc-4df2-4961-9316-ec9fa7d5bdd5'

        todolistApi.createTask(todolistId, title)
            .then(res => setState(res.data))
    }, [])

    return <div>{JSON.stringify(state)}</div>
}

export const DeleteTask = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const todolistId = 'd86b7efc-4df2-4961-9316-ec9fa7d5bdd5'
        const id = 'c0f9c265-54bf-4099-96e3-22569af809f4'

        todolistApi.deleteTask(todolistId, id)
            .then(res => setState(res.data))
    }, [])

    return <div>{JSON.stringify(state)}</div>
}

export const UpdateTaskTitle = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const todolistId = 'd86b7efc-4df2-4961-9316-ec9fa7d5bdd5'
        const id = '36986ff5-e47e-4f04-8554-c05eb4acf524'
        const title = 'August'

        todolistApi.updateTaskTitle(todolistId, id, title)
            .then(res => setState(res.data))
    }, [])

    return <div>{JSON.stringify(state)}</div>
}