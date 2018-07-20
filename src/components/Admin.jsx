import React, { Component } from 'react';
import { connect } from "react-redux";
import './Admin.css'
import { Logout,showQuizModalAction,showQuestionsModalAction,addQuizAction,putQuizQuestionsAction,addUserInStoreAction,showUserDetailsAction } from "../store/actions/actions";
import firebase from 'firebase'
import Modal from 'react-responsive-modal'
import QuestionsModal from './QuestionsModal'
import QuizModal from './QuizModal'
import UserDetailModal from './UserDetailModal'
class Admin extends Component {
    constructor(props){
        super(props)
        this.state={
            openUserModal:false,
            email:'',
            pw:'',
            name:'',
            showQuestionsList:false,
            showUsersList:false
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
        let firebaseRef = firebase.database().ref('quizzes')
        firebaseRef.once('value',(snap)=>{
            snap.forEach((Key)=>{
              let dataRef = firebaseRef.child(Key.ref.key).key
            //   console.log(dataRef)
            let databaseRef = firebase.database().ref('quizzes').child(dataRef)
            databaseRef.once('value',(snap)=>{
                let quiz = snap.val()
                this.props.addQuiz(quiz)
                console.log(this.props.Quizzes)
                if(this.state.showQuestionsList===false)
                this.setState({
                    showQuestionsList:true
                })
            })

            })
        })
        let firebaseUsersRef = firebase.database().ref('quizAppUsers')
        firebaseUsersRef.once('value',(snap)=>{
                snap.forEach((Key)=>{
                  let dataRef = firebaseRef.child(Key.ref.key).key
                  let data = snap.child(dataRef).val()
                //   console.log(data) //Data is an object {email:'abc@xyz.com',pw:'12345',name:'abc'}
                this.props.addUserInStore(data)
                if(this.state.showUsersList===false)
                this.setState({
                    showUsersList:true
                })
                })
            })
    }
    enableUserDetailModal(e,index){
        this.props.showUserDetails(index)
    }
    handleModalQuestions(e,index){
        e.preventDefault()
        // console.log(index)
        this.props.putQuizQuestions(index)
        this.props.showQuestionsModal()
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
                this.props.addUserInStore(userData)
                // window.location='localhost:/admin'
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
        <div className='container'>
          
          <div className="row">
          <div className="col-md-2"></div>
          <div className="col-md-3">
          <button
           onClick={this.enableQuizModal.bind(this)}
           className='btn btn-lg btn-info'>CREATE QUIZ</button>
          </div>
          <div className="col-md-1"></div>
          <div className="col-md-3">

          </div>
          <div className="col-md-2"><button onClick={this.enableUserModal.bind(this)} className='btn btn-lg btn-primary'>CREATE USER</button></div>
          </div>
          <br/>
          <br/>
          <div className="row">
          <div className="col-md-6" style={{backgroundColor:'rgba(209, 202, 202, 0.35)',borderRadius:20}}>
          <h2 style={{textAlign:'center',textDecoration:'underline'}}>QUIZZES</h2>
          <br/>
          <br/>
          {this.state.showQuestionsList&& <ul className='list-group'>
            {this.props.Quizzes.map((Quiz,index)=>{
                return <li key={index} className='list-group-item list-group-item-success' style={{padding:10,margin:5,borderRadius:10,fontSize:16,fontWeight:'bolder'}}>{Quiz.name}
                <span key={index} onClick={e=>this.handleModalQuestions(e,index)} className='badge btn'>SHOW</span>
                </li>
            })}
          </ul>}
          </div>
          <div className="col-md-3"></div>
          <div className="col-md-3" style={{backgroundColor:'rgba(119, 105, 197, 0.15)',borderRadius:20}}>
          <h2 style={{textAlign:'center',textDecoration:'underline'}}>USERS</h2>
          <br/>
          <br/>
          {this.state.showUsersList && 
          <ul className='list-group'>
            {this.props.Users.map((User,index)=>{
                 return <li key={index} className='list-group-item list-group-item-info' style={{padding:10,borderRadius:10,margin:5,fontSize:16,fontWeight:'bolder'}}>{User.email}
                 <span onClick={e=>this.enableUserDetailModal(e,index)} key={index} className='badge btn'>SHOW</span>
                 </li>
            })}
          </ul>
          
          }
          </div>
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
                <QuestionsModal/>
                <UserDetailModal/>
                </div>
            </div>
        )
    }
}

function mapStateToProps(state){
    return({
        isLoggedIn:state.rootReducer.isLoggedIn,
        Quizzes:state.rootReducer.Quizzes,
        Users:state.rootReducer.Users
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
        },
        showQuestionsModal:()=>{
            dispatch(showQuestionsModalAction())
        },
        addQuiz:(Quiz)=>{
            dispatch(addQuizAction(Quiz))
        },
        putQuizQuestions:(index)=>{
            dispatch(putQuizQuestionsAction(index))
        },
        addUserInStore:(User)=>{
            dispatch(addUserInStoreAction(User))
        },
        showUserDetails:(index)=>{
            dispatch(showUserDetailsAction(index))
        }
    })
}


export default connect(mapStateToProps,mapActionsToProps)(Admin);
