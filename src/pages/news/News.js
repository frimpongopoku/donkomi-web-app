import React from "react";
import PageWrapper from "../wrapper/PageWrapper";
import BottomNavigation from "./../../components/bottom navigation/BottomNavigation";
import "./News.css";
import { AdCard, CampaignNewsCard } from "./widgets";
function News() {
  return (
    <PageWrapper>
      <div className="news-page">
        <CampaignNewsCard />
        <AdCard />
        <CampaignNewsCard />
      </div>
      <BottomNavigation />
    </PageWrapper>
  );
}

export default News;
