import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { Table, Avatar, Spin } from 'antd'
import { DropOption } from 'components'
import { Trans } from '@lingui/react'
import { Link, connect } from 'umi'
import moment from 'moment'

@connect(({ loading, adminOrders }) => ({
  loading,
  adminOrders,
}))
class List extends PureComponent {
  componentDidMount() {
    const { dispatch } = this.props
    dispatch({
      type: 'adminOrders/list',
      payload: {},
    })
  }

  render() {
    const { adminOrders, loading } = this.props

    const columns = [
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
        title: <Trans>Email</Trans>,
        dataIndex: ['user', 'email'],
        key: 'userEmail',
        render: (text, record) => <Link to={``}>{text}</Link>,
      },
      {
        title: <Trans>Phone Number</Trans>,
        dataIndex: ['user', 'phoneNumber'],
        key: 'phoneNumber',
        render: (text, record) => <Link to={``}>{text}</Link>,
      },
      {
        title: <Trans>Order Type</Trans>,
        dataIndex: 'orderType',
        key: 'orderType',
        render: (text, record) => <Link to={``}>{text}</Link>,
      },
      {
        title: <Trans>Invoice ID</Trans>,
        dataIndex: ['invoice', '_id'],
        key: 'invoice',
        render: (text, record) => <Link to={``}>{text}</Link>,
      },
      {
        title: <Trans>isPaid</Trans>,
        dataIndex: ['invoice', 'isPaid'],
        key: 'invoice',
        render: (text, record) => (
          <Link to={``}>{text == true ? 'paid' : 'unpaid'}</Link>
        ),
      },
      {
        title: <Trans>Order Status</Trans>,
        dataIndex: 'orderStatus',
        key: 'orderStatus',
        render: (text, record) => <Link to={``}>{text}</Link>,
      },
      {
        title: <Trans>Order Category</Trans>,
        dataIndex: ['orderDetails', 'category'],
        key: 'category',
        render: (categories, record) => (
          <Link to={``}>{categories.map((elm) => elm.nameEn)}</Link>
        ),
      },
      {
        title: <Trans>Order Category</Trans>,
        dataIndex: ['orderDetails', 'category'],
        key: 'category',
        render: (categories, record) => (
          <Link to={``}>{categories.map((elm) => elm.nameAr)}</Link>
        ),
      },
      {
        title: <Trans>Time Of Order</Trans>,
        dataIndex: ['timeOfOrder', 'date'],
        key: 'date',
        render: (text, record) => (
          <Link to={``}>{moment(text).format('YYYY MM DD')}</Link>
        ),
      },
      {
        title: <Trans>Time Of Order</Trans>,
        dataIndex: ['timeOfOrder', 'start'],
        key: 'date',
      },
      {
        title: <Trans>Provider</Trans>,
        dataIndex: 'provider',
        key: 'provider',
        render: (text, record) => (
          <Link to={``}>{text ? text : 'Pending'}</Link>
        ),
        fixed: 'right',
      },
    ]

    return (
      <Spin spinning={loading?.global}>
        <Table
          pagination={true}
          bordered
          columns={columns}
          dataSource={adminOrders?.list}
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
