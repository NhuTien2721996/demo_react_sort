import React, {Component} from 'react';
import {connect} from "react-redux";
import * as actions from "./../actions/index";

class CustomerList extends Component {
    onDelete=(id)=>{
        let {customers}=this.props;
        let index=this.findIndex(id);
        this.props.onDeleteCustomer(customers[index]);
       this.props.closeForm();
    };
     findIndex = (id) => {
        let {customers}=this.props;
        let result = -1;
        customers.forEach((customer, index) => {
            if (customer.id === id) {
                result = index
            }
        });
        return result
    };
    onEditCustomer=(id)=>{
        this.props.showForm();
        let {customers}=this.props;
        let index=this.findIndex(id);
        this.props.onEditCustomer(customers[index]);
    };

    render() {
        let {customers,keyword,sort} = this.props;
        let customerFilter;
        if (keyword){
            customerFilter=customers.filter((customer)=>{
                return customer.name.toLowerCase().indexOf(keyword.toLowerCase()) !==-1
            })
        }else {
            customerFilter=customers;
        }
        customers.sort((a, b) => {
            if (a.name > b.name) return sort.value;
            else if (a.name < b.name) return -sort.value;
            else return 0
        });
        let elements = customerFilter.map((customer, index) => {
            let result;
            result = <tr key={index}>
                <th scope="row">{index + 1}</th>
                <td>{customer.name}</td>
                <td>{customer.gender === "manly" ? "nam" : "nữ"}</td>
                <td>{customer.age}</td>
                <td>{customer.address}</td>
                <td>{customer.room==="1" ? "Phòng kế toán":"Phòng kỹ thuật"}</td>
                <td>
                    <button className="btn btn-danger" onClick={()=>this.onDelete(customer.id)}>Xóa</button>
                </td>
                <td>
                    <button className="btn btn-warning" onClick={()=>this.onEditCustomer(customer.id)}>Cập nhật</button>
                </td>
            </tr>;
            return result;
        });
        return <div>
            <table className="table">
                <thead>
                <tr>
                    <th scope="col">STT</th>
                    <th scope="col">Tên</th>
                    <th scope="col">Giới tính</th>
                    <th scope="col">Tuổi</th>
                    <th scope="col">Địa chỉ</th>
                    <th scope="col">Phòng ban</th>
                    <th scope="col">Xóa</th>
                    <th scope="col">Cập nhật</th>
                </tr>
                </thead>
                <tbody>
                {elements}
                </tbody>
            </table>
        </div>
    }
}

const mapStateToProps= (state)=>{
        return {
            customers:state.customers,
            keyword:state.search,
            sort:state.sort
        }
};
const mapDispatchToProps=(dispatch,props)=>{
  return{
    onDeleteCustomer:(customer)=>{
        dispatch(actions.deleteCustomer(customer))
    },
      closeForm:()=>{
          dispatch(actions.closeForm())
      },
      showForm:()=>{
          dispatch(actions.openForm())
      },
      onEditCustomer:(customer)=>{
        dispatch(actions.editCustomer(customer))
      },
      onSearch:(keyword)=>{
          dispatch(actions.search(keyword));
      }
  }
};
export default connect(mapStateToProps,mapDispatchToProps)(CustomerList);
