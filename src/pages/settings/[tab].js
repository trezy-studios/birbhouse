// Module imports
import React, {
	useContext,
	useEffect,
	useState,
} from 'react'
import { NextSeo as NextSEO } from 'next-seo'
import { useRouter } from 'next/router'
import classnames from 'classnames'
import Link from 'next/link'





// Local imports
import { AccountSettings } from 'components/AccountSettings'
import { AuthContext } from 'context/AuthContext'
import { DisplaySettings } from 'components/DisplaySettings'
import { Loader } from 'components/Loader'
import { RequiresAuthentication } from 'components/RequiresAuthentication'





const tabs = {
	ABOUT: 'about',
	ACCOUNT: 'account',
	DISPLAY: 'display',
}





const SettingsPage = () => {
	const router = useRouter()
	const {
		isLoadingSettings,
		isRegistering,
		user,
	} = useContext(AuthContext)
	const [tab, setTab] = useState(router.query.tab)

	useEffect(() => {
		if (tab !== router.query.tab) {
			setTab(router.query.tab)
		}
	}, [
		router.query.tab,
		setTab,
	])

	return (
		<RequiresAuthentication>
			<NextSEO
				description="Settings"
				title="Settings" />

			<header>
				<h2 className="title is-1">Settings</h2>
			</header>

			<hr />

			{isLoadingSettings && (
				<Loader />
			)}

			{(!isLoadingSettings && Boolean(user)) && (
				<>
					<nav className="tabs">
						<ul>
							<li
								className={classnames({
									'is-active': tab === tabs.ACCOUNT,
								})}>
								<Link
									as="/settings/account"
									href="/settings/[tab]">
									<a>
										Account
									</a>
								</Link>
							</li>

							<li
								className={classnames({
									'is-active': tab === tabs.DISPLAY,
								})}>
								<Link
									as="/settings/display"
									href="/settings/[tab]">
									<a>
										Display
									</a>
								</Link>
							</li>

							<li
								className={classnames({
									'is-active': tab === tabs.ABOUT,
								})}>
								<Link
									as="/settings/about"
									href="/settings/[tab]">
									<a>
										About BirbHouse
									</a>
								</Link>
							</li>
						</ul>
					</nav>

					{(tab === tabs.ACCOUNT) && (
						<AccountSettings />
					)}

					{(tab === tabs.DISPLAY) && (
						<DisplaySettings />
					)}
				</>
			)}
		</RequiresAuthentication>
	)
}

SettingsPage.getInitialProps = () => ({})





export default SettingsPage
