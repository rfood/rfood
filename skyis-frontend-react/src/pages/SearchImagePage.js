import React, { Component } from 'react';
import PageTitle from "components/Common/PageTitle";
import ImageCrawlingContainer from "../containers/Util/ImageCrawlingContainer";

class SearchImagePage extends Component {
    render(){
        return(
            <React.Fragment>
                <PageTitle title="음식 사진 크롤링"/>
                <ImageCrawlingContainer/>
            </React.Fragment>
        );
    }
}

export default SearchImagePage;