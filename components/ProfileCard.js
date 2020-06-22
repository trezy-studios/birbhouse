// Module imports
import React from 'react'





export const ProfileCard = profile => {
  const {
    avatar,
    bio,
    displayName,
    username,
  } = profile

  return (
    <div className="profile-card">
      <header>
        <img
          className="avatar"
          src={avatar || `https://api.adorable.io/avatars/50/${username}`} />

        <h3>
          {displayName}

          <span className="subtitle text-secondary">
            @{username}
          </span>
        </h3>

        <p>{bio}</p>
      </header>
    </div>
  )
}
