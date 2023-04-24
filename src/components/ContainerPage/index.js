import React, { Suspense } from "react";
import { Provider } from "react-redux";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import WelcomeScreen from "../WelcomeScreen";
import { useEffect } from "react";
import Dashboard from "../Dashboard";
import LinkBankAccount from "../LinkBankAccount";
import AddMoneyToWallet from "../AddMoneyToWallet";
import RenderOnAnonymous from "../../RenderOnAnonymous";
import RenderOnAuthenticated from "../../RenderOnAuthenticated";
import Signup from "../SignupPage";
import Header from "../Header";
import Wallet from "../Wallet"

/**
 * Container Page
 *
 * @description: Container Page containing all the MFEs
 * @returns Combined MFEs
 */
const router = createBrowserRouter([
  {
    path: "/",
    element: <Dashboard />,
  },
  {
    path: "/linkBank",
    element: <LinkBankAccount />,
  },
  {
    path: "/addMoney",
    element: <AddMoneyToWallet />,
  },
  {
    path: "/wallet",
    element: <Wallet />,
  }
]);

const routersignup = createBrowserRouter([
  {
    path: "/",
    element: <WelcomeScreen />,
  },

  {
    path: "/signup",
    element: <Signup />,
  },
]);

function ContainerPage  ({ store }){
useEffect(()=>{

},[])

  return(
   <div className="maincontainer">
  <Suspense fallback={<div>Loading</div>}>
 <Provider store={store}> 
      <RenderOnAnonymous>
      <div className="container-page">
        <RouterProvider router={routersignup} />
        </div>
      </RenderOnAnonymous>
      <RenderOnAuthenticated>
        <div className="container-page">
       
        <RouterProvider router={router} >
        <Header></Header>
          </RouterProvider>
         </div>
      </RenderOnAuthenticated>
    </Provider>

  </Suspense>
  </div>)
};

export default ContainerPage;
