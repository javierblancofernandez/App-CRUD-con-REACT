import React from 'react';
import './Todos.scss'
import Todo from './Todo'

class Todos extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            //recuperar datos del localStorage y parseamos a JSON
            todos: JSON.parse(localStorage.getItem('todos-state')) || [],
            newTaskTest: '',
            showNoCompleted: false
        };
        this.inputNewTask=React.createRef();
    
    }
    

    componentDidUpdate() {
        //guardar datos en el localStorage del navegador y pasamos el objetoJSON a String 
        localStorage.setItem('todos-state', JSON.stringify(this.state.todos));
    }
    addTarea = text => {
        console.log(text);
        if (text) {
            const newTask = {
                id: Date.now(),
                text,
                completed: false,
                createdAt: new Date(),
                
            };

            this.setState({
                todos: [newTask, ...this.state.todos],
                newTaskTest: ''
            },
            ()=>{
                this.inputNewTask.current.focus();
            });

        }
        console.log(this.state.todos)
    }

    handleNewTask = ev => {

        if (ev.keyCode === 13) {
            this.addTarea(this.state.newTaskTest.trim())
        }

    }
    deleteTarea = id => {
        this.setState({ todos: this.state.todos.filter(todo => todo.id !== id) })
    }
    editTask = newTodo => {
        newTodo.updatedAt = new Date();
        let newTodos = this.state.todos.map(todo => (todo.id === newTodo.id ? newTodo : todo))
        this.setState({ todos: newTodos });
    };
    toggleShowNoCompleted = () => this.setState({ showNoCompleted: !this.state.showNoCompleted });




    render() {
        console.log(this.inputNewTask)
        return (

            <div className="todos">
                <div className="addTarea">
                    <input ref ={this.inputNewTask} type="text" placeholder="el texto" />
                    <input type="text" placeholder="el texto" onKeyUp={this.handleNewTask} value={this.state.newTaskTest} onChange={ev => this.setState({ newTaskTest: ev.target.value })} />
                    <button type="button" onClick={()=>{
                        this.addTarea(this.state.newTaskTest.trim());
                        
                    }}>Crea Tarea</button>
                    <button onClick={this.toggleShowNoCompleted}>Ocultar tareas</button>
                </div>

                <div className="listaTareas">
                    {this.state.todos.filter(todo => !this.state.showNoCompleted || !todo.completed).map(todo => (
                        //    <Todo data={todo} key={todo.id} onRemove={this.deleteTarea}/>
                        <Todo data={todo} key={todo.id} onRemove={this.deleteTarea} onEdit={this.editTask} />
                    ))}

                </div>
            </div>

        )
    }
}




export default Todos;