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
import Success from '../SignupPage/Success'

/**
 * Container Page
 *
 * @description: Container Page containing all the MFEs
 * @returns Combined MFEs
 */


const router = createBrowserRouter([
  {
    path: "/",
    element: <WelcomeScreen />,
  },

  {
    path: "/signup",
    element: <Signup />,
  },
  {
    path: "/success",
    element: <Success />,
  },
  {
    path: "/dashboard",
    element: <Dashboard />,
  },
  {
    path: "/linkBank",
    element: <LinkBankAccount />,
  },
  {
    path: "/addMoney",
    element: <AddMoneyToWallet />,
  }
]);

function ContainerPageNoKeyCloak  ( ){
useEffect(()=>{

},[])

  return(
   <div className="maincontainer">
   
  <Suspense fallback={<div>Loading</div>}>
        <div className="container-page">
        
        <RouterProvider router={router} />
        </div>
  </Suspense>
  </div>)
};

export default ContainerPageNoKeyCloak;
