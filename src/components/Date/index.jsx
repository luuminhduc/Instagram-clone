import React from "react";

const Date = ({ time }) => {
  const date = time.toDate();
  return (
    <div>
      <span className="text-xs text-gray-500">
        {date.getDate()}/{date.getMonth() + 1}/{date.getFullYear()}
      </span>
    </div>
  );
};

export default Date;
