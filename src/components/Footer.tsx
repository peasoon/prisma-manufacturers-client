import * as React from "react";

interface IFooterProps {}

const Footer: React.FunctionComponent<IFooterProps> = (props) => {
  return (
    <footer className="footer">
      <div className="container">2023 год</div>
    </footer>
  );
};

export default Footer;
