import React, {Component} from 'react';

class CustomerList extends Component {
    onDelete=(index)=>{
      this.props.onDelete(index)
    };
    onUpdate=(index)=>{
        this.props.onUpdate(index)

    };
    render() {
        let {customers} = this.props;
        let elements = customers.map((customer, index) => {
            let result;
            result = <tr key={index}>
                <th scope="row">{index + 1}</th>
                <td>{customer.name}</td>
                <td>{customer.gender==="manly"? "nam":"nữ"}</td>
                <td>{customer.age}</td>
                <td>{customer.address}</td>
                <td>{customer.room==="1"?"Phòng kế toán":"Phòng kỹ thuật"}</td>
                <td>
                    <button className="btn btn-danger" onClick={()=>this.onDelete(index)}>Xóa</button>
                </td>
                <td>
                    <button className="btn btn-warning" onClick={()=>this.onUpdate(index)}>Cập nhật</button>
                </td>
            </tr>;
            return result;
        });
        return <div>
            <table className="table">
                <thead>
                <tr>
                    <th scope="col">STT</th>
                    <th scope="col">Tên nhân viên</th>
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

export default CustomerList;
