import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Redirect } from "react-router-dom";
import { Button, Modal, Card } from 'react-bootstrap';
import { AiFillEdit } from "react-icons/ai";
import utils from "../../../../service/utils";
import { putUserInfo } from "../../../../api/myPage";
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
      console.log(e.target.files[0]);
      console.log(typeof(e.target.files[0]));
      console.log(URL.createObjectURL(e.target.files[0]));
      setUserInfo({
        ...userInfoState,
        imageFile: e.target.files[0]
      })
    }
  }


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
      <input type="file" name="imageFile" onChange={e => handleImageFileChange(e)}/>
    </div>
  );

  const modifyInfoCard = (
    <Card>
      <Card.Img className="modify_info_card_img" variant="top" src={userInfoState.imageFile ? URL.createObjectURL(userInfoState.imageFile) : utils.defaultProfileImage}/>
      <Card.Body>
        {nicknameInput}
        {aboutMeInput}
        {imagePathInput}
      </Card.Body>
    </Card>
  )

  const handleMyInfoModify = async () => {
    const result = await putUserInfo(userInfoState.nickname, userInfoState.aboutMe);

    if('error' in result){
      alert("정보 수정에 실패했습니다." + result.error.message);
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