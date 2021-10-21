import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions";
import {
  getProducts,
  removeProduct,
  updateProduct,
} from "../../actions/productActions";
import AdminTable from "./AdminTable";
import { Link } from "react-router-dom";
import M from "materialize-css";

class AdminDashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      productItems: [],
    };
  }
  onLogoutClick = e => {
    e.preventDefault();
    this.props.logoutUser();
    M.toast({
      html: "Successfully logout!",
      classes: "rounded toast-container ",
    });
  };

  handleDelete = async product => {
    if (window.confirm("Are you sure to execute this action?")) {
      const items = [...this.state.productItems].filter(p => p !== product);
      this.setState({ productItems: items });
      await removeProduct(product);
    }
  };

  handleUpdate = async (product, newData) => {
    const productItems = [...this.state.productItems];
    const index = productItems.indexOf(product);

    productItems[index]["cost"] = newData.cost;
    productItems[index]["resell"] = newData.resell;
    productItems[index]["quantity"] = newData.quantity;
    this.setState({ productItems });
    updateProduct(product, newData);
  };

  async componentDidMount() {
    if (this.props.auth.user.type === "reseller") {
      return this.props.history.push("/dashboard");
    }
    const { data: productItems } = await getProducts();
    this.setState({ productItems });
  }

  render() {
    const { user } = this.props.auth;
    return (
      <div style={{ height: "100vh" }} className="container">
        <div>
          <div className="row">
            <div className="landing-copy col s12 center-align">
              <h4>
                <b>Hey retailer,</b> {user.name.split(" ")[0]}
                <p className="flow-text grey-text text-darken-1">
                  A person who feels appreciated will always do more
                  <br /> than what is expected. 👏
                </p>
              </h4>
              <button
                style={{
                  width: "140px",
                  height: "60px",
                  borderRadius: "3px",
                  letterSpacing: "1.5px",
                  marginTop: "1rem",
                }}
                onClick={this.onLogoutClick}
                className="btn btn-large waves-effect waves-light hoverable blue accent-3"
              >
                Logout
              </button>

              <Link
                to="/admin/register"
                style={{
                  width: "140px",
                  height: "60px",

                  borderRadius: "3px",
                  letterSpacing: "1.5px",
                  marginTop: "1rem",
                  marginLeft: "1rem",
                }}
                className="btn btn-large btn-flat waves-effect white black-text"
              >
                New_User
              </Link>
            </div>
          </div>
          <AdminTable
            data={this.state.productItems}
            handleDelete={this.handleDelete}
            handleUpdate={this.handleUpdate}
          />
          <div className="row">
            <Link
              to="/admin/newProduct"
              style={{
                borderRadius: "3px",
                marginTop: "2rem",
                marginBottom: "2rem",
              }}
              className="waves-effect waves-light btn-large red accent-3"
            >
              <i className="material-icons right">note_add</i> Add Product{" "}
            </Link>
            <Link
              to="/admin/orders"
              style={{
                borderRadius: "3px",
                marginTop: "2rem",
                marginBottom: "2rem",
                marginLeft: "2rem",
              }}
              className="waves-effect waves-light btn-large "
            >
              <i className="material-icons right">note_add</i> View order{" "}
            </Link>
          </div>
        </div>
      </div>
    );
  }
}

AdminDashboard.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { logoutUser })(AdminDashboard);
