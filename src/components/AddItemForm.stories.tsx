import type {Meta, StoryObj} from '@storybook/react';
import {AddItemForm, PropsType} from './AddItemForm';
import {action} from '@storybook/addon-actions'
import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {IconButton, TextField} from '@mui/material';
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';

const meta: Meta<typeof AddItemForm> = {
    title: 'TODOLISTS/AddItemForm',
    component: AddItemForm,
    tags: ['autodocs'],
    argTypes: {
        callBack: {
            description: 'Button clicked inside form',
            action: 'clicked'
        },
    }
};
export default meta

type Story = StoryObj<typeof AddItemForm>;

export const AddItemFormStory: Story = {
    args: {
        callBack: action('Button clicked inside form')
    },
};

const Component = (props: PropsType) => {
    let [title, setTitle] = useState("")
    let [error, setError] = useState<string | null>("Title is required")
    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }

    const addTask = () => {
        let newTitle = title.trim()
        if (newTitle !== "") {
            props.callBack(newTitle);
            setTitle("");
        } else {
            setError("Title is required");
        }
    }
    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (error) setError(null);
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
}


export const AddItemFormWithErrortory: Story = {

    render: (args) => <Component callBack={action('Button clicked inside form')}/>

};

