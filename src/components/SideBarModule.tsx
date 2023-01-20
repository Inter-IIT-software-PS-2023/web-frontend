import SearchBar from 'material-ui-search-bar'
import { useState } from 'react'
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
import { Link, useNavigate } from 'react-router-dom'
import { useAppSelector, useAppDispatch } from '../store/app/Hooks'
import { Rider, riderSelector, setCurrentRider } from '../store/features/Rider'
import '../styles/Sidebar.css'
const SideBarModule = () => {
	const dispatch = useAppDispatch()
	const { collapseSidebar } = useProSidebar()
	const [clicked, setClicked] = useState(false)
	const navigate = useNavigate()
	const Rider = useAppSelector(riderSelector).rider
	return (
		<div className='left-holder'>
			<div className='sidebar'>
				<Sidebar
					backgroundColor='#14213d'
					width='176px'
					style={{ height: '100vh' }}
					rootStyles={{
						[`.${sidebarClasses.container}`]: {
							color: '#f1faee',
							zIndex: 9999,
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
								setClicked(!clicked)
							}}
						>
							Routes
						</MenuItem>
						<MenuItem
							icon={<AnalyticsIcon />}
							onClick={() => {
								setClicked(false)
								navigate('/analytics')
							}}
						>
							Analytics
						</MenuItem>
						<MenuItem
							icon={<AnalyticsIcon />}
							onClick={() => {
								setClicked(false)
								navigate('/dashboard')
							}}
						>
							Dashboard
						</MenuItem>
					</Menu>
				</Sidebar>
			</div>
			<div className={`rider ${clicked && 'hide'}`}>
				<div className={`rider-cont ${clicked && 'hide'}`}>
					<h4>Rider</h4>
					<SearchBar />
					<div className='riders'>
						{Rider?.map((rider: Rider) => {
							return (
								<div
									key={rider.id}
									className='rider-info'
									onClick={() => {
										window.location.reload()
										dispatch(setCurrentRider(rider))
									}}
								>
									<AccountCircleIcon /> <div className='rider-name'>{rider.name}</div>{' '}
									<CircleIcon />
								</div>
							)
						})}
					</div>
				</div>
			</div>
		</div>
	)
}

export default SideBarModule
