import React from "react";
import utils from "../../../../service/utils";



const FollowCard: React.FC<FollowInfo> = ( follow ) => {

  return (
    //sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4
    <div className="col-span-full flex justify-center">
      <div className="rounded shadow-lg w-full sm:w-full md:w-full lg:w-1/3 xl: w-1/2">
        <img className="rounded-full h-10 w-10 object-cover cursor-pointer" src={follow.imagePath  ? follow.imagePath : utils.defaultProfileImage}/>
        <div>{follow.nickname}</div>
        <div>{follow.aboutMe}</div>
      </div>
    </div>
    
  );
}

export default FollowCard;
