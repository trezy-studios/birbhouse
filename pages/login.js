// Module imports
import React, {
  useEffect,
} from 'react'
import { NextSeo as NextSEO } from 'next-seo'
import { useRouter } from 'next/router'
import PropTypes from 'prop-types'





// Component imports
// import Button from 'components/Button'





// Local variables
let redirectStarted = false





const Login = props => {
  const { destination } = props
  const Router = useRouter()

  return (
    <NextSEO title="Login">
      <section className="hero">
        <div>
          <h2>Login</h2>

          <menu type="toolbar">
            {/* <Button
              className="primary"
              onClick={() => firebase.login({
                provider: 'google',
                type: 'popup',
              })}>
              Sign in with Google
            </Button>

            <Button
              className="primary"
              onClick={() => firebase.login({
                provider: 'twitter',
                type: 'popup',
              })}>
              Sign in with Twitter
            </Button> */}
          </menu>
        </div>
      </section>
    </NextSEO>
  )
}

Login.getInitialProps = ({ query }) => ({
  destination: query.destination,
})

Login.defaultProps = {
  destination: '',
}

Login.propTypes = {
  destination: PropTypes.string,
}





export default Login
