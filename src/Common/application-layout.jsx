import ApplicationLayoutSidebar from './application-sidebar'
import React from 'react'
import Header from "../Components/dashboard/Header";

const ApplicationLayout = ({ children }) => {
	return (
		<div className="root">
			<div id="layout-mid-container" className=" relative flex flex-1 overflow-clip">
				<div id="layout-sidebar-desktop-container" className="z-50 hidden lg:block ">
					<ApplicationLayoutSidebar />
				</div>

				<div id="layout-desktop-content-container" className="flex w-full flex-1 flex-col bg-white dark:bg-gray-900 ">
					<Header />
					<div className=' h-screen'>{children}</div>
				</div>
			</div>
		</div>
	)
}

export default ApplicationLayout
