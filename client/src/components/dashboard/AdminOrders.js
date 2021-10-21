import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import {
  getOrders,
  cancelOrder,
  approveOrder,
} from "../../actions/orderAction";

class AdminOrder extends Component {
  constructor() {
    super();
    this.state = { orders: [] };
  }

  async componentDidMount() {
    if (this.props.auth.user.type === "reseller") {
      return this.props.history.push("/dashboard");
    }
    const { data: orders } = await getOrders();
    this.setState({ orders });
  }

  handleDelete = async order => {
    const items = [...this.state.orders].filter(p => p !== order);
    this.setState({ orders: items });
    await cancelOrder(order);
  };

  handleApprove = async (order, quantity) => {
    const items = [...this.state.orders].filter(p => p !== order);
    this.setState({ orders: items });

    const orderData = {
      id: order._id,
      product: order.product,
      amount: order.amount,
    };

    await approveOrder(orderData);
  };

  render() {
    return (
      <div style={{ height: "80vh" }} className="container">
        <div>
          <Link to="/admin/dashboard" className="btn-flat waves-effect">
            <i className="material-icons left">keyboard_backspace</i> Back to
            dashboard
          </Link>
          <h3 style={{ paddingLeft: "1rem" }}>Orders </h3>
          <table className="highlight orderTable centered">
            <thead>
              <tr>
                <th>Reseller</th>
                <th>Product</th>
                <th>Brand</th>
                <th>Amount</th>
                <th>Date</th>
                <th></th>
              </tr>
            </thead>

            <tbody className="orderTable centered">
              {this.state.orders.map(order => {
                return (
                  <tr key={order._id}>
                    <td>{order.reseller}</td>
                    <td>{order.productdetail[0].name}</td>
                    <td>{order.productdetail[0].brand}</td>
                    <td>{order.amount}</td>
                    <td>{order.date.split("T")[0]}</td>
                    <td>
                      <button
                        className="btn-small"
                        onClick={() => {
                          this.handleApprove(
                            order,
                            order.productdetail[0].quantity
                          );
                        }}
                      >
                        Approve
                      </button>
                      <button
                        className="btn-small red accent-3"
                        onClick={() => {
                          this.handleDelete(order);
                        }}
                      >
                        Cancel
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}
AdminOrder.propTypes = {
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  auth: state.auth,
});
export default connect(mapStateToProps)(AdminOrder);
