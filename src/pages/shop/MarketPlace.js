import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import BottomNavigation from "../../components/bottom navigation/BottomNavigation";
import Toolbar from "../../components/toolbar/Toolbar";
import PageWrapper from "../wrapper/PageWrapper";
import ImageThumbnail from "../../components/thumbnail/ImageThumbnail";
import "./MarketPlace.css";
import ItemFullView from "./views/ItemFullView";
import PageTitle from "../../components/page title/PageTitle";
import { generateMarketContent } from "../../factory/make";
import DateHandler from "../../shared/classes/DateHandler";
import { bindActionCreators } from "redux";
import { reduxAddToShoppingBasket } from "../../redux/actions/actions";
import { connect } from "react-redux";
import { pop } from "../../components/form generator/shared/utils/utils";

const products = generateMarketContent();

function MarketPlace({ addToCart, cart }) {
  console.log("I am the producst", cart);

  const add = (item) => {
    const old = cart?.shop || [];
    const { found, rest } = pop(old, (itm) => itm.product.id === item.id);
    addToCart([
      ...rest,
      { product: item, qty: 1 + (found ? found.qty || 0 : 0) },
    ]);
  };

  const remove = (itemId) => {
    const { rest, found, index } = pop(
      cart?.shop,
      (itm) => itm.product.id === itemId
    );

    if (found.qty <= 1) return addToCart(rest);
    const changed = { ...found, qty: found.qty - 1 };
    rest.splice(index, 0, changed);
    addToCart(rest);
  };

  return (
    <PageWrapper>
      <PageTitle
        title="Market"
        subtitle="I am sure you know what happens in markets. Just a reminder, the experience  is way better when you have a lot of money!"
      />
      <Market products={products} add={add} remove={remove} cart={cart} />
      {/* <ItemFullView /> */}
    </PageWrapper>
  );
}

const mapStateToProps = (state) => {
  return {
    cart: state.cart,
  };
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(
    {
      addToCart: reduxAddToShoppingBasket,
    },
    dispatch
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(MarketPlace);

const Market = ({ products, add, remove, cart }) => {
  return (
    <div className="shop-page-container">
      {products?.map((prod, ind) => {
        const inCart = (cart?.shop || []).find((i) => i.product.id === prod.id);
        return (
          <React.Fragment key={ind?.toString()}>
            <ShopItem
              {...prod}
              add={() => add(prod)}
              remove={() => remove(prod.id)}
              qty={inCart?.qty}
            />
          </React.Fragment>
        );
      })}
    </div>
  );
};

const ShopItem = ({ name, price, created_at, add, remove, qty }) => {
  return (
    <div className="shop-item">
      <div style={{ position: "relative" }}>
        <div className="add-btn elevate-1" onClick={() => add()}>
          <FontAwesomeIcon icon={faPlus} />
        </div>
        <ImageThumbnail />
        {qty && (
          <small className="s-badge" onClick={() => remove()}>
            {qty}
          </small>
        )}
      </div>
      <div className="s-dets">
        <small className="price">Rs {Number(price)}</small>
        <br />
        <small className="name">{name}</small>
        <br />
        <small className="date">{DateHandler.makeTimeAgo(created_at)}</small>
      </div>
    </div>
  );
};
