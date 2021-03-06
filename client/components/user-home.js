import React from 'react'
// import PropTypes from 'prop-types'
import {connect} from 'react-redux'

/**
 * COMPONENT
 */
export const UserHome = props => {
  console.log('id', props.states.id)
  console.log('props state', props.states)
  console.log(window.localStorage)
  if (props.states.id) {
    const {email, firstName, lastName, middleName} = props.states
    return (
      <div>
        <h3>Welcome, {`${firstName} ${middleName} ${lastName}`}!</h3>
      </div>
    )
  } else if (!props.states.id) {
    return <div>Guest</div>
  }
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    states: state.user
  }
}

export default connect(mapState)(UserHome)

/**
 * PROP TYPES
 */
// UserHome.propTypes = {
//   email: PropTypes.string,
// }
