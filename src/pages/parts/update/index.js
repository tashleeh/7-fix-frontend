import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'umi'
import CreatePart from '../create'

@connect(({ loading, parts }) => ({ loading, parts }))
class UpdatePart extends Component {
  render() {
    const { data } = this.props
    return (
      <div>
        <CreatePart data={data} />
      </div>
    )
  }
}

UpdatePart.propTypes = {
  location: PropTypes.object,
  dispatch: PropTypes.func,
  loading: PropTypes.object,
}

export default UpdatePart
