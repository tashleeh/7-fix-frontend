import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { Table, Avatar, Spin } from 'antd'
import { DropOption } from 'components'
import { Trans } from '@lingui/react'
import { Link, connect } from 'umi'
import UpdatePackage from '../update'

@connect(({ loading, dispatch, packages }) => ({
  loading,
  dispatch,
  packages,
}))
class List extends PureComponent {
  state = {
    updateFlag: false,
  }
  componentDidMount() {
    const { dispatch } = this.props
    dispatch({
      type: 'packages/list',
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
        type: 'packages/delete',
        payload: { id: record._id },
      })
    }
  }

  render() {
    const { packages, loading } = this.props
    const { updateFlag, data } = this.state
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
          <Link to={`package/${record.id}`}>{text}</Link>
        ),
      },
      {
        title: <Trans>name En</Trans>,
        dataIndex: 'nameEn',
        key: 'nameEn',
        render: (text, record) => (
          <Link to={`package/${record.id}`}>{text}</Link>
        ),
      },
      {
        title: <Trans>Description En</Trans>,
        dataIndex: 'descriptionEn',
        key: 'descriptionEn',
        render: (text, record) => (
          <Link to={`package/${record.id}`}>{text}</Link>
        ),
      },
      {
        title: <Trans>Description Ar</Trans>,
        dataIndex: 'descriptionAr',
        key: 'descriptionAr',
        render: (text, record) => (
          <Link to={`package/${record.id}`}>{text}</Link>
        ),
      },
      {
        title: <Trans>Discount</Trans>,
        dataIndex: 'discount',
        key: 'discount',
        render: (text, record) => (
          <Link to={`package/${record.id}`}>{text}</Link>
        ),
      },
      {
        title: <Trans>Base Price</Trans>,
        dataIndex: 'basePrice',
        key: 'basePrice',
        render: (text, record) => (
          <Link to={`package/${record.id}`}>{text}</Link>
        ),
      },
      {
        title: <Trans>Type</Trans>,
        dataIndex: 'type',
        key: 'type',
        render: (text, record) => (
          <Link to={`package/${record.id}`}>{text}</Link>
        ),
      },
      {
        title: <Trans>Number of visit</Trans>,
        dataIndex: 'numberOfVisit',
        key: 'numberOfVisit',
        render: (text, record) => <Link to={``}>{text}</Link>,
      },
      {
        title: <Trans>Duration</Trans>,
        dataIndex: 'duration',
        key: 'duration',
        render: (text, record) => <Link to={``}>{text}</Link>,
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

    return (
      <Spin spinning={loading?.models?.packages}>
        {updateFlag ? (
          <UpdatePackage data={data} />
        ) : (
          <Table
            pagination={true}
            bordered
            columns={columns}
            dataSource={packages?.list}
            simple
            rowKey={(record) => record.id}
            scroll={{ x: 1600 }}
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
