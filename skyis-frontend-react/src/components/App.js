import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import { } from "pages";
import {
    MainPage,
    IngredientSearchPage,
    IngredientInsertPage,
    NutrientPage,
    UploadPage,
    SearchImagePage
} from "../pages";
class App extends Component {
    render(){
        return(
            <div>
                <Switch>
                    <Route exact path="/" component={MainPage} />
                    <Route path="/page/ingredient/search" component={IngredientSearchPage} />
                    <Route path="/page/ingredient/insert" component={IngredientInsertPage}/>
                    <Route path="/page/nutrient/ingredient" component={NutrientPage} />
                    <Route path="/page/util/upload" component={UploadPage} />
                    <Route path="/page/util/image" component={SearchImagePage} />

                </Switch>
            </div>
        )
    };
}

export default App;