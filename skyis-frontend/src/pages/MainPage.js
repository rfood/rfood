import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';

class MainPage extends Component {
    render(){
        return(
            <div>
                <Link to="/page/ingredient">
                    <Button variant="contained" color="primary">
                        Ingredient
                    </Button>
                </Link>
            </div>

        );
    }
}

export default MainPage;