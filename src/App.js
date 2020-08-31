import React, {Component} from 'react';
import './App.css';
import Header from "./Components/Header";
import CustomerForm from "./Components/CustomerForm";
import CustomerList from "./Components/CustomerList";

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            customers: [],
            isDisplayForm: false,
            customerEditing: "",
            keyword: "",
            sortBy: "name",
            sortValue: 1
        }
    }

    s4() {
        return Math.floor((1 + Math.random()) * 0x1000).toString(16).substring(1);
    }

    generateID() {
        return this.s4() + this.s4() + '-' + this.s4() + this.s4() + '-' + this.s4() + this.s4();
    }

    componentDidMount() {
        if (localStorage && localStorage.getItem('customers')) {
            let customers = JSON.parse(localStorage.getItem('customers'));
            this.setState({
                customers
            })
        }
    }

    onHandleSubmit = (data) => {
        let {customers} = this.state;
        if (data.id === "") {
            data.id = this.generateID();
            customers.push(data);
        } else {
            let index = this.findIndex(data.id);
            customers[index] = data;
        }
        this.setState({
            customers
        });
        localStorage.setItem('customers', JSON.stringify(customers));
        this.closeForm();
    };
    onDelete = (id) => {
        let {customers} = this.state;
        customers.splice(id, 1);
        this.setState({
            customers
        });
        localStorage.setItem('customers', JSON.stringify(customers));
        this.closeForm();

    };
    onToggleForm = () => {
        if (this.state.isDisplayForm === true && this.state.customerEditing !== null) {
            this.setState({
                isDisplayForm: true,
                customerEditing: null
            })
        } else {
            this.setState({
                isDisplayForm: !this.state.isDisplayForm,
                customerEditing: null

            })
        }
    };
    showForm = () => {
        this.setState({
            isDisplayForm: true
        })
    };
    closeForm = () => {
        this.setState({
            isDisplayForm: false
        })
    };
    onUpdate = (id) => {
        this.showForm();
        let {customers} = this.state;
        let customerEditing = customers[id];
        this.setState({
            customerEditing
        });
    };
    findIndex = (id) => {
        let {customers} = this.state;
        let result = -1;
        customers.forEach((customer, index) => {
            if (customer.id === id) {
                result = index
            }
        });
        return result;
    };
    onChange = (event) => {
        let target = event.target;
        let name = target.name;
        let value = target.value;
        this.onSearch(
            name === "keyword" ? value : this.state.keyword
        );
        this.setState({
            [name]: value
        })
    };
    onSearch = (keyword) => {
        this.setState({
            keyword: keyword.toLowerCase()
        })
    };
    onClick = (sortBy, sortValue) => {
        this.onSort(sortBy, sortValue)
    };
    onSort = (sortBy, sortValue) => {
        this.setState({
            sortBy,
            sortValue
        })
    };

    render() {
        let {customers, isDisplayForm, customerEditing, keyword, sortValue} = this.state;
        let elementForm = isDisplayForm === true ? <CustomerForm
            onHandleSubmit={this.onHandleSubmit}
            customerEditing={customerEditing}
            closeForm={this.closeForm}
        /> : "";
        if (keyword) {
            customers = customers.filter((customer) => {
                return customer.name.toLowerCase().indexOf(keyword) !== -1
            })
        }
        customers.sort((a, b) => {
           if (a.name>b.name) return sortValue;
           else  if (a.name<b.name) return  -sortValue;
           else  return  0
        });
        return <div className="App">
            <Header/>
            <div className="container">
                <div className="row">
                    <div className="col col-4">
                        {elementForm}
                    </div>
                    <div className={isDisplayForm === true ? "col col-8" : "col col-12"}>
                        <div className="list-table">
                            <button className="btn btn-primary" onClick={this.onToggleForm}>Thêm nhân viên</button>
                            <br/>
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
                            <input type="text" className="form-control" name="keyword"
                                   placeholder="Nhập tên cần tìm kiếm" onChange={this.onChange}/>
                            <CustomerList
                                customers={customers}
                                onDelete={this.onDelete}
                                onUpdate={this.onUpdate}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    }
}

export default App;
