import { Effect } from 'umi';
import { message } from 'antd';
import { addOrUpdateMenu } from './service';

export interface ModelType {
  namespace: string;
  state: {};
  effects: {
    submit: Effect;
  };
}

const Model: ModelType = {
  namespace: 'imsMenu',

  state: {},

  effects: {
    *submit({ payload }, { call }) {
      yield call(addOrUpdateMenu, payload);
      message.success('提交成功');
    },
  },
};

export default Model;