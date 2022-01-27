import React from "react";
import { ConstructionImage } from "../../components/notice/exports";
import Notice from "../../components/notice/Notice";
import PageWrapper from "../wrapper/PageWrapper";

export default function Merchant() {
  return (
    <div>
      <PageWrapper>
        <Notice
          imageStyle={{ height: 250 }}
          style={{ marginTop: "-20%" }}
          label="Merchant Service: We are working day and night to bring you this feature, please stay tuned..."
          image={ConstructionImage}
        />
      </PageWrapper>
    </div>
  );
}
