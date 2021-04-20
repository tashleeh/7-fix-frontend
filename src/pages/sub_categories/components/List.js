import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { Table, Avatar, Spin } from 'antd'
import { DropOption } from 'components'
import { Trans } from '@lingui/react'
import { Link, connect } from 'umi'
import UpdateSubCategory from '../update'

@connect(({ loading, dispatch, subCategories }) => ({
  loading,
  dispatch,
  subCategories,
}))
class List extends PureComponent {
  state = {
    updateFlag: false,
  }
  componentDidMount() {
    const { dispatch } = this.props
    dispatch({
      type: 'subCategories/list',
      payload: {},
    })
  }

  handleMenuClick = (record, e) => {
    const { dispatch } = this.props
    const { key } = e
    if (key === '1') {
      // history.push({ pathname: `/sub_categories/update/${record._id}` })
      this.setState({
        updateFlag: true,
        data: record,
      })
    } else if (key === '2') {
      dispatch({
        type: 'subCategories/delete',
        payload: { id: record._id },
      })
    }
  }

  render() {
    const { subCategories, loading } = this.props
    const columns = [
      {
        title: <Trans>name Ar</Trans>,
        dataIndex: 'nameAr',
        key: 'nameAr',
        render: (text, record) => (
          <Link to={`sub_category/${record.id}`}>{text}</Link>
        ),
      },
      {
        title: <Trans>name En</Trans>,
        dataIndex: 'nameEn',
        key: 'nameEn',
        render: (text, record) => (
          <Link to={`sub_category/${record.id}`}>{text}</Link>
        ),
      },
      {
        title: <Trans>Duration</Trans>,
        dataIndex: 'duration',
        key: 'duration',
        render: (text, record) => (
          <Link to={`category/${record.id}`}>{text}</Link>
        ),
      },
      {
        title: <Trans>Category</Trans>,
        dataIndex: ['category', 'nameEn'],
        key: 'category',
        render: (text, record) => (
          <Link to={`sub_category/${record.id}`}>{text}</Link>
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
      <Spin spinning={loading?.models?.subCategories}>
        {updateFlag ? (
          <UpdateSubCategory data={data} />
        ) : (
          <Table
            pagination={true}
            bordered
            columns={columns}
            dataSource={subCategories?.list}
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
