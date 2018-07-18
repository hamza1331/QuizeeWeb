// export function changeState(name){
//     return dispatch =>{
//         dispatch({
//             type:'CHANGE_USERNAME',
//             payload:name
//         })
//     }
// }
import { login,logout,showQuizModal,hideQuizModal } from "./actionNames";
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