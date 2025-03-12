import React, { useState } from "react";
import { Button } from "react-bootstrap"; // Using Bootstrap for styling

const CommanButton = ({ label, onClick, variant = "", className, style }) => {
  const [isHovered, setIsHovered] = useState(false);
  const handleMouseEnter = () => setIsHovered(true);
  const handleMouseLeave = () => setIsHovered(false);

  const buttonStyle = {
    color: "white",
    // color: isHovered ? "white" : " #1D949A",
    color: isHovered ? "white" : " white",

    // backgroundColor: isHovered ? " #1D949A" : " white",
    backgroundColor: isHovered ? " #1D949A" : " #1D949A",

    borderColor: isHovered ? " #1D949A" : " #1D949A", // Example hover border color
    ...style, // Apply any additional custom styles passed in
  };

  return (
    <Button
      variant={variant}
      onClick={onClick}
      className={className}
      style={buttonStyle}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {label}
    </Button>
  );
};

export default CommanButton;
