import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import PageWrapper from "../wrapper/PageWrapper";
import ImageThumbnail from "../../components/thumbnail/ImageThumbnail";
import "./MarketPlace.css";
import PageTitle from "../../components/page title/PageTitle";
import { generateMarketContent } from "../../factory/make";
import DateHandler from "../../shared/classes/DateHandler";
import { bindActionCreators } from "redux";
import {
  fetchMarketNews,
  reduxAddToShoppingBasket,
} from "../../redux/actions/actions";
import { connect } from "react-redux";
import { pop } from "../../components/form generator/shared/utils/utils";
import Loader from "../../components/cover loader/Loader";
import { LOADING } from "../../redux/reducers/reducers";
import FlatButton from "./../../components/flat button/FlatButton";
const products = generateMarketContent();

function MarketPlace(props) {
  const { addToCart, cart, fetchMoreMarketNews, details } = props;

  const [loading, setLoading] = useState(false);

  const add = (item) => {
    const old = cart?.shop || [];
    const { found, rest } = pop(old, (itm) => itm.product.id === item.id);
    addToCart([
      ...rest,
      { product: item, qty: 1 + (found ? found.qty || 0 : 0) },
    ]);
  };

  const fetchMore = () => {
    setLoading(true);
    fetchMoreMarketNews(
      { min: details?.min, max: details?.max },
      (response) => {
        console.log("LE Response", response);
        setLoading(false);
      }
    );
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
      <Market
        {...props}
        products={products}
        add={(product) => add(product, cart, addToCart)}
        remove={(itemId) => remove(itemId, false, cart, addToCart)}
        cart={cart}
      />
      <FlatButton
        loading={loading}
        onClick={fetchMore}
        style={{
          background: "white",
          border: "solid 2px var(--app-color-darker)",
        }}
        textStyle={{ color: "var(--app-color-darker)" }}
      >
        Load More
      </FlatButton>
      {/* <ItemFullView /> */}
    </PageWrapper>
  );
}

const mapStateToProps = (state) => {
  return {
    cart: state.cart,
    news: state.marketNews,
    details: state.marketDetails,
  };
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(
    {
      addToCart: reduxAddToShoppingBasket,
      fetchMoreMarketNews: fetchMarketNews,
    },
    dispatch
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(MarketPlace);
// ---------------------------------------------------------------------------------------------------
const Market = ({ add, remove, cart, news }) => {
  if (news === LOADING)
    return <Loader label="Fetching news..." color="var(--app-color-darker)" />;
  return (
    <>
      <div className="shop-page-container">
        {news?.map((prod, ind) => {
          const inCart = (cart?.shop || []).find(
            (i) => i.product.id === prod.id
          );
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
    </>
  );
};

const ShopItem = ({ name, price, created_at, add, remove, qty, image }) => {
  return (
    <div className="shop-item">
      <div style={{ position: "relative" }}>
        <div className="add-btn elevate-1" onClick={() => add()}>
          <FontAwesomeIcon icon={faPlus} />
        </div>
        <ImageThumbnail
          style={{ height: 150, objectFit: "cover", objectPosition: "top" }}
          src={image}
        />
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
