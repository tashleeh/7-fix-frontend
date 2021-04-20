import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { Table, Avatar, Spin } from 'antd'
import { DropOption } from 'components'
import { Trans } from '@lingui/react'
import { connect } from 'umi'
import moment from 'moment'
import UpdateOffer from '../update'

@connect(({ loading, dispatch, offers }) => ({
  loading,
  dispatch,
  offers,
}))
class List extends PureComponent {
  state = {
    updateFlag: false,
  }
  componentDidMount() {
    const { dispatch } = this.props
    dispatch({
      type: 'offers/list',
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
        type: 'offers/delete',
        payload: { id: record._id },
      })
    }
  }

  render() {
    const { offers, loading } = this.props
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
        render: (text, record) => <h4>{text}</h4>,
      },
      {
        title: <Trans>name En</Trans>,
        dataIndex: 'nameEn',
        key: 'nameEn',
        render: (text, record) => <h4>{text}</h4>,
      },
      {
        title: <Trans>Category</Trans>,
        dataIndex: ['category', 'nameEn'],
        key: 'category',
        render: (text, record) => <h4>{text}</h4>,
      },
      {
        title: <Trans>Description En</Trans>,
        dataIndex: 'descriptionEn',
        key: 'descriptionEn',
        render: (text, record) => <h4>{text}</h4>,
      },
      {
        title: <Trans>Description Ar</Trans>,
        dataIndex: 'descriptionAr',
        key: 'descriptionAr',
        render: (text, record) => <h4>{text}</h4>,
      },
      {
        title: <Trans>Discount</Trans>,
        dataIndex: 'discount',
        key: 'discount',
        render: (text, record) => <h4>{text}</h4>,
      },
      {
        title: <Trans>Start Date</Trans>,
        dataIndex: 'startDate',
        key: 'startDate',
        render: (text, record) => (
          <h4> {moment(text).format('YYYY-MM-DD')} </h4>
        ),
      },
      {
        title: <Trans>End Date</Trans>,
        dataIndex: 'endDate',
        key: 'endDate',
        render: (text, record) => <h4>{moment(text).format('YYYY-MM-DD')}</h4>,
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
      <Spin spinning={loading?.models?.offers}>
        {updateFlag ? (
          <UpdateOffer data={data} />
        ) : (
          <Table
            pagination={true}
            bordered
            columns={columns}
            dataSource={offers?.list}
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
