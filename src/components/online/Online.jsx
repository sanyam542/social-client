import "./online.css" ;

export default function Online(props) {
  const PF=process.env.REACT_APP_PUBLIC_FOLDER;


    return (
        <li className="rightbarFriend">
    
            <div className="rightbarProfileImgContainer">
              <img className="rightbarProfileImg" src={PF+props.user.profilePicture} alt="" />
              <span className="rightbarOnline" ></span>
            </div>
            <span className="rightbarUsername" >{props.user.username}</span>

 </li> 
  )
}
