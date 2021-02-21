import anecdoteService from '../services/anecdotes'

const reducer = (state = [], action) => {
  switch(action.type) {
    case 'NEW_ANECDOTE':
      return [...state, action.data]
    case 'VOTE':
      const id = action.data.id
      const anecdoteToVote = state.find(e => e.id === id)
      const votedAnecdote = {
        ...anecdoteToVote,
        votes: anecdoteToVote.votes + 1
      }
      const newState = state.map(anecdote => anecdote.id !== id ? anecdote : votedAnecdote)
      return newState.sort((a, b) => b.votes - a.votes)
    case 'INIT_ANECDOTES':
      return action.data.sort((a, b) => b.votes - a.votes)
    default:
      return state
  }
}

export const voteAnecdote = (object) => {
  return async dispatch => {
    const newObject = {
      ...object,
      votes: object.votes + 1
    }
    const updatedAnecdote = await anecdoteService.vote(newObject)
    dispatch({
      type: 'VOTE',
      data: updatedAnecdote
    })
  }
}

export const createAnecdote = (content) => {
  return async dispatch => {
    const newAnecdote = await anecdoteService.createNew(content)
    dispatch({
      type: 'NEW_ANECDOTE',
      data: newAnecdote
    })
  }
}

export const initAnecdotes = (anecdotes) => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch({
      type: 'INIT_ANECDOTES',
      data: anecdotes
    })
  }
}

export default reducer