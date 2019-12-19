import React, { Component } from 'react';
import PageTitle from "components/Common/PageTitle";
import FileUploadContainer from "../containers/Util/FileUploadContainer";

class UploadPage extends Component {
    render(){
        return(
            <React.Fragment>
                <PageTitle title="음식 데이터 업로드"/>
                <FileUploadContainer/>
            </React.Fragment>
        );
    }
}

export default UploadPage;