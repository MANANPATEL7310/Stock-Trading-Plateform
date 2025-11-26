import React from "react";

import Dashboard from "./Dashboard";


import WelcomeModal from "./WelcomeModal";

const Home = () => {
  return (
    <main className="min-h-screen mx-auto flex justify-center items-center">
      <div className="w-full px-[5%] py-8 lg:py-10">
        <Dashboard />
        <WelcomeModal />
      </div>
    </main>
  );
};

export default Home;
