// import { constants } from 'crypto-browserify';
import 'react-native-gesture-handler';
import "./globals";
import "react-native-get-random-values";
import React from "react";
import { Provider } from "react-redux";
import store from "./app/store";
import IsUserAvailable from "./portal/isUserAvailable";
import tailwind from 'twrnc';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { ApolloProvider } from '@apollo/client';
import client from './apollo-client';
import { useFonts } from 'expo-font';

export default function App() {
  let [fontLoaded] = useFonts({
    "Lato-Regular": require("./assets/Lato/Lato-Regular.ttf"),
    "Lato-Bold": require("./assets/Lato/Lato-Bold.ttf")
  })

  if (!fontLoaded) {
    return undefined
  }

  return (
    <ApolloProvider client={client}>
      <Provider store={store}>
        <GestureHandlerRootView style={tailwind`flex-1 w-full`}>
          <IsUserAvailable />
        </GestureHandlerRootView>
      </Provider>
    </ApolloProvider>
  );
}
