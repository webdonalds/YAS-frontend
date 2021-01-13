import React, { useState, useEffect } from 'react';
import { Button, Modal } from 'react-bootstrap';
import { FaList, FaArrowLeft } from 'react-icons/fa';
import './AddVideoModal.css';

import { Video, PlayList, getPlayList, getPlayLists, getLikeList, getSearchList } from '../../../api/addVideo';
import useDebounce from '../../../util/debounce';

const searchDebounceDelay = 500; // ms

enum AddVideoModalCategory {
  NONE,
  PLAYLISTS,
  PLAYLIST,
  LIKELIST,
  SEARCHLIST
}

type VideoListModalProps = {
  videos: Array<Video>,
  handleClose: () => void,
  setVideo: (id: string) => void,
};

const VideoListModal: React.FC<VideoListModalProps> = (props) => {
  const handleClick = (id: string) => {
    props.setVideo(id);
    props.handleClose();
  }
  return (
    <div>
      {props.videos.map((val, idx) => (<div key={idx} onClick={()=>handleClick(val.id)}>{val.title}</div>))}
    </div>
  );
};


type AddVideoModalProps = {
  setVideo: (id: string) => void,
};

type AddVideoModalState = {
  category: AddVideoModalCategory,
  playLists: Array<PlayList>,
  videos: Array<Video>,
}

const AddVideoModal: React.FC<AddVideoModalProps> = (props) => {
  // TODO: handle non-member error
  // const { tokens, error } = GetLogin();

  const [show, setShow] = useState(false);
  const [keyword, setKeyword] = useState("");
  const [categoryState, setCategoryState] = useState<AddVideoModalState>({
    category: AddVideoModalCategory.NONE,
    playLists: [],
    videos: [],
  });

  const initCategoryState = () => {
    setKeyword("");
    setCategoryState({
      category: AddVideoModalCategory.NONE,
      playLists: [],
      videos: [],
    });
  }

  const backToPlayLists = () => setCategoryState({
    ...categoryState,
    category: AddVideoModalCategory.PLAYLISTS,
    videos: [],
  })

  const handlePlayLists = async () => {
    const response = await getPlayLists();
    setCategoryState({
      category: AddVideoModalCategory.PLAYLISTS,
      playLists: response.items,
      videos: [],
    });
  };

  const handlePlayList = async (playListId: string) => {
    const response = await getPlayList(playListId);
    setCategoryState({
      ...categoryState,
      category: AddVideoModalCategory.PLAYLIST,
      videos: response.items,
    });
  };

  const handleLikeList = async () => {
    const response = await getLikeList();
    setCategoryState({
      ...categoryState,
      category: AddVideoModalCategory.LIKELIST,
      videos: response.items,
    });
  };

  const handleSearchList = () => {
    setCategoryState({
      ...categoryState,
      category: AddVideoModalCategory.SEARCHLIST,
    });
  }

  const handleChangeKeyword = async (e: React.ChangeEvent<HTMLInputElement>) => {
    setKeyword(e.target.value);
    if(e.target.value.length < 2) {
      setCategoryState({
        ...categoryState,
        videos: [],
      });
      return;
    }
  }

  const debounceSearchFromKeyword = useDebounce(keyword, searchDebounceDelay);
  useEffect(() => {
    if(keyword.length < 2)  return;
    const search = async () => {
      const response = await getSearchList(keyword);
      setCategoryState({
        ...categoryState,
        videos: response.items,
      });
    };
    search();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debounceSearchFromKeyword]);

  const renderSwitchBody = (state: AddVideoModalState) => {
    switch(state.category) {
      case AddVideoModalCategory.NONE:
        return (
          <div>
            <div onClick={handlePlayLists}>플레이리스트에서 찾기</div>
            <div onClick={handleLikeList}>좋아요한 목록에서 찾기</div>
            <div onClick={handleSearchList}>검색해서 찾기</div>
          </div>
        );
      case AddVideoModalCategory.PLAYLISTS:
        return (
          <div>
            <FaArrowLeft onClick={initCategoryState}/>
            {categoryState.playLists.map((val, idx) => (<div key={idx} onClick={() => handlePlayList(val.id)}>{val.snippet.title}</div>))}
          </div>
        );
      case AddVideoModalCategory.PLAYLIST:
        return (
          <div>
            <FaArrowLeft onClick={backToPlayLists}/>
            <VideoListModal videos={categoryState.videos} handleClose={handleClose} setVideo={props.setVideo} />
          </div>
        );
      case AddVideoModalCategory.LIKELIST:
        return (
          <div>
            <FaArrowLeft onClick={initCategoryState}/>
            <VideoListModal videos={categoryState.videos} handleClose={handleClose} setVideo={props.setVideo} />
          </div>
        );
      case AddVideoModalCategory.SEARCHLIST:
        return (
          <div>
            <FaArrowLeft onClick={initCategoryState}/>
            <input value={keyword} onChange={handleChangeKeyword}/>
            <VideoListModal videos={categoryState.videos} handleClose={handleClose} setVideo={props.setVideo} />
          </div>
        );
    }
  };

  const handleClose = () => setShow(false);
  const handleShow = () => {
    initCategoryState();
    setShow(true);
  }
  
  const modal = show ? (
    <Modal show={show} onHide={handleClose} centered scrollable>
      <Modal.Body className="add-video-modal-body-container">
        {renderSwitchBody(categoryState)}
      </Modal.Body>
      <Modal.Footer className="add-video-modal-footer">
        <Button variant="secondary" onClick={handleClose}>
          뒤로가기
        </Button>
        <Button variant="primary" onClick={handleClose}>
          추가하기
        </Button>
      </Modal.Footer>
    </Modal>
  ) : null;

  return (<div>
    <div className="add-video-input-search-container">
      <span className="badge bg-secondary add-video-input-search" onClick={()=>handleShow()}> <FaList /> 유튜브에서 찾아보기</span>
    </div>
    {modal}
  </div>);
}

export default AddVideoModal;