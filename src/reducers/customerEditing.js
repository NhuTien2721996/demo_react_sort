import * as types from './../constants/ActionTypes'

let initialState = {
    id:"",
    name:"",
    gender:"manly",
    age:"",
    address:"",
    room:"1"
};
let myReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.EDIT_CUSTOMER:
            return action.customer;
        default:
            return state;
    }
};

export default myReducer;
