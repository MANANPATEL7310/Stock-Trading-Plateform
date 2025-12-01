import { Routes, Route } from "react-router-dom";
import Menu from "./Menu";
import Summary from "./Summary";
import Orders from "./Orders";
import Holdings from "./Holdings";
import Positions from "./Positions";
import Funds from "./Funds";
import Apps from "./Apps";
import WatchList from "./WatchList";
import NewsPopup from "./NewsPopup";

// import { GeneralContextProvider } from "./GeneralContext";
import useStockStore from "../app/stockStore";
import BuyActionWindow from "./BuyActionWindow";

const Dashboard = () => {
  const buyWindow = useStockStore((state) => state.buyWindow);

  return (
    <>
      {buyWindow.toggle && <BuyActionWindow uid={buyWindow.uid} />}
      

      <div className="flex h-screen">
        <div className="hidden lg:block w-[35%] border-r border-slate-200 bg-white p-8">
          {/* <GeneralContextProvider> */}
          <WatchList />
          {/* </GeneralContextProvider> */}
        </div>

        <main className="w-[65%] overflow-y-auto p-8">
          <Menu />
          <Routes>
              <Route path="/" element={<Summary />} />
              <Route path="/orders" element={<Orders />} />
              <Route path="/holdings" element={<Holdings />} />
              <Route path="/positions" element={<Positions />} />
              <Route path="/funds" element={<Funds />} />
              <Route path="/apps" element={<Apps />} />
          </Routes>
        </main>
      </div>
        <NewsPopup />  
    </>
  );
};

export default Dashboard;
