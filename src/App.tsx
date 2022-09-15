import React, {useReducer} from 'react';
import './App.css';
import {TaskType, Todolist} from './Todolist';
import {v1} from 'uuid';
import {AddItemForm} from './components/AddItemForm';

import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import {Container, Grid, Paper} from '@mui/material';

import {
    removeTaskAC,
    tasksReducer,
    addTaskAC,
    editTaskAC,
    changeStatusAC
} from './reducers/tasksReducer';
import {
    addTodolistAC,
    changeFilterAC,
    changeTodolistTitleAC,
    removeTodolistAC,
    todolistsReducer
} from './reducers/todolistsReducer';

export type FilterValuesType = "all" | "active" | "completed";
export type TodolistsType = { id: string, title: string, filter: FilterValuesType }
export type TasksType = { [key: string]: Array<TaskType> }

function App() {

    let todolistID1 = v1();
    let todolistID2 = v1();

    let [todolists, todolistsDespatch] = useReducer(todolistsReducer, [
        {id: todolistID1, title: 'What to learn', filter: 'all'},
        {id: todolistID2, title: 'What to buy', filter: 'all'},
    ])

    let [tasks, tasksDespatch] = useReducer(tasksReducer, {
        [todolistID1]: [
            {id: v1(), title: "HTML&CSS", isDone: true},
            {id: v1(), title: "JS", isDone: true},
            {id: v1(), title: "ReactJS", isDone: false},
            {id: v1(), title: "Rest API", isDone: false},
            {id: v1(), title: "GraphQL", isDone: false},
        ],
        [todolistID2]: [
            {id: v1(), title: "HTML&CSS2", isDone: true},
            {id: v1(), title: "JS2", isDone: true},
            {id: v1(), title: "ReactJS2", isDone: false},
            {id: v1(), title: "Rest API2", isDone: false},
            {id: v1(), title: "GraphQL2", isDone: false},
        ]
    });

    // for todolistReducer:

    const changeTodolistTitle = (todolistId: string, title: string) => {
        todolistsDespatch(changeTodolistTitleAC(todolistId, title))
    }

    const removeTodolist = (todolistId: string) => {
        todolistsDespatch(removeTodolistAC(todolistId))
        tasksDespatch(removeTodolistAC(todolistId))
    }

    function changeFilter(todolistId: string, value: FilterValuesType) {
        todolistsDespatch(changeFilterAC(todolistId, value))
    }

    const addTodolist = (newTitle: string) => {
        todolistsDespatch(addTodolistAC(newTitle))
        tasksDespatch(addTodolistAC(newTitle))
    }

// for tasksReducer:

    function removeTask(todolistId: string, taskId: string) {
        tasksDespatch(removeTaskAC(todolistId, taskId))
    }

    function addTask(todolistId: string, title: string) {
        tasksDespatch(addTaskAC(todolistId, title))
    }

    const editTask = (todolistId: string, taskId: string, newTitle: string) => {
        tasksDespatch(editTaskAC(todolistId, taskId, newTitle))
    }

    function changeStatus(todolistId: string, taskId: string, isDone: boolean) {
        tasksDespatch(changeStatusAC(todolistId, taskId, isDone));
    }


    return (
        <div className="App">
            <AppBar position="static">
                <Toolbar style={{justifyContent: 'space-between'}}>
                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        // sx={{ mr: 2 }}
                    >
                        <MenuIcon/>
                    </IconButton>
                    <Typography variant="h6"
                        // component="div"
                        // sx={{ flexGrow: 1 }}
                    >
                        Todolists
                    </Typography>
                    <Button color="inherit" variant={'outlined'}>Login</Button>
                </Toolbar>
            </AppBar>

            <Container fixed>
                <Grid container style={{padding: '20px 0'}}>


                    <AddItemForm callBack={addTodolist}/>
                </Grid>


                <Grid container spacing={4}>


                    {todolists.map(el => {
                        let tasksForTodolist = tasks[el.id];

                        if (el.filter === "active") {
                            tasksForTodolist = tasks[el.id].filter(t => t.isDone === false);
                        }
                        if (el.filter === "completed") {
                            tasksForTodolist = tasks[el.id].filter(t => t.isDone === true);
                        }
                        return (
                            <Grid item key={el.id}>
                                <Paper elevation={3} style={{padding: '20px'}}>
                                    <Todolist
                                        key={el.id}
                                        todolistId={el.id}
                                        title={el.title}
                                        filter={el.filter}
                                        tasks={tasksForTodolist}
                                        removeTask={removeTask}
                                        addTask={addTask}
                                        editTask={editTask}
                                        changeTaskStatus={changeStatus}
                                        changeFilter={changeFilter}
                                        removeTodolist={removeTodolist}
                                        changeTodolistTitle={changeTodolistTitle}
                                    />
                                </Paper>
                            </Grid>
                        )
                    })
                    }

                </Grid>
            </Container>
        </div>
    );
}

export default App;
