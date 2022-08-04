import React, {ChangeEvent, useState} from 'react';
import {TextField} from '@mui/material';

type PropsType = {
    title: string
    callBack: (title: string) => void
}

export const EditableSpan = (props: PropsType) => {

    const [edit, setEdit] = useState(false)
    let [newTitle, setNewTitle] = useState(props.title)
    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setNewTitle(e.currentTarget.value)
    }
    const addTask = () => {

        if (newTitle !== "") {
            props.callBack(newTitle);

        }
    }

    const editHandler = () => {
        setEdit(!edit)
        addTask()
    }

    return (
        edit
            ? <TextField
                variant={'standard'}
                onBlur={editHandler}
                value={newTitle}
                onChange={onChangeHandler}
                autoFocus
            />

            : <span onDoubleClick={editHandler}>{props.title}</span>
    );
};
