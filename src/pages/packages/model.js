/* global window */

import modelExtend from 'dva-model-extend'
import api from 'api'
import { pageModel } from 'utils/model'
import { message } from 'antd'
import { routerRedux } from 'dva/router'
import { delay } from 'redux-saga'
import _ from 'lodash'

const { packagesList, createPackage, deletePackage, updatePackage } = api

export default modelExtend(pageModel, {
  namespace: 'packages',

  state: {
    list: [],
    total: 0,
    npPages: 0,
    pageSize: 25,
  },
  effects: {
    *list({ payload }, { put, call }) {
      const data = yield call(packagesList, payload)
      if (data.success) {
        const { packages, length } = data
        yield put({
          type: 'updateState',
          payload: {
            list: packages,
            total: length,
          },
        })
      } else {
        throw data
      }
    },
    *delete({ payload }, { put, call }) {
      const data = yield call(deletePackage, payload)
      if (data.success) {
        yield put({
          type: 'deleteFromList',
          payload: data.data.result,
        })
      } else {
        throw data
      }
    },
    *create({ payload }, { put, call }) {
      try {
        const data = yield call(createPackage, payload)
        if (data.success) {
          yield delay(6000)
          message.success('Package has been added successfuly!')
          yield put(routerRedux.push('/packages'))
        } else {
          throw data
        }
      } catch (error) {
        message.error(error)
      }
    },
    *update({ payload }, { put, call }) {
      try {
        const data = yield call(updatePackage, payload)
        if (data.success) {
          yield delay(6000)
          message.success('Package has been updated successfully')
          window.location.reload()
        } else {
          throw data
        }
      } catch (error) {
        message.error(error)
      }
    },
  },
  reducers: {
    deleteFromList(state, { payload }) {
      const newState = JSON.parse(JSON.stringify(state))
      const { list } = newState
      const newList =
        list && _.isArray(list) && list.filter((row) => row._id !== payload.id)
      return {
        ...state,
        list: newList,
      }
    },
    updateState(state, { payload }) {
      return {
        ...state,
        ...payload,
      }
    },
  },
})
