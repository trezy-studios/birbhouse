// Module imports
import Link from 'next/link'
import moment from 'moment'
import React from 'react'





export const ContentInfo = () => (
  <footer role="contentinfo">
    <nav
      className="legal"
      aria-labelledby="contentinfo-legal-header">
      <ul className="inline">
        <li>
          <Link href="/legal/terms-of-service">
            <a>Terms</a>
          </Link>
        </li>

        <li>
          <Link href="/legal/privacy-policy">
            <a>Privacy policy</a>
          </Link>
        </li>

        <li>
          <Link href="/legal/cookie-policy">
            <a>Cookies</a>
          </Link>
        </li>
      </ul>
    </nav>

    <small>&copy; {moment().format('YYYY')} Trezy.com</small>
  </footer>
)
