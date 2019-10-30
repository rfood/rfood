import React, { Component } from 'react';
import { BrowserRouter } from 'react-router-dom';
import App from "components/App";
import { Provider } from  'react-redux';
import configure from "store/configure";

const store = configure();
class Root extends Component {
    render(){
        return(
            <Provider store={store}>
                <BrowserRouter>
                    <App />
                </BrowserRouter>
            </Provider>
        );
    }
}

export default Root;
/*
https://github.com/mui-org/material-ui/blob/master/docs/src/pages/getting-started/templates/Templates.js
https://material-ui.com/getting-started/templates/

 */