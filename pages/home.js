// Module imports
import React, {
  useContext,
  useEffect,
} from 'react'
import { NextSeo as NextSEO } from 'next-seo'
import { useRouter } from 'next/router'
import Link from 'next/link'





// Local imports
import { AuthContext } from 'context/AuthContext'
import { TweetFeed } from 'components/TweetFeed'





const Home = () => {
  const router = useRouter()
  const {
    isLoading: authIsLoading,
    user,
  } = useContext(AuthContext)

  useEffect(() => {
    if (!user) {
      router.replace('/register')
    }
  }, [user])

  return (
    <>
      <NextSEO
        description="Blorp"
        title="Home" />

      {authIsLoading && (
        <div>Loading...</div>
      )}

      {(!authIsLoading && Boolean(user)) && (
        <TweetFeed />
      )}
    </>
  )
}





export default Home
