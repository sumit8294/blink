import ExplorePostItems from './ExplorePostItems';

import { useMediaQuery } from 'react-responsive';
import {mobileMediaQuery} from '../ReactResponsiveQueries';

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

const UserPosts = () =>{

	const isMobileOrTablet = useMediaQuery(mobileMediaQuery);

	return (
		<>
			{isMobileOrTablet
				?
					<>
						<div className=" py-2">
			
							<div className="image-gallery mx-auto py-px " >
								{users.map((user,i)=>{
									return <ExplorePostItems key={i} user={user}/>
								})}
								
							</div>

						</div>
					</>
				:
					<>
						<div className=" px-6 py-2">
							<div className="explore-image-gallery-desktop mx-auto py-px px-6 " >
								{users.map((user,i)=>{
									return <ExplorePostItems key={i} user={user}/>
								})}
								
							</div>
						</div>
					</>

			}
		</>
	)
}

export default UserPosts;