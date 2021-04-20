import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { Table, Avatar, Spin } from 'antd'
import { DropOption } from 'components'
import { Trans } from '@lingui/react'
import { history, Link, connect } from 'umi'
import styles from './List.less'
import UpdateDepartment from '../update'

@connect(({ loading, dispatch, departments }) => ({
  loading,
  dispatch,
  departments,
}))
class List extends PureComponent {
  state = {
    updateFlag: false,
  }
  componentDidMount() {
    const { dispatch } = this.props
    dispatch({
      type: 'departments/list',
      payload: {},
    })
  }

  handleMenuClick = (record, e) => {
    const { dispatch } = this.props
    const { key } = e
    if (key === '1') {
      // history.push({
      //   pathname: `/departments/update/${JSON.stringify(record)}`,
      // })
      this.setState({
        updateFlag: true,
        data: record,
      })
    } else if (key === '2') {
      dispatch({
        type: 'departments/delete',
        payload: { id: record._id },
      })
    }
  }

  render() {
    const { departments, loading } = this.props
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
          <Link to={`department/${record.id}`}>{text}</Link>
        ),
      },
      {
        title: <Trans>name En</Trans>,
        dataIndex: 'nameEn',
        key: 'nameEn',
        render: (text, record) => (
          <Link to={`department/${record.id}`}>{text}</Link>
        ),
      },
      {
        title: <Trans>Service</Trans>,
        dataIndex: ['service', 'nameEn'],
        key: 'service',
        render: (text, record) => (
          <Link to={`department/${record.id}`}>{text}</Link>
        ),
      },
      {
        title: <Trans>Type</Trans>,
        dataIndex: 'type',
        key: 'type',
        render: (text, record) => (
          <Link to={`department/${record.id}`}>{text}</Link>
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
      <>
        <Spin spinning={loading?.models?.departments}>
          {updateFlag ? (
            <UpdateDepartment data={data} />
          ) : (
            <Table
              pagination={true}
              className={styles.table}
              bordered
              columns={columns}
              dataSource={departments?.list}
              simple
              rowKey={(record) => record.id}
            />
          )}
        </Spin>
      </>
    )
  }
}

List.propTypes = {
  onDeleteItem: PropTypes.func,
  onEditItem: PropTypes.func,
  location: PropTypes.object,
}

export default List
