import { Effect } from 'dva';
import { Reducer } from 'redux';

import {  fetchCurrent } from '@/services/menu';

export interface MenuItem {
  path?: string;
  name?: string;
  children?: MenuItem[];
}

export interface MenuModelState {
  currentMenu?: MenuItem[];
}

export interface MenuModelType {
  namespace: 'menu';
  state: MenuModelState;
  effects: {
    fetchCurrent: Effect;
  };
  reducers: {
    saveCurrentMenu: Reducer<MenuModelState>;
  };
}

const MenuModel: MenuModelType = {
  namespace: 'menu',

  state: {
    currentMenu: [],
  },

  effects: {
    *fetchCurrent(_, { call, put }) {
      const response = yield call(fetchCurrent);
      yield put({
        type: 'saveCurrentMenu',
        payload: response.data,
      });
    },
  },

  reducers: {
    saveCurrentMenu(state, action) {
      return {
        ...state,
        currentMenu: action.payload ||[],
      };
    },
  },
};

export default MenuModel;