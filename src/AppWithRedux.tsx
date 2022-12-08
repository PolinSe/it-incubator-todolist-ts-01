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
import {AppRootStateType} from './state/store';
import {useDispatch, useSelector} from 'react-redux';

export type FilterValuesType = "all" | "active" | "completed";
export type TodolistsType = { id: string, title: string, filter: FilterValuesType }
export type TasksType = { [key: string]: Array<TaskType> }

function AppWithRedux() {

    const todolists = useSelector<AppRootStateType, Array<TodolistsType>>(state => state.todolists)
    const tasks = useSelector<AppRootStateType, TasksType>(state => state.tasks)
    const dispatch = useDispatch()

    // for todolists:

    const changeTodolistTitle = (todolistId: string, title: string) => {
        dispatch(changeTodolistTitleAC(todolistId, title))
    }

    const removeTodolist = (todolistId: string) => {
        dispatch(removeTodolistAC(todolistId))
    }

    function changeFilter(todolistId: string, value: FilterValuesType) {
        dispatch(changeFilterAC(todolistId, value))
    }

    const addTodolist = (newTitle: string) => {
        dispatch(addTodolistAC(newTitle))
    }

// for tasks:

    function removeTask(todolistId: string, taskId: string) {
        dispatch(removeTaskAC(todolistId, taskId))
    }

    function addTask(todolistId: string, title: string) {
        dispatch(addTaskAC(todolistId, title))
    }

    const editTask = (todolistId: string, taskId: string, newTitle: string) => {
        dispatch(editTaskAC(todolistId, taskId, newTitle))
    }

    function changeStatus(todolistId: string, taskId: string, isDone: boolean) {
        dispatch(changeStatusAC(todolistId, taskId, isDone));
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

export default AppWithRedux;
