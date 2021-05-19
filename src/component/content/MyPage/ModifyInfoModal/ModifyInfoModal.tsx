import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Redirect } from "react-router-dom";
import { Button, Modal, Card } from 'react-bootstrap';
import utils from "../../../../service/utils";
import { putUserInfo, putProfileImage } from "../../../../api/myPage";
import "./ModifyInfoModal.css";
import { getSavedLoginThunk } from "../../../../modules/auth/authThunk";
import imageManageService from '../../../../service/imageManageService';


const ModifyInfoModal: React.FC<UserData> = (userInfo) => {
  const [show, setShow] = useState(false);
  const [userInfoState, setUserInfo] = useState<UserData>({
    ...userInfo,
    nickname: userInfo.nickname ? userInfo.nickname : "",
    aboutMe: userInfo.aboutMe ? userInfo.aboutMe : "",
    imagePath: userInfo.imagePath ? userInfo.imagePath : null
  });

  const dispatch = useDispatch();

  const initializeUserInfoState = () => {
    setUserInfo({
      ...userInfo,
      nickname: userInfo.nickname ? userInfo.nickname : "",
      aboutMe: userInfo.aboutMe ? userInfo.aboutMe : "",
      imagePath: userInfo.imagePath ? userInfo.imagePath : null
    })
  }
  

  const hideModal = () => setShow(false);
  const showModal = () => {
    initializeUserInfoState();
    setShow(true);
  }
  

  const handleNicknameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserInfo({
      ...userInfoState,
      nickname: e.target.value
    })
  };

  const handleAboutMeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserInfo({
      ...userInfoState,
      aboutMe: e.target.value
    })
  };

  const handleimagePathChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if(e.target.files){
      const file = e.target.files[0];
  
      try{
        const imageString = await imageManageService.convertimageFile2String(file);
        const resizedImageString = await imageManageService.resizeImageString(imageString);

        setUserInfo({
          ...userInfoState,
          imagePath: resizedImageString
        })
      } catch (e) {
        console.log(e.message);
        alert("이미지 파일을 확인해주세요.");
      }
    }
  }


  const handleimagePathDelete = () => {
    setUserInfo({
      ...userInfoState,
      imagePath: null
    })
  }

  const labelClass = "w-1/5 inline-block text-base	bg-purple-600 text-white rounded text-center px-2 py-1.5 mr-4 font-bold";
  const inputClass = "w-3/4 text-xl inline-block h-full pb-1 px-1 rounded border-2";
  const lineContainerClass = "mb-3.5";

  const nicknameInput = (
    <div className={lineContainerClass}>
      <span className={labelClass}>닉네임</span>
      <input className={inputClass} name="nickname" value={userInfoState.nickname} onChange={handleNicknameChange}/>
    </div>
  );

  const aboutMeInput = (
    <div className={lineContainerClass}>
      <span className={labelClass}>내 소개</span>
      <input className={inputClass} name="aboutMe" value={userInfoState.aboutMe} onChange={handleAboutMeChange}/>
    </div>
  );

  const imagePathInput = (
    <>
      <div className={lineContainerClass}>
        <span className={labelClass}>프사 파일</span>
        <input className={inputClass} type="file" name="imagePath" accept="image/*" onChange={e => handleimagePathChange(e)}/>
      </div>
      <Button variant="danger" onClick={handleimagePathDelete}>프로필 사진 삭제</Button>
    </>
  );

  const modifyInfoCard = (
    <Card>
      <Card.Img className="modify_info_card_img my-4" variant="top" src={userInfoState.imagePath ? userInfoState.imagePath : utils.defaultProfileImage}/>
      <Card.Body>
        {nicknameInput}
        {aboutMeInput}
        {imagePathInput}
      </Card.Body>
    </Card>
  )

  const handleMyInfoModify = async () => {
    const modifyInfoResult = await putUserInfo(userInfoState.nickname, userInfoState.aboutMe);
    if(userInfoState.imagePath != userInfo.imagePath){
      if(userInfoState.imagePath && userInfoState.imagePath.length > 1000000){
        alert("프로필 사진 크기가 너무 큽니다.");
      } 
      else {
        const modifyProfileImageResult = await putProfileImage(userInfoState.imagePath);
        if('error' in modifyProfileImageResult){
          alert("프로필 사진 수정에 실패했습니다." + modifyProfileImageResult.error.message);
        }
      }      
    }

    if('error' in modifyInfoResult){
      alert("정보 수정에 실패했습니다." + modifyInfoResult.error.message);
      return;
    }

    alert("정보 수정에 성공했습니다.");
    dispatch(getSavedLoginThunk());
    
    setShow(false);
    return <Redirect to="/my-page"/>;
  }

  const modal = show ? (
    <Modal show={show} onHide={hideModal} centered scrollable>
      <Modal.Body className="p-2">
        {modifyInfoCard}
      </Modal.Body>
      <Modal.Footer>
        <Button className="bg-purple-500 border-purple-500 hover:bg-purple-600 hover:border-purple-600" onClick={() => handleMyInfoModify()}>수정하기</Button>
      </Modal.Footer>
    </Modal>
  ) : null;


  return (
    <div className="flex justify-center">
      <button className="bg-white text-gray-800 font-bold py-2 px-4 border border-gray-400 rounded relative hover:bg-purple-700" onClick={showModal}>
        Edit My Info
      </button>
      {modal}
    </div>
  );
}

export default ModifyInfoModal;