import React from "react";
import PageWrapper from "../wrapper/PageWrapper";
import BottomNavigation from "./../../components/bottom navigation/BottomNavigation";
import "./News.css";
import { AdCard, CampaignNewsCard } from "./widgets";
function News() {
  return (
    <PageWrapper>
      <div className="news-page">
        <div>
          <CampaignNewsCard />
          <AdCard />
          <CampaignNewsCard />
          <AdCard />
          <CampaignNewsCard />
        </div>
        <div className="phone-vanish">
          <center>
            <h3 style={{}}>Advertisement Board</h3>
          </center>
        </div>
      </div>

      {/* <BottomNavigation /> */}
    </PageWrapper>
  );
}

export default News;
