import React from "react";
import HomeHeader from "./HomeHeader";
import HomePageItems from "./HomePageItems";
const Home = (props) => {
  return (
    <div>
      <HomeHeader />
      <HomePageItems searchTerm={props.searchTerm} />
    </div>
  );
};

export default Home;
