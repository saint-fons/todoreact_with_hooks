import React from "react";
import "./styles/styles.scss";
import {ThemeProvider} from 'styled-components';
import {lightTheme, darkTheme} from './theme';
import {GlobalStyles} from './global';
import {useState} from 'react';
import star from "./img/star-solid.svg"
import starLight from "./img/star-light.svg"
import desktopBgLight from "./img/bg-desktop-light.jpg"
import desktopBgDark from "./img/bg-desktop-dark.jpg"
import checkCircleDark from "./img/check-circle-dark.svg"
import checkCircleLight from "./img/check-circle-light.svg"
import DarkTrashItem from "./img/trash-alt-dark.svg"


function Todo({todo, index, completeTodo, removeTodo}) {
    return (
        <div
            className="todo"
            style={{textDecoration: todo.isCompleted ? "line-through" : ""}}
        >
            {todo.isCompleted ?
                <button onClick={() => completeTodo(index)}>
                    <img src={checkCircleDark}
                         alt={"Circle"}
                         className={"checkerCircle"}/>
                </button> :
                <button onClick={() => completeTodo(index)}>
                    <img src={checkCircleLight}
                         alt={"Circle"}
                         className={"checkerCircle"}/>
                </button>
            }

            {todo.text}
            <div>
                <button className={"Trash-Button-Item"} onClick={() => removeTodo(index)}>
                    <img src={DarkTrashItem}
                         alt={"trash"}
                         className={"Item-Delete-TrashIMG"}
                />
                </button>
            </div>
        </div>
    );
}

function TodoForm({addTodo}) {
    const [value, setValue] = React.useState("");
    const handleSubmit = (e) => {
        e.preventDefault();
        if (!value) return;
        addTodo(value);
        setValue("");
    };
    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                className="Input-Form-Item"
                value={value}
                onChange={(e) => setValue(e.target.value)}
            />
        </form>
    );
}

function App() {
    const [todos, setTodos] = React.useState([
        {
            text: "Learn about React",
            isCompleted: false
        },
        {
            text: "Meet friends for lunch",
            isCompleted: false
        },
        {
            text: "Build really cool todo app",
            isCompleted: false
        }
    ]);

    const addTodo = (text) => {
        const newTodos = [...todos, {text}];
        setTodos(newTodos);
    };

    const completeTodo = (index) => {
        const newTodos = [...todos];
        newTodos[index].isCompleted = true;
        setTodos(newTodos);
    };

    const removeTodo = (index) => {
        const newTodos = [...todos];
        newTodos.splice(index, 1);
        setTodos(newTodos);
    };

    const [theme, setTheme] = useState('light');
    const toggleTheme = () => {
        if (theme === 'light') {
            setTheme('dark');
        } else {
            setTheme('light');
        }
    }


    return (
        <ThemeProvider theme={theme === 'light' ? lightTheme : darkTheme}>
            <>
                <GlobalStyles/>
                <div className="todo-container">
                    <div className={"header"}>
                        {theme === 'light' ?
                            <img src={desktopBgLight}
                                 alt={"bg"}
                                 className={"desktopBgSwitcher"}/> :
                            <img src={desktopBgDark}
                                 alt={"bg"}
                                 className={"desktopBgSwitcher"}/>}
                    </div>
                    <div className={"bottom"}>
                        <div className="todo-list">
                            <div className={"Dark-Mode-Switcher"}>
                                TO DO
                                <button
                                    onClick={toggleTheme}>
                                    {theme === 'light' ?
                                        <img
                                        src={star}
                                        alt={"star"}
                                        className={"DarkModeStar"}/>
                                    :
                                        <img
                                            src={starLight}
                                            alt={"star"}
                                            className={"DarkModeStar"}/>
                                    }
                                </button>
                            </div>
                            <TodoForm addTodo={addTodo}/>
                            {todos.map((todo, index) => (
                                <Todo
                                    key={index}
                                    index={index}
                                    todo={todo}
                                    completeTodo={completeTodo}
                                    removeTodo={removeTodo}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </>
        </ThemeProvider>
    );
}

export default App;
