import React from 'react';
import './Todo.scss';

class Todo extends React.Component {
    state = {
        text: this.props.data.text,
        editing: false
    }

    delete = () => {
        console.log("hola soy data", this.props.data);
        this.props.onRemove(this.props.data.id);
    }
    complete = () => {
        console.log("hola soy data", this.props.data);
        let newTask = { ...this.props.data, completed: !this.props.data.completed };
        console.log(newTask)
        this.props.onEdit(newTask);
    }
    edit = () => {
        if (this.state.editing) {
            this.setState({ text: this.props.data.text, editing: false });
        } else {
            this.setState({ editing: true })
        }
    }
    update = (ev) => {
        if (ev.keyCode === 13) {
            this.setState({ editing: false });
            let newTask = { ...this.props.data, text: this.state.text}
            this.props.onEdit(newTask);
        }
    }



    render() {
        // let style={textDecoration :this.props.data.completed ? 'line-through':''}
        let completedTask = this.props.data.completed ? ' completed ' : '';
        console.log(this.state)
        return (

            <div className="task">
                {/* <div className="todo" style={style}> */}
                <div className={'todo' + completedTask}>
                    {/* <span className="text">{JSON.stringify(this.props)}</span> */}
                    {/* <h3 className="text" >{this.props.data.text}</h3> */}
                    <input onKeyUp={this.update} disabled={!this.state.editing} onChange={ev => this.setState({ text: ev.target.value })} value={this.state.text} />

                    <div className="actions">
                        <span onClick={() => this.props.onRemove(this.props.data.id)}>'🗑️'</span>
                        <span onClick={this.delete} role="img" aria-label="delete">'🗑️'</span>
                        <span onClick={this.complete} role="img" aria-label="completed">{this.props.data.completed ? '✔️' : '✅'}</span>
                        <span onClick={this.edit} role="img" aria-label="edit">{this.state.editing ? '✗' : '🔨'} </span>
                    </div>
                </div>
                {/* </div> */}
            </div>
        )




    }
}




export default Todo;