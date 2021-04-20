import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { Table, Avatar, Spin } from 'antd'
import { DropOption } from 'components'
import { Trans } from '@lingui/react'
import { Link, connect } from 'umi'
import UpdatePart from '../update'

@connect(({ loading, parts }) => ({
  loading,
  parts,
}))
class List extends PureComponent {
  state = {
    updateFlag: false,
  }
  componentDidMount() {
    const { dispatch } = this.props
    dispatch({
      type: 'parts/list',
      payload: {},
    })
  }

  handleMenuClick = (record, e) => {
    const { dispatch } = this.props
    const { key } = e
    console.log('key', key)
    if (key === '1') {
      this.setState({
        updateFlag: true,
        data: record,
      })
    } else if (key === '2') {
      dispatch({
        type: 'parts/delete',
        payload: { id: record._id },
      })
    }
  }

  render() {
    const { parts, loading } = this.props
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
        render: (text, record) => <Link to={`part/${record.id}`}>{text}</Link>,
      },
      {
        title: <Trans>name En</Trans>,
        dataIndex: 'nameEn',
        key: 'nameEn',
        render: (text, record) => <Link to={`part/${record.id}`}>{text}</Link>,
      },
      {
        title: <Trans>Description Ar</Trans>,
        dataIndex: 'descriptionAr',
        key: 'descriptionAr',
        render: (text, record) => <Link to={`part/${record.id}`}>{text}</Link>,
      },
      {
        title: <Trans>Description En</Trans>,
        dataIndex: 'descriptionEn',
        key: 'descriptionEn',
        render: (text, record) => <Link to={`part/${record.id}`}>{text}</Link>,
      },
      {
        title: <Trans>Price</Trans>,
        dataIndex: 'price',
        key: 'price',
        render: (text, record) => <Link to={`part/${record.id}`}>{text}</Link>,
      },
      {
        title: <Trans>Category</Trans>,
        dataIndex: ['category', 'nameEn'],
        key: 'category',
        render: (text, record) => <Link to={`part/${record.id}`}>{text}</Link>,
      },
      {
        title: <Trans>made In</Trans>,
        dataIndex: 'madeIn',
        key: 'madeIn',
        render: (text, record) => <Link to={`part/${record.id}`}>{text}</Link>,
      },
      {
        title: <Trans>Specification En</Trans>,
        dataIndex: 'SpecificationEn',
        key: 'SpecificationEn',
        render: (text, record) => <Link to={`part/${record.id}`}>{text}</Link>,
      },
      {
        title: <Trans>Specification Ar</Trans>,
        dataIndex: 'SpecificationAr',
        key: 'SpecificationAr',
        render: (text, record) => <Link to={`part/${record.id}`}>{text}</Link>,
      },
      {
        title: <Trans>Size</Trans>,
        dataIndex: 'size',
        key: 'size',
        render: (text, record) => <Link to={`part/${record.id}`}>{text}</Link>,
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
      <Spin spinning={loading?.models.parts}>
        {updateFlag ? (
          <UpdatePart data={data} />
        ) : (
          <Table
            pagination={true}
            bordered
            columns={columns}
            dataSource={parts?.list}
            simple
            rowKey={(record) => record.id}
            scroll={{ x: 1800 }}
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
