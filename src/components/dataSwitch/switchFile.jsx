import React, {Component,PropTypes} from 'react';
import moment from 'moment';
import {Link} from 'react-router';

import { Table , Button , Tooltip , Select} from 'antd';

import DataCompareModal from './dataCompareModal';
import LoadingComponent from '../loading';

import columns from 'data/table-columns/createFile';
import bank from 'data/bank';

//redux
import {bindActionCreators} from 'redux';
import { connect } from 'react-redux';
import * as Actions from 'actions';


 class SwitchFile extends React.Component{
    constructor(){
        super();
        this.state={
            batchNo:"",
            bankName:"",
            pay_way:"1",
            page:1
        }
    }
    static contextTypes = {
        router: PropTypes.object
    };
    showFileModal = () => {
      this.props.showFileModal()
    }
    goBack = () => {
      this.context.router.push('dataSwitch')
    }
    getColumns = () => {
        const {page} = this.state;
        columns[0].render = (record , text , index) =>{
            return <span>{(index + 1)+(page-1)*10}</span>
        }
        return columns
    }
    componentDidMount(){
      const {batchno} = this.props.location.query;
      this.setState({
        batchNo:batchno
      })
      //调取代发申请人员信息接口
        this.props.getPayagentDetail({batchNo:batchno,count:"10",skip:"0"})
    }
    //页码回调
    onChangePagination = (page) => {
        const {batchno} = this.props.location.query;
        const skip = page*10-10;
        this.setState({
            page
        })
        this.props.getPayagentDetail({batchNo:batchno,count:"10",skip})
    }
    handleChange = (field,value) => {
        this.setState({
            [field]:value
        })
    }
    dataSwitch = () => {
        const {batchNo , bankName , pay_way} = this.state;
        const {getPayagentDetail} = this.props;
        this.props.dataSwitch({batchNo , bankName , pay_way},getPayagentDetail);
    }
    createPayFile = () => {
        const {batchno} = this.props.location.query;
        this.props.createPayFile({batchNo:batchno})
    }
    render(){
        const { 
            isLoading , 
            payagentDetail,
            isSwitchLoading ,
            isFileModal ,
            createFileLoading
        } = this.props;
        const {tblPayApplyModel , tblPayInfo={} , list , size} = payagentDetail;
        const {batchno} = this.props.location.query;
        return(
            <div className="layout common">
                <div className="leadingResult">
                    <h2 className="File-title">生成银行代发文件</h2>
                    <ul className="data-info switchFileUl">
                        <li><span>批次号：</span><span>{tblPayApplyModel?tblPayApplyModel.batchno:""}</span></li>
                        <li><span>公司名称：</span><span>{tblPayApplyModel?tblPayApplyModel.corpname:""}</span></li>
                        <li><span>代发文件名：</span><span>{tblPayApplyModel?tblPayApplyModel.payapplyfilename:""}</span></li>
                        <li><span>总笔数：</span><span>{tblPayApplyModel?tblPayApplyModel.totalcount:""}</span></li>
                        <li style={{height:30}}><span>总金额：</span><span>{tblPayApplyModel?tblPayApplyModel.totalamount:""}</span></li>
                        <li><span>申请日期：</span><span>{tblPayApplyModel?moment(tblPayApplyModel.applydate).format("YYYY-MM-DD"):""}</span></li>
                        <li><span>处理状态：</span><span>{tblPayApplyModel?tblPayApplyModel.status===0?"全部成功":tblPayApplyModel.status===1?"部分成功":tblPayApplyModel.status===2?"待处理":tblPayApplyModel.status===3?"处理中":tblPayApplyModel.status===4 ? "拒绝处理":"暂无":""}</span></li>
                    </ul>
                    <div className="File-btn switchFile">
                        <div className="switchFile-select">
                            <span className="select-name">银行：</span>
                            <Select defaultValue="招商银行" onChange={this.handleChange.bind(this,"bankName")}>
                                {
                                    bank.map((item, index)=>{
                                        return (<Option value={item.text}>{item.text}</Option>)
                                    })
                                }
                            </Select>
                            <span className="select-name selectSecond">代发方式：</span>
                            <Select defaultValue="公对私" onChange={this.handleChange.bind(this,"pay_way")}>
                              <Option value="1">公对私</Option>
                              <Option value="2">私对私</Option>
                            </Select>
                        </div>
                        {
                            !tblPayInfo.activeflag && 
                            <Button 
                                type="primary" 
                                loading={isSwitchLoading} 
                                onClick={this.dataSwitch}
                            >
                                数据转换
                            </Button>
                        }
                        {
                            tblPayInfo.activeflag && 
                            <Button 
                                type="primary" 
                                onClick={this.showFileModal}
                            >
                                数据转换结果核对
                            </Button>
                        }
                        &nbsp;&nbsp;

                        <Tooltip title="先检查是否已完成数据的转换">
                            <Button 
                                type="primary" 
                                loading={createFileLoading} 
                                onClick={this.createPayFile}
                            >
                                生成代发文件
                            </Button>
                        </Tooltip> 
                        &nbsp;&nbsp;
                        <Button type="primary" onClick= {this.goBack}>直接退回</Button>
                    </div>
                    <div className="File">
                        <span>银行代发文件：</span>
                        <a>12121212121.xls</a>
                        <a>12121212121.xls</a>
                        <a>12121212121.xls</a>
                    </div>
                    <div className="result-table">
                        <Table 
                            columns={this.getColumns()} 
                            dataSource={list?list:[]} 
                            bordered={true}
                            loading={isLoading}
                            pagination={{
                                total:size,
                                defaultPageSize: 10,
                                onChange:this.onChangePagination
                            }}
                        />
                    </div>
                </div>
                {isLoading && <LoadingComponent/>}
                {isFileModal && <DataCompareModal batchNo={batchno}/>}
            </div>
        )
    }
}
const mapStateToProps = state => ({
   isFileModal: state.DataSwitch.isFileModal,
   isLoading: state.DataSwitch.isLoading,
   payagentDetail: state.DataSwitch.payagentDetail,
   isSwitchLoading:state.DataSwitch.isSwitchLoading,
   createFileLoading: state.DataSwitch.createFileLoading
})
const mapDispatchToProps = dispatch => ({
   showFileModal: bindActionCreators(Actions.DataSwitchActions.showFileModal, dispatch),
   hideFileModal: bindActionCreators(Actions.DataSwitchActions.hideFileModal, dispatch),
   getPayagentDetail: bindActionCreators(Actions.DataSwitchActions.getPayagentDetail, dispatch),
   dataSwitch: bindActionCreators(Actions.DataSwitchActions.dataSwitch, dispatch),
   createPayFile: bindActionCreators(Actions.DataSwitchActions.createPayFile, dispatch)
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(SwitchFile);