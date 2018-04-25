import React from 'react';
import moment from 'moment';
import {Link} from 'react-router';
import { Table , Button , Tooltip , Input, DatePicker , Icon ,Spin ,notification } from 'antd';

import columns from 'data/table-columns/dataSwitch';
import LoadingComponent from './loading';

//redux
import {bindActionCreators} from 'redux';
import { connect } from 'react-redux';
import * as Actions from 'actions';


 class DataSwitch extends React.Component{
    constructor(){
        super();
        this.state={
            corpName:"",
            startDate:"",
            endDate:"",
            batchno:"",
            page:1
        }
    }
    skip = 0;
    onChange = (e) => {
        this.setState({
            corpName:e.target.value
        })
    }
    dateChange = (field,value,dateString) => {
        this.setState({
            [field]:moment(value).format("YYYYMMDD")
        })
    }
    queryList = () => {
        const {corpName , startDate , endDate} = this.state;
        const skip = this.skip;
        this.props.getDataSwitchList({corpName , startDate , endDate,skip,count:'10'})
    }
    getColumns = () => {
        const {page} = this.state;
        columns[0].render = (text,record,index) => {           
            return  <a>{(index+1)+(page-1)*5}</a>
        }
        columns[columns.length-2].render = (text,record,index) => {
            return  <span>{record.status===0?"全部成功":record.status===1?"部分成功":record.status===2?"待处理":record.status===3?"处理中":record.status===4 ? "拒绝处理":"暂无"}</span>
        }
        columns[columns.length-1].render = (text,record,index)=>{
            return <a onClick = {this.checkDetail.bind(this,record)}>明细</a>;
        }
        return columns;
    }
    //明细查询
    checkDetail = (record) => {
        console.log(record)
        //this.props.getDetail({batchNo:batchno , count:10 , skip:0})
    }
    //页码回调
    onChangePagination = (page) => {
        this.setState({
            page
        })
        this.skip = page * 5 - 5;
        this.queryList();
    }
    rowSelection = () =>{
         const _this = this;
        // 通过 rowSelection 对象表明需要行选择
         return {
            type:'radio',
            onSelect(record, selected, selectedRows) {
                    _this.setState({
                        batchno:record.batchno
                    })
                }
        };
     } 
    createFile = () => {
         const {batchno} = this.state;
         if(!batchno){
            notification.warning({
                message: '请选择代发申请文件'
            });
         }else{
            window.location.hash = `#/createFile?batchno=${batchno}`
         }
    }
    render(){
        const {corpName , startDate , endDate  ,batchno} = this.state;
        const {isLoading , dataSwitchList={}} = this.props,
                data = dataSwitchList.list?dataSwitchList.list:[],//列表数据
                count = dataSwitchList.count;//总条数 
        return(
            <div className=" layout common">
                <div className="error handle">
                    <h2 className="File-title">申请受理查询</h2>
                    <ul className="data-info handle-info">
                        <li>
                            <span>公司名称：</span>
                            <Input 
                                className="input" 
                                placeholder="公司名称" 
                                value={corpName}
                                onChange = {this.onChange}
                            />
                        </li>
                        <li className="date handle-date">
                            <span className="date-title">代发申请日期：</span>
                            <DatePicker
                                placeholder="开始日期" 
                                onChange={this.dateChange.bind(this,"startDate")}
                            />
                            <span className="date-to">To</span>
                            <DatePicker
                                placeholder="结束日期"
                                onChange={this.dateChange.bind(this,"endDate")}
                            />
                            <Button 
                                className="query-btn" 
                                type="primary"
                                onClick={this.queryList}
                            >
                                查询
                            </Button>
                        </li>
                    </ul>
                    <div className="list">
                        <h2>列表</h2>
                        <div className="people-select">
                            <Button 
                                type="primary"
                                onClick= {this.createFile}
                            >
                                <Icon type="retweet" />
                                生成银行代发文件
                            </Button> 
                        </div>
                    </div>
                    <div className="err-table">
                        <Table 
                            rowSelection={this.rowSelection()} 
                            columns={this.getColumns()} 
                            dataSource={data} 
                            bordered={true} 
                            loading={isLoading}
                            pagination={{
                                defaultPageSize: 5,
                                total: count,
                                onChange:this.onChangePagination
                            }}
                        />
                    </div>
                </div>
                {isLoading && <Spin delay={5000}/>}
            </div>
        )
    }
}
const mapStateToProps = state => ({
    dataSwitchList: state.DataSwitch.dataSwitchList,
    isLoading: state.DataSwitch.isLoading
})
const mapDispatchToProps = dispatch => ({
    getDataSwitchList: bindActionCreators(Actions.DataSwitchActions.getDataSwitchList, dispatch),
    getDetail: bindActionCreators(Actions.DataSwitchActions.getDetail, dispatch)
})
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(DataSwitch);