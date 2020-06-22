// Module imports
import React, {
  useCallback,
  useContext,
} from 'react'
import { useRouter } from 'next/router'
import classnames from 'classnames'
import Link from 'next/link'





// Local imports
import { AuthContext } from 'context/AuthContext'
import { Brand } from 'components/Brand'





// Local constants
const links = [
  {
    href: '/home',
    title: 'Home',
  },

  {
    as: data => `/${data.profile?.username}`,
    href: '/[username]',
    title: 'Profile',
  },
]





export const Banner = () => {
  const { profile } = useContext(AuthContext)
  const router = useRouter()

  const renderLinks = useCallback(link => {
    const linkProps = {
      profile,
    }

    const href = (typeof link.href === 'function') ? link.href(linkProps) : link.href
    const title = (typeof link.title === 'function') ? link.title(linkProps) : link.title

    let as = link.as || href

    if (typeof as === 'function') {
      as = as(linkProps)
    }

    return (
      <li key={href}>
        <Link
          as={as || href}
          href={href}>
          <a
            className={classnames({
              active: router.pathname === href,
            })}>
            {title}
          </a>
        </Link>
      </li>
    )
  }, [
    profile,
    router,
  ])

  return (
    <header role="banner">
      <Brand />

      <nav>
        <ul>
          {links.map(renderLinks)}
        </ul>
      </nav>
    </header>
  )
}
