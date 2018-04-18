import React from 'react';
import axios from 'axios';
import moment from 'moment';
import {Link} from 'react-router';

import {AjaxByToken} from 'utils/ajax';
import {Input, Button, Table} from 'antd';

//redux
import {bindActionCreators} from 'redux';
import { connect } from 'react-redux';
import * as Actions from 'actions';


 class BasicManage extends React.Component{
    constructor(){
        super();
        this.state={
            
        }
    }
    render(){
        const columns = [
            {
            title: '序号',
            dataIndex: 'key',
            }, {
            title: '姓名',
            dataIndex: 'name',
            render: text => <a href="#">{text}</a>,
          }, {
            title: '卡号',
            dataIndex: 'age',
          }, {
            title: '银行名称',
            dataIndex: 'address',
          }, {
            title: '开户行',
            dataIndex: 'bank',
          }, {
            title: '金额',
            dataIndex: 'sum',
          }, {
            title: '备注',
            dataIndex: 'remark',
          }];
        const data = [{
            key: '1',
            name: '胡彦斌',
            age: 3212121212121212,
            address: '中国建设银行',
            bank:"中国建设银行",
            sum:"2134",
            remark:"66666"
          }, {
            key: '2',
            name: '胡彦祖',
            age: 4212121212121212,
            address: '中国建设银行',
            bank:"中国建设银行",
            sum:"2134",
            remark:"66666"
          }, {
            key: '3',
            name: '李大嘴',
            age: 3212121212121212,
            address: '中国建设银行',
            bank:"中国建设银行",
            sum:"2134",
            remark:"66666"
          }];

          // 通过 rowSelection 对象表明需要行选择
          const rowSelection = {
            onChange(selectedRowKeys, selectedRows) {
              console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
            },
            onSelect(record, selected, selectedRows) {
              console.log(record, selected, selectedRows);
            },
            onSelectAll(selected, selectedRows, changeRows) {
              console.log(selected, selectedRows, changeRows);
            },
          };
        return(
            <div className=" layout common">
                {/* 基础管理 */}
                <div className="basicManage">
                    <h2 className="File-title">查询</h2>
                    <div className="handle-block">
                        <div className="inline-block">
                            <span className="title">参数类型:</span>
                            <Input style={{width: 200}}/>
                        </div>
                        <div className="inline-block">
                            <span className="title">参数值</span>
                            <Input style={{width: 200}}/>
                        </div>  
                        <Button type="primary" style={{marginLeft: 20}}>查询</Button>
                    </div>
                    <h2 className="File-title">列表</h2>
                    <div className="table-area">
                        <div className="control">
                            <Button icon="plus-square" style={{marginRight: 50}}>新增</Button>
                            <Button icon="delete">删除</Button>
                        </div>
                        <Table rowSelection={rowSelection} columns={columns} dataSource={data} bordered={true}/>
                    </div>
                </div>
            </div>
        )
    }
}
const mapStateToProps = state => ({
    
})
const mapDispatchToProps = dispatch => ({
   
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(BasicManage);