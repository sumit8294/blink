import YourStory from './YourStory';
import OtherStory from './OtherStory';

const Stories = () =>{
	return (
		<>
			<div className=" px-2 ">
				<div className="feed-header flex h-12 ">
					<h3 className="poppins text-2xl font-bold py-2">Stories</h3>
				</div>
				<div className="stories h-28 flex my-auto overflow-x-auto scroll-smooth">
					<YourStory />
					<OtherStory />
				</div>
			</div>
		</>
	)
}

export default Stories;