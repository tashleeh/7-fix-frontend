import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { Table, Avatar, Spin } from 'antd'
import { DropOption } from 'components'
import { Trans } from '@lingui/react'
import { history, Link, connect } from 'umi'

import styles from './list.less'
import UpdateService from '../update'

@connect(({ loading, services }) => ({ loading, services }))
class List extends PureComponent {
  state = {
    updateFlag: false,
  }
  componentDidMount() {
    const { dispatch } = this.props
    dispatch({
      type: 'services/list',
      payload: {},
    })
  }

  handleMenuClick = (record, e) => {
    const { dispatch } = this.props
    const { key } = e
    if (key === '1') {
      this.setState({
        updateFlag: true,
        data: record,
      })
    } else if (key === '2') {
      dispatch({
        type: 'services/delete',
        payload: { id: record._id },
      })
    }
  }
  render() {
    const { services, loading } = this.props
    const columns = [
      {
        title: <Trans>Image</Trans>,
        dataIndex: 'image',
        key: 'image',
        fixed: 'left',
        render: (text) => <Avatar style={{ marginLeft: 8 }} src={text} />,
      },
      {
        title: <Trans>name Ar</Trans>,
        dataIndex: 'nameAr',
        key: 'nameAr',
        render: (text, record) => (
          <Link to={`service/${record.id}`}>{text}</Link>
        ),
      },
      {
        title: <Trans>name En</Trans>,
        dataIndex: 'nameEn',
        key: 'nameEn',
        render: (text, record) => (
          <Link to={`service/${record.id}`}>{text}</Link>
        ),
      },
      {
        title: <Trans>Status</Trans>,
        dataIndex: 'status',
        key: 'status',
      },
      {
        title: <Trans>Operation</Trans>,
        key: 'operation',
        fixed: 'right',
        render: (text, record) => {
          return (
            <DropOption
              onMenuClick={(e) => this.handleMenuClick(record, e)}
              menuOptions={[
                { key: '1', name: 'Update' },
                { key: '2', name: 'Delete' },
              ]}
            />
          )
        },
      },
    ]
    const { updateFlag, data } = this.state
    return (
      <Spin spinning={loading?.global}>
        {updateFlag ? (
          <UpdateService data={data} />
        ) : (
          <Table
            pagination={true}
            className={styles.table}
            bordered
            columns={columns}
            dataSource={services?.list}
            simple
            rowKey={(record) => record.id}
          />
        )}
      </Spin>
    )
  }
}

List.propTypes = {
  onDeleteItem: PropTypes.func,
  onEditItem: PropTypes.func,
  location: PropTypes.object,
}

export default List
