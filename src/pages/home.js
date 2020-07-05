// Module imports
import React, {
  useContext,
  useEffect,
} from 'react'
import { NextSeo as NextSEO } from 'next-seo'
import { useRouter } from 'next/router'
import Link from 'next/link'





// Local imports
import { RequiresAuthentication } from 'components/RequiresAuthentication'
import { TweetsContextProvider } from 'context/TweetsContext'
import { TweetFeed } from 'components/TweetFeed'
import { TweetForm } from 'components/TweetForm'





const Home = () => (
  <RequiresAuthentication>
    <NextSEO
      description="Blorp"
      title="Home" />

    <header className="page-header">
      <h2>Home</h2>
    </header>

    <TweetsContextProvider>
      <TweetForm />
      <TweetFeed />
    </TweetsContextProvider>
  </RequiresAuthentication>
)





export default Home
