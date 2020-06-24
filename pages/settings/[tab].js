// Module imports
import React, {
  useContext,
  useState,
} from 'react'
import { NextSeo as NextSEO } from 'next-seo'
import { useRouter } from 'next/router'
import classnames from 'classnames'
import Link from 'next/link'





// Local imports
import { AccountSettings } from 'components/AccountSettings'
import { AuthContext } from 'context/AuthContext'
import { Loader } from 'components/Loader'





const tabs = {
  ACCOUNT: 'account',
}





const SettingsPage = () => {
  const router = useRouter()
  const {
    isLoadingSettings,
    isRegistering,
    user,
  } = useContext(AuthContext)
  const [tab, setTab] = useState(router.query.tab)

  return (
    <>
      <NextSEO
        description="Settings"
        title="Settings" />

      <header className="page-header">
        <h2>Settings</h2>
      </header>

      {isLoadingSettings && (
        <Loader />
      )}

      {(!isLoadingSettings && Boolean(user)) && (
        <>
          <nav className="tabs">
            <ol>
              <li>
                <Link
                  as="/settings/account"
                  href="/settings/[tab]">
                  <a
                    className={classnames({
                      active: tab === tabs.ACCOUNT,
                    })}>
                    Account
                  </a>
                </Link>
              </li>
            </ol>
          </nav>

          {(tab === tabs.ACCOUNT) && (
            <AccountSettings />
          )}
        </>
      )}
    </>
  )
}

SettingsPage.getInitialProps = () => ({})





export default SettingsPage
