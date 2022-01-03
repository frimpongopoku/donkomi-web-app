import { faArrowCircleRight, faBus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ImageThumbnail from "./../../components/thumbnail/ImageThumbnail";
export const CampaignNewsCard = () => {
  return (
    <div className="camp-container">
      <div className="camp-content">
        <h4 style={{ fontWeight: "500" }} className="flex">
          Frimpong Opoku Agyemang{" "}
          <span style={{ marginLeft: "auto", color: "grey", fontSize: 14 }}>
            30 seconds ago
          </span>
        </h4>
        <div className="header-info flex">
          <h3 className="camp-h3">TRIP ME AGAIN - AND SEE</h3>
          <div style={{ marginLeft: "auto" }}>
            <span className="camp-fee">+ Rs 452.00</span>
          </div>
        </div>
        <div className="camp-mid">
          <h4>Order From</h4>
          <p>ORIGINAL VENDOR, MCDONALDS, KFC</p>
          <h3 className="trip-duration">Trip Duration : 50 Minutes</h3>
        </div>
        <div className="camp-bottom flex">
          <span>
            <FontAwesomeIcon icon={faBus} />
          </span>
          <div
            style={{ marginLeft: "auto", flexDirection: "column" }}
            className="flex"
          >
            <small style={{ marginLeft: "auto" }}>LEAVING IN</small>
            <p>1 Hour 30 minutes</p>
          </div>
        </div>
      </div>
      <div className="camp-footer flex">
        <p>Place your order</p>
        <span>
          <FontAwesomeIcon icon={faArrowCircleRight} />
        </span>
      </div>
    </div>
  );
};

export const AdCard = () => {
  return (
    <div className="ad-card">
      <h4 style={{ fontWeight: "500" }} className="flex ad-name-box">
        Frimpong Opoku Agyemang
        <span style={{ marginLeft: "auto", color: "grey", fontSize: 14 }}>
          30 seconds ago
        </span>
      </h4>
      <ImageThumbnail
        style={{ width: "100%", height: 200, objectFit: "cover" }}
      />
      <p>
        is simply dummy text of the printing and typesetting industry. Lorem
        Ipsum has been the industry's standard dummy text ever since the 1500s,
        when an unknown printer took a galley of type and scrambled it to make a
        type specimen book
      </p>

      <div className="news-ad-footer flex">
        <p>Look Into This</p>
        <span style={{ marginLeft: "auto" }}>
          <FontAwesomeIcon icon={faArrowCircleRight} />
        </span>
      </div>
    </div>
  );
};
