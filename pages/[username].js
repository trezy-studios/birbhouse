// Module imports
import React, {
  useContext,
} from 'react'
import { NextSeo as NextSEO } from 'next-seo'





// Local imports
import { AuthContext } from 'context/AuthContext'





export default () => {
  const { profile } = useContext(AuthContext)

  return (
    <>
      <NextSEO
        description="Blorp"
        title="Profile" />

      <header className="page-header">
        <h2>Profile</h2>
      </header>
    </>
  )
}
