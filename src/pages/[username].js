// Module imports
import React, {
  useContext,
  useEffect,
} from 'react'
import { NextSeo as NextSEO } from 'next-seo'
import { useRouter } from 'next/router'





// Local imports
import { AuthContext } from 'context/AuthContext'
import { Loader } from 'components/Loader'
import { ProfileCard } from 'components/ProfileCard'
import { ProfilesContext } from 'context/ProfilesContext'
import { TweetsContextProvider } from 'context/TweetsContext'
import { TweetFeed } from 'components/TweetFeed'





const ProfilePage = () => {
  const router = useRouter()
  const {
    addUserByUsername,
    profilesByUsername,
  } = useContext(ProfilesContext)
  const { username } = router.query
  const profile = profilesByUsername[username]
  const title = profile ? `${profile.displayName}'s Profile` : `${username}'s Profile`

  useEffect(() => {
    if (!profile) {
      addUserByUsername(username)
    }
  }, [])

  return (
    <>
      <NextSEO
        description="Blorp"
        title={title} />

      <header className="page-header">
        <h2>Profile</h2>
      </header>

      {!profile && (
        <Loader />
      )}

      {profile && (
        <>
          <ProfileCard {...profile} />

          <TweetsContextProvider authorID={profile.id}>
            <TweetFeed />
          </TweetsContextProvider>
        </>
      )}
    </>
  )
}

ProfilePage.getInitialProps = () => ({})





export default ProfilePage
