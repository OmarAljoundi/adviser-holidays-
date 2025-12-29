import { FunctionComponent, ReactNode } from "react";

interface FaqLayoutProps {
  children: ReactNode;
}

const FaqLayout: FunctionComponent<FaqLayoutProps> = ({ children }) => {
  return <div className="mt-10">{children}</div>;
};

export default FaqLayout;
