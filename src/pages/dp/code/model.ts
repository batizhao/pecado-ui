import { Effect } from 'umi';
import { message } from 'antd';
import { addOrUpdateConfig } from './service';

export interface ModelType {
  namespace: string;
  state: {};
  effects: {
    submit: Effect;
  };
}

const Model: ModelType = {
  namespace: 'dpCode',

  state: {},

  effects: {
    *submit({ payload }, { call }) {
      yield call(addOrUpdateConfig, payload);
      message.success('下载成功');
    },
  },
};

export default Model;