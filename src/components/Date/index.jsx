import React from "react";

const Date = ({ time }) => {
  const date = time.toDate();
  return (
    <div>
      <span className="text-xs">
        {date.getDate()}/{date.getMonth() + 1}/{date.getFullYear()}
      </span>
    </div>
  );
};

export default Date;
