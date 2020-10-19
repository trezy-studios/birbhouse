// Module imports
import React from 'react'





// Local imports
import { MarkdownRenderer } from 'components/MarkdownRenderer'





export const ProfileCard = profile => {
	const {
		avatar,
		bio,
		displayName,
		username,
	} = profile

	return (
		<div className="media">
			<figure className="media-left">
				<div className="image is-128x128">
					<img
						className="avatar"
						src={avatar || `https://api.adorable.io/avatars/128/${username}`} />
				</div>
			</figure>

			<div className="media-content">
				<h3>
					<strong>{displayName}</strong>
					{' '}
					<small className="text-is-secondary">
						@{username}
					</small>
				</h3>


				<div className="bio">
					<MarkdownRenderer source={bio} />
				</div>
			</div>
		</div>
	)
}
