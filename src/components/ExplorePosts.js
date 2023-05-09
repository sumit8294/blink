import ExplorePostItems from './ExplorePostItems'


const users = [
	{name:"divine",imageUrl:"./assets/images/users/divine.jpg"},
	{name:"karan aujla",imageUrl:"./assets/images/users/karanaujla.jpg"},
	{name:"badshah",imageUrl:"./assets/images/users/badshah.jpg"},
	{name:"harry",imageUrl:"./assets/images/users/harry.jpg"},
	{name:"louis",imageUrl:"./assets/images/users/louis.jpg"},
	{name:"niall",imageUrl:"./assets/images/users/niall.jpg"},
	{name:"paradox",imageUrl:"./assets/images/users/para.jpg"},
	{name:"zyan",imageUrl:"./assets/images/users/zyan.jpg"},
	{name:"ronaldo",imageUrl:"./assets/images/users/ronaldo.jpg"},
	{name:"divine",imageUrl:"./assets/images/users/divine.jpg"},
	{name:"karan aujla",imageUrl:"./assets/images/users/karanaujla.jpg"},
	{name:"badshah",imageUrl:"./assets/images/users/badshah.jpg"},
	{name:"harry",imageUrl:"./assets/images/users/harry.jpg"},
	{name:"louis",imageUrl:"./assets/images/users/louis.jpg"},
	{name:"niall",imageUrl:"./assets/images/users/niall.jpg"},
	{name:"paradox",imageUrl:"./assets/images/users/para.jpg"},
	{name:"zyan",imageUrl:"./assets/images/users/zyan.jpg"},
	{name:"ronaldo",imageUrl:"./assets/images/users/ronaldo.jpg"},
	{name:"divine",imageUrl:"./assets/images/users/divine.jpg"},
	{name:"karan aujla",imageUrl:"./assets/images/users/karanaujla.jpg"},
	{name:"badshah",imageUrl:"./assets/images/users/badshah.jpg"},
	{name:"harry",imageUrl:"./assets/images/users/harry.jpg"},
	{name:"louis",imageUrl:"./assets/images/users/louis.jpg"},
	{name:"niall",imageUrl:"./assets/images/users/niall.jpg"},
	{name:"paradox",imageUrl:"./assets/images/users/para.jpg"},
	{name:"zyan",imageUrl:"./assets/images/users/zyan.jpg"},
	{name:"ronaldo",imageUrl:"./assets/images/users/ronaldo.jpg"},

]

const ExplorePosts = () =>{
	return (
		<>
			<div className=" px-6 py-2">
				<div className="Explore-header flex h-12 ">
					<h3 className="poppins text-2xl font-bold py-2">Explore</h3>
				</div>
				<div className="posts-container image-gallery mx-auto py-px " >
					{users.map((user,i)=>{
						return <ExplorePostItems key={i} user={user}/>
					})}
					
				</div>
			</div>
		</>
	)
}

export default ExplorePosts;