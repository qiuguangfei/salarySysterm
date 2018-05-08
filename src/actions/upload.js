import * as types from '../constants/upload';
import {AjaxByToken} from 'utils/ajax';
import axios from 'axios';
import store from 'store';
import FileSaver from 'file-saver';

const SHOW_PAY_AGENT_COMMIT_MODAL = { type: types.SHOW_PAY_AGENT_COMMIT_MODAL };
const HIDE_PAY_AGENT_COMMIT_MODAL = { type: types.HIDE_PAY_AGENT_COMMIT_MODAL };
const GET_FILENAMES = { type: types.GET_FILENAMES };

//模板下载
export const downloadExcel = (fileName) => (dispatch, getState) => {
    const token = store.get('token');
    axios({
        url: `${prefixUri}/api/web/file/downloadTemplate`,
        method: 'get',
        responseType: 'arraybuffer',
        params: {
            token,
            fileName: fileName
        }
    })
    .then(res=>{
        const blob = new Blob([res.data], {type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"});
        FileSaver.saveAs(blob,'模板.xlsx');
    }).catch(error=>{
        console.log(error)
    });
}

export const showPayAgentCommitModal = () => (dispatch,getState) => {
    dispatch(SHOW_PAY_AGENT_COMMIT_MODAL);
}
export const hidePayAgentCommitModal = () => (dispatch,getState) => {
    dispatch(HIDE_PAY_AGENT_COMMIT_MODAL);
}

export const getFileNames = () => (dispatch,getState) => {
    AjaxByToken('api/system/template/filenames', {
        head: {
            transcode: 'S000022',
        },
    }).then(res => {
        dispatch({...GET_FILENAMES, fileNameData: res.data});
    }, err => {
        console.log(err)
    })
}

