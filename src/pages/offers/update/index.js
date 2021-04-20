import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'umi'
import CreateOffer from '../create'

@connect(({ loading, offers }) => ({ loading, offers }))
class UpdateOffer extends Component {
  render() {
    const { data } = this.props
    return (
      <div>
        <CreateOffer data={data} />
      </div>
    )
  }
}

UpdateOffer.propTypes = {
  location: PropTypes.object,
  dispatch: PropTypes.func,
  loading: PropTypes.object,
}

export default UpdateOffer
