import UserInbox from './UserInbox';
// import UserImage from './UserImage';

const HeaderProfile = () =>{
	return (
		<>
			<div className="flex"  >
				<UserInbox />
				{/*<UserImage />*/}
			</div>
		</>
	)
}

export default HeaderProfile;