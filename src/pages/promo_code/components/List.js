import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { Table, Spin } from 'antd'
import { DropOption } from 'components'
import { Trans } from '@lingui/react'
import { Link, connect } from 'umi'
import UpdatePromoCode from '../update'
import moment from 'moment'

@connect(({ loading, promoCode }) => ({
  loading,
  promoCode,
}))
class List extends PureComponent {
  state = {
    updateFlag: false,
  }
  componentDidMount() {
    const { dispatch } = this.props
    dispatch({
      type: 'promoCode/list',
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
        type: 'promoCode/delete',
        payload: { id: record._id },
      })
    }
  }

  render() {
    const { promoCode, loading } = this.props
    const columns = [
      {
        title: <Trans>Name Ar</Trans>,
        dataIndex: 'nameAr',
        key: 'nameAr',
        render: (text, record) => <Link to={``}>{text}</Link>,
      },
      {
        title: <Trans>Name En</Trans>,
        dataIndex: 'nameEn',
        key: 'nameEn',
        render: (text, record) => <Link to={``}>{text}</Link>,
      },
      {
        title: <Trans>Start Date</Trans>,
        dataIndex: 'startDate',
        key: 'startDate',
        render: (text, record) => (
          <Link to={``}>{moment(text).format('YYYY-MM-DD')}</Link>
        ),
      },
      {
        title: <Trans>End Date</Trans>,
        dataIndex: 'endDate',
        key: 'endDate',
        render: (text, record) => (
          <Link to={``}>{moment(text).format('YYYY-MM-DD')}</Link>
        ),
      },
      {
        title: <Trans>Discount</Trans>,
        dataIndex: 'discount',
        key: 'discount',
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
    const { updateFlag, data } = this.state
    return (
      <Spin spinning={loading?.models?.promoCode}>
        {updateFlag ? (
          <UpdatePromoCode data={data} />
        ) : (
          <Table
            pagination={true}
            bordered
            columns={columns}
            dataSource={promoCode?.list}
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
