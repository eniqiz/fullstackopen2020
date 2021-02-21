import React from 'react'
import { connect } from 'react-redux'
import { voteAnecdote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'

const Anecdote = ({ anecdote, handleClick }) => {
  return(
    <div>
      <div>
        {anecdote.content}
      </div>
      <div>
        has {anecdote.votes}
        <button onClick={handleClick}>vote</button>
      </div>
    </div>
  )
}

const Anecdotes = (props) => {
  return (
    <div>
      {props.anecdotes.map(anecdote =>
        <Anecdote
          key={anecdote.id}
          anecdote={anecdote}
          handleClick={() => {
            props.voteAnecdote(anecdote)
            props.setNotification(`you voted '${anecdote.content}'`, 5)
            }
          }
        />
      )}
    </div>
  )
}

const mapStateToProps = (state) => {
  if (state.filter === '') {
    return {
      anecdotes: state.anecdotes
    }
  } else {
    return {
      anecdotes: state.anecdotes.filter(p => p.content.toLowerCase().indexOf(state.filter) !== -1)
    }
  }
}

const mapDispatchToProps = {
  voteAnecdote,
  setNotification
}

const ConnectedAnecdotes = connect(
  mapStateToProps,
  mapDispatchToProps
)(Anecdotes)
export default ConnectedAnecdotes