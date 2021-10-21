import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { addNewProduct } from "../../actions/productActions";
import classnames from "classnames";

class NewProduct extends Component {
  constructor() {
    super();
    this.state = {
      name: "",
      category: "",
      brand: "",
      quantity: "",
      resell: "",
      cost: "",
      errors: {},
    };
  }
  componentDidMount() {
    if (this.props.auth.user.type === "reseller") {
      this.props.history.push("/dashboard");
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({
        errors: nextProps.errors,
      });
    }
  }

  onChange = e => {
    this.setState({ [e.target.id]: e.target.value });
  };

  onSubmit = e => {
    e.preventDefault();

    const newProduct = {
      name: this.state.name,
      category: this.state.category,
      brand: this.state.brand,
      quantity: this.state.quantity,
      resell: this.state.resell,
      cost: this.state.cost,
    };

    this.props.addNewProduct(newProduct, this.props.history);
  };

  render() {
    const { errors } = this.state;

    return (
      <div className="container">
        <div className="row">
          <div className="col s8 offset-s2">
            <Link to="/admin/dashboard" className="btn-flat waves-effect">
              <i className="material-icons left">keyboard_backspace</i> Back to
              dashboard
            </Link>
            <div className="col s12" style={{ paddingLeft: "11.250px" }}>
              <h4>
                <b>Add new</b> product
              </h4>
            </div>
            <form noValidate onSubmit={this.onSubmit}>
              <div className="input-field col s12">
                <i className="material-icons prefix">note_add</i>
                <input
                  onChange={this.onChange}
                  className={classnames("", {
                    invalid: errors.name,
                  })}
                  value={this.state.name}
                  error={errors.name}
                  id="name"
                  type="text"
                />
                <label htmlFor="name">Name</label>
                <span className="red-text">{errors.name}</span>
              </div>
              <div className="input-field col s12">
                <i className="material-icons prefix">category</i>
                <input
                  id="category"
                  onChange={this.onChange}
                  value={this.state.category}
                  error={errors.category}
                  type="text"
                  className={classnames("", {
                    invalid: errors.category,
                  })}
                />
                <label htmlFor="category">Category</label>
                <span className="red-text">{errors.category}</span>
              </div>
              <div className="input-field col s12">
                <i className="material-icons prefix">local_offer</i>
                <input
                  onChange={this.onChange}
                  value={this.state.brand}
                  error={errors.brand}
                  id="brand"
                  type="text"
                  className={classnames("", {
                    invalid: errors.brand,
                  })}
                />
                <label htmlFor="brand">Brand</label>
                <span className="red-text">{errors.brand}</span>
              </div>
              <div className="input-field col s12">
                <i className="material-icons prefix">
                  production_quantity_limits
                </i>
                <input
                  onChange={this.onChange}
                  value={this.state.quantity}
                  error={errors.quantity}
                  id="quantity"
                  type="text"
                  className={classnames("", {
                    invalid: errors.quantity,
                  })}
                />
                <label htmlFor="quantity">Quantity</label>
                <span className="red-text">{errors.quantity}</span>
              </div>
              <div className="input-field col s12">
                <i className="material-icons prefix">request_quote</i>

                <input
                  onChange={this.onChange}
                  value={this.state.resell}
                  error={errors.resell}
                  id="resell"
                  type="text"
                  className={classnames("", {
                    invalid: errors.resell,
                  })}
                />
                <label htmlFor="resell">Resell Price</label>
                <span className="red-text">{errors.resell}</span>
              </div>

              <div className="input-field col s12">
                <i className="material-icons prefix">price_check</i>

                <input
                  onChange={this.onChange}
                  value={this.state.cost}
                  error={errors.cost}
                  id="cost"
                  type="text"
                  className={classnames("", {
                    invalid: errors.cost,
                  })}
                />
                <label htmlFor="cost">Cost</label>
                <span className="red-text">{errors.cost}</span>
              </div>

              <div className="col s12" style={{ paddingLeft: "11.250px" }}>
                <button
                  style={{
                    width: "150px",
                    borderRadius: "3px",
                    letterSpacing: "1.5px",
                    marginTop: "1rem",
                  }}
                  type="submit"
                  className="btn btn-large waves-effect waves-light hoverable red accent-3"
                >
                  New
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

NewProduct.propTypes = {
  addNewProduct: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors,
});

export default connect(mapStateToProps, { addNewProduct })(
  withRouter(NewProduct)
);
