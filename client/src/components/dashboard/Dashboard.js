import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions";
import { getProducts } from "../../actions/productActions";
import { addNewProduct } from "../../actions/orderAction";
import ProductTable from "./Table";
import M from "materialize-css";
class Dashboard extends Component {
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

  orderHandler = (item, amount) => {
    const newOrder = {
      reseller: this.props.auth.user.name,
      product: item._id,
      amount: amount,
    };

    addNewProduct(newOrder);
  };

  async componentDidMount() {
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
                <b>Hey there,</b> {user.name.split(" ")[0]}
                <p className="flow-text grey-text text-darken-1">
                  Play by the rules, but be{" "}
                  <span style={{ fontFamily: "monospace" }}>ferocious</span>
                  👏
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
            </div>
          </div>
          <ProductTable
            orderHandler={this.orderHandler}
            data={this.state.productItems}
          />
        </div>
      </div>
    );
  }
}

Dashboard.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { logoutUser })(Dashboard);
