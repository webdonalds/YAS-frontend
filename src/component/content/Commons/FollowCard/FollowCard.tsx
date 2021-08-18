import React from "react";
import { Link } from "react-router-dom";
import utils from "../../../../service/utils";



const FollowCard: React.FC<FollowInfo> = ( follow ) => {

  return (
    //sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4
    <div className="col-span-full flex justify-center">
      <div className="rounded shadow-lg w-full sm:w-full md:w-full lg:w-2/5 xl:w-2/5 p-2">
        <div className="inline-block align-top w-12 mr-4">
          <img className="rounded-full h-12 w-12 object-cover cursor-pointer" src={follow.imagePath  ? follow.imagePath : utils.defaultProfileImage}/>
        </div>
        <div className="inline-block align-top w-9/12">
          <Link to={`/user-page/${follow.id}`} style={{ textDecoration: 'none', color: 'black'}}>
            <div className="pl-1 text-base font-semibold inline-block max-h-10 overflow-hidden w-full leading-tight">{follow.nickname}</div>
          </Link>
          <div className="text-gray-700 text-sm font-semibold overflow-hidden max-h-12 leading-tight">
            <p>{follow.aboutMe}</p>
          </div>
        </div>
      </div>
    </div>
    
  );
}

export default FollowCard;
