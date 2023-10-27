import { TitleBar } from "@dynatrace/strato-components-preview";
import React, { PropsWithChildren } from "react";

type PageLayoutProps = PropsWithChildren<{
  title: string;
}>;

export const PageLayout: React.FC<PageLayoutProps> = ({ children, title }) => {
  return (
    <>
      <TitleBar>
        <TitleBar.Title>{title}</TitleBar.Title>
      </TitleBar>
      <br />
      <main>{children}</main>
    </>
  );
};
