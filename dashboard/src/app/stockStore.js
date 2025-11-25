import {create} from 'zustand';
import { holdings } from '../data/data';
import axios from 'axios';

const stockStore = (set) => ({
  watchList: [],
  holdings: [],
  orders: [],
  funds: [],
  positions: [],

  buyWindow: {uid:"",toggle:false},

  setHoldings: (holdingsArray) => set({ holdings: holdingsArray }),
  setOrders: (ordersArray) => set({ orders: ordersArray }),
  setPositions: (positionsArray) => set({ positions: positionsArray }),
  setFunds: (fundsObj) => set({ funds: fundsObj }),

  setOpenBuyWindow: (uid)=>set((state)=>({
        buyWindow: {...state.buyWindow ,uid:uid,toggle:true}
  })),
   
  setCloseBuyWindow: ()=>set((state)=>({
        buyWindow: {...state.buyWindow,toggle:false}
  })),

  fetchStocks: async () => {
    try {
      const response = await axios.get("http://localhost:5000/allStocks", { withCredentials: true });
      // The backend returns an array of stock objects.
      // We map them to match the structure expected by WatchList (if needed)
      // Backend: { symbol, price, percent_change, isDown, ... }
      // Frontend WatchList expects: { name, price, percent, isDown }
      
      const formattedData = response.data.map(stock => ({
        name: stock.symbol,
        price: stock.price,
        percent: stock.percent_change + "%",
        isDown: stock.isDown
      }));
      
      set({ watchList: formattedData });
    } catch (error) {
      console.error("Error fetching stocks:", error);
    }
  },

});



const useStockStore =create(stockStore);

export default useStockStore;