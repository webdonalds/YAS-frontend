import React from "react";
import utils from "../../../../service/utils";



const FollowCard: React.FC<FollowInfo> = ( follow ) => {

  return (
    <div className="rounded shadow-lg">
      <img className="rounded-full h-10 w-10 object-cover cursor-pointer" src={follow.imagePath  ? follow.imagePath : utils.defaultProfileImage}/>
      <div>{follow.nickname}</div>
    </div>
  );
}

export default FollowCard;