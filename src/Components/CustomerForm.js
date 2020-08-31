import React, {Component} from 'react';


class CustomerForm extends Component {
    constructor(prop) {
        super(prop);
        this.state = {
            id: "",
            name: "",
            age: "",
            address: ""
        }
    }
    onHandleChange = (event) => {
        let target=event.target;
        let name=target.name;
        let value=target.value;
        this.setState({
            [name]:value
        })
    };
    onHandleSubmit=(event)=>{
        event.preventDefault();
        this.props.onHandleSubmit(this.state);
        this.onClear();
    };
    onClear=()=>{
        this.setState({
            id:"",
            name:"",
            age:"",
            address:""
        })
    };
    closeForm=()=>{
      this.props.closeForm();
    };
    componentWillReceiveProps(nextProps, nextContext) {
        if (nextProps && nextProps.customerEditing){
            this.setState({
                id:nextProps.customerEditing.id,
                name:nextProps.customerEditing.name,
                age:nextProps.customerEditing.age,
                address:nextProps.customerEditing.address,
            });
        }
        if (!nextProps.customerEditing){
            this.setState({
                id:"",
                name:"",
                age:"",
                address:"",
            })
        }
    }

    componentDidMount() {
        if (this.props.customerEditing){
            this.setState({
                id:this.props.customerEditing.id,
                name:this.props.customerEditing.name,
                age:this.props.customerEditing.age,
                address:this.props.customerEditing.address
            })
        }
    }

    render() {

        return <div>
            <form onSubmit={this.onHandleSubmit}>
                <div className="form-group">
                    <label>Tên nhân viên</label>
                    <input type="text" className="form-control" name="name" onChange={this.onHandleChange} value={this.state.name}/>
                </div>
                <div className="form-group">
                    <label>Tuổi</label>
                    <input type="text" className="form-control" name="age" onChange={this.onHandleChange} value={this.state.age}/>
                </div>
                <div className="form-group">
                    <label>Địa chỉ</label>
                    <input type="text" className="form-control" name="address" onChange={this.onHandleChange} value={this.state.address}/>
                </div>
                <button type="submit" className="btn btn-primary">Lưu</button>
                <button type="submit" className="btn btn-danger" onClick={this.closeForm}>Hủy</button>
            </form>
        </div>
    }
}

export default CustomerForm;
