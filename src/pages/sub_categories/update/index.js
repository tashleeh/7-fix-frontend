import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'umi'
import SubCategory from '../create'

@connect(({ loading, subCategories }) => ({ loading, subCategories }))
class UpdateSubCategory extends Component {
  render() {
    const { data } = this.props
    return (
      <div>
        <SubCategory data={data} />
      </div>
    )
  }
}

UpdateSubCategory.propTypes = {
  location: PropTypes.object,
  dispatch: PropTypes.func,
  loading: PropTypes.object,
}

export default UpdateSubCategory
