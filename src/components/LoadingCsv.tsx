import gif from '../assets/Csv.gif'
const LoadingCsv = () => {
	return (
		<div
			style={{
				display: 'flex',
				flexDirection: 'column',
				justifyContent: 'center',
				alignItems: 'center',
				background: '#f8f8f8',
				width: '100vw',
				height: '100vh',
				zIndex: '99999',
				backgroundColor: 'rgb(220, 220, 220)',
			}}
		>
			<img src={gif} alt='' />
		</div>
	)
}

export default LoadingCsv
