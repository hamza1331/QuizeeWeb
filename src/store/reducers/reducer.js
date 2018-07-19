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

} from "../actions/actionNames";
const initialState = {
    isLoggedIn:false,
    showQuiz:false,
    showQuestions:false,
    Quizzes:[],
    QuizQuestions:[],
    Users:[],
    userEmail:'',
    userName:'',
    userPw:'',
    showUserDetailsModal:false
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
        case showQuestionsModal:
        return Object.assign({},state,{
            showQuestions:true
        })
        case hideQuestionsModal:
        return Object.assign({},state,{
            showQuestions:false
        })
        case addQuizInReducer:
        return Object.assign({},state,{
            Quizzes:[...state.Quizzes,action.payload]
        })
        case putQuizQuestions:
        return Object.assign({},state,{
            QuizQuestions:state.Quizzes[action.payload].Questions
        })
        case addUserInStore:
        return Object.assign({},state,{
            Users:[...state.Users,action.payload]
        })
        case showUserDetails:
        return Object.assign({},state,{
            userEmail:state.Users[action.payload].email,
            userName:state.Users[action.payload].name,
            userPw:state.Users[action.payload].pw,
            showUserDetailsModal:true
        })
        case hideUserDetails:
        return Object.assign({},state,{
            showUserDetailsModal:false
        })
        default:
        return state
    }
}