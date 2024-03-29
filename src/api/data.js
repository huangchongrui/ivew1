import axios from '@/libs/api.request'
// 获取账号管理假数据
export const getAccountData = () => {
  return axios.request({
    url: 'get_account_data',
    method: 'get'
  })
}

// 获取用户管理假数据
export const getUserData = () => {
  return axios.request({
    url: 'get_user_data',
    method: 'get'
  })
}

// 获取群管理假数据
export const getGroupData = () => {
  return axios.request({
    url: 'get_group_data',
    method: 'get'
  })
}

export const getDragList = () => {
  return axios.request({
    url: 'get_drag_list',
    method: 'get'
  })
}

export const errorReq = () => {
  return axios.request({
    url: 'error_url',
    method: 'post'
  })
}

export const saveErrorLogger = info => {
  return axios.request({
    url: 'save_error_logger',
    data: info,
    method: 'post'
  })
}

export const uploadImg = formData => {
  return axios.request({
    url: 'image/upload',
    data: formData
  })
}

export const getOrgData = () => {
  return axios.request({
    url: 'get_org_data',
    method: 'get'
  })
}

export const getTreeSelectData = () => {
  return axios.request({
    url: 'get_tree_select_data',
    method: 'get'
  })
}
