import React, {Component} from 'react';
import './App.css';
import Header from "./Components/Header";
import CustomerList from "./Components/CustomerList";
import CustomerForm from "./Components/CustomerForm";
import {connect} from "react-redux";
import * as actions from "./actions/index";


class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            sortBy: "",
            sortValue: ""
        }
    }
    showForm = () => {
       this.props.showForm();
    };

    onToggleForm = () => {
        let {customerEditing}=this.props;
        if (customerEditing && customerEditing.id !==''){
            this.props.showForm();
            this.props.onClearCustomer({
                id:"",
                name:"",
                gender:"manly",
                age:"",
                address:"",
                room:"1"
            });
        }else {
            this.props.onToggleForm();
        }
        this.props.onClearCustomer({
            id:"",
            name:"",
            gender:"manly",
            age:"",
            address:"",
            room:"1"
        });

    };
    onChange = (event) => {
        let target = event.target;
        let name = target.name;
        let value = target.value;
        this.props.onSearch(value);
        this.setState({
            [name]: value
        });
    };

    onClick = (sortBy, sortValue) => {
        this.props.onSort({
            by:sortBy,
            value:sortValue
        })
    };
    render() {

        let {isDisplayForm} = this.props;
        return <div className="App">
            <Header/>
            <div className="container">
                <div className="row">
                    <div className="col col-4">
                        <CustomerForm
                        />
                    </div>
                    <div className={isDisplayForm === true ? "col col-8" : "col col-12"}>
                        <div className="list-table">
                            <button className="btn btn-primary" onClick={this.onToggleForm}>Thêm nhân viên</button>
                            <div className="dropdown">
                                <button className="btn btn-secondary dropdown-toggle" type="button"
                                        id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true"
                                        aria-expanded="false">
                                    Sắp xếp
                                </button>
                                <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                    <a className="dropdown-item" href="#" onClick={() => this.onClick('name', 1)}>Từ
                                        A-Z</a>
                                    <a className="dropdown-item" href="#" onClick={() => this.onClick('name', -1)}>Từ
                                        Z-A</a>
                                </div>
                            </div>
                            <input className="form-control" name="keyword" placeholder="Nhập tên cần tìm kiếm"
                                   onChange={this.onChange}/>
                            <CustomerList />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    }
}

const mapStateToProps = state => {
    return {
        isDisplayForm: state.isDisplayForm,
        customerEditing:state.customerEditing
    }
};
const mapDispatchToProps = (dispatch, props) => {
    return {
        onToggleForm: () => {
            dispatch(actions.toggleForm())
        },

        showForm:()=>{
            dispatch(actions.openForm())
        },
        onClearCustomer:(customer)=>{
            dispatch(actions.editCustomer(customer))
        },
        onSearch:(keyword)=>{
            dispatch(actions.search(keyword));
        },
        onSort:(sort)=>{
            dispatch(actions.sortCustomer(sort));
        }

    }
};
export default (connect(mapStateToProps, mapDispatchToProps))(App);

