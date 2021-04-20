import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { Table, Avatar, Spin } from 'antd'
import { DropOption } from 'components'
import { Trans } from '@lingui/react'
import { Link, connect } from 'umi'
import UpdateCategory from '../update'

@connect(({ loading, categories }) => ({
  loading,
  categories,
}))
class List extends PureComponent {
  state = {
    updateFlag: false,
  }
  componentDidMount() {
    const { dispatch } = this.props
    dispatch({
      type: 'categories/list',
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
        type: 'categories/delete',
        payload: { id: record._id },
      })
    }
  }

  render() {
    const { categories, loading } = this.props
    const columns = [
      {
        title: <Trans>Image</Trans>,
        dataIndex: 'image',
        key: 'image',
        fixed: 'left',
        render: (text) => <Avatar style={{ marginLeft: 8 }} src={text} />,
      },
      {
        title: <Trans>Name Ar</Trans>,
        dataIndex: 'nameAr',
        key: 'nameAr',
        render: (text, record) => (
          <Link to={`category/${record.id}`}>{text}</Link>
        ),
      },
      {
        title: <Trans>Name En</Trans>,
        dataIndex: 'nameEn',
        key: 'nameEn',
        render: (text, record) => (
          <Link to={`category/${record.id}`}>{text}</Link>
        ),
      },
      {
        title: <Trans>Price</Trans>,
        dataIndex: 'price',
        key: 'price',
        render: (text, record) => (
          <Link to={`category/${record.id}`}>{text}</Link>
        ),
      },
      {
        title: <Trans>Department</Trans>,
        dataIndex: ['department', 'nameEn'],
        key: 'department',
        render: (text, record) => (
          <Link to={`category/${record.id}`}>{text}</Link>
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
      <Spin spinning={loading?.models?.categories}>
        {updateFlag ? (
          <UpdateCategory data={data} />
        ) : (
          <Table
            pagination={true}
            bordered
            columns={columns}
            dataSource={categories?.list}
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
