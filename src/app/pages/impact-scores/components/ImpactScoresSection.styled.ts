import styled from "styled-components";

export const ImpactScoreSection = styled.section`
  .impact-scores-table {
    display: block;
  }
  .impact-scores-list {
    display: none;
  }

  @media screen and (max-width: 1250px) {
    .impact-scores-table {
      display: none;
    }
    .impact-scores-list {
      display: block;
    }
  }
`;
