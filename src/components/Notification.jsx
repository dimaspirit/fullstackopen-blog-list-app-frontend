import PropTypes from 'prop-types'
import './notification.css'

const Notification = ({ message, type = 'success' }) => {
  const classes = `notification ${type}`
  return (
    <div className={classes}>{ message }</div>
  )
}

Notification.propTypes = {
  message: PropTypes.string.isRequired
}

export default Notification