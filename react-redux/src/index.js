import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import store from "./store";
import {Provider} from "react-redux";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        {/*在组件中使用数据*/}
        <Provider store={store}>
            <App/>
        </Provider>
    </React.StrictMode>
);

