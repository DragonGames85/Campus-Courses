import { Link, LinkProps } from "react-router-dom";
import { FC } from "react";

export const AppLink: FC<LinkProps> = props => {
  const { to, children, ...otherProps } = props;

  return (
    <Link to={to} {...otherProps}>
      {children}
    </Link>
  );
};
