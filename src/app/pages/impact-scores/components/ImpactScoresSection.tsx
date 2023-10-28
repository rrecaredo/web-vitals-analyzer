import React from "react";

import { ImpactScoresResponseType } from "../requests";
import { ImpactScoreSection } from "./ImpactScoresSection.styled";
import { ImpactScoresTable } from "./ImpactScoresTable";
import { ImpactScoresList } from "./ImpactScoresList";

type ImpactScoresSectionProps = {
  data: ImpactScoresResponseType;
};

export const ImpactScoresSection = ({ data }: ImpactScoresSectionProps) => {
  return (
    <ImpactScoreSection>
      <ImpactScoresTable data={data} />
      <ImpactScoresList data={data} />
    </ImpactScoreSection>
  );
};
