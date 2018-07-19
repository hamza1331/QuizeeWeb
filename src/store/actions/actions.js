import { 
    login,
    logout,
    showQuizModal,
    hideQuizModal,
    showQuestionsModal,
    hideQuestionsModal,
    addQuizInReducer,
    putQuizQuestions,
    addUserInStore,
    showUserDetails,
    hideUserDetails
} from "./actionNames";

export function hideUserDetailsAction(){
    return dispatch=>{
        dispatch({
            type:hideUserDetails
        })
    }
}

export function showUserDetailsAction(index){
    return dispatch=>{
        dispatch({
            type:showUserDetails,
            payload:index
        })
    }
}

export function addUserInStoreAction(User){
    return dispatch=>{
        dispatch({
            type:addUserInStore,
            payload:User
        })
    }
}
export function showQuestionsModalAction(){
    return dispatch=>{
        dispatch({
            type:showQuestionsModal
        })
    }
}
export function putQuizQuestionsAction(index){
    return dispatch=>{
        dispatch({
            type:putQuizQuestions,
            payload:index
        })
    }
}
export function addQuizAction(Quiz){
    return dispatch=>{
        dispatch({
            type:addQuizInReducer,
            payload:Quiz
        })
    }
}
export function hideQuestionsModalAction(){
    return dispatch=>{
        dispatch({
            type:hideQuestionsModal
        })
    }
}
export function LoginAction(){
    return dispatch=>{
        dispatch({
            type:login
        })
    }
}
export function Logout(){
    return dispatch=>{
        dispatch({
            type:logout
        })
    }
}
export function showQuizModalAction(){
    return dispatch=>{
        dispatch({
            type:showQuizModal
        })
    }
}
export function hideQuizModalAction(){
    return dispatch=>{
        dispatch({
            type:hideQuizModal
        })
    }
}