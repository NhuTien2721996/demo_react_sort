import * as types from './../constants/ActionTypes'

let s4 = () => {
    return Math.floor((1 + Math.random()) * 0x1000).toString(16).substring(1);
};

let generateID = () => {
    return s4() + s4() + '-' + s4() + s4() + '-' + s4() + s4();
};
let findIndex = (data, id) => {
    let customers = data;
    let result = -1;
    customers.forEach((customer, index) => {
        if (customer.id === id) {
            result = index
        }
    });
    return result
};
let data = JSON.parse(localStorage.getItem('customers'));
let initialState = data ? data : [];

let myReducer = (state = initialState, action) => {
    let index = -1;
    switch (action.type) {
        case types.LIST_ALL:
            return state;
        case types.SAVE_CUSTOMER:
            let customer = {
                id: action.customer.id,
                name: action.customer.name,
                gender: action.customer.gender,
                age: action.customer.age,
                address: action.customer.address,
                room: action.customer.room,
            };
            if (!customer.id) {
                customer.id = generateID();
                state.push(customer);
            } else {
                index = findIndex(state, customer.id);
                state[index] = customer;
            }
            localStorage.setItem('customers', JSON.stringify(state));
            return [...state];
        case types.DELETE_CUSTOMER:
            index = findIndex(state,action.customer.id);
            state.splice(index, 1);
            console.log(index);
            localStorage.setItem('customers', JSON.stringify(state));
            return [...state];
        default:
            return state
    }
};

export default myReducer;
