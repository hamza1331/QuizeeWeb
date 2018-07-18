import { login,logout,showQuizModal,hideQuizModal } from "../actions/actionNames";
const initialState = {
    isLoggedIn:true,
    showQuiz:false
}

export default (state = initialState,action)=>{
    switch(action.type){
        case login:
        return Object.assign({},state,{
            isLoggedIn:true
        })
        case logout:
        return Object.assign({},state,{
            isLoggedIn:false
        })
        case showQuizModal:
        console.log('inside showModal')
        return Object.assign({},state,{
            showQuiz:true
        })
        case hideQuizModal:
        console.log('inside hideModal')
        return Object.assign({},state,{
            showQuiz:false
        })
        default:
        return state
    }
}