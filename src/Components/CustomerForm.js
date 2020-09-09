import React, {Component} from 'react';
import {connect} from "react-redux";
import * as actions from './../actions/index'

class CustomerForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: "",
            name: "",
            gender: "manly",
            age: "",
            address: "",
            room: "1"
        }
    }

    onHandleChange = (event) => {
        let target = event.target;
        let name = target.name;
        let value = target.value;
        this.setState({
            [name]: value
        })
    };
    onHandleSubmit = (event) => {
        event.preventDefault();
        this.props.onSaveCustomer(this.state);
        this.clearForm();
        this.closeForm()
    };
    clearForm = () => {
        this.setState({
            id: "",
            name: "",
            gender: "manly",
            age: "",
            address: "",
            room: "1"
        })
    };
    closeForm = () => {
        this.props.closeForm();
    };

    componentDidMount() {
        if (this.props.customerEditing && this.props.customerEditing.id !== null) {
            this.setState({
                id: this.props.customerEditing.id,
                name: this.props.customerEditing.name,
                gender: this.props.customerEditing.gender,
                age: this.props.customerEditing.age,
                address: this.props.customerEditing.address,
                room: this.props.customerEditing.room,
            })
        } else {
            this.closeForm();
        }
    }

    componentWillReceiveProps(nextProps, nextContext) {
        if (nextProps && nextProps.customerEditing) {
            this.setState({
                id: nextProps.customerEditing.id,
                name: nextProps.customerEditing.name,
                gender: nextProps.customerEditing.gender,
                age: nextProps.customerEditing.age,
                address: nextProps.customerEditing.address,
                room: nextProps.customerEditing.room,
            })
        }
        if (!nextProps.customerEditing) {
            this.closeForm();
        }
    }

    render() {
        if (!this.props.isDisplayForm) return null;
        return <div>
            <form onSubmit={this.onHandleSubmit}>
                <div className="form-group">
                    <label>Tên nhân viên</label>
                    <input type="text" className="form-control" name="name" onChange={this.onHandleChange}
                           value={this.state.name}/>
                </div>
                <div className="form-group">
                    <label><input type="radio" name="gender" value="manly"
                                  onChange={this.onHandleChange}
                                  checked={this.state.gender === "manly"}
                    /> nam</label>
                    <label><input type="radio" name="gender" value="women"
                                  onChange={this.onHandleChange}
                                  checked={this.state.gender === "women"}
                    /> nữ</label>
                </div>
                <div className="form-group">
                    <label>Tuổi</label>
                    <input type="text" className="form-control" name="age" onChange={this.onHandleChange}
                           value={this.state.age}/>
                </div>
                <div className="form-group">
                    <label>Địa chỉ</label>
                    <input type="text" className="form-control" name="address" onChange={this.onHandleChange}
                           value={this.state.address}/>
                </div>
                <div className="form-group">
                    <label>Phòng ban</label>
                    <select className="form-control" name="room" onChange={this.onHandleChange} value={this.state.room}>
                        <option value="1">Phòng kế toán</option>
                        <option value="2">Phòng kỹ thuật</option>
                    </select>
                </div>
                <button type="submit" className="btn btn-primary">Lưu</button>
                <button type="button" className="btn btn-danger" onClick={this.closeForm}>Hủy</button>
            </form>
        </div>
    }
}

const mapStateToProps = (state) => {
    return {
        isDisplayForm: state.isDisplayForm,
        customerEditing: state.customerEditing,
    }
};

const mapDispatchToProps = (dispatch, props) => {
    return {
        onSaveCustomer: (customer) => {
            dispatch(actions.saveCustomer(customer));
        },
        closeForm: () => {
            dispatch(actions.closeForm())
        },
    }
};
export default connect(mapStateToProps, mapDispatchToProps)(CustomerForm);
