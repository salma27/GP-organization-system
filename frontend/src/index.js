import React from "react";
import ReactDOM from "react-dom";
import {App} from "./components/App";
import "./index.css";
import reportWebVitals from "./reportWebVitals";
import {AuthContextProvider} from "context";
import makeServer from "api";

makeServer();

ReactDOM.render(
    <React.StrictMode>
        <AuthContextProvider>
            <App />
        </AuthContextProvider>
    </React.StrictMode>,
    document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
