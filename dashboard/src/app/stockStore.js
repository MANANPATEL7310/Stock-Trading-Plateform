import {create} from 'zustand';
import axios from 'axios';

const stockStore = (set) => ({
  watchList: [],
  holdings: [],
  orders: [],
  funds: 0,
  positions: [],
  user: null,
  
  buyWindow: { uid: "", toggle: false, mode: "BUY" },

  setHoldings: (holdingsArray) => set({ holdings: holdingsArray }),
  setOrders: (ordersArray) => set({ orders: ordersArray }),
  setPositions: (positionsArray) => set({ positions: positionsArray }),
  setFunds: (fundsVal) => set({ funds: fundsVal }),
  setUser: (userData) => set({ user: userData }),

  setOpenBuyWindow: (uid, mode = "BUY") => set((state) => ({
    buyWindow: { ...state.buyWindow, uid: uid, toggle: true, mode: mode }
  })),

  setCloseBuyWindow: () => set((state) => ({
    buyWindow: { ...state.buyWindow, toggle: false }
  })),

  fetchStocks: async () => {
    try {
      const response = await axios.get("http://localhost:5000/allStocks", {
        withCredentials: true,
      });
      
      const formattedData = response.data.map(stock => ({
        name: stock.symbol,
        price: stock.price,
        percent: stock.percent_change + "%",
        isDown: stock.isDown,
        symbol: stock.symbol,
      }));
      
      set({ watchList: formattedData });
    } catch (error) {
      console.error("Error fetching stocks:", error);
    }
  },

  fetchFunds: async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/funds", { withCredentials: true });
      set({ funds: response.data.funds });
    } catch (error) {
      console.error("Error fetching funds:", error);
    }
  },

  withdrawFunds: async (amount) => {
    try {
      const response = await axios.post("http://localhost:5000/api/funds/withdraw", { amount }, { withCredentials: true });
      set({ funds: response.data.funds });
      return { success: true, message: response.data.message };
    } catch (error) {
      return { success: false, message: error.response?.data?.message || "Withdrawal failed" };
    }
  },

  placeOrder: async (orderData) => {
    try {
      const response = await axios.post(`http://localhost:5000/api/order/${orderData.mode.toLowerCase()}`, orderData, { withCredentials: true });
      set({ funds: response.data.funds }); 
      return { success: true, message: response.data.message };
    } catch (error) {
      return { success: false, message: error.response?.data?.message || "Order failed" };
    }
  },

  fetchOrders: async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/orders", { withCredentials: true });
      set({ orders: response.data });
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  },

  fetchHoldings: async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/holdings", { withCredentials: true });
      set({ holdings: response.data });
    } catch (error) {
      console.error("Error fetching holdings:", error);
    }
  },

  fetchPositions: async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/positions", { withCredentials: true });
      set({ positions: response.data });
    } catch (error) {
      console.error("Error fetching positions:", error);
    }
  },

  fetchUser: async () => {
    try {
      const response = await axios.get("http://localhost:5000/auth/user", { withCredentials: true });
      set({ user: response.data });
    } catch (error) {
      console.error("Error fetching user:", error);
    }
  },

  setTriggers: async (triggerData) => {
    try {
      const response = await axios.post("http://localhost:5000/api/setTriggers", triggerData, { withCredentials: true });
      return { success: true, message: response.data.message };
    } catch (error) {
      return { success: false, message: error.response?.data?.message || "Failed to set triggers" };
    }
  },

  squareOffPosition: async (symbol) => {
    try {
      const response = await axios.post("http://localhost:5000/api/squareOff", { symbol }, { withCredentials: true });
      return { success: true, message: response.data.message };
    } catch (error) {
      return { success: false, message: error.response?.data?.message || "Failed to square off" };
    }
  },
});

const useStockStore = create(stockStore);

export default useStockStore;
