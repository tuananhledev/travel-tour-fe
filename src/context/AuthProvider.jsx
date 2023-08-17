import React, { createContext, useState } from "react";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
   const [auth, setAuth] = useState(() => JSON.parse(localStorage.getItem("auth")) || null);
   const [cart, setCart] = useState(() => JSON.parse(localStorage.getItem('cart')) || [])

   return <AuthContext.Provider value={{ auth, setAuth, cart, setCart }}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
