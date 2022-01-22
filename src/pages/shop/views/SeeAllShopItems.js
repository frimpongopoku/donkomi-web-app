import React from "react";
import "./../ShopManagement.css";
import { ShopCard } from "./SeeAllShops";
import Dropdown from "./../../../components/form generator/dropdown/Dropdown";
import NotFound from "../../../components/not found/NotFound";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";

function SeeAllShopItems({ products }) {
  const goto = useNavigate();
  return (
    <div className="all-shop-items-container">
      <p
        className="touchable-opacity"
        style={{
          color: "var(--app-color-darker)",
          padding: 10,
          fontWeight: "bold",
        }}
        onClick={() => goto("new-product")}
      >
        <FontAwesomeIcon icon={faPlus} />
        <span style={{ marginLeft: 15 }}>Add New Product</span>
      </p>
      <p>
        Use the dropdown to go through your shops. The items in your chosen shop
        will be shown below
      </p>
      <div className="drop-area">
        <Dropdown type="full" placeholder="Choose a shop to view items" />
      </div>
      {products && (
        <div style={{ marginTop: 20 }}>
          {products?.map((product, i) => {
            return (
              <React.Fragment key={i?.toString()}>
                <ShopCard name={product?.name}>
                  <h5 style={{ color: "var(--app-color)" }}>
                    Rs {product?.price}
                  </h5>
                </ShopCard>
              </React.Fragment>
            );
          })}
        </div>
      )}

      {(!products || !products?.length) && (
        <NotFound
          label="You cant just make an empty shop, add products you sell!"
          actionText="Add New Product"
          action={() => goto("new-product")}
        />
      )}
    </div>
  );
}
const mapStateToProps = (state) => {
  return { products: state.userProducts };
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({}, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(SeeAllShopItems);
