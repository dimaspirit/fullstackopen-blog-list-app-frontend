import "./notification.css";

const Notification = ({message, type = 'success'}) => {
  const classes = `notification ${type}`;
  return (
    <div className={classes}>{message}</div>
  );
}

export default Notification;