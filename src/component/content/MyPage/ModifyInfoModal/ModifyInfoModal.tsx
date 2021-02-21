import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Redirect } from "react-router-dom";
import { Button, Modal, Card } from 'react-bootstrap';
import { AiFillEdit } from "react-icons/ai";
import utils from "../../../../service/utils";
import { putUserInfo, putProfileImage } from "../../../../api/myPage";
import "./ModifyInfoModal.css";
import { getSavedLoginThunk } from "../../../../modules/auth/authThunk";


const ModifyInfoModal: React.FC<UserData> = (userInfo) => {
  const [show, setShow] = useState(false);
  const [userInfoState, setUserInfo] = useState<UserData>({
    ...userInfo,
    nickname: userInfo.nickname ? userInfo.nickname : "",
    aboutMe: userInfo.aboutMe ? userInfo.aboutMe : "",
    imageFile: userInfo.imageFile ? userInfo.imageFile : null
  });

  const dispatch = useDispatch();

  const initializeUserInfoState = () => {
    setUserInfo({
      ...userInfo,
      nickname: userInfo.nickname ? userInfo.nickname : "",
      aboutMe: userInfo.aboutMe ? userInfo.aboutMe : "",
      imageFile: userInfo.imageFile ? userInfo.imageFile : null
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

  const handleImageFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if(e.target.files){
      const file = e.target.files[0];
  
      try{
        const fileString = await file2String(file);
        setUserInfo({
          ...userInfoState,
          imageFile: fileString
        })
      } catch (e) {
        console.log(e.message);
      }
    }
  }

  const handleImageFileDelete = () => {
    setUserInfo({
      ...userInfoState,
      imageFile: null
    })
  }

  const file2String = (file:File) => {
    const fileReader = new FileReader();
  
    return new Promise<string>((resolve, reject) => {
      fileReader.onerror = () => {
        fileReader.abort();
        reject(new DOMException("Problem while converting image to base64!!!"));
      };
  
      fileReader.onload = () => {
        resolve(fileReader.result as string);
      };
      fileReader.readAsDataURL(file);
    });
  };
  
  
  const nicknameInput = (
    <div className="modify_info_card_input_container">
      <span className="badge bg-primary">닉네임</span>
      <input name="nickname" value={userInfoState.nickname} onChange={handleNicknameChange}/>
    </div>
  );

  const aboutMeInput = (
    <div className="modify_info_card_input_container">
      <span className="badge bg-primary">내 소개</span>
      <input name="aboutMe" value={userInfoState.aboutMe} onChange={handleAboutMeChange}/>
    </div>
  );

  // TODO : profile image validation check
  const imagePathInput = (
    <>
      <div className="modify_info_card_input_container">
        <span className="badge bg-primary">프사 파일</span>
        <input type="file" name="imageFile" accept="image/*" onChange={e => handleImageFileChange(e)}/>
      </div>
      <Button variant="danger" onClick={handleImageFileDelete}>프로필 사진 삭제</Button>
    </>
  );


  const modifyInfoCard = (
    <Card>
      <Card.Img className="modify_info_card_img" variant="top" src={userInfoState.imageFile ? userInfoState.imageFile : utils.defaultProfileImage}/>
      <Card.Body>
        {nicknameInput}
        {aboutMeInput}
        {imagePathInput}
      </Card.Body>
    </Card>
  )

  const handleMyInfoModify = async () => {
    const modifyInfoResult = await putUserInfo(userInfoState.nickname, userInfoState.aboutMe);
    if(userInfoState.imageFile != userInfo.imageFile){
      const modifyProfileImageResult = await putProfileImage(userInfoState.imageFile);
      if('error' in modifyProfileImageResult){
        alert("프로필 사진 수정에 실패했습니다." + modifyProfileImageResult.error.message);
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
      <Modal.Body>
        {modifyInfoCard}
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={() => handleMyInfoModify()}>내 정보 수정하기</Button>
      </Modal.Footer>
    </Modal>
  ) : null;


  return (
    <div>
      <AiFillEdit className="modify_info_modal_show_button" onClick={showModal}/>
      {modal}
    </div>
  );
}

export default ModifyInfoModal;