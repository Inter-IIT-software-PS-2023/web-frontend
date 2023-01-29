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
const SidebarMenu = () => {
	const { collapseSidebar } = useProSidebar()
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
					<MenuItem icon={<AnalyticsIcon />} routerLink={<Link to='/dasboard' />}>
						Dashboard
					</MenuItem>
				</Menu>
			</Sidebar>
		</>
	)
}

export default SidebarMenu
