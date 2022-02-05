import React, { useEffect } from "react";
import "./../ShopManagement.css";
import { ShopCard } from "./SeeAllShops";
import Dropdown from "./../../../components/form generator/dropdown/Dropdown";
import NotFound from "../../../components/not found/NotFound";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import {
  reduxAddNewProduct,
  reduxSetActiveShop,
} from "../../../redux/actions/actions";

function SeeAllShopItems({
  products,
  doDelete,
  confirmDelete,
  addToProducts,
  shops,
  activeShop,
  setActiveShop,
}) {
  const goto = useNavigate();
  const isInShop = (shops, shopId) => {
    const found = shops?.find((s) => s.id === shopId);
    if (found) return true;
    return false;
  };
  const getShopItems = () => {
    const shop = activeShop || (shops && shops[0]);
    if (!activeShop) setActiveShop(shop); // no active shop, so take the first shop, and make it the active shop
    if (!shop) return [];
    const items = products?.filter((p) => isInShop(p.shops, shop.id));
    return items;
  };

  useEffect(() => {}, [activeShop]);

  var shopItems = getShopItems();

  const renderNoItems = () => {
    const items = getShopItems();
    const productsDey = products && products.length;
    if (!productsDey)
      return (
        <NotFound
          label="What would you like to sell in your shops? Add a product!"
          actionText="Add New Product"
          action={() => goto("new-product")}
        />
      );
    if ((!items || !items.length) && !activeShop)
      return <p>Choose a shop to view it's products</p>;

    if ((!items || !items.length) && activeShop)
      return (
        <NotFound
          label={`You have not created any products for "${
            activeShop?.name || "..."
          }"`}
          actionText="Add New Product"
          action={() => goto("new-product")}
        />
      );
  };

  return (
    <div className="all-shop-items-container">
      <p
        className="touchable-opacity"
        style={{
          color: "var(--app-color-darker)",
          padding: 10,
          fontWeight: "bold",
          display: "inline-block",
        }}
        onClick={() => goto("new-product")}
      >
        <FontAwesomeIcon icon={faPlus} />
        <span style={{ marginLeft: 15 }}>Add New Product</span>
      </p>
      <p>
        {activeShop ? (
          <span>
            Showing products for <b>{activeShop?.name}</b>
          </span>
        ) : (
          "Use the dropdown to go through your shops. The items in your chosen shop will be shown below"
        )}
      </p>
      <div className="drop-area">
        <Dropdown
          type="full"
          placeholder="Choose a shop to view items"
          data={shops || []}
          labelExtractor={(shop) => shop?.name}
          valueExtractor={(shop) => shop?.id}
          defaultValue={activeShop}
          onItemSelected={(shop) => setActiveShop(shop)}
        />
      </div>
      {products && (
        <div style={{ marginTop: 20 }}>
          {shopItems?.map((product, i) => {
            return (
              <React.Fragment key={i?.toString()}>
                <ShopCard
                  image={product?.image}
                  name={product?.name}
                  onEdit={() => goto("edit-product/" + product?.id)}
                  onDelete={() =>
                    confirmDelete(true, {
                      onConfirm: () =>
                        doDelete(product?.id, products, addToProducts),
                      children: (
                        <div style={{ padding: 20 }}>
                          Would you like to delete '{product?.name}'
                        </div>
                      ),
                    })
                  }
                >
                  <h5 style={{ color: "var(--app-color)" }}>
                    Rs {product?.price}
                  </h5>
                </ShopCard>
              </React.Fragment>
            );
          })}
        </div>
      )}

      {renderNoItems()}
    </div>
  );
}
const mapStateToProps = (state) => {
  return {
    products: state.userProducts,
    shops: state.userShops,
    activeShop: state.activeShop,
  };
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(
    { addToProducts: reduxAddNewProduct, setActiveShop: reduxSetActiveShop },
    dispatch
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(SeeAllShopItems);
