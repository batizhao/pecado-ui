import React, { FC, useEffect } from 'react';
import {
  Card,
  Col,
  Input,
  List,
  Radio,
  Row,
} from 'antd';

import { PageContainer } from '@ant-design/pro-layout';
import { connect, Dispatch } from 'umi';
import moment from 'moment';
import { StateType } from './model';
import { BasicListItemDataType } from './data.d';
import styles from './style.less';

const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;
const { Search } = Input;

interface ListBasicListProps {
  listBasicList: StateType;
  dispatch: Dispatch<any>;
  loading: boolean;
}

const Info: FC<{
  title: React.ReactNode;
  value: React.ReactNode;
  bordered?: boolean;
}> = ({ title, value, bordered }) => (
  <div className={styles.headerInfo}>
    <span>{title}</span>
    <p>{value}</p>
    {bordered && <em />}
  </div>
);

const ListContent = ({
  data: { description, createdTime, parameter, httpRequestMethod, clientId, username, ip, url, spend },
}: {
  data: BasicListItemDataType;
}) => (
  <div className={styles.listContent}>
    <div className={styles.listContentItem}>
      <span>{description}</span>
      <p>{httpRequestMethod}</p>
    </div>
    <div className={styles.listContentItem}>
      <span>{moment(createdTime).format('YYYY-MM-DD HH:mm')}</span>
      <p>耗时 {spend}ms</p>
    </div>
    <div className={styles.listContentItem}>
      <span>{clientId}</span>
      <p>{username}</p>
    </div>
    <div className={styles.listContentItem}>
      <span>调用 IP</span>
      <p>{ip}</p>
    </div>
  </div>
);

export const ListBasicList: FC<ListBasicListProps> = (props) => {
  const {
    loading,
    dispatch,
    listBasicList: { list, current, total },
  } = props;

  useEffect(() => {
    dispatch({
      type: 'listBasicList/fetch',
      payload: {
        current: current,
      },
    });
  }, [1]);

  const paginationProps = {
    // showSizeChanger: true,
    // showQuickJumper: true,
    pageSize: 10,
  };

  const extraContent = (
    <div className={styles.extraContent}>
      <RadioGroup defaultValue="all">
        <RadioButton value="all">全部</RadioButton>
        <RadioButton value="progress">正常</RadioButton>
        <RadioButton value="waiting">异常</RadioButton>
      </RadioGroup>
      <Search className={styles.extraContentSearch} placeholder="请输入" onSearch={() => ({})} />
    </div>
  );

  return (
    <div>
      <PageContainer>
        <div className={styles.standardList}>
          <Card bordered={false}>
            <Row>
              <Col sm={8} xs={24}>
                <Info title="单日 API 调用总数" value="35688" bordered />
              </Col>
              <Col sm={8} xs={24}>
                <Info title="调用平均处理时间" value="56毫秒" bordered />
              </Col>
              <Col sm={8} xs={24}>
                <Info title="本周 API 调用总数" value="508993" />
              </Col>
            </Row>
          </Card>

          <Card
            className={styles.listCard}
            bordered={false}
            title="基本列表"
            style={{ marginTop: 24 }}
            bodyStyle={{ padding: '0 32px 40px 32px' }}
            extra={extraContent}
          >
            <List
              size="large"
              rowKey="id"
              loading={loading}
              pagination={paginationProps}
              dataSource={list}
              renderItem={(item) => (
                <List.Item>
                  <List.Item.Meta
                    title={item.classMethod}
                    description={item.className}
                  />
                  <ListContent data={item} />
                </List.Item>
              )}
            />
          </Card>
        </div>
      </PageContainer>

    </div>
  );
};

export default connect(
  ({
    listBasicList,
    loading,
  }: {
    listBasicList: StateType;
    loading: {
      models: { [key: string]: boolean };
    };
  }) => ({
    listBasicList,
    loading: loading.models.listBasicList,
  }),
)(ListBasicList);
