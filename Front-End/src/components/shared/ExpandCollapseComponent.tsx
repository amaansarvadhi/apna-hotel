/** @format */

// ExpandCollapseComponent.tsx

import React, { ReactNode } from "react";

interface ExpandCollapseProps {
  title?: string;
  children?: ReactNode;
  headerClassName?: string;
  headerStyle?: React.CSSProperties;
  bodyStyle?: React.CSSProperties;
  bodyClassName?: string;
  isExpanded: any;
  toggleExpand: any;
}

const ExpandCollapseComponent: React.FC<ExpandCollapseProps> = ({
  title,
  children,
  headerClassName,
  headerStyle,
  bodyStyle,
  bodyClassName,
  isExpanded,
  toggleExpand,
}) => {
  return (
    <div className="bg-[#F3F2F8]rounded-md shadow w-full">
      <div
        className={
          headerClassName
            ? headerClassName
            : "flex justify-between items-center  transition-all duration-300"
        }
        style={{ ...headerStyle }}
      >
        {title}
        <div className={`transform cursor-pointer ${isExpanded ? "rotate-0" : "rotate-180"}`}
          onClick={toggleExpand}
        >
          {/* Arrow Icon (You can use your own arrow icon) */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            className="h-6 w-6 transition-transform duration-300"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </div>
      </div>
      <div
        className={
          bodyClassName
            ? bodyClassName
            : `transition-max-height overflow-hidden duration-300 ${isExpanded ? "max-h-96" : "max-h-0"
            }`
        }
        style={{ ...bodyStyle }}
      >
        {children}
      </div>
    </div>
  );
};

export default ExpandCollapseComponent;
