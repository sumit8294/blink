const Loading = ({size}) =>{

	return(

		<div className="mx-auto" style={{height:size,width:size}}>
			<img src="http://localhost:3000/assets/elements/loading.gif" alt="loading..." />
		</div>
	)
}

export default Loading;
