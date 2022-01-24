import React from "react";
import "./../ShopManagement.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ImageThumbnail from "./../../../components/thumbnail/ImageThumbnail";
import { faPlus, faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import NotFound from "../../../components/not found/NotFound";
import { reduxAddNewShop } from "../../../redux/actions/actions";
function SeeAllShops({ shops, confirmDelete, addToShops, doDelete }) {
  const goto = useNavigate();

  return (
    <div className="all-shops-container">
      <p
        className="touchable-opacity"
        style={{
          color: "var(--app-color-darker)",
          padding: 10,
          fontWeight: "bold",
          display: "inline-block",
        }}
        onClick={() => goto("new-shop")}
      >
        <FontAwesomeIcon icon={faPlus} />
        <span style={{ marginLeft: 15 }}>Add New Shop</span>
      </p>
      <p style={{ marginTop: 15 }}>
        If you have created shops, all your shops will show up below
      </p>
      {shops && (
        <div style={{ marginTop: 20 }}>
          {shops?.map((shop, i) => {
            const name = shop?.name;
            return (
              <React.Fragment key={i?.toString()}>
                <ShopCard
                  name={name}
                  onEdit={() => goto("edit-shop/" + shop?.id)}
                  onDelete={() =>
                    confirmDelete(true, {
                      onConfirm: () => doDelete(shop?.id, shops, addToShops),
                      children: (
                        <div style={{ padding: 20 }}>
                          {`Would you like to delete '${name}'?`}
                        </div>
                      ),
                    })
                  }
                />
              </React.Fragment>
            );
          })}
        </div>
      )}

      {(!shops || !shops?.length) && (
        <NotFound
          label="Create your shop and start selling right away!"
          actionText="Add New Shop"
          action={() => goto("new-shop")}
        />
      )}
    </div>
  );
}

const mapStateToProps = (state) => {
  return { shops: state.userShops };
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({ addToShops: reduxAddNewShop }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(SeeAllShops);

export const ShopCard = ({ children, name, image, onEdit, onDelete }) => {
  return (
    <div className="shop-card flex">
      <ImageThumbnail className="shop-image" />
      <div className="shop-mid-part">
        <h4>{name || "Shop Name..."}</h4>
        {children}
      </div>
      <div style={{ marginLeft: "auto" }}>
        <div className="right-items" style={{ padding: "0px 10px" }}>
          <small
            onClick={() => onEdit && onEdit()}
            className="touchable-opacity"
            style={{ fontWeight: "bold", color: "var(--app-accent-color-2)" }}
          >
            Edit
          </small>
          <span
            onClick={() => onDelete && onDelete()}
            className="touchable-opacity"
            style={{
              fontWeight: "bold",
              color: "var(--app-color-darkest)",
              marginLeft: 15,
            }}
          >
            <FontAwesomeIcon icon={faTrashAlt} />
          </span>
        </div>
      </div>
    </div>
  );
};
