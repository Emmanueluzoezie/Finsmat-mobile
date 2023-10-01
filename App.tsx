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

export default function App() {

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
