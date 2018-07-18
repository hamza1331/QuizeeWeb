import React, { Component } from 'react';
import { connect } from "react-redux";
import './Admin.css'
import { Logout,showQuizModalAction } from "../store/actions/actions";
import firebase from 'firebase'
import Modal from 'react-responsive-modal'
import QuizModal from './QuizModal'
class Admin extends Component {
    constructor(props){
        super(props)
        this.state={
            openUserModal:false,
            email:'',
            pw:'',
            name:''
        }
    }
    componentWillMount(){
        if(!firebase.apps.length){
            var config = {
                apiKey: "AIzaSyDevJziMzAlMpErfarI9Q1DcBGU6JF-EF8",
                authDomain: "explorefirebase-80b58.firebaseapp.com",
                databaseURL: "https://explorefirebase-80b58.firebaseio.com",
                projectId: "explorefirebase-80b58",
                storageBucket: "explorefirebase-80b58.appspot.com",
                messagingSenderId: "994024778201"
            };
            firebase.initializeApp(config);
        }
    }
    handleSignup(e){
        e.preventDefault()
        firebase.auth().createUserWithEmailAndPassword(this.state.email,this.state.pw).then(()=>{
            console.log('User created Successfully...')
            let emailForReference = this.state.email.replace('.com','')
            let databaseUserRef = firebase.database().ref('quizAppUsers').child(emailForReference)
            let userData = {
                email:this.state.email,
                pw:this.state.pw,
                name:this.state.name
            }
            databaseUserRef.set(userData).then(()=>{
                this.setState({
                    openUserModal:false
                })
            }).catch(err=>{
                console.log(err)
            })
        }).catch(err=>{
            console.log(err)
        })
    }
    handleChange(e){
        this.setState({
            [e.target.name]:e.target.value
        })
    }
    enableQuizModal(e){
        e.preventDefault()
        this.props.showQuizModal()
    }
    enableUserModal(e){
        e.preventDefault()
        this.setState({
            openUserModal:true
        })
    }
    handleHomeLink(){
        this.props.history.push('/')
    }
    handleSignout(e){
        e.preventDefault()
        firebase.auth().signOut().then(()=>{
          this.props.Logout()
          this.props.history.push('/') 
        })

    }
    onCloseModal(){
        this.setState({
            openUserModal:false
        })
    }
    render() {
        if(!this.props.isLoggedIn)
        {
            return(
                <div>ADMIN must login...</div>
            )
        }
        else
        return (
            <div className='container'>
            <div>
            <nav className="navbar navbar-inverse">
            <div className="container-fluid">
              <div className="navbar-header">
                <a onClick={this.handleHomeLink.bind(this)} className="navbar-brand">Quizzee</a>
              </div>
              <ul className="nav navbar-nav navbar-right">
              <button onClick={this.handleSignout.bind(this)} className="btn btn-danger navbar-btn">LOG OUT</button>
              </ul>
            </div>
          </nav>
            </div>
          
          <div className="row">
          <div className="col-md-2"></div>
          <div className="col-md-3">
          <button
           onClick={this.enableQuizModal.bind(this)}
          className='btn btn-lg btn-info'>CREATE QUIZ</button>
          </div>
          <div className="col-md-1"></div>
          <div className="col-md-3">
          <button onClick={this.enableUserModal.bind(this)} className='btn btn-lg btn-primary'>CREATE USER</button>
          </div>
          <div className="col-md-2"></div>
          </div>
          <Modal open={this.state.openUserModal} onClose={this.onCloseModal.bind(this)} little><br /><br />
                    <div className="form-horizontal">
                        <div className="form-group">
                            <div className="col-sm-10">
                                <input 
                                autoComplete='off' 
                                style={{width:'600px'}} 
                                type="text" 
                                className="form-control" 
                                name="name" 
                                placeholder="Enter Name"
                                onChange={this.handleChange.bind(this)}
                                />
                            </div>
                        </div>
                        <div className="form-group">
                            <div className="col-sm-10">
                                <input 
                                autoComplete='off' 
                                style={{width:'600px'}} 
                                type="email" 
                                className="form-control" 
                                name="email" 
                                placeholder="Enter email"
                                onChange={this.handleChange.bind(this)}
                                />
                            </div>
                        </div>
                        <div className="form-group">
                            <div className="col-sm-10">
                                <input onChange={this.handleChange.bind(this)} style={{width:'600px'}} type="password" className="form-control" name='pw' placeholder="Enter password" />
                            </div>
                        </div>
                        <button onClick={this.handleSignup.bind(this)} className='btn btn-info pull-right btn-lg'>CREATE USER</button>
                    </div>
                </Modal>
                <QuizModal
                />
            </div>
        )
    }
}

function mapStateToProps(state){
    return({
        isLoggedIn:state.rootReducer.isLoggedIn
    })
}

function mapActionsToProps(dispatch){
    return({
        // updateTime:(time)=>{
        //     dispatch(updateTime(time))
        // }
        Logout:()=>{
            dispatch(Logout())
        },
        showQuizModal:()=>{
            dispatch(showQuizModalAction())
        }
    })
}


export default connect(mapStateToProps,mapActionsToProps)(Admin);
