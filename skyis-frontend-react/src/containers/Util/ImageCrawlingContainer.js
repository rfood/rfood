import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as utilActions from '../../store/modules/util';
import SearchInput from "../../components/Common/SearchInput";
import Img from 'react-image';

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
        console.log(this.props.imageURL.toJS());
        return (
            <div className="container">
                <SearchInput onChange={this.handleChange} onClick={this.handleClick} value={this.state.input} label='이미지 검색'/>
                {
                    this.props.imageURL.toJS().size < 1 ?
                        null :
                        <Img src={this.props.imageURL.toJS()}/>
                }
            </div>
        );
    }
}
export default connect(
    (state) => ({
        status: state.util.get('status'),
        message: state.util.get('message'),
        imageURL: state.util.get('imageURL')
    }),
    (dispatch) => ({
        UtilActions: bindActionCreators(utilActions, dispatch)
    })
)(ImageCrawlingContainer);