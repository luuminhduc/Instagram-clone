import React from "react";

const AddComment = ({ postId }) => {
  return (
    <div className="border-t p-4 flex">
      <input
        type="text"
        placeholder="Add comment"
        className="bg-transparent text-sm flex-grow focus:outline-none"
      />
      <button className="text-teal-600">Add</button>
    </div>
  );
};

export default AddComment;
