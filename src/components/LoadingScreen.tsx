import gif from "../assets/loader.gif";
const LoadingScreen = () => {
	return (
		<div style={{ height: "100vh", width: "100vw", display: "flex", justifyContent: "center", alignItems: "center", background: "#f8f8f8" }}>
			<img src={gif} alt="" />
		</div>
	)

}

export default LoadingScreen
