const initialState={
    timeNow:''
}

export default (state=initialState,action)=>{
    switch(action.type){
        case 'TIME_UPDATE':
        return Object.assign({},state,{
            timeNow:action.payload
        })
        default:
        return state
    }
}