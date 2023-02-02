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
import { colors } from '../utils/colors'
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
							// zIndex: 1,
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
					<div className='rider-header'>
						<h4>Rider</h4>
					</div>
					<SearchBar />
					<div className='riders'>
						{Rider?.map((rider: Rider, index: number) => {
							return (
								<div
									key={index}
									className='rider-info'
									onClick={() => {
										dispatch(setCurrentRider([rider]))
									}}
								>
									<AccountCircleIcon />
									<div className='rider-name'>{rider.rider.username}</div>
									<div
										style={{
											backgroundColor: rider.order.length === 0 ? 'red' : colors[index],
											width: '20px',
											height: '20px',
											borderRadius: '500%',
										}}
									></div>
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
