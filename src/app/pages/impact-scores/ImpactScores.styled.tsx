import styled from "styled-components";

import Spacings from "@dynatrace/strato-design-tokens/spacings";
import { Flex } from "@dynatrace/strato-components-preview";

export const MetricCell = styled.div<{ color: string }>`
  background: ${(props) => props.color};
  height: ${Spacings.Size56};
  width: 100%;
`;

export const PageCell = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 64px;
  background-color: white;
  position: relative;

  &::after {
    content: "-";
    display: block;
    right: -10px;
    top: calc(50% -2px);
    position: absolute;
  }
`;

export const PageColumn = styled(Flex)`
  position: relative;
  margin-right: ${Spacings.Size8};
  box-shadow: 0 -10px 50px -10px rgba(150, 150, 150, 0.5);

  &::before {
    content: "";
    display: block;
    top: -10px;
    left: 0;
    width: 100%;
    height: ${Spacings.Size20};
    position: absolute;
    background-color: white;
  }
`;
