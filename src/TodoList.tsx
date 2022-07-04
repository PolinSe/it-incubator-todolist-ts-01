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
    removeTask: (taskID: string) => void
    changeFilter: (filter: FilterValuesType) => void
    addTask: (title: string) => void
}

const TodoList = (props: TodoListPropsType) => {
    let [title, setTitle] = useState('')

    const tasksListItems = props.tasks.length
        ? props.tasks.map(task => {
            return (
                <li>
                    <input type="checkbox" checked={task.isDone}/>
                    <span>{task.title}</span>
                    <button onClick={() => props.removeTask(task.id)}>x</button>
                </li>
            )
        })
        : <span> This List is empty</span>

    const onClickAddTaskHandler = () => {
        props.addTask(title)
        setTitle('')
    }

    const onKeyDownAddTaskHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            onClickAddTaskHandler()
        }
    }

    const onChangeAddTaskHandler = (e: ChangeEvent<HTMLInputElement>) => {
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
                />
                <button onClick={onClickAddTaskHandler}>+</button>
            </div>
            <ul>
                {tasksListItems}
            </ul>

            <div>
                <button onClick={getChangeFilterHandler('all')}>All</button>
                <button onClick={getChangeFilterHandler('active')}>Active</button>
                <button onClick={getChangeFilterHandler('completed')}>Completed</button>
            </div>
        </div>

    );
};

export default TodoList;