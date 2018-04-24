import * as types from '../constants/apply';
import {AjaxByToken} from 'utils/ajax';
import store from 'store';
import {notification} from 'antd'; 

// 代发申请列表查询接口 
const APPLY_LIST_START = { type: types.APPLY_LIST_START };
const APPLY_LIST_DONE = { type: types.APPLY_LIST_DONE };
const GET_APPLY_LIST = { type: types.GET_APPLY_LIST };
const UPLOAD_START = { type: types.UPLOAD_START };
const UPLOAD_DONE = { type: types.UPLOAD_DONE };
const SHOW_DETAIL_MODAL = { type: types.SHOW_DETAIL_MODAL };
const HIDE_DETAIL_MODAL = { type: types.HIDE_DETAIL_MODAL };

//api/apply/payagent_apply
export const payAgentApply = (data, func) => (dispatch, getState) => {
    dispatch(UPLOAD_START);
    AjaxByToken('api/apply/payagent_apply', {
        head: {
            transcode: 'A000001',
        },
        data: data
    }).then(res => {
        dispatch({...UPLOAD_DONE,isUploadSucc:true});
        func({skip: 0,count: 10})
        console.log(res)
    }, err => {
        dispatch(UPLOAD_DONE);
        notification.error({
            message: '提示',
            description: err.data.msg
        });
        console.log(err)
    })
}

//代发申请列表查询接口
export const getApplyList = (params) => (dispatch, getState) => {
    dispatch(APPLY_LIST_START);
    AjaxByToken('api/apply/payagent_applylist', {
        head: {
            transcode: 'A000002',
        },
        data: params
    }).then(res => {
        dispatch(APPLY_LIST_DONE);
        dispatch({...GET_APPLY_LIST, list: res.data.list});
    }, err => {
        dispatch(APPLY_LIST_DONE);
        console.log(err)
    })
}

//提供批次号 提交代发申请 
export const payAgentCommit = (batchNoList) => (ispatch, getState) => {
    AjaxByToken('api/apply/payagent_commit', {
        head: {
            transcode: 'A000003',
        },
        data: batchNoList
    }).then(res => {
        console.log(res)
    }, err => {
        console.log(err)
    })
}

//提供批次号 删除该次申请
export const payAgentDel = (batchNoList, func) => (ispatch, getState) => {
    AjaxByToken('api/apply/payagent_del', {
        head: {
            transcode: 'A000004',
        },
        data: batchNoList
    }).then(res => {
        console.log(res)
        func({skip: 0,count: 10})
    }, err => {
        notification.error({
            message: '提示',
            description: err.data.msg
        });
        console.log(err)
    })
}

//代发申请明细查询接口
export const payAgentApplyDetaillist = (params) => (ispatch, getState) => {
    dispatch(DETAIL_LIST_START)
    AjaxByToken('api/apply/payagent_applydetaillist', {
        head: {
            transcode: 'A000005',
        },
        data: params
    }).then(res => {
        dispatch(DETAIL_LIST_DONE)
        console.log(res)
    }, err => {
        dispatch(DETAIL_LIST_DONE)
        console.log(err)
    })
}

export const showDetailModal = () => (dispatch,getState) => {
    dispatch(SHOW_DETAIL_MODAL)
}
export const hideDetailModal = () => (dispatch,getState) => {
    dispatch(HIDE_DETAIL_MODAL)
}