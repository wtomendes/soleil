import React from "react";

type DivProps = React.HTMLAttributes<HTMLDivElement>;

export const Card: React.FC<DivProps> = ({ className = "", ...props }) => (
  <div
    className={
      "rounded-xl border border-soleil-beige/40 bg-white shadow-sm " +
      (className || "")
    }
    {...props}
  />
);

export const CardContent: React.FC<DivProps> = ({ className = "", ...props }) => (
  <div className={("p-4 " + className).trim()} {...props} />
);

export default Card;


