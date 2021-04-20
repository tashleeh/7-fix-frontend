import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { Table, Avatar, Spin } from 'antd'
import { DropOption } from 'components'
import { Trans } from '@lingui/react'
import { Link, connect } from 'umi'

@connect(({ loading, invoices }) => ({
  loading,
  invoices,
}))
class List extends PureComponent {
  componentDidMount() {
    const { dispatch } = this.props
    dispatch({
      type: 'invoices/list',
      payload: {},
    })
  }

  render() {
    const { invoices, loading } = this.props
    const columns = [
      {
        title: <Trans>Image</Trans>,
        dataIndex: 'image',
        key: 'image',
        fixed: 'left',
        render: (text) => <Avatar style={{ marginLeft: 8 }} src={text} />,
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
        title: <Trans>is Paid</Trans>,
        dataIndex: 'isPaid',
        key: 'isPaid',
        render: (text, record) => (
          <Link to={``}>{text === true ? 'Paid' : 'Un Paid'}</Link>
        ),
      },
      {
        title: <Trans>Model</Trans>,
        dataIndex: 'onModel',
        key: 'onModel',
        render: (text, record) => <Link to={``}>{text}</Link>,
      },
      {
        title: <Trans>total Amount</Trans>,
        dataIndex: 'totalAmount',
        key: 'totalAmount',
        render: (text, record) => <Link to={``}>{text}</Link>,
      },
      {
        title: <Trans>Total Amount With Tax</Trans>,
        dataIndex: 'totalAmountWithTax',
        key: 'totalAmountWithTax',
        render: (text, record) => <Link to={``}>{text}</Link>,
      },
    ]
    return (
      <Spin spinning={loading?.models?.invoices}>
        <Table
          pagination={true}
          bordered
          columns={columns}
          dataSource={invoices?.list}
          simple
          rowKey={(record) => record.id}
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
