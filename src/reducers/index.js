import {combineReducers} from "redux";
import customers from "./customers";
import isDisplayForm from "./isDisplayForm";
import customerEditing from "./customerEditing";
import search from "./search";
import sort from "./sort";
const myReducer = combineReducers({
    customers,
    isDisplayForm,
    customerEditing,
    search,
    sort
});

export default myReducer;
