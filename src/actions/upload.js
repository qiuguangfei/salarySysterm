import * as types from '../constants/upload';
import {AjaxByToken} from 'utils/ajax';
import {Modal} from 'antd';

const SHOW_FILE_MODAL  = {type: types.SHOW_FILE_MODAL};
const HIDE_FILE_MODAL = {type: types.HIDE_FILE_MODAL};
const UPLOAD_FILE_START = {type: types.UPLOAD_FILE_START};
const UPLOAD_FILE_DONE = {type: types.UPLOAD_FILE_DONE};

//上传文件
export const uploadFile = (data, props) => (dispatch, getState) => {
    dispatch(UPLOAD_FILE_START);
    AjaxByToken('/api/web/file/uploadFile', {
        data: data,
    })
    .then(res=>{
        dispatch(UPLOAD_FILE_DONE)
    })
}