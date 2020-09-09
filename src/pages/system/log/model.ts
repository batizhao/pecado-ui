import { Effect, Reducer } from 'umi';
import { queryLog } from './service';

import { SystemLog } from './data.d';

export interface StateType {
  list: SystemLog[],
  current: number,
  total: number,
}

export interface ModelType {
  namespace: string;
  state: StateType;
  effects: {
    fetch: Effect;
    appendFetch: Effect;
  };
  reducers: {
    queryList: Reducer<StateType>;
    appendList: Reducer<StateType>;
  };
}

const Model: ModelType = {
  namespace: 'systemLog',

  state: {
    list: [],
    current: 1,
    total: 0,
  },

  effects: {
    *fetch({ payload }, { call, put }) {
      const response = yield call(queryLog, payload);
      yield put({
        type: 'queryList',
        payload: response,
      });
    },
    *appendFetch({ payload }, { call, put }) {
      const response = yield call(queryLog, payload);
      yield put({
        type: 'appendList',
        payload: response,
      });
    },
  },

  reducers: {
    queryList(state, action) {
      return {
        ...state,
        list: action.payload.data.records,
        current: action.payload.data.current,
        total: action.payload.data.total,
        // data: action.payload.data.records,
      };
    },
    appendList(state, action) {
      return {
        ...state,
        list: state.list.concat(action.payload.data.records),
        current: action.payload.data.current,
        total: action.payload.data.total,
      };
    },
  },
};

export default Model;
