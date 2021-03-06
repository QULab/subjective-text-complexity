import React, { Fragment } from 'react'
import PropTypes from 'prop-types'

const Privacy = props => {
  const { prev } = props
  return (
    <div className="tu-border tu-glow center-box centered-content">
      <h3>Data Protection and Privacy</h3>
      <p>
        Your participation in this research study is voluntary. You may choose
        not to participate. If you decide to participate in this research
        survey, you may withdraw at any time without giving any reason. If you
        decide not to participate in this study or if you withdraw from
        participating at any time, you will not be penalized.
      </p>

      <p>
        Your responses will be confidential and we do not collect identifying
        information such as your name, email address or IP address. Your answers
        will be saved anonymously, using only an automatically generated
        participant ID to identify you. No personal data other than your
        demographic information (age, gender(s), native language(s), and german
        language level) will be saved or published.
      </p>
      {prev === 'listening-exercise' ? (
        <Fragment>
          <p>Clicking on "I Agree" below indicates that:</p>
          <ul>
            <li>you have read the above information</li>
            <li>
              you have been informed about the content and procedure of the
              study
            </li>
            <li>you voluntarily agree to participate</li>
            <li>you are at least 18 years of age</li>
          </ul>
        </Fragment>
      ) : null}

      <p>
        If you do not wish to participate in the research study, you can simply
        close this website.
      </p>
      <br />
      {prev ? (
        <a className="btn" href={`/${prev}?consent=true`}>
          I Agree
        </a>
      ) : null}
    </div>
  )
}

export default Privacy

Privacy.propTypes = {
  prev: PropTypes.string,
}
