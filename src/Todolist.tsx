import React, {ChangeEvent, memo, useCallback} from 'react';
import {FilterValuesType} from './App';
import {AddItemForm} from './components/AddItemForm';
import {EditableSpan} from './components/EditableSpan';
import {Button, ButtonGroup, Checkbox, IconButton, List, ListItem} from '@mui/material';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import Task from './Task';



export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type PropsType = {
    todolistId: string
    title: string
    filter: FilterValuesType
    tasks: Array<TaskType>
    removeTask: (todolistId: string, taskId: string) => void
    addTask: (todolistId: string, title: string) => void
    editTask: (todolistId: string, taskId: string, newTitle: string) => void
    changeTaskStatus: (todolistId: string, taskId: string, isDone: boolean) => void
    changeFilter: (todolistId: string, value: FilterValuesType) => void
    removeTodolist: (todolistId: string) => void
    changeTodolistTitle: (todolistId: string, title: string) => void
}

export const Todolist = memo((props: PropsType) => {
    console.log("Todolist")

    const onAllClickHandler = useCallback(() => {
        props.changeFilter(props.todolistId, "all")
    }, [props.changeFilter, props.todolistId]);
    const onActiveClickHandler = useCallback(() => {
        props.changeFilter(props.todolistId, "active")
    }, [props.changeFilter, props.todolistId]);
    const onCompletedClickHandler = useCallback(() => {
        props.changeFilter(props.todolistId, "completed")
    }, [props.changeFilter, props.todolistId]);

    const removeTodolistHandler = useCallback(() => {
        props.removeTodolist(props.todolistId)
    }, [props.removeTodolist, props.todolistId])
    const addTaskHandler = useCallback((newTitle: string) => {
        props.addTask(props.todolistId, newTitle)
    }, [props.addTask, props.todolistId])

    const changeTodolistTitle = useCallback((title: string) => {
        props.changeTodolistTitle(props.todolistId, title)
    }, [props.changeTodolistTitle, props.todolistId])

    let tasksForTodolist = props.tasks
    if (props.filter === "active") {
        tasksForTodolist = props.tasks.filter(t => t.isDone === false);
    }
    if (props.filter === "completed") {
        tasksForTodolist = props.tasks.filter(t => t.isDone === true);
    }
    return <div>
        <h3>
            <EditableSpan title={props.title} callBack={changeTodolistTitle}/>
            <IconButton aria-label="delete" onClick={removeTodolistHandler}>
                <DeleteOutlinedIcon/>
            </IconButton>
        </h3>
        <AddItemForm callBack={addTaskHandler}/>
        <List>
            {
                tasksForTodolist.map(t => <Task key={t.id} todolistId={props.todolistId} task={t} removeTask={props.removeTask} changeTaskStatus={props.changeTaskStatus} editTask={props.editTask}/>)
            }
        </List>

        <ButtonGroup variant="contained" size={'small'} aria-label="outlined primary button group">
            <Button
                color={props.filter === 'all' ? 'secondary' : 'primary'}
                onClick={onAllClickHandler}>All
            </Button>
            <Button
                color={props.filter === 'active' ? 'secondary' : 'primary'}
                onClick={onActiveClickHandler}>Active
            </Button>
            <Button
                color={props.filter === 'completed' ? 'secondary' : 'primary'}
                onClick={onCompletedClickHandler}>Completed
            </Button>
        </ButtonGroup>


    </div>
})
