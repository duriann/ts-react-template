import React, {Component} from 'react';
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux';
import * as actions from './index.action';
import * as Util from '../../../../util';
import CommonDetail from '../../../components/detail/';
import {data} from './data';

class Detail extends Component{
    constructor(props){
        super(props);

        this._getMemberDetail = this._getMemberDetail.bind(this);
    }

    _getMemberDetail() {
        let id = Util.getUrlArg('id');
        this.props.getMemberDetail({id: id});
    }

    componentWillMount() {
        this._getMemberDetail();
    }

    componentWillUpdate (nextProps, nextState) {
        Util.fetchCallback({
            status: nextProps.MemberDetail.memberDetailStatus,
            code: nextProps.MemberDetail.memberDetailCode,
            message: nextProps.MemberDetail.memberDetailMessage,
            updateStatus: nextProps.updateMemberDetailStatus
        });
    }
    
    render(){
        return (
            <CommonDetail
                data={data}
                value={this.props.MemberDetail.memberDetailData}
                history={this.props.history}
            /> 
        )

    }
}

export default connect(
    (state) =>{
        return {MemberDetail:state. MemberDetail}
    },
    (dispatch) => bindActionCreators({...actions}, dispatch)

)(Detail);




