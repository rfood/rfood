import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import { MainPage, FoodPage, IngredientPage} from "pages";
class App extends Component {
    render(){
        return(
            <div>
                <Switch>
                    <Route exact path="/" component={MainPage} />
                    <Route path="/page/food" component={FoodPage} />
                    <Route path="/page/ingredient" component={IngredientPage} />
                </Switch>
            </div>
        )
    };
}

export default App;