import React, { Component } from 'react';
import { Switch, Router } from 'react-router-dom';
import { FoodPage} from "pages";

class App extends Component {
    render(){
        return(
            <div>
                <Switch>
                    <Router exact path="/" component={FoodPage}/>
                </Switch>
            </div>
        )
    };
}

export default App;