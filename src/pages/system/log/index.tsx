import React, { FC, useEffect, useState, ReactText }  from 'react';
import {
  Card,
  Col,
  Input,
  Radio,
  Row,
  Tag, 
  Space,
  Button,
  List, Avatar, Skeleton
} from 'antd';

import { PageContainer } from '@ant-design/pro-layout';
import ProList from '@ant-design/pro-list';
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

export const ListBasicList: FC<ListBasicListProps> = (props) => {
  const {
    // initLoading,
    loading,
    dispatch,
    listBasicList: { list, current },
  } = props;

  const [expandedRowKeys, setExpandedRowKeys] = useState<ReactText[]>([]);

  useEffect(() => {
    dispatch({
      type: 'listBasicList/fetch',
      payload: {
        current: current,
      },
    });
  },[1]);

  const onLoadMore = () => {
    dispatch({
      type: 'listBasicList/appendFetch',
      payload: {
        current: current+1,
      },
      callback: () => {
        window.dispatchEvent(new Event('resize'));
      }
    });
  };
  
  const loadMore =
      !loading ? (
        <div
          style={{
            textAlign: 'center',
            marginTop: 12,
            height: 32,
            lineHeight: '32px',
          }}
        >
          <Button onClick={onLoadMore}>loading more</Button>
        </div>
      ) : null;

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
              className={styles.listCard}
              itemLayout="vertical"
              loading={loading}
              loadMore={loadMore}
              dataSource={list}
              renderItem={item => (
                <List.Item>
                  <Skeleton avatar title={false} loading={item.loading} active>
                    <List.Item.Meta
                      title={<a href="https://ant.design"> {item.classMethod} <Space size={0}>
                            <Tag color="blue">{item.description}</Tag>
                            <Tag color="#5BD8A6">{item.httpRequestMethod}</Tag>
                            <Tag color="green">{item.clientId}</Tag>
                            <Tag color="purple">{item.username}</Tag>
                            <Tag color="geekblue">{item.ip}</Tag>
                            <Tag color="orange">{item.createdTime}</Tag>
                            <Tag color="pink">{item.spend}ms</Tag>
                            <Tag color="geekblue">{item.url}</Tag>
                          </Space>
                        </a>}
                      description={item.id}
                    />
                    <div>ResponseInfo(code=0, message=ok, data=UserInfoVO(userVO=UserVO(id=1, username=admin, password=$2a$10$rFoOrbWD2p.1CjBoBqTeaOUgpxFmtZknsDEvF78AsMXvsxU1AyAZu, email=admin@qq.com, name=系统管理员, avatar=https://gw.alipayobjects.com/zos/antfincdn/XAosXuNZyF/BiazfanxmamNRoxxVxka.png, unreadCount=0, locked=0, createdTime=2016-09-29T10:00, roleList=null), permissions=null, roles=null))</div>
                  </Skeleton>
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
