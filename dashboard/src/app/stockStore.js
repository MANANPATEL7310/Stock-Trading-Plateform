import {create} from 'zustand';
import { holdings } from '../data/data';

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

});



const useStockStore =create(stockStore);

export default useStockStore;