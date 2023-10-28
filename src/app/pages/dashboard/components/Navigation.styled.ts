import { Flex } from "@dynatrace/strato-components-preview";
import Colors from "@dynatrace/strato-design-tokens/colors";

import styled from "styled-components";

export const NavItem = styled(Flex)`
    &:hover {
        background-color: ${Colors.Theme.Neutral[20]};
        border-radius: 5px;
        box-shadow: 0 0 5px 5px ${Colors.Theme.Neutral[20]};
    }
`;
