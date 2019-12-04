import Mock from 'mockjs'
import { doCustomTimes } from '@/libs/util'
import orgData from './data/org-data'
import { treeData } from './data/tree-select'
const Random = Mock.Random

// 使用MOCK生成账号管理假数据
export const getAccountData = req => {
  let accountData = []
  doCustomTimes(5, () => {
    accountData.push(Mock.mock({
      name: '@name',
      email: '@email',
      createTime: '@date',
      phone: Random.natural(10000000000, 19999999999),
      disabled: Random.boolean()
    }))
  })
  return accountData
}

// 使用MOCK生成用户管理假数据
export const getUserData = req => {
  let userData = []
  doCustomTimes(10, () => {
    userData.push(Mock.mock({
      name: '@name',
      nickname: '@name',
      createTime: '@date',
      phone: Random.natural(10000000000, 19999999999),
      disabled: Random.boolean()
    }))
  })
  return userData
}

// 使用MOCK生成群管理假数据
export const getGroupData = req => {
  let groupData = []
  doCustomTimes(10, () => {
    groupData.push(Mock.mock({
      name: '@name',
      nickname: '@name',
      createTime: '@date',
      phone: Random.natural(10000000000, 19999999999),
      disabled: Random.boolean()
    }))
  })
  return groupData
}

export const getDragList = req => {
  let dragList = []
  doCustomTimes(5, () => {
    dragList.push(Mock.mock({
      name: Random.csentence(10, 13),
      id: Random.increment(10)
    }))
  })
  return dragList
}

export const uploadImage = req => {
  return Promise.resolve()
}

export const getOrgData = req => {
  return orgData
}

export const getTreeSelectData = req => {
  return treeData
}
