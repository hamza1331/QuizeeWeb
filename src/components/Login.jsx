import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from "react-redux";
import './Login.css'
import { LoginAction } from "../store/actions/actions";
import firebase from 'firebase'
class Login extends Component {
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
    constructor(props){
        super(props)
        this.state={
            email:'admin@quizee.com',
            pw:''
        }
    }
    handleChange(e){
        this.setState({
            [e.target.name]:e.target.value
        })
    }
    handleSubmit(e){
        e.preventDefault()
        if(this.state.email&&this.state.pw){
            firebase.auth().signInWithEmailAndPassword(this.state.email,this.state.pw).then(()=>{
                // console.log('signed in')
                this.props.login()
                this.props.history.push('/admin')
            }).catch(err=>{
                console.log(err)
            })
        }
        else
        alert('Email/PW missing')
    }
    
    
    render() {
        return (
            <div id="fullscreen_bg" className="fullscreen_bg">

            <div className="container">
    
                <form className="form-signin">
                    <h1 className="form-signin-heading text-muted">Sign In</h1>
                    <input name='email' value={this.state.email} onChange={this.handleChange.bind(this)} type="email" className="form-control" placeholder="Email address" autoComplete='off' autoFocus={true} />
                    <input name='pw' value={this.state.pw}  onChange={this.handleChange.bind(this)} type="password" className="form-control" placeholder="Password" autoComplete='off'  />
                    <button
                    onClick={this.handleSubmit.bind(this)}
                    className="btn btn-lg btn-primary btn-block" type="submit">
                        Sign In
                    </button>
                </form>
    
            </div>
        </div>
        )
    }
}

//is func mein obj ret krte hain us mein se apni required property k liye obj mein 
//propName:state.reducerKaName.requiredPropName

function mapStateToProps(state){
    return({
    })
}


//is func mein 1 obj ret krte hain jis mein pehle woh name rkhte hain jis se hum prop mein func
//ko call krna chahte hain dispatch k liye, usay 1 func per assign krte hain jis mein dispatch
//call hota hai us k param mein jo action bnaya hua hota hai woh call krte hain!!'
/* func k andar obj ret krne ka syntax: 
return({
    funcNameInProp:(paramIfAny)=>{
        dispatch(funcNameInAction(paramIfAny))
    }
})

*/

function mapActionsToProps(dispatch){
    return({
        // changeState:(name)=>{
        //     dispatch(changeState(name))
        // },
        // changeAge:(age)=>{
        //     dispatch(changeAge(age))
        // }
        login:()=>{
            dispatch(LoginAction())
        }
    })
}


export default connect(mapStateToProps,mapActionsToProps)(Login);

