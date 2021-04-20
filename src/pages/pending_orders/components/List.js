import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { Table, Avatar, Spin } from 'antd'
import { DropOption } from 'components'
import { Trans } from '@lingui/react'
import { Link, connect } from 'umi'

@connect(({ loading, pendingOrders }) => ({
  loading,
  pendingOrders,
}))
class List extends PureComponent {
  componentDidMount() {
    const { dispatch } = this.props
    dispatch({
      type: 'pendingOrders/list',
      payload: {},
    })
  }

  render() {
    const { pendingOrders, loading } = this.props

    const columns = [
      {
        title: <Trans>Order Type</Trans>,
        dataIndex: 'orderType',
        key: 'orderType',
        render: (text, record) => <Link to={``}>{text}</Link>,
      },
      {
        title: <Trans>Location Type</Trans>,
        dataIndex: ['location', 'type'],
        key: 'type',
        render: (text, record) => <Link to={``}>{text}</Link>,
      },
      {
        title: <Trans>Location Coordinates</Trans>,
        dataIndex: ['location', 'coordinates'],
        key: 'coordinates',
        render: (text, record) => <Link to={``}>{text}</Link>,
      },
      {
        title: <Trans>Email</Trans>,
        dataIndex: ['user', 'email'],
        key: 'userEmail',
        render: (text, record) => <Link to={``}>{text}</Link>,
      },
      {
        title: <Trans>First Name</Trans>,
        dataIndex: ['user', 'firstName'],
        key: 'firstName',
        render: (text, record) => <Link to={``}>{text}</Link>,
      },
      {
        title: <Trans>Last Name</Trans>,
        dataIndex: ['user', 'lastName'],
        key: 'lastName',
        render: (text, record) => <Link to={``}>{text}</Link>,
      },
      {
        title: <Trans>House Type</Trans>,
        dataIndex: ['user', 'houseType'],
        key: 'houseType',
        render: (text, record) => <Link to={``}>{text}</Link>,
      },
      {
        title: <Trans>House Number</Trans>,
        dataIndex: ['user', 'houseNumber'],
        key: 'houseNumber',
        render: (text, record) => <Link to={``}>{text}</Link>,
      },
      {
        title: <Trans>isConfirmed</Trans>,
        dataIndex: ['user', 'isConfirmed'],
        key: 'isConfirmed',
        render: (text, record) => (
          <Link to={``}>{text === true ? 'Confirmed' : 'not Confirmed'}</Link>
        ),
      },
      {
        title: <Trans>onModel</Trans>,
        dataIndex: 'onModel',
        key: 'onModel',
      },
      {
        title: <Trans>order Status</Trans>,
        dataIndex: 'orderStatus',
        key: 'orderStatus',
        fixed: 'right',
      },
    ]
    return (
      <Spin spinning={loading?.models?.pendingOrders}>
        <Table
          pagination={true}
          bordered
          columns={columns}
          dataSource={pendingOrders?.list}
          simple
          rowKey={(record) => record.id}
          scroll={{ x: 1800 }}
        />
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
