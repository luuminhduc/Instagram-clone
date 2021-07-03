import React from "react";
import EditInfo from "../../components/EditInfo";

const EditAccount = () => {
  const blockArr = ["Edit info", "Change password"];

  const currentBlock = "Edit info";

  const renderBlock = () => {
    switch (currentBlock) {
      default:
        return <EditInfo />;
    }
  };

  return (
    <div className="md:grid grid-cols-10 bg-white border border-gray-200 border-solid">
      <div className="col-span-3">
        <div className="flex flex-col w-full justify-start items-start">
          {blockArr.map((el, i) => (
            <div
              className="p-3 cursor-pointer w-full hover:bg-gray-100"
              key={i}
            >
              {el}
            </div>
          ))}
        </div>
      </div>
      <div className="col-span-7 p-5 border-l border-solid border-gray-200">
        {renderBlock()}
      </div>
    </div>
  );
};

export default EditAccount;
