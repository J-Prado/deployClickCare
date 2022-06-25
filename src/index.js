import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { Provider } from "react-redux";
import store, { persistor } from "./redux/store";
import { BrowserRouter } from "react-router-dom";
import { CookiesProvider } from "react-cookie";
import { Auth0Provider } from "@auth0/auth0-react";
// import { PersistGate } from "redux-persist/lib/integration/react";
import dotenv from "dotenv";
import axios from "axios";
dotenv.config();

axios.defaults.baseURL = process.env.REACT_APP_API;

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  // <React.StrictMode>
  <Auth0Provider
    domain="dev-ki9sx4tm.us.auth0.com"
    clientId="pBIdcRGrq8M2290vczUH4R2xfnYKnmQT"
    redirectUri={window.location.origin}
  >
    <CookiesProvider>
      <Provider store={store}>
        <BrowserRouter>
          {/* <PersistGate persistor={persistor}> */}
          <App />
          {/* </PersistGate> */}
        </BrowserRouter>
      </Provider>
    </CookiesProvider>
  </Auth0Provider>
  // </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
