// Module imports
import React, {
  useState,
} from 'react'
import {
  animated,
  useTransition,
} from 'react-spring'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'





// Local imports
import { ExternalLink } from 'components/ExternalLink'
import { Loader } from 'components/Loader'
import { useAsync } from 'hooks/useAsync'





const SplitPage = props => {
  const { children } = props
  const [image, setImage] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const imageTransitions = useTransition(image, null, {
    from: { opacity: 0 },
    enter: { opacity: 1 },
    leave: { opacity: 0 },
  })
  const captionTransitions = useTransition(image, null, {
    from: {
      opacity: 0,
      transform: 'translateX(-100%)',
    },
    enter: {
      opacity: 1,
      transform: 'translateY(0)',
    },
    leave: { transform: 'translateX(-100%)' },
  })

  useAsync(async () => {
    const response = await fetch('/api/unsplash-photo')
    const { data } = await response.json()

    const imageElement = new Image()

    imageElement.src = data.urls.regular

    await imageElement.decode()

    setImage(data)
    setIsLoading(false)
  }, [,
    setImage,
    setIsLoading,
  ])

  return (
    <div className="split-page">
      <div className="image-container">
        {isLoading && (
          <Loader />
        )}

        {imageTransitions.map(imageTransition => {
          const {
            item,
            key: imageKey,
            props,
          } = imageTransition

          if (!item) {
            return null
          }

          return (
            <animated.figure
              key={imageKey}
              style={{
                ...props,
                backgroundImage: `url(${image.urls.regular})`,
              }}>

              {captionTransitions.map(captionTransition => {
                const {
                  item,
                  key: captionKey,
                  props,
                } = captionTransition

                if (!item) {
                  return null
                }

                return (
                  <animated.figcaption
                    key={captionKey}
                    style={props}>
                    <p>Photo by <ExternalLink href={image.user.links.html}>{image.user.name}</ExternalLink></p>
                    <p>via <ExternalLink href={image.links.html}>Unsplash</ExternalLink></p>
                  </animated.figcaption>
                )
              })}
            </animated.figure>
          )
        })}
      </div>

      <div>
        {children}
      </div>
    </div>
  )
}






export { SplitPage }
