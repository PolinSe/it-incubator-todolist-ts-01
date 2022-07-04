import React, {useState} from 'react';
import './App.css';
import TodoList, {TaskType} from "./TodoList";
import {v1} from 'uuid';

export type FilterValuesType = 'all' | 'active' | 'completed'

function App() {
    //BLL
    const title: string = 'What to learn'

    const [tasks, setTasks] = useState<Array<TaskType>>([
            {id: v1(), title: 'HTML', isDone: true},
            {id: v1(), title: 'CSS', isDone: true},
            {id: v1(), title: 'JS/ES6', isDone: false},
        ]
    )

    const removeTask = (taskID: string) => {
        setTasks(tasks.filter(task => task.id !== taskID))
    }

    const addTask = (title: string) => {
        const newTask: TaskType = {
            id: v1(),
            title,
            isDone: false
        }
        setTasks([newTask, ...tasks])
    }

    const [filter, setFilter] = useState<FilterValuesType>('all')

    let tasksForRender
    switch (filter) {
        case 'completed':
            tasksForRender = tasks.filter(t => t.isDone)
            break
        case 'active':
            tasksForRender = tasks.filter(t => !t.isDone)
            break
        default:
            tasksForRender = tasks
    }

    const changeFilter = (filter: FilterValuesType) => {
        setFilter(filter)
    }

    // UI:
    return (
        <div className="App">
            <TodoList
                title={title}
                tasks={tasksForRender}
                removeTask={removeTask}
                changeFilter={changeFilter}
                addTask={addTask}
            />
        </div>
    );
}

export default App;
