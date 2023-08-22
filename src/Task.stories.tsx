import type {Meta, StoryObj} from '@storybook/react';
import Task from './Task';
import {action} from '@storybook/addon-actions';

const meta: Meta<typeof Task> = {
    title: 'TODOLISTS/Task',
    component: Task,
    tags: ['autodocs'],
    args: {
        changeTaskStatus: action('Status changed inside Task'),
        editTask: action('Title changed inside Task'),
        removeTask: action('Remove Button clicked changed inside Task'),
        task: {id: '12wsdewfijdei', title: 'JS', isDone: false},
        todolistId: 'fgdosrg8rgjuh'
    }
};

export default meta;

type Story = StoryObj<typeof Task>;

export const TaskIsNotDoneStory: Story = {
    args: {}
}

export const TaskIsDoneStory: Story = {
    args: {
        task: {id: '12wsdewfijdei', title: 'JS', isDone: true},
    }
};


