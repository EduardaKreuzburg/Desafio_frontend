import { createContext, useState } from 'react';

export const OrderContext = createContext([]);

export const OrderContextProvider = ({ children }) => {
  const [orders, setStateOrders] = useState([]);

  const setOrders = (order) => {
    setStateOrders(order);
  };

  return (
    <OrderContext.Provider
      value={{
        orders,
        setOrders,
      }}
    >
      {children}
    </OrderContext.Provider>
  );
};
