// Module imports
import buildCSP from 'content-security-policy-builder'
import crypto from 'crypto'
import React from 'react'
import Document, {
  Head,
  Main,
  NextScript,
} from 'next/document'





const cspHashOf = (text) => {
  const hash = crypto.createHash('sha256')
  hash.update(text)
  return `'sha256-${hash.digest('base64')}'`
}





export default class MyDocument extends Document {
  render () {
    const isDev = process.env.NODE_ENV !== 'production'

    const directives = {
      baseUri: "'none'",
      connectSrc: [
        "'self'",
        'https://firestore.googleapis.com',
        'https://securetoken.googleapis.com',
        'https://www.googleapis.com',
        'https://apis.google.com',
        'https://*.firebaseio.com',
        'wss://*.firebaseio.com',
      ],
      defaultSrc: [
        "'self'",
        'https://twitter-9dd2d.firebaseapp.com',
        'https://twitter-9dd2d.firebaseio.com',
      ],
      fontSrc: [
        'https://fonts.googleapis.com',
        'https://fonts.gstatic.com',
        'https://use.typekit.net',
        'data:',
      ],
      frameSrc: [
        'https://*.firebaseapp.com',
        'https://*.firebaseio.com',
      ],
      imgSrc: [
        "'self'",
        'https://api.adorable.io',
        'https://images.unsplash.com',
        'https://twitter-9dd2d.googleusercontent.com',
        'https://firebasestorage.googleapis.com',
      ],
      scriptSrc: [
        "'self'",
        'https://*.firebaseio.com',
        cspHashOf(NextScript.getInlineScriptSource(this.props)),
      ],
      styleSrc: [
        "'self'",
        "'unsafe-inline'",
        'https://fonts.googleapis.com',
        'https://use.typekit.net',
        'https://p.typekit.net',
      ],
    }

    if (isDev) {
      directives.connectSrc.push(['webpack://*'])
      directives.scriptSrc.push(["'unsafe-eval'"])
    }

    const csp = buildCSP({ directives })

    return (
      <html>
        <Head>
          {['Content-Security-Policy', 'X-Content-Security-Policy', 'X-WebKit-CSP'].map(httpEquiv => (
            <meta
              content={csp}
              httpEquiv={httpEquiv}
              key={httpEquiv} />
          ))}

          <meta name="viewport" content="initial-scale=1.0, viewport-fit=cover, width=device-width" />

          <link rel="webmention" href="https://webmention.io/birb.house/webmention" />
          <link rel="pingback" href="https://webmention.io/birb.house/xmlrpc" />

          <link
            href="https://fonts.googleapis.com/css2?family=Source+Code+Pro&amp;family=Source+Sans+Pro:ital,wght@0,400;0,700;1,400;1,700&amp;display=swap"
            rel="stylesheet" />
          <link
            href="https://use.typekit.net/wcl7qou.css"
            rel="stylesheet" />
        </Head>

        <body>
          <Main className="next-wrapper" />

          <NextScript />
        </body>
      </html>
    )
  }
}
