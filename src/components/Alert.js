const Alert = ({type,message}) =>{
	return (
		<>
			{type === "success" ?

				<div className="success text-green-900 font-semibold block py-2 px-2 mb-2 border rounded-[4px] bg-green-300 border-green-900">
					<span>{message}</span>
			    </div>

			: type === "errors" ?

				<div className="error text-red-900 font-semibold block py-2 px-2 mb-2 border rounded-[4px] bg-pink-300 border-red-900">
					<span >{message}</span>
		    	</div>
		    :

		    	<div className="toaster text-orange-800 font-semibold block py-2 px-2 mb-2 border rounded-[4px] bg-yellow-300 border-orange-900">
					<span >{message}</span>
		    	</div>
			}
		</>
	)
}

export default Alert;