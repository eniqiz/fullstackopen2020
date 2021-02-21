const notificationReducer = (state = { message: '' }, action) => {
  switch (action.type) {
    case 'NOTIFY':
      return {
        ...state,
        message: action.message
      }
    case 'DELETE_NOTIFICATION':
      return {
        ...state,
        message: ''
      }
    default:
      return state
  }
}

export const setNotification = (message) => {
  return ({
    type: 'NOTIFY',
    message: message
  })
}

export const deleteNotification = () => {
  return ({
    type: 'DELETE_NOTIFICATION',
    message: ''
  })
}

export default notificationReducer