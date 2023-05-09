import HeaderProfile from '../components/HeaderProfile';
const Header = () =>{
	return (
		<>
			<div className="px-10 w-full h-16 bg-blink-black-2 shadow-lg flex justify-between text-white">
				<div>
					{/*<img src="" alt="blink">*/}
					<h3 className="poppins py-4 text-3xl font-bold font-Poppins ">BLINK</h3>
				</div>
				
					
				<HeaderProfile/>
					
				
			</div>
		</>
	)
}

export default Header;