import React from 'react';
import {Todo} from './Todo'

export class TodoList extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        const todoList = this.props.todoList.map((todo, i) => {
            return (
                <Todo key={i} fileUrl = {todo.fileUrl} text={todo.description} status={todo.status} dueDate={todo.dueDate} responsible= {todo.responsible.name}/>
            );
        });

        return (
            todoList
        );


    }

}