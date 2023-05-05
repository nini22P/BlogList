import { Alert } from '@mui/material'
import { useSelector } from 'react-redux'

const Notification = () => {
  const notification = useSelector(state => state.notification)

  if (notification.state === 'hide') {
    return null
  }

  return <Alert sx={{ mb: 1 }} severity={notification.state}>
    {notification.message}
  </Alert>
}

export default Notification
