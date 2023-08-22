import type {Meta, StoryObj} from '@storybook/react';
import {EditableSpan} from './EditableSpan';
import {action} from '@storybook/addon-actions';

const meta: Meta<typeof EditableSpan> = {
    title: 'TODOLISTS/EditableSpan',
    component: EditableSpan,
    tags: ['autodocs'],
    argTypes: {

        title: {
            description: 'Start value empty. Add value push button set string.'
        },

        callBack: {
            description: 'Value EditableSpan changed',
            action: 'Value EditableSpan changed'
        },
    }
};
export default meta

type Story = StoryObj<typeof EditableSpan>;

export const EditableSpanStory: Story = {
    args: {
        callBack: action('Value EditableSpan changed')
    }
};

