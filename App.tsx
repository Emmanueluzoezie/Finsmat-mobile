// import { constants } from 'crypto-browserify';
import 'react-native-gesture-handler';
import "./globals";
import "react-native-get-random-values";
import React, { useEffect, useState } from "react";
import { Provider, useDispatch } from "react-redux";
import store from "./app/store";
import IsUserAvailable from "./portal/isUserAvailable";
import tailwind from 'twrnc';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

export default function App() {
  // const [key, setKey] = useState("");
  // const [userInfo, setUserInfo] = useState("");
  // const [console, setConsole] = useState("");
  // const [web3auth, setWeb3Auth] = useState(null);


  return (
    <Provider store={store}>
      <GestureHandlerRootView style={tailwind`flex-1 w-full`}>
        <IsUserAvailable />
      </GestureHandlerRootView>
    </Provider>
  );
}
