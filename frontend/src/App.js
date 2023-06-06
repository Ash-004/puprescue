import {React, useEffect, useContext} from "react";
import './App.css';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Home from "./Components/Home";
import Login from "./Components/Login";
import Listings from "./Components/Listings";
import {CssBaseline} from "@mui/material";
import Header from "./Components/header";
import Testing from "./Components/testing";
import Register from "./Components/Register";
import Add from "./Components/Add";
import  {useImmerReducer} from "use-immer";

import DispatchContext from "./Contexts/DispatchContext";
import StateContext from "./Contexts/StateContext";
import ListingDetails from "./Components/ListingDetails";



    function App() {
        const initialState = {
            userUsername: localStorage.getItem("theUserUsername"),
            userEmail: localStorage.getItem("theUserEmail"),
            userId: localStorage.getItem("theUserId"),
            userToken: localStorage.getItem("theUserToken"),
            userIsLogged: localStorage.getItem("theUserUsername") ? true : false,
        };

        function ReducerFuction(draft, action) {
            switch (action.type) {
                case "catchToken":
                    draft.userToken = action.tokenValue;
                    break;
                case "userSignsIn":
                    draft.userUsername = action.usernameInfo;
                    draft.userEmail = action.emailInfo;
                    draft.userId = action.IdInfo;
                    draft.userIsLogged = true;
                    break;

                case "logout":
                    draft.userIsLogged = false;
                    break;
            }
        }

        const [state, dispatch] = useImmerReducer(ReducerFuction, initialState);



    return(

      <>
<StateContext.Provider value={state}>
<DispatchContext.Provider value={dispatch}>

                  <CssBaseline />
                  <BrowserRouter>
                      <Header style={{zIndex:2}}/>
                      <Routes>
                          <Route path = '/' element={<Home/>}/>
                          <Route path = '/login' element={<Login/>}/>
                          <Route path = '/register' element={<Register/>}/>
                          <Route path = '/add' element={<Add/>}/>
                          <Route path = '/listings' element={<Listings/>}/>
                          <Route path='/listings/:id' element={<ListingDetails/>}/>
                      </Routes>


                  </BrowserRouter>
</DispatchContext.Provider>
</StateContext.Provider>


      </>
  )}
export default App;
