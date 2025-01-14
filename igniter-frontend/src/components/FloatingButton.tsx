import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { navlinks } from "../constants";

interface NavLink {
  name: string;
  imgUrl: string;
  link: string;
  disabled?: boolean;
}

interface IconProps extends NavLink {
  styles?: string;
  isActive: string;
  handleClick: () => void;
}

const Icon: React.FC<IconProps> = ({ styles, name, imgUrl, isActive, disabled, handleClick }) => (
  <div
    className={`w-[42px] h-[42px] rounded-[10px] ${
      isActive && isActive === name && "bg-[#8c6dfd]"
    } flex justify-center items-center ${
      !disabled && "cursor-pointer"
    } ${styles}`}
    onClick={handleClick}
  >
    {/* Show either the grayscale or colored icon based on the props received */}
    {!isActive ? (
      <img src={imgUrl} alt="fund_logo" className="w-1/2 h-1/2" />
    ) : (
      <img
        src={imgUrl}
        alt="fund_logo"
        className={`w-1/2 h-1/2 ${isActive !== name && "grayscale"}`}
      />
    )}
  </div>
);

const FloatingButton: React.FC = () => {
  const navigate = useNavigate();
  const [isActive, setIsActive] = useState("dashboard");

  return (
    <div className="flex justify-between items-center flex-row sticky w-auto">
      {/* Render the container for the icons */}
      <div className="flex-1 flex flex-row bg-[#13131a] justify-between items-center rounded-[20px] w-[76py] p-2 mt-12 border-white border-solid border-2">
        <div className="flex flex-row justify-between items-center gap-3">
          {/* Loop through the navigation links and render an icon for each */}
          {navlinks.map((link: NavLink) => (
            <Icon
              key={link.name}
              {...link}
              isActive={isActive}
              handleClick={() => {
                // Update the active link and navigate to the corresponding route
                if (!link.disabled) {
                  setIsActive(link.name);
                  navigate(link.link);
                }
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default FloatingButton;
