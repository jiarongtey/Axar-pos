import React, { useState } from "react";
import "./Table.css";
import UpdateModal from "./UpdateModal";

export default function AdminTable(props) {
  const [filterStr, setFilterStr] = useState("");
  const [filterType, setFilterType] = useState("name");
  const onChange = e => {
    setFilterStr(e.target.value);
  };

  const onTypeChange = e => {
    setFilterType(e.target.value);
  };

  const { handleDelete } = props;
  return (
    <div>
      <form>
        <div className="row">
          <div className="input-field col s8">
            <input
              id="input_text"
              type="text"
              data-length="10"
              onChange={onChange}
            ></input>
            <label>Search</label>
          </div>
          <div className="col s2" style={{ marginTop: "2rem" }}>
            <select className="browser-default" onChange={onTypeChange}>
              <option value="name">Product Name</option>
              <option value="category">Category</option>
              <option value="brand">Brand</option>
            </select>
          </div>
          <div className="col s2" style={{ marginTop: "2.2rem" }}>
            <button
              className="btn waves-effect waves-light"
              type="reset"
              name="action"
              onClick={e => {
                setFilterStr("");
                setFilterType("name");
              }}
            >
              Reset
              <i className="material-icons right">send</i>
            </button>
          </div>
        </div>
      </form>
      <table className="highlight ">
        <thead>
          <tr>
            <th>Product</th>
            <th>Category</th>
            <th>Brand</th>
            <th>Cost</th>
            <th>Price</th>
            <th>Quantity</th>
            <th></th>
          </tr>
        </thead>

        <tbody>
          {props.data
            .filter(i =>
              i[filterType].toLowerCase().includes(filterStr.toLowerCase())
            )
            .map(item => {
              return (
                <tr key={item._id}>
                  <td>{item.name}</td>
                  <td>{item.category}</td>
                  <td>{item.brand}</td>
                  <td>{item.cost}</td>
                  <td>{item.resell}</td>
                  <td>{item.quantity}</td>
                  <td>
                    <UpdateModal
                      data={item}
                      handleUpdate={props.handleUpdate}
                    />
                    <button
                      onClick={() => handleDelete(item)}
                      className="btn-small red accent-3"
                    >
                      <i className="material-icons">restore_from_trash</i>
                    </button>
                  </td>
                </tr>
              );
            })}
        </tbody>
      </table>
    </div>
  );
}
