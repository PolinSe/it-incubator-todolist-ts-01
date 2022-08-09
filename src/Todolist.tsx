import React, {ChangeEvent} from 'react';
import {FilterValuesType} from './App';
import {AddItemForm} from './components/AddItemForm';
import {EditableSpan} from './components/EditableSpan';
import {Button, ButtonGroup, Checkbox, IconButton, List, ListItem} from '@mui/material';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';


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

export function Todolist(props: PropsType) {

    const onAllClickHandler = () => {
        props.changeFilter(props.todolistId, "all")
    };
    const onActiveClickHandler = () => {
        props.changeFilter(props.todolistId, "active")
    };
    const onCompletedClickHandler = () => {
        props.changeFilter(props.todolistId, "completed")
    };

    const removeTodolistHandler = () => {
        props.removeTodolist(props.todolistId)
    }
    const addTaskHandler = (newTitle: string) => {
        props.addTask(props.todolistId, newTitle)
    }

    const changeTodolistTitle = (title: string) => {
        props.changeTodolistTitle(props.todolistId, title)
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
                props.tasks.map(t => {
                    const onClickHandler = () => {
                        props.removeTask(props.todolistId, t.id)
                    }
                    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
                        props.changeTaskStatus(props.todolistId, t.id, e.currentTarget.checked);
                    }
                    const editTaskHandler = (title: string) => {
                        props.editTask(props.todolistId, t.id, title)
                    }

                    return (
                        <ListItem key={t.id}
                                  className={t.isDone ? "is-done" : ""}
                                  dense
                                  divider
                        >
                            <Checkbox
                                size={'small'}
                                onChange={onChangeHandler}
                                checked={t.isDone}
                            />
                            <EditableSpan
                                title={t.title}
                                callBack={editTaskHandler}
                            />
                            <IconButton aria-label="delete" onClick={onClickHandler}>
                                <DeleteOutlinedIcon
                                    fontSize={'small'}
                                />
                            </IconButton>
                        </ListItem>
                    )
                })
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
}
