import React from "react";
import { Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import AppLayout from "./layout/AppLayout";
import routes from "./routes";
import AuthProvider from "./context/AuthProvider";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "react-toastify/dist/ReactToastify.css";

const App = () => {
   return (
      <AuthProvider>
         <ToastContainer
            position="top-right"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="light"
         />
         <AppLayout>
            <Routes>
               {routes.map(({ path, element: Page }, index) => (
                  <Route path={path} element={<Page />} key={index} />
               ))}
            </Routes>
         </AppLayout>
      </AuthProvider>
   );
};

export default App;
