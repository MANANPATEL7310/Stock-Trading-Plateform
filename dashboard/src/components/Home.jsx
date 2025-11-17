import React from "react";

import Dashboard from "./Dashboard";


const Home = () => {
  return (
    <main className="min-h-screen mx-auto flex justify-center items-center">
      <div className="w-full px-[5%] py-8 lg:py-10">
        <Dashboard />
      </div>
    </main>
  );
};

export default Home;
