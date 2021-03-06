import React, { Component, Fragment } from 'react';

import { connect } from 'react-redux';
import { getUser } from '../redux/actions/userAction';
import { getTasks } from '../redux/actions/taskAction';
import { trueFalse } from '../redux/actions/appAction';

//components
import Timeline from './Timeline';
import Clock from './Clock';
import LoginModal from './modals/LoginModal';
import Greeting from './Greeting';
import Config from './Config';

//firebase
import firebase from 'firebase/app';
import Nav from './Nav';
import SlideMenu from './SlideMenu';
import TotalTasks from './TotalTasks';

class WeekPlanner extends Component {

    componentDidMount(){

        firebase.auth().onAuthStateChanged( user => {
            if (user){
                this.props.getUser(user.uid, user.displayName)
                this.props.getTasks(user.uid)
            } else {
                this.props.trueFalse('loginModal')
            }
        });

    }

    render() {
        console.log(this.props.state)
        return (
            <Fragment>
                <SlideMenu/>
                <LoginModal/>
                <Config/>

                <div className="container">
                    <Nav/>
                </div>
                
                { this.props.user.logged && !this.props.loading &&
                    <Fragment>
                        <div className="container">
                            <Greeting/>
                            <div className="row animated slideInUp">
                                <TotalTasks/>
                                <Clock/>
                            </div>
                        </div>
                        <Timeline/>
                    </Fragment>

                    // {<div className="loading animated fadeIn">
                    //     Please Login
                    //     <i className="fas fa-spinner fa-spin"></i>
                    // </div> }
                }
            </Fragment>
        )
    }
}

const mapStateToProps = state => {
    return {
        app: state.app,
        loading: state.app.loading,
        tasks: state.tasks.tasksList,
        user: state.user,
        state: state
    }
}


export default connect(mapStateToProps, { getUser, getTasks, trueFalse })(WeekPlanner);
