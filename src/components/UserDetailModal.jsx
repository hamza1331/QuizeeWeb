import React, { Component } from 'react';
import { connect } from "react-redux";
import Modal from 'react-responsive-modal'
import { hideUserDetailsAction } from "../store/actions/actions";
class UserDetailModal extends Component {
    handleClose(){
        this.props.hideUserDetails()
    }
  render() {
    return (
      <Modal open={this.props.showUserDetailsModal} onClose={this.handleClose.bind(this)} little>
      <br/><br/><br/>
      <h2 style={{textAlign:'center',textDecoration:'underline'}}>USER DETAILS</h2>
        <ul style={{margin:10,borderRadius:10}} className='list-group list-group-flush'>
            <li style={{fontWeight:'bolder',margin:5,padding:5,borderRadius:10}} className='list-group-item list-group-item-info'>
            <h3>Name: {this.props.userName}</h3>
            </li>
            <li style={{fontWeight:'bolder',margin:5,padding:5,borderRadius:10}} className='list-group-item list-group-item-info'>
            <h3>Email: {this.props.userEmail}</h3>
            </li>
            <li style={{fontWeight:'bolder',margin:5,padding:5,borderRadius:10}} className='list-group-item list-group-item-info'>
            <h3>Password: {this.props.userPw}</h3>
            </li>
        </ul>
      </Modal>
    )
  }
}

function mapStateToProps(state){
    return({
        userEmail:state.rootReducer.userEmail,
        userName:state.rootReducer.userName,
        userPw:state.rootReducer.userPw,
        showUserDetailsModal:state.rootReducer.showUserDetailsModal
    })
}

function mapActionsToProps(dispatch){
    return({
        // updateTime:(time)=>{
        //     dispatch(updateTime(time))
        // }
        hideUserDetails:()=>{
            dispatch(hideUserDetailsAction())
        }
    })
}
export default connect(mapStateToProps,mapActionsToProps)(UserDetailModal)