import { faArrowCircleRight, faBus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

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
