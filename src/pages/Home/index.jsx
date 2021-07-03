import React from "react";
import PostList from "../../components/PostList";

const Home = () => {
  return (
    <div>
      <div className="md:grid gap-10 grid-cols-4">
        <div className="col-span-3">
          <PostList />
        </div>
      </div>
    </div>
  );
};

export default Home;
