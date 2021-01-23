import React, { useState } from "react";
import { Button, Modal, Card } from 'react-bootstrap';
import { AiFillEdit } from "react-icons/ai";
import utils from "../../../../service/utils"
import "./ModifyInfoModal.css";


const ModifyInfoModal: React.FC<userData> = (userInfo) => {
  const [show, setShow] = useState(false);
  const [userInfoState, setUserInfo] = useState<userData>({
    ...userInfo,
    nickname: userInfo.nickname ? userInfo.nickname : "",
    aboutMe: userInfo.aboutMe ? userInfo.aboutMe : "",
    imagePath: userInfo.imagePath ? userInfo.imagePath : ""
  });


  const initializeUserInfoState = () => {
    setUserInfo({
      ...userInfo,
      nickname: userInfo.nickname ? userInfo.nickname : "",
      aboutMe: userInfo.aboutMe ? userInfo.aboutMe : "",
      imagePath: userInfo.imagePath ? userInfo.imagePath : ""
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

  const handleImagePathChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserInfo({
      ...userInfoState,
      imagePath: e.target.value
    })
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
    <div className="modify_info_card_input_container">
      <span className="badge bg-primary">프사 링크</span>
      <input name="imagePath" value={userInfoState.imagePath} onChange={handleImagePathChange}/>
    </div>
  );

  const modifyInfoCard = (
    <Card>
      <Card.Img className="modify_info_card_img" variant="top" src={userInfoState.imagePath ? userInfoState.imagePath : utils.defaultProfileImage}/>
      <Card.Body>
        {nicknameInput}
        {aboutMeInput}
        {imagePathInput}
      </Card.Body>
    </Card>
  )

  const handleMyInfoModify = () => {
    
    console.log(userInfoState);

  }

  const modal = show ? (
    <Modal show={show} onHide={hideModal} centered scrollable>
      <Modal.Body>
        {modifyInfoCard}
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={handleMyInfoModify}>내 정보 수정하기</Button>
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