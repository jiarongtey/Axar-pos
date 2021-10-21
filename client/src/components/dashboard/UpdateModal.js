import React, { Component } from "react";
import M from "materialize-css";
import "materialize-css/dist/css/materialize.min.css";

class UpdateModal extends Component {
  constructor(props) {
    super();
    this.state = {
      quantity: props.data.quantity,
      resell: props.data.resell,
      cost: props.data.cost,
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

    const updateData = {
      quantity: this.state.quantity,
      cost: this.state.cost,
      resell: this.state.resell,
    };

    this.props.handleUpdate(this.props.data, updateData);
  };

  render() {
    const { name, category, brand } = this.props.data;

    return (
      <>
        <button
          className="btn-small modal-trigger"
          data-target={this.props.data._id}
        >
          <i className="material-icons">description</i>
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
              <b>{name}</b>
            </h4>

            {/** Row 1 */}
            <div className="row">
              <div className="input-field col s6">
                <i className="material-icons  prefix">category</i>
                <input
                  disabled
                  onChange={this.onChange}
                  value={category}
                  type="text"
                />
                <label htmlFor="category">Category</label>
              </div>
              <div className="input-field col s6">
                <i className="material-icons prefix">local_offer</i>
                <input
                  disabled
                  onChange={this.onChange}
                  value={brand}
                  type="text"
                />
                <label htmlFor="brand">Brand</label>
              </div>
            </div>

            {/** Row 2 Cost and Price*/}
            <div className="row">
              <div className="input-field col s6">
                <i className="material-icons prefix">request_quote</i>
                <input
                  id={name + "cost"}
                  onChange={this.onChange}
                  value={this.state.cost}
                  type="text"
                />
                <label htmlFor="cost">Cost</label>
              </div>
              <div className="input-field col s6">
                <i className="material-icons prefix">local_offer</i>
                <input
                  id={name + "resell"}
                  onChange={this.onChange}
                  value={this.state.resell}
                  type="text"
                />
                <label htmlFor="resell">Resell</label>
              </div>
            </div>

            {/**Row 3 Quantity */}
            <div className="row">
              <div className="input-field col s6">
                <i className="material-icons prefix">request_quote</i>
                <input
                  id={name + "quantity"}
                  onChange={this.onChange}
                  value={this.state.quantity}
                  type="text"
                />
                <label htmlFor="quantity">Quantity</label>
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

export default UpdateModal;
