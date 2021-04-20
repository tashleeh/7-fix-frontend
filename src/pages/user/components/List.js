import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { Table, Avatar } from 'antd'
import { DropOption } from 'components'
import { Trans, withI18n } from '@lingui/react'
import { Link, connect } from 'umi'
import styles from './List.less'

@withI18n()
@connect(({ loading, dispatch, users }) => ({ loading, dispatch, users }))
class List extends PureComponent {
  render() {
    const columns = [
      {
        title: <Trans>Avatar</Trans>,
        dataIndex: 'avatar',
        key: 'avatar',
        width: 72,
        fixed: 'left',
        render: (text) => <Avatar style={{ marginLeft: 8 }} src={text} />,
      },
      {
        title: <Trans>Name</Trans>,
        dataIndex: 'name',
        key: 'name',
        render: (text, record) => <Link to={`user/${record.id}`}>{text}</Link>,
      },
      {
        title: <Trans>NickName</Trans>,
        dataIndex: 'nickName',
        key: 'nickName',
      },
      {
        title: <Trans>Age</Trans>,
        dataIndex: 'age',
        key: 'age',
      },
      {
        title: <Trans>Gender</Trans>,
        dataIndex: 'isMale',
        key: 'isMale',
        render: (text) => <span>{text ? 'Male' : 'Female'}</span>,
      },
      {
        title: <Trans>Phone</Trans>,
        dataIndex: 'phone',
        key: 'phone',
      },
      {
        title: <Trans>Email</Trans>,
        dataIndex: 'email',
        key: 'email',
      },
      {
        title: <Trans>Address</Trans>,
        dataIndex: 'address',
        key: 'address',
      },
      {
        title: <Trans>CreateTime</Trans>,
        dataIndex: 'createTime',
        key: 'createTime',
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
                { key: '1', name: i18n.t`Update` },
                { key: '2', name: i18n.t`Delete` },
              ]}
            />
          )
        },
      },
    ]

    return (
      <Table
        pagination={true}
        className={styles.table}
        bordered
        scroll={{ x: 1200 }}
        columns={columns}
        dataSource={[]}
        simple
        rowKey={(record) => record.id}
      />
    )
  }
}

List.propTypes = {
  onDeleteItem: PropTypes.func,
  onEditItem: PropTypes.func,
  location: PropTypes.object,
}

export default List
