import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'umi'
import CreatePackage from '../create'

@connect(({ loading, parts }) => ({ loading, parts }))
class UpdatePackage extends Component {
  render() {
    const { data } = this.props
    return (
      <div>
        <CreatePackage data={data} />
      </div>
    )
  }
}

UpdatePackage.propTypes = {
  location: PropTypes.object,
  dispatch: PropTypes.func,
  loading: PropTypes.object,
}

export default UpdatePackage
