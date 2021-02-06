import React from "react";
import "./styles.css";
import {ThemeProvider} from 'styled-components';
import {lightTheme, darkTheme} from './theme';
import {GlobalStyles} from './global';
import { useState } from 'react';


function Todo({todo, index, completeTodo, removeTodo}) {
    return (
        <div
            className="todo"
            style={{textDecoration: todo.isCompleted ? "line-through" : ""}}
        >
            {todo.text}
            <div>
                <button onClick={() => completeTodo(index)}>Complete</button>
                <button onClick={() => removeTodo(index)}>x</button>
            </div>
            ;
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
                className="input"
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
        {text: "Meet friends for lunch", isCompleted: false},
        {text: "Build really cool todo app", isCompleted: false}
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
                        <div className="todo-list">
                            <div className={"todo-container"}>

                            </div>
                            <button onClick={toggleTheme}>⭐</button>
                            {todos.map((todo, index) => (
                                <Todo
                                    key={index}
                                    index={index}
                                    todo={todo}
                                    completeTodo={completeTodo}
                                    removeTodo={removeTodo}
                                />
                            ))}
                            <TodoForm addTodo={addTodo}/>
                        </div>
                    </div>

                    <div className={"footer"}>

                    </div>
                </div>
            </>
        </ThemeProvider>
    );
}

export default App;
