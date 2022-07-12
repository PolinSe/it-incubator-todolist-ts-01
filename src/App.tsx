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
    const [filter, setFilter] = useState<FilterValuesType>('all')

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
    const changeFilter = (filter: FilterValuesType) => {
        setFilter(filter)
    }

    const changeTaskStatus = (taskID: string, isDone: boolean) => {
        debugger
        setTasks(tasks.map(t => t.id === taskID ? {...t, isDone: isDone} : t))
    }
    // UI:
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

    return (
        <div className="App">
            <TodoList
                title={title}
                tasks={tasksForRender}
                filter={filter}

                addTask={addTask}
                removeTask={removeTask}
                changeFilter={changeFilter}
                changeTaskStatus={changeTaskStatus}

            />
        </div>
    );
}

export default App;
