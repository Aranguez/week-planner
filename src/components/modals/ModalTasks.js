import React, { Component, Fragment } from 'react';

import AddModal from './AddModal';
import EditModal from './EditModal';

import { firestore } from '../../firebase/config';

class ModalTasks extends Component {

    constructor(props){
        super(props);
        this.state = {
            loading: false,
            addModal: false,
            editModal: false,
            editTask: {
                task: ''
            },
            selectedDay: '',
            tasksOfDay: [],
            doneTasks: []
        }
    }
    
    componentWillReceiveProps({selectedDay, tasks}){
        this.setState({
            selectedDay,
            tasksOfDay: tasks.filter(task => task.day === selectedDay)
        })
    }

    deleteTask = id => {
        firestore.collection(`users/${this.props.userId}/tasks`)
            .where('id', '==', id)
            .get()
            .then( snapshot => {
                snapshot.forEach(doc => {
                    if (doc.data().done) {
                        doc.ref.delete()
                    }
                })
            })
            .then( () => this.props.realtimeUpdate(id))
            .catch(err => console.error(err))
    }

    checkTask = id => {
        firestore.collection(`users/${this.props.userId}/tasks`).where('id', '==', id)
            .get()
            .then( snapshot => {
                snapshot.forEach(doc => {
                    if (doc.data().done) {
                        doc.ref.update({
                            done: false
                        })

                    } else {
                        doc.ref.update({
                            done: true
                        })
                    }
                })
            })
            .then(this.props.realtimeUpdate(id))
            .catch(err => console.error(err))
    }

    showAddModal = (day) => {
        this.setState({
            addModal: !this.state.addModal,
            selectedDay: day
        })
    }

    showEditModal = task => {
        this.setState({
            editModal: !this.state.editModal,
            editTask: task,
        })
    }

    render(){

        //console.log('ModalTasks renders');
        return (
            <Fragment>
                <div className={`tasks-display animated show fadeIn`}>
                    <div className="header col col-12">
                        <h2 style={{'fontSize': '1.2em'}}>Tasks for <span className="color-red">{this.props.selectedDay}</span></h2>
                        <div className="add-btn" onClick={ () => this.showAddModal() }>
                            <button type="button">
                                    <i className="fas fa-plus-circle"></i>
                            </button>
                        </div>
                    </div>
                    <div className="body">
                    { this.state.tasksOfDay.length === 0 ?
                        (<div className="row">
                            <div className="col col-12">
                                <h3>It's empty!</h3>
                                <p>There is no tasks for this day</p>
                            </div>
                        </div>)
                        : (
                        <div className="row">
                            <div className="col col-12">
                            {this.state.tasksOfDay.map((task, i) => (
                                !task.done ? (
                                    <p key={i}>
                                        <span className="delete-btn">
                                            <i className="far fa-square"
                                               onClick={() => this.checkTask(task.id)}></i>
                                            <i className="far fa-edit"
                                               onClick={e => this.showEditModal(task)}></i>
                                        </span>
                                        <input type="text" className="task-name" id={task.id} value={task.task} readOnly/>
                                    </p>
                                ) : <p key={i}>
                                        <span className="delete-btn">
                                            <i className="far fa-check-square"
                                               onClick={() => this.checkTask(task.id)}></i>
                                            <i className="fa fa-trash"
                                               onClick={() => this.deleteTask(task.id)}></i>
                                        </span>
                                        <input type="text" className="task-name" id={task.id} value={task.task} readOnly/>
                                    </p>
                                ))
                            }
                            </div>
                        </div>
                    )}
                        
                    </div>
                </div>

                <AddModal isOpen={this.state.addModal}
                          userId={this.props.userId}
                          selectedDay={this.props.selectedDay}
                          showAddModal={this.showAddModal}
                          realtimeUpdate={this.props.realtimeUpdate}/>

                <EditModal isOpen={this.state.editModal}
                           userId={this.props.userId}
                           showEditModal={this.showEditModal}
                           taskToEdit={this.state.editTask}
                           realtimeUpdate={this.props.realtimeUpdate}/>

            </Fragment>
        );
    }
}

export default ModalTasks;