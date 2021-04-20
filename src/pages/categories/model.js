import modelExtend from 'dva-model-extend'
import api from 'api'
import { pageModel } from 'utils/model'
import { message } from 'antd'
import { routerRedux } from 'dva/router'
import { delay } from 'redux-saga'
import _ from 'lodash'

const { categoriesList, createCategory, deleteCategory, updateCategory } = api

export default modelExtend(pageModel, {
  namespace: 'categories',

  state: {
    list: [],
    total: 0,
    npPages: 0,
    pageSize: 25,
  },
  effects: {
    *list({ payload }, { put, call }) {
      try {
        const data = yield call(categoriesList, payload)
        if (data.success) {
          const { categories, categoryLength } = data
          yield put({
            type: 'updateState',
            payload: {
              list: categories,
              total: categoryLength,
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
        const data = yield call(createCategory, payload)
        if (data.success) {
          yield delay(6000)
          message.success('Category has been Added Successfuly!')
          yield put(routerRedux.push('/categories'))
        } else {
          throw data
        }
      } catch (error) {
        message.error(error)
      }
    },
    *delete({ payload }, { put, call }) {
      try {
        const data = yield call(deleteCategory, payload)
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
        const data = yield call(updateCategory, payload)
        if (data.success) {
          yield delay(6000)
          message.success('Category has been updated successfuly')
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
