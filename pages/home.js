// Module imports
import { NextSeo as NextSEO } from 'next-seo'
import Link from 'next/link'
import React from 'react'





// Component imports
import { TweetFeed } from '../components/TweetFeed'





const Home = () => (
  <>
    <NextSEO
      description="Blorp"
      title="Home" />

    <div>birb.house</div>

    <TweetFeed />
  </>
)





export default Home
