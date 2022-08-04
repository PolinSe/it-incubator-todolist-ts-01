import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import {Button, IconButton, TextField} from '@mui/material';


type PropsType = {
    callBack: (title: string) => void
}

export const AddItemForm = (props: PropsType) => {

    const {callBack} = props

    let [title, setTitle] = useState("")
    let [error, setError] = useState<string | null>(null)
    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }


    const addTask = () => {
        let newTitle = title.trim()
        if (newTitle !== "") {
            callBack(newTitle);
            setTitle("");
        } else {
            setError("Title is required");
        }
    }
    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        setError(null);
        if (e.charCode === 13) {
            addTask();
        }
    }

    return (
        <div>
            <TextField
                variant={'outlined'}
                label={"Title"}
                // color={error ? 'error' : "primary"}
                size={'small'}
                rows={'minRows'}
                value={title}
                onChange={onChangeHandler}
                onKeyPress={onKeyPressHandler}
                helperText={error && 'Title is required'}
                error={!!error}
            />

            <IconButton onClick={addTask}>
                <AddCircleOutlineOutlinedIcon/>
            </IconButton>
        </div>
    );
};
