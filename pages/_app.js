// Style imports
/* eslint-disable import/no-unassigned-import */
import 'scss/reset.scss'
import 'scss/lib.scss'
import 'scss/app.scss'
/* eslint-enable */





// Module imports
import {
  config as faConfig,
  library as faLibrary,
} from '@fortawesome/fontawesome-svg-core'
import { DefaultSeo as DefaultSEO } from 'next-seo'
import { AuthContextProvider } from 'context/AuthContext'
import { TweetContextProvider } from 'context/TweetContext'
import LocalForage from 'localforage'
import NextApp from 'next/app'
import NextHead from 'next/head'
import NProgress from 'nprogress'
import React from 'react'
import Router from 'next/router'





// Local imports
import * as fasIcons from 'helpers/fasIconLibrary'
import * as fabIcons from 'helpers/fabIconLibrary'
import * as farIcons from 'helpers/farIconLibrary'
import firebase from 'helpers/firebase'





// Configure and populate FontAwesome library
faConfig.autoAddCss = false
faLibrary.add(fasIcons)
faLibrary.add(fabIcons)
faLibrary.add(farIcons)

// Setup NProgress
NProgress.configure({ showSpinner: false })
Router.events.on('routeChangeStart', () => NProgress.start())
Router.events.on('routeChangeError', () => NProgress.done())
Router.events.on('routeChangeComplete', () => NProgress.done())





class App extends NextApp {
  constructor (props) {
    super(props)

    LocalForage.config({
      name: 'Twitter',
      storeName: 'webStore',
    })
  }

  render () {
    const {
      Component,
      isServer,
      store,
    } = this.props

    const pageProps = Object.entries(this.props.pageProps).reduce((accumulator, [key, value]) => {
      const blocklist = [
        'res',
        'req',
      ]

      if (!blocklist.includes(key)) {
        accumulator[key] = value
      }

      return accumulator
    }, {})

    return (
      <AuthContextProvider>
        <TweetContextProvider>
          <div role="application">
            <DefaultSEO
              openGraph={{
                type: 'website',
                locale: 'en_US',
                url: 'https://birb.house/',
                site_name: 'Birbhouse',
              }}
              titleTemplate="%s | Birbhouse"
              twitter={{
                handle: '@TrezyCodes',
                site: '@TrezyCodes',
                cardType: 'summary_large_image',
              }} />

            <main>
              <Component {...pageProps} />
            </main>
          </div>
        </TweetContextProvider>
      </AuthContextProvider>
    )
  }
}





export default App