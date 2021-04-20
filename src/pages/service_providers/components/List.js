import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { Table, Avatar, Spin } from 'antd'
import { DropOption } from 'components'
import { Trans } from '@lingui/react'
import { Link, connect } from 'umi'

@connect(({ loading, ServiceProviders }) => ({
  loading,
  ServiceProviders,
}))
class List extends PureComponent {
  componentDidMount() {
    const { dispatch } = this.props
    dispatch({
      type: 'ServiceProviders/list',
      payload: {},
    })
  }

  handleMenuClick = (record, e) => {
    const { dispatch } = this.props

    dispatch({
      type: 'ServiceProviders/update',
      payload: { id: record._id },
    })
  }

  render() {
    const { ServiceProviders, loading } = this.props
    const columns = [
      {
        title: <Trans>Image</Trans>,
        dataIndex: 'image',
        key: 'image',
        fixed: 'left',
        render: (text) => <Avatar style={{ marginLeft: 8 }} src={text} />,
      },
      {
        title: <Trans>full Name Ar</Trans>,
        dataIndex: 'fullNameAr',
        key: 'fullNameAr',
        render: (text, record) => <Link to={``}>{text}</Link>,
      },
      {
        title: <Trans>full Name En</Trans>,
        dataIndex: 'fullNameEn',
        key: 'fullNameEn',
        render: (text, record) => <Link to={``}>{text}</Link>,
      },

      {
        title: <Trans>approvied</Trans>,
        dataIndex: 'approvied',
        key: 'approvied',
        render: (text, record) => <Link to={``}>{text}</Link>,
      },
      {
        title: <Trans>Email</Trans>,
        dataIndex: 'email',
        key: 'email',
        render: (text, record) => <Link to={``}>{text}</Link>,
      },
      {
        title: <Trans>CR</Trans>,
        dataIndex: 'CR',
        key: 'CR',
        render: (text, record) => <Link to={''}>{text}</Link>,
      },
      {
        title: <Trans>City</Trans>,
        dataIndex: 'city',
        key: 'city',
        render: (text, record) => <Link to={''}>{text}</Link>,
      },
      {
        title: <Trans>Company Name</Trans>,
        dataIndex: 'companyName',
        key: 'companyName',
        render: (text, record) => <Link to={``}>{text}</Link>,
      },
      {
        title: <Trans>Nationality</Trans>,
        dataIndex: 'nationality',
        key: 'nationality',
        render: (text, record) => <Link to={``}>{text}</Link>,
      },
      {
        title: <Trans>Neighborhood</Trans>,
        dataIndex: 'neighborhood',
        key: 'neighborhood',
        render: (text, record) => <Link to={``}>{text}</Link>,
      },
      {
        title: <Trans>Phone Number</Trans>,
        dataIndex: 'phoneNumber',
        key: 'phoneNumber',
        render: (text, record) => <Link to={``}>{text}</Link>,
      },
      {
        title: <Trans>Street Name</Trans>,
        dataIndex: 'streetName',
        key: 'streetName',
        render: (text, record) => <Link to={``}>{text}</Link>,
      },
      {
        title: <Trans>Type</Trans>,
        dataIndex: 'type',
        key: 'type',
        render: (text, record) => <Link to={``}>{text}</Link>,
      },
      {
        title: <Trans>Status</Trans>,
        dataIndex: 'status',
        key: 'status',
      },
      {
        title: <Trans>ِAction</Trans>,
        key: 'Action',
        fixed: 'right',
        render: (text, record) => {
          return (
            <DropOption
              onMenuClick={(e) => this.handleMenuClick(record, e)}
              menuOptions={[{ key: '1', name: 'Approve' }]}
            />
          )
        },
      },
    ]
    return (
      <Spin spinning={loading?.models?.ServiceProviders}>
        <Table
          pagination={true}
          bordered
          columns={columns}
          dataSource={ServiceProviders?.list}
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
