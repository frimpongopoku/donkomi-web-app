import React from "react";
import PageWrapper from "../wrapper/PageWrapper";
import "./News.css";
import { CampaignNewsCard } from "./widgets";
function News() {
  return (
    <PageWrapper>
      <div className="news-page">
        <CampaignNewsCard />
      </div>
    </PageWrapper>
  );
}

export default News;
