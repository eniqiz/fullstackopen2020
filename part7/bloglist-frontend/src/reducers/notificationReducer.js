const notificationReducer = (state = { message: null, errorMessage: null }, action) => {
  switch (action.type) {
  case 'NOTIFY':
    return {
      ...state,
      message: action.message
    }
  case 'NOTIFY_ERROR':
    return {
      ...state,
      errorMessage: action.errorMessage
    }
  case 'DELETE_NOTIFICATION':
    return {
      message: null,
      errorMessage: null
    }
  default:
    return state
  }
}

let timeoutID
export const setNotification = (message, errorMessage, seconds) => {
  return async dispatch => {
    if (message === null) {
      dispatch({
        type: 'NOTIFY_ERROR',
        errorMessage: errorMessage
      })
    } else {
      dispatch({
        type: 'NOTIFY',
        message: message
      })
    }
    clearTimeout(timeoutID)
    timeoutID = setTimeout(() => dispatch({
      type: 'DELETE_NOTIFICATION',
      message: ''
    }), seconds * 1000)
  }
}

export default notificationReducer