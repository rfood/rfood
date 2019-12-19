import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as utilActions from '../../store/modules/util';
import SearchInput from "../../components/Common/SearchInput";

class ImageCrawlingContainer extends Component {
    state = {
        input: '',
    }
    handleChange = (e) => {
        const { value } = e.target;
        this.setState({
            input: value
        });
    }

    searchImage = async(input) => {
        const { UtilActions } = this.props;
        try {
            await UtilActions.searchImageWithURL(input);
        } catch(e) {
            console.log(e);
        }
    }

    handleClick = () => {
        this.searchImage(this.state.input);
    }

    render() {
        return (
            <div className="container">
                <SearchInput onChange={this.handleChange} onClick={this.handleClick} value={this.state.input} label='이미지 검색'/>
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
)(ImageCrawlingContainer);