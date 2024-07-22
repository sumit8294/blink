const Loading = ({size}) =>{

	const baseUrl = window.location.origin

	return(

		<div className="mx-auto" style={{height:size,width:size}}>
			<img src={`${baseUrl}/assets/elements/loading.gif`} alt="loading..." />
		</div>
	)
}

export default Loading;
