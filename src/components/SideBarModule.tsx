import SearchBar from 'material-ui-search-bar'
import React, { useState } from 'react'
import AccountCircleIcon from '@mui/icons-material/AccountCircle'
import CircleIcon from '@mui/icons-material/Circle'
import {
	Sidebar,
	Menu,
	MenuItem,
	useProSidebar,
	sidebarClasses,
} from 'react-pro-sidebar'
import AddLocationAltIcon from '@mui/icons-material/AddLocationAlt'
import AnalyticsIcon from '@mui/icons-material/Analytics'
import MenuOutlinedIcon from '@mui/icons-material/MenuOutlined'
import { Link } from 'react-router-dom'
import '../styles/Sidebar.css'
const SideBarModule = () => {
	const { collapseSidebar } = useProSidebar()
	const [clicked, setClicked] = useState(false)
	return (
		<div className='left-holder'>
			<div className='sidebar'>
				<Sidebar
					backgroundColor='#14213d'
					width='150px'
					style={{ height: '100vh' }}
					rootStyles={{
						[`.${sidebarClasses.container}`]: {
							color: '#f1faee',
							zIndex: 9999,
							// position: "absolute"
						},
					}}
				>
					<Menu
						menuItemStyles={{
							button: {
								'&:hover': {
									backgroundColor: '#e63946',
								},
							},
						}}
					>
						<MenuItem
							icon={<MenuOutlinedIcon />}
							onClick={() => {
								collapseSidebar()
							}}
						>
							<h3>Admin</h3>
						</MenuItem>
						<MenuItem
							icon={<AddLocationAltIcon />}
							routerLink={<Link to='/map' />}
							onClick={() => {
								if (!clicked) {
									setClicked(true)
								} else {
									setClicked(false)
								}
							}}
						>
							Routes
						</MenuItem>
						<MenuItem icon={<AnalyticsIcon />}>Analytics</MenuItem>
					</Menu>
				</Sidebar>
			</div>
			<div className={`rider ${clicked && 'hide'}`}>
				{' '}
				<div className={`rider-cont ${clicked && 'hide'}`}>
					<h4>Rider</h4>
					<SearchBar />
					<div className='riders'>
						<div className='rider-info'>
							<AccountCircleIcon /> <div className='rider-name'>Ramesh</div>{' '}
							<CircleIcon sx={{ color: '#fff' }} />
						</div>
						<div className='rider-info'>
							<AccountCircleIcon /> <div className='rider-name'>Ramesh</div>{' '}
							<CircleIcon />
						</div>
						<div className='rider-info'>
							<AccountCircleIcon /> <div className='rider-name'>Ramesh</div>{' '}
							<CircleIcon />
						</div>
						<div className='rider-info'>
							<AccountCircleIcon /> <div className='rider-name'>Ramesh</div>{' '}
							<CircleIcon />
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}

export default SideBarModule
