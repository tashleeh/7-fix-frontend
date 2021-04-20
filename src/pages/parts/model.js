/* global window */

import modelExtend from 'dva-model-extend'
import api from 'api'
import { pageModel } from 'utils/model'
import { message } from 'antd'
import { routerRedux } from 'dva/router'
import { delay } from 'redux-saga'
import _ from 'lodash'

const { partsList, createPart, updatePart, deletePart } = api

export default modelExtend(pageModel, {
  namespace: 'parts',

  state: {
    list: [],
    total: 0,
    npPages: 0,
    pageSize: 25,
  },
  effects: {
    *list({ payload }, { put, call }) {
      try {
        const data = yield call(partsList, payload)
        if (data.success) {
          const { Parts, partsLength } = data
          yield put({
            type: 'updateState',
            payload: {
              list: Parts,
              total: partsLength,
            },
          })
        } else {
          throw data
        }
      } catch (error) {
        message.error(error)
      }
    },
    *create({ payload }, { put, call }) {
      try {
        const data = yield call(createPart, payload)
        if (data.success) {
          yield delay(6000)
          message.success('Part has been added successfuly!')
          yield put(routerRedux.push('/Parts'))
        } else {
          throw data
        }
      } catch (error) {
        message.error(error)
      }
    },
    *update({ payload }, { put, call }) {
      try {
        console.log('payload', payload)
        const data = yield call(updatePart, payload)
        if (data.success) {
          yield delay(6000)
          message.success('part has been changed successfully')
          window.location.reload()
        } else {
          throw data
        }
      } catch (error) {
        message.error(error)
      }
    },
    *delete({ payload }, { put, call }) {
      const data = yield call(deletePart, payload)
      if (data.success) {
        yield put({
          type: 'deleteFromList',
          payload: data.data.result,
        })
        window.location.reload()
      } else {
        message.error(data)
      }
    },
  },
  reducers: {
    updateState(state, { payload }) {
      return {
        ...state,
        ...payload,
      }
    },
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
  },
})
