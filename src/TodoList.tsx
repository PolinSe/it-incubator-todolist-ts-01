import React, {useState, KeyboardEvent, ChangeEvent} from 'react';
import {FilterValuesType} from "./App";

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type TodoListPropsType = {
    title: string
    tasks: Array<TaskType>
    filter: FilterValuesType

    addTask: (title: string) => void
    removeTask: (taskID: string) => void
    changeFilter: (filter: FilterValuesType) => void
    changeTaskStatus: (taskID: string, isDone: boolean) => void

}

const TodoList = (props: TodoListPropsType) => {
    const [title, setTitle] = useState('')
    const [error, setError] = useState<boolean>(false)

    const errorMessageStyle = {color: 'hotpink', backgroundColor: 'black'}

    const tasksListItems = props.tasks.length
         ? props.tasks.map(task => {

             const changeTaskStatus = (e: ChangeEvent<HTMLInputElement>) => props.changeTaskStatus(task.id, e.currentTarget.checked)

            return (
                <li >
                    <input
                        onChange={changeTaskStatus}
                        type="checkbox" checked={task.isDone}
                    />
                    <span className={task.isDone ? 'isDone' : ''}>{task.title}</span>
                    <button onClick={() => props.removeTask(task.id)}>x</button>
                </li>
            )
        })
        : <span> This List is empty</span>

    const onClickAddTaskHandler = () => {
        const trimmedTitled = title.trim()
        if(trimmedTitled) {
            props.addTask(trimmedTitled)
        }
        else {
            setError(true)
        }
        setTitle('')
    }

    const onKeyDownAddTaskHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            onClickAddTaskHandler()
        }
    }

    const onChangeAddTaskHandler = (e: ChangeEvent<HTMLInputElement>) => {
        error && setError(false)
        setTitle(e.currentTarget.value)
    }

    const getChangeFilterHandler = (filter: FilterValuesType): () => void => {
        return () => props.changeFilter(filter)
    }

    return (
        <div>
            <h3>{props.title}</h3>
            <div>
                <input
                    value={title}
                    onChange={onChangeAddTaskHandler}
                    onKeyDown={onKeyDownAddTaskHandler}
                    className={error ? 'error' : ''}
                />
                <button onClick={onClickAddTaskHandler}>+</button>
                {error && <div style={errorMessageStyle}>Title is required!</div>}
            </div>
            <ul>
                {tasksListItems}
            </ul>

            <div>
                <button className={ props.filter === 'all' ? 'active' : ''} onClick={getChangeFilterHandler('all')}>All</button>
                <button className={ props.filter === 'active' ? 'active' : ''} onClick={getChangeFilterHandler('active')}>Active</button>
                <button className={ props.filter === 'all' ? 'completed' : ''} onClick={getChangeFilterHandler('completed')}>Completed</button>
            </div>
        </div>

    );
};

export default TodoList;