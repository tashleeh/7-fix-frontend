import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Zone from '../components/Zone'

class UpdateZone extends Component {
  render() {
    const { data } = this.props
    return (
      <div>
        <Zone data={data} />
      </div>
    )
  }
}

UpdateZone.propTypes = {
  location: PropTypes.object,
  dispatch: PropTypes.func,
  loading: PropTypes.object,
}

export default UpdateZone
