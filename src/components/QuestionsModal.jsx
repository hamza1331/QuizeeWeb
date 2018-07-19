import React, { Component } from 'react'
import { connect } from "react-redux";
import Modal from 'react-responsive-modal'
import { hideQuestionsModalAction } from "../store/actions/actions";
class QuestionsModal extends Component {
    constructor(props){
        super(props)
        this.handleClose=this.handleClose.bind(this)
    }
    handleClose(){
        this.props.hideQuestionsModal()
    }
  render() {
    return (
      <Modal transparent={true} open={this.props.showQuestions} onClose={this.handleClose} little >
        <h1 style={{textAlign:'center',textDecoration:'underline'}}>QUESTIONS</h1>
        <br/>
        <br/>
        <ul className='list-group'>
        {this.props.showQuestions&&this.props.QuizQuestions.map((QuizQuestion,index)=>{
         return  <li key={index} className="list-group-item list-group-item-success" style={{minWidth:500,fontSize:16,fontWeight:'bolder',padding:5,margin:10,borderRadius:10}}>
                Question # {index+1} : 
                {QuizQuestion.text}
            </li>
        })}
        </ul>
      </Modal>
    )
  }
}

function mapStateToProps(state){
    return({
        showQuestions:state.rootReducer.showQuestions,
        QuizQuestions:state.rootReducer.QuizQuestions
    })
}

function mapActionsToProps(dispatch){
    return({
        // updateTime:(time)=>{
        //     dispatch(updateTime(time))
        // }
        hideQuestionsModal:()=>{
            dispatch(hideQuestionsModalAction())
        }
    })
}
export default connect(mapStateToProps,mapActionsToProps)(QuestionsModal)