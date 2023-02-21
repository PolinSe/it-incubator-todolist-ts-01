import React, {ChangeEvent, memo, useCallback} from 'react';
import {Checkbox, IconButton, ListItem} from '@mui/material';
import {EditableSpan} from './components/EditableSpan';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import {TaskType} from './Todolist';

type TaskPropsType = {
    todolistId: string
    task: TaskType
    removeTask: (todolistId: string, taskId: string) => void
    changeTaskStatus: (todolistId: string, taskId: string, isDone: boolean) => void
    editTask: (todolistId: string, taskId: string, newTitle: string) => void
}
const Task = memo((props: TaskPropsType ) => {

    const onClickHandler = () => {
        props.removeTask(props.todolistId, props.task.id)
    }
    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        props.changeTaskStatus(props.todolistId, props.task.id, e.currentTarget.checked);
    }
    const editTaskHandler = useCallback((title: string) => {
        props.editTask(props.todolistId, props.task.id, title)
    }, [props.editTask, props.todolistId, props.task.id])

    return (
        <ListItem
                  className={props.task.isDone ? "is-done" : ""}
                  dense
                  divider
        >
            <Checkbox
                size={'small'}
                onChange={onChangeHandler}
                checked={props.task.isDone}
            />
            <EditableSpan
                title={props.task.title}
                callBack={editTaskHandler}
            />
            <IconButton aria-label="delete" onClick={onClickHandler}>
                <DeleteOutlinedIcon
                    fontSize={'small'}
                />
            </IconButton>
        </ListItem>
    )
});

export default Task;