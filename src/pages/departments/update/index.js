import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'umi'
import Department from '../components/Department'

@connect(({ loading, departments }) => ({ loading, departments }))
class UpdateDepartment extends Component {
  render() {
    const { data } = this.props
    return (
      <div>
        <Department data={data} />
      </div>
    )
  }
}

UpdateDepartment.propTypes = {
  location: PropTypes.object,
  dispatch: PropTypes.func,
  loading: PropTypes.object,
}

export default UpdateDepartment
