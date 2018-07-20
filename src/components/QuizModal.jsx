import React, { Component } from 'react';
import firebase from 'firebase'
import { connect } from "react-redux";
import Modal from 'react-responsive-modal'
import { hideQuizModalAction,addQuizAction } from "../store/actions/actions";
class QuizModal extends Component {
    constructor(props){
        super(props)
        this.handleChange= this.handleChange.bind(this)
        this.handleModalCLose=this.handleModalCLose.bind(this)
        this.handleQuestions=this.handleQuestions.bind(this)
        this.submitQuiz=this.submitQuiz.bind(this)
        this.state={
            quizName:'',
            index:1,
            text:'',
            op1:'',
            op2:'',
            op3:'',
            op4:'',
            correctAnswer:'',
            questions:[]
        }
    }
    handleModalCLose(){
        this.props.hideQuizModal()
    }
    handleQuestions(e){
        if(this.state.index<10)
        e.preventDefault()
        let oldData = this.state.questions
        let question = {}
        question.options=[this.state.op1,this.state.op2,this.state.op3,this.state.op4]
        question.text=this.state.text
        question.correctAnswer=this.state.correctAnswer
        oldData.push(question)
        this.setState({
            questions:oldData,
            index:this.state.index+1,
            text:'',
            op1:'',
            op2:'',
            op3:'',
            op4:'',
            correctAnswer:''
        })
        console.log(this.state)
    }
    submitQuiz(e){
        e.preventDefault()
        this.handleQuestions()
        let firebaseRef = firebase.database().ref('quizzes')
        let data ={}
        data.name=this.state.quizName //Quiz name
        data.Questions = this.state.questions  //Quiz Questions
        console.log('before sending...',data)
        firebaseRef.push(data).then(()=>{
            console.log('done sending')
            this.setState({
            quizName:'',
            index:0,
            text:'',
            op1:'',
            op2:'',
            op3:'',
            op4:'',
            correctAnswer:'',
            questions:[]
            })
            this.props.addQuiz(data)
            this.props.hideQuizModal()
            // window.location.reload()
        }).catch((err)=>{
            console.log(err)
        })
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
    handleChange(e){
        this.setState({
            [e.target.name]:e.target.value
        })
    }
  render() {
    return (
        <Modal open={this.props.showQuizModal} onClose={this.handleModalCLose} little >
        <br/><br/>
            <h1 style={{textAlign:'center',textDecoration:'underline'}}>CREATE QUIZ</h1>
            <div className="form-horizontal">
                {this.state.index===1 && <div className="form-group">
                    <div className="col-sm-10">
                        <input 
                        type="text"
                        required
                        value={this.state.quizName} 
                        name="quizName"
                        onChange={this.handleChange} 
                        className='form-control' autoComplete='off' 
                        style={{width:600}}
                        placeholder='Enter Quiz Name'/>
                    </div>
                </div>}
            <div className="form-group">
                <div className="col-sm-10">
                    <input 
                    type="text" 
                    required
                    name="text"
                    value={this.state.text}
                    onChange={this.handleChange} 
                    className='form-control' autoComplete='off' 
                    style={{width:600}}
                    placeholder={`Enter Question # ${this.state.index} Text`}/>
                </div>
            </div>
            <br/>
            <div className="row">
                <div className="col-sm-6">
                        <div className="form-group">
                            <div className="col-sm-10">
                                <input 
                                required
                                type="text" 
                                name="op1"
                                value={this.state.op1}
                                onChange={this.handleChange} 
                                className='form-control' autoComplete='off' 
                                placeholder='Option 1'/>
                            </div>
                        </div>
                </div>
            <div className="col-sm-2"></div>
                <div className="col-sm-6">
                    <div className="form-group">
                        <div className="col-sm-10">
                            <input 
                            required
                            type="text" 
                            name="op2"
                            value={this.state.op2}
                            onChange={this.handleChange} 
                            className='form-control' 
                            autoComplete='off' 
                            placeholder='Option 2'/>
                        </div>
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col-sm-6">
                        <div className="form-group">
                            <div className="col-sm-10">
                                <input 
                                type="text"
                                required 
                                name="op3"
                                value={this.state.op3}
                                onChange={this.handleChange} 
                                className='form-control' autoComplete='off' 
                                placeholder='Option 3'/>
                            </div>
                        </div>
                </div>
            <div className="col-sm-2"></div>
                <div className="col-sm-6">
                    <div className="form-group">
                        <div className="col-sm-10">
                            <input 
                            type="text" 
                            required
                            name="op4"
                            value={this.state.op4}
                            onChange={this.handleChange} 
                            className='form-control' 
                            autoComplete='off' 
                            placeholder='Option 4'/>
                        </div>
                    </div>
                </div>
            </div>
            <div className="form-group">
                        <div className="col-sm-10">
                            <input 
                            type="text" 
                            required
                            name="correctAnswer"
                            value={this.state.correctAnswer}
                            onChange={this.handleChange} 
                            className='form-control' 
                            autoComplete='off' 
                            style={{width:600}}
                            placeholder='Correct Answer'/>
                        </div>
                    </div>
            </div>
            {this.state.index<10 &&            
            <button className='btn btn-primary pull-right' onClick={this.handleQuestions}>Next Question</button>}
            {this.state.index===10 &&
            <button onClick={this.submitQuiz} className='btn btn-info pull-right'>Submit Quiz</button>            
            }
        </Modal>
    )
  }
}
function mapStateToProps(state){
    return({
        showQuizModal:state.rootReducer.showQuiz
    })
}

function mapActionsToProps(dispatch){
    return({
        // updateTime:(time)=>{
        //     dispatch(updateTime(time))
        // }
        hideQuizModal:()=>{
            dispatch(hideQuizModalAction())
        },
        addQuiz:(Quiz)=>{
            dispatch(addQuizAction(Quiz))
        }
    })
}
export default connect(mapStateToProps,mapActionsToProps)(QuizModal)
/*
****************Remaining Tasks*****************
1. Setting Layout for Quizzes and Users
2. Retrieving Data
3. Mapping data accordingly...
4. Making Redux and Firebase persistence...
*/