/* global window */

import modelExtend from 'dva-model-extend'
import api from 'api'
import { pageModel } from 'utils/model'
import { message } from 'antd'
import { routerRedux } from 'dva/router'
import { delay } from 'redux-saga'
import _ from 'lodash'

const {
  subCategoriesList,
  createSubCategory,
  deleteSubCategory,
  updateSubCategory,
} = api

export default modelExtend(pageModel, {
  namespace: 'subCategories',

  state: {
    list: [],
    total: 0,
    npPages: 0,
    pageSize: 25,
  },
  effects: {
    *list({ payload }, { put, call }) {
      const data = yield call(subCategoriesList, payload)
      try {
        if (data.success) {
          const { subCategories, subCategoyLength } = data
          yield put({
            type: 'updateState',
            payload: {
              list: subCategories,
              total: subCategoyLength,
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
        const data = yield call(createSubCategory, payload)
        if (data.success) {
          yield delay(6000)
          message.success('Sub Category has been added successfuly!')
          yield put(routerRedux.push('/sub_categories'))
        } else {
          throw data
        }
      } catch (error) {
        message.error(error)
      }
    },
    *delete({ payload }, { put, call }) {
      const data = yield call(deleteSubCategory, payload)
      try {
        if (data.success) {
          yield put({
            type: 'deleteFromList',
            payload: data.data.result,
          })
        } else {
          throw data
        }
      } catch (error) {
        message.error(error)
      }
    },
    *update({ payload }, { put, call }) {
      try {
        const data = yield call(updateSubCategory, payload)
        if (data.success) {
          yield delay(6000)
          message.success('sub category has been changed successfully')
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
