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
import DeleteForeverIcon from '@mui/icons-material/DeleteForever'
import { Link,useNavigate } from 'react-router-dom'

import '../styles/Sidebar.css'
const SidebarMenu = () => {
	const { collapseSidebar } = useProSidebar()
	const navigate = useNavigate()
	return (
		<>
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
					<MenuItem icon={<AddLocationAltIcon />} routerLink={<Link to='/map' />}>
						Routes
					</MenuItem>

					<MenuItem icon={<AnalyticsIcon />} routerLink={<Link to='/dashboard' />}>
						Dashboard
					</MenuItem>
					<MenuItem
						icon={<DeleteForeverIcon />}
						onClick={async () => {
							await fetch(
								'http://ec2-65-0-182-19.ap-south-1.compute.amazonaws.com:8000/orders/clear'
							)
								.then(res => {
									console.log(res)
									navigate('/')
								})
								.catch(err => {
									console.log(err)
								})
						}}
					>
						Clear DB
					</MenuItem>
				</Menu>
			</Sidebar>
		</>
	)
}

export default SidebarMenu
