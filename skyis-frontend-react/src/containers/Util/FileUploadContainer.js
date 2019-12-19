import React, { Component } from 'react';
import CSVReader from 'react-csv-reader';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as utilActions from '../../store/modules/util';

class FileUploadContainer extends Component {
    postFoodData = async(foodData, ingredientData) => {
        const { UtilActions } = this.props;
        try {
            await UtilActions.uploadFoodData(foodData, ingredientData);
        } catch(e) {
            console.log(e);
        }
    }
    handleForce = (data) => {
        let foodData = [], ingredientData = [];
        for(let row of data) {
            if(row[0] === '순번' || row[2] === undefined) continue;
            foodData.push({'name': row[2], 'type': row[1], 'serving': row[4] , 'source': row[3]});
            let ingredients = [];
            for(let i = 6; i <= 63; i += 3){
                if(row[i] == '' || row[i] === undefined) break;
                ingredients.push({'code': row[i], 'amount': row[i+1]});
            }
            ingredientData.push(ingredients);
        }
        this.postFoodData(foodData, ingredientData);
    }

    render() {
        return (
            <div className="container">
                <CSVReader
                    cssClass='react-csv-input'
                    label='Select CSV with secret death Start'
                    onFileLoaded={this.handleForce}
                />
                <h1> {this.props.status} </h1>
                <h1> {this.props.message} </h1>
            </div>
        );
    }
}
export default connect(
    (state) => ({
        status: state.util.get('status'),
        message: state.util.get('message')
    }),
    (dispatch) => ({
        UtilActions: bindActionCreators(utilActions, dispatch)
    })
)(FileUploadContainer);