import '../styles/Dashboard.css'
import img1 from '../assets/addidas.jpg'
import img2 from '../assets/bag.jpg'
import img3 from '../assets/blueBag.jpg'
import img4 from '../assets/jeans.jpg'
import img5 from '../assets/nike.jpg'
import img6 from '../assets/profile.jpg'
import img8 from '../assets/shirt.jpg'
import img9 from '../assets/sunglasses.jpg'
import SidebarMenu from './Sidebar'
import LineStyle from './Charts/LineStyle'
import ColumnPlot from './Charts/ColumnPlot'
import ProgressChart from './Charts/Progress'
import '../styles/Home.css'
import img from '../assets/growsimplee.png'
import { useNavigate } from 'react-router-dom'
const Dashboard = () => {
	const navigate = useNavigate()
	return (
		<>
			<SidebarMenu />
			<section className='home-section'>
				<nav
					className='nav-home'
					onClick={() => {
						navigate('/')
					}}
				>
					<img src={img} alt='' className='logo-img' />
				</nav>
				<div className='home-content'>
					<div className='overview-boxes'>
						<div className='box'>
							<div className='right-side'>
								<div className='box-topic'>Total Order</div>
								<div className='number'>40,876</div>
								<div className='indicator'>
									<i className='bx bx-up-arrow-alt'></i>
									<span className='text'>Up from yesterday</span>
								</div>
							</div>
							<i className='bx bx-cart-alt cart'></i>
						</div>
						<div className='box'>
							<div className='right-side'>
								<div className='box-topic'>Total Sales</div>
								<div className='number'>38,876</div>
								<div className='indicator'>
									<i className='bx bx-up-arrow-alt'></i>
									<span className='text'>Up from yesterday</span>
								</div>
							</div>
							<i className='bx bxs-cart-add cart two'></i>
						</div>
						<div className='box'>
							<div className='right-side'>
								<div className='box-topic'>Total Profit</div>
								<div className='number'>$12,876</div>
								<div className='indicator'>
									<i className='bx bx-up-arrow-alt'></i>
									<span className='text'>Up from yesterday</span>
								</div>
							</div>
							<i className='bx bx-cart cart three'></i>
						</div>
						<div className='box'>
							<div className='right-side'>
								<div className='box-topic'>Total Return</div>
								<div className='number'>11,086</div>
								<div className='indicator'>
									<i className='bx bx-down-arrow-alt down'></i>
									<span className='text'>Down From Today</span>
								</div>
							</div>
							<i className='bx bxs-cart-download cart four'></i>
						</div>
					</div>

					<div className='sales-boxes'>
						<div className='recent-sales box'>
							<div className='title'>Recent Sales</div>
							<div className='sales-details'>
								<ul className='details'>
									<li className='topic'>Date</li>
									<li>
										<a href='#'>02 Jan 2021</a>
									</li>
									<li>
										<a href='#'>02 Jan 2021</a>
									</li>
									<li>
										<a href='#'>02 Jan 2021</a>
									</li>
									<li>
										<a href='#'>02 Jan 2021</a>
									</li>
									<li>
										<a href='#'>02 Jan 2021</a>
									</li>
									<li>
										<a href='#'>02 Jan 2021</a>
									</li>
									<li>
										<a href='#'>02 Jan 2021</a>
									</li>
								</ul>
								<ul className='details'>
									<li className='topic'>Customer</li>
									<li>
										<a href='#'>Alex Doe</a>
									</li>
									<li>
										<a href='#'>David Mart</a>
									</li>
									<li>
										<a href='#'>Roe Parter</a>
									</li>
									<li>
										<a href='#'>Diana Penty</a>
									</li>
									<li>
										<a href='#'>Martin Paw</a>
									</li>
									<li>
										<a href='#'>Doe Alex</a>
									</li>
									<li>
										<a href='#'>Aiana Lexa</a>
									</li>
									<li>
										<a href='#'>Rexel Mags</a>
									</li>
									<li>
										<a href='#'>Tiana Loths</a>
									</li>
								</ul>
								<ul className='details'>
									<li className='topic'>Sales</li>
									<li>
										<a href='#'>Delivered</a>
									</li>
									<li>
										<a href='#'>Pending</a>
									</li>
									<li>
										<a href='#'>Returned</a>
									</li>
									<li>
										<a href='#'>Delivered</a>
									</li>
									<li>
										<a href='#'>Pending</a>
									</li>
									<li>
										<a href='#'>Returned</a>
									</li>
									<li>
										<a href='#'>Delivered</a>
									</li>
									<li>
										<a href='#'>Pending</a>
									</li>
									<li>
										<a href='#'>Delivered</a>
									</li>
								</ul>
								<ul className='details'>
									<li className='topic'>Total</li>
									<li>
										<a href='#'>$204.98</a>
									</li>
									<li>
										<a href='#'>$24.55</a>
									</li>
									<li>
										<a href='#'>$25.88</a>
									</li>
									<li>
										<a href='#'>$170.66</a>
									</li>
									<li>
										<a href='#'>$56.56</a>
									</li>
									<li>
										<a href='#'>$44.95</a>
									</li>
									<li>
										<a href='#'>$67.33</a>
									</li>
									<li>
										<a href='#'>$23.53</a>
									</li>
									<li>
										<a href='#'>$46.52</a>
									</li>
								</ul>
							</div>
							<div className='button'>
								<a href='#'>See All</a>
							</div>
						</div>
						<div className='top-sales box'>
							<div className='title'>Top Seling Product</div>
							<ul className='top-sales-details'>
								<li>
									<a href='#'>
										<img src={img9} alt='' />
										<span className='product'>Vuitton Sunglasses</span>
									</a>
									<span className='price'>
										<ProgressChart />
									</span>
								</li>
								<li>
									<a href='#'>
										<img src={img4} alt='' />
										<span className='product'>Hourglass Jeans </span>
									</a>
									<span className='price'>
										<ProgressChart />
									</span>
								</li>
								<li>
									<a href='#'>
										<img src={img5} alt='' />
										<span className='product'>Nike Sport Shoe</span>
									</a>
									<span className='price'>
										<ProgressChart />
									</span>
								</li>
								<li>
									<a href='#'>
										<img src={img6} alt='' />
										<span className='product'>Hermes Silk Scarves.</span>
									</a>
									<span className='price'>
										<ProgressChart />
									</span>
								</li>
								<li>
									<a href='#'>
										<img src={img3} alt='' />
										<span className='product'>Succi Ladies Bag</span>
									</a>
									<span className='price'>
										<ProgressChart />
									</span>
								</li>
								<li>
									<a href='#'>
										<img src={img2} alt='' />
										<span className='product'>Gucci Womens&#39;s Bags</span>
									</a>
									<span className='price'>
										<ProgressChart />
									</span>
								</li>
								<li>
									<a href='#'>
										<img src={img1} alt='' />
										<span className='product'>Addidas Running Shoe</span>
									</a>
									<span className='price'>
										<ProgressChart />
									</span>
								</li>
								<li>
									<a href='#'>
										<img src={img8} alt='' />
										<span className='product'>Bilack Wear&#39;s Shirt</span>
									</a>
									<span className='price'>
										<ProgressChart />
									</span>
								</li>
							</ul>
						</div>
					</div>
					<div className='charts'>
						<div className='line'>
							<div
								className='title'
								style={{ fontSize: '24px', marginBottom: '10px', fontWeight: '500' }}
							>
								Package delivered vs Rider
							</div>
							<LineStyle />
						</div>
						<div className='line'>
							<div
								className='title'
								style={{ fontSize: '24px', marginBottom: '10px', fontWeight: '500' }}
							>
								Fake Attempt % vs Rider
							</div>
							<ColumnPlot />
						</div>
					</div>
				</div>
			</section>
		</>
	)
}

export default Dashboard
