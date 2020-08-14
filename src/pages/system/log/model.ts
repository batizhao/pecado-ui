import { Effect, Reducer } from 'umi';
import { queryFakeList } from './service';

import { BasicListItemDataType } from './data.d';

export interface StateType {
  list: BasicListItemDataType[];
  // size?: number;
  current?: number;
  total?: number;
}

export interface ModelType {
  namespace: string;
  state: StateType;
  effects: {
    fetch: Effect;
    appendFetch: Effect;
    // submit: Effect;
  };
  reducers: {
    queryList: Reducer<StateType>;
    appendList: Reducer<StateType>;
  };
}

const Model: ModelType = {
  namespace: 'listBasicList',

  state: {
    list: [],
    total: 800,
    current: 1
  },

  effects: {
    *fetch({ payload }, { call, put }) {
      const response = yield call(queryFakeList, payload);
      yield put({
        type: 'queryList',
        payload: response,
      });
    },
    *appendFetch({ payload }, { call, put }) {
      const response = yield call(queryFakeList, payload);
      yield put({
        type: 'appendList',
        payload: response,
      });
    },
    // *submit({ payload }, { call, put }) {
    //   let callback;
    //   if (payload.id) {
    //     callback = Object.keys(payload).length === 1 ? removeFakeList : updateFakeList;
    //   } else {
    //     callback = addFakeList;
    //   }
    //   const response = yield call(callback, payload); // post
    //   yield put({
    //     type: 'queryList',
    //     payload: response,
    //   });
    // },
  },

  reducers: {
    queryList(state, action) {
      return {
        ...state,
        list: action.payload.data.records,
      };
    },
    appendList(state = { list: [] }, action) {
      return {
        ...state,
        list: state.list.concat(action.payload.data.records),
      };
    },
  },
};

export default Model;
