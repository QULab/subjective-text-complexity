import React, { Fragment, useState } from 'react'
import createStore from '../lib/create-store'
import { Link } from 'react-router-dom'
import '../styles/Instructions.css'

const participantId = createStore('participantId')

const Instructions = props => {
  const { pouchParticipants, location } = props

  const params = location.search.slice(1).split('&')
  const idParam = params.find(param => param.startsWith('participantId'))
  const idFromParams = idParam && idParam.split('=')[1]

  if (idFromParams) {
    participantId.set(idFromParams)
  }

  const [error, setError] = useState('')
  const loggedInId = participantId.get()

  return (
    <Fragment>
      <div className="tu-border tu-glow center-box ">
        <div className="centered-content">
          <h2>Instructions</h2>
        </div>
        <p>
          This study is part of my Bachelor's thesis, in which I'm composing a
          data set of German sentences and paragraphs and a rating of their
          complexity and understandability. This data set can then be used to
          evaluate the complexity and understandability for other texts, as well
          as to identify the most complex parts of a text.
        </p>
        <p>
          During this session, you will read sentences and paragraphs and answer
          questions about their complexity and understandability. You will also
          get small tasks and questions about the content of the text to further
          evaluate how easy it is to understand it. Each rating process is
          divided in three steps:
        </p>
        <h5>1. Reading</h5>
        <p>
          In the first step, you can read the sentence or paragraph that you
          will be evaluating. We will measure how long it takes to read the
          text, so it will be hidden unless you hold a button below the text:
          <span className="img-wrap">
            <img
              src="instructions-read.gif"
              alt="GIF of the page where you can read the text. The heading says 'TODO' but the text is hidden by a light blue block. A cursor appears, presses a button labeled 'TODO' and the block disappears, making the text readable as long as the button is held, the the block appears again."
              className="instruction-img"
            />
          </span>
        </p>
        <h5>2. Questions</h5>
        <p>
          After that, you will be asked questions about the text, e.g. how well
          you understood it, what the hardest part was, etc..
        </p>
        <h5>3. Tasks</h5>
        <p>
          In the last step, you will be asked to complete (several??) small
          tasks involving the text, like filling in missing words (or answering
          content questions??).
        </p>
        <h5>Finish</h5>
        <p>
          After you completed all questions and tasks for a text, you will get a
          new sentence or paragraph and go back to step 1.
          {/*(TODO: explain
          grouped logic)*/}
        </p>
        {loggedInId !== null ? (
          <Link to="/session">Start</Link>
        ) : (
          <Fragment>
            <p>
              If you have already done a session in the past, please enter your
              participant ID and click "Start"
            </p>
            <form
              onSubmit={e => {
                e.preventDefault()
                const id = e.target.participantId.value
                // check if ID exists
                pouchParticipants
                  .get(id)
                  .then(() => {
                    participantId.set(id)
                    window.location.href = 'http://localhost:3000/Session'
                  })
                  .catch(err => {
                    if (err.status === 404) {
                      setError(
                        'This ID does not exist. Please make sure you entered the correct ID.'
                      )
                    } else {
                      setError('An unknown error occurred. Please try again.')
                    }
                  })
              }}
            >
              <input
                type="text"
                name="participantId"
                placeholder="Participant ID"
              />
              <button>Start</button>
            </form>
            <p>If you don't have an ID yet, please click here:</p>
            <Link to="/demographics">Start</Link>
            {error.length > 0 ? (
              <div className="tu-border error-box background-pink">{error}</div>
            ) : null}
          </Fragment>
        )}
      </div>
    </Fragment>
  )
}

export default Instructions
