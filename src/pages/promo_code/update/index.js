import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'umi'
import PromoCode from '../components/PromoCode'

@connect(({ loading, categories }) => ({ loading, categories }))
class UpdatePromoCode extends Component {
  render() {
    const { data } = this.props
    return (
      <div>
        <PromoCode data={data} />
      </div>
    )
  }
}

UpdatePromoCode.propTypes = {
  location: PropTypes.object,
  dispatch: PropTypes.func,
  loading: PropTypes.object,
}

export default UpdatePromoCode
