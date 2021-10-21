import React, { Component } from "react";
import M from "materialize-css";
import "materialize-css/dist/css/materialize.min.css";

class OrderModal extends Component {
  constructor(props) {
    super();
    this.state = {
      amount: 0,
    };
  }

  componentDidMount() {
    M.Modal.init(this.Modal);
    M.updateTextFields();
  }
  onChange = e => {
    this.setState({
      [e.target.id.replace(this.props.data.name, "")]: e.target.value.replace(
        /[^0-9]/g,
        ""
      ),
    });
  };

  onSubmit = e => {
    e.preventDefault();
    if (
      parseInt(this.state.amount) > this.props.data.quantity ||
      parseInt(this.state.amount) === 0
    ) {
      window.alert("Please check the stock.");
    } else {
      this.props.orderHandler(this.props.data, parseInt(this.state.amount));
    }
  };

  render() {
    const { name, brand, quantity } = this.props.data;

    return (
      <>
        <button
          className="btn-small modal-trigger blue accent-3"
          data-target={this.props.data._id}
        >
          <i className="material-icons">add_shopping_cart</i>
        </button>

        <div
          ref={Modal => {
            this.Modal = Modal;
          }}
          id={this.props.data._id}
          className="modal"
        >
          <div className="modal-content">
            <h4>
              Place order for <b>{name}</b>
            </h4>
            <br />
            <br />

            {/** Row 1 */}
            <div className="row">
              <div className="input-field col s6">
                <i className="material-icons  prefix">local_offer</i>
                <input
                  disabled
                  onChange={this.onChange}
                  value={brand}
                  type="text"
                />
                <label htmlFor="category">Brand</label>
              </div>
              <div className="input-field col s6">
                <i className="material-icons prefix">dialpad</i>
                <input
                  onChange={this.onChange}
                  value={this.state.amount}
                  type="text"
                  id={name + "amount"}
                />
                <label htmlFor="brand">{`Amount (Current quantity: ${quantity})`}</label>
              </div>
            </div>
          </div>
          <div className="modal-footer">
            <button className="modal-close waves-effect waves-red btn-flat">
              Cancel
            </button>
            <button
              onClick={this.onSubmit}
              className="modal-close waves-effect waves-green btn-flat"
            >
              Save
            </button>
          </div>
        </div>
      </>
    );
  }
}

export default OrderModal;
