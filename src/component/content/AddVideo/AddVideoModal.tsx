import React, { useState, useEffect } from 'react';
import { Modal } from 'react-bootstrap';
import { FaArrowLeft, FaChevronRight, FaChevronDown, FaSearch } from 'react-icons/fa';

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

  // nbsp; for margin
  return (
    <div className="divide-y text-gray-500">
      {props.videos.map((val, idx) => (<div key={idx} onClick={()=>handleClick(val.id)} className="py-2 cursor-pointer">
        <img className="h-32 float-left" src={`https://img.youtube.com/vi/${val.id}/0.jpg`} />
        <div className="w-2 float-left">&nbsp;</div>
        <div className="inline-table">
          <div className="table-cell h-32 align-middle text-base break-words">
            {val.title}
          </div>
        </div>
      </div>))}
    </div>
  );
};


type AddVideoModalProps = {
  setVideo: (id: string) => void,
};

type AddVideoModalState = {
  category: AddVideoModalCategory,
  playLists: Array<PlayList>,
  playListsNextPageToken: string | undefined,
  playListId: string,
  playListName: string,
  videos: Array<Video>,
  videoNextPageToken: string | undefined,
}

const AddVideoModal: React.FC<AddVideoModalProps> = (props) => {
  const [show, setShow] = useState(false);
  const [keyword, setKeyword] = useState("");
  const [categoryState, setCategoryState] = useState<AddVideoModalState>({
    category: AddVideoModalCategory.NONE,
    playLists: [],
    playListsNextPageToken: undefined,
    playListId: "",
    playListName: "",
    videos: [],
    videoNextPageToken: undefined,
  });

  const initCategoryState = () => {
    setKeyword("");
    setCategoryState({
      category: AddVideoModalCategory.NONE,
      playLists: [],
      playListsNextPageToken: undefined,
      playListId: "",
      playListName: "",
      videos: [],
      videoNextPageToken: undefined,
    });
  }

  // TODO: handle nextPageToken
  const backToPlayLists = () => setCategoryState({
    ...categoryState,
    category: AddVideoModalCategory.PLAYLISTS,
    playListId: "",
    videos: [],
    videoNextPageToken: undefined,
  })

  const handlePlayLists = async (nextPageToken: string | undefined = undefined) => {
    const response = await getPlayLists(nextPageToken);
    setCategoryState({
      category: AddVideoModalCategory.PLAYLISTS,
      playLists: categoryState.playLists.concat(response.items),
      playListsNextPageToken: response.nextPageToken,
      videos: [],
      playListId: "",
      playListName: "",
      videoNextPageToken: undefined,
    });
  };

  const handlePlayList = async (playListId: string, playListName: string, nextPageToken: string | undefined = undefined) => {
    const response = await getPlayList(playListId, nextPageToken);
    setCategoryState({
      ...categoryState,
      category: AddVideoModalCategory.PLAYLIST,
      videos: categoryState.videos.concat(response.items),
      playListId: playListId,
      playListName: playListName,
      videoNextPageToken: response.nextPageToken,
    });
  };

  const handleLikeList = async (nextPageToken: string | undefined = undefined) => {
    const response = await getLikeList(nextPageToken);
    setCategoryState({
      ...categoryState,
      category: AddVideoModalCategory.LIKELIST,
      videos: categoryState.videos.concat(response.items),
      playListId: "",
      videoNextPageToken: response.nextPageToken,
    });
  };

  const handleSearchList = () => {
    setCategoryState({
      ...categoryState,
      category: AddVideoModalCategory.SEARCHLIST,
      videos: [],
      playListId: "",
      videoNextPageToken: undefined,
    });
  };

  const handleSearch = async (keyword: string, nextPageToken: string | undefined = undefined) => {
    const response = await getSearchList(keyword, nextPageToken);
    setCategoryState({
      ...categoryState,
      videos: categoryState.videos.concat(response.items),
      videoNextPageToken: response.nextPageToken,
    });
  }

  const handleChangeKeyword = async (e: React.ChangeEvent<HTMLInputElement>) => {
    setKeyword(e.target.value);
    if(e.target.value.length < 2) {
      setCategoryState({
        ...categoryState,
        videos: [],
        videoNextPageToken: undefined,
      });
      return;
    }
  }

  const debounceSearchFromKeyword = useDebounce(keyword, searchDebounceDelay);
  useEffect(() => {
    if(keyword.length < 2)  return;
    handleSearch(keyword);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debounceSearchFromKeyword]);

  const nextPageButton = (state: AddVideoModalState) => {
    if(state.videoNextPageToken == undefined)  return null;

    const getIcon = (onClick: ()=>void) => {
      return (<div onClick={onClick} className="w-full pt-2 cursor-pointer">
        <FaChevronDown className="block m-0 m-auto text-2xl" />
      </div>);
    }
    switch(state.category) {
      case AddVideoModalCategory.NONE:
        return null;
      case AddVideoModalCategory.PLAYLISTS:
        return getIcon(()=>handlePlayLists(categoryState.videoNextPageToken));
      case AddVideoModalCategory.PLAYLIST:
        return getIcon(()=>handlePlayList(categoryState.playListId, categoryState.playListName, categoryState.videoNextPageToken));
      case AddVideoModalCategory.LIKELIST:
        return getIcon(()=>handleLikeList(categoryState.videoNextPageToken));
      case AddVideoModalCategory.SEARCHLIST:
        return getIcon(()=>handleSearch(keyword, categoryState.videoNextPageToken));
    }
  }

  const renderSwitchBody = (state: AddVideoModalState) => {
    const getListButton = (content: string, onClick: () => void, key: string | number | undefined = undefined) => (
      <div onClick={onClick} key={key} className="flex justify-between align-baseline py-3 cursor-pointer text-gray-500">
        <span>{content}</span>
        <FaChevronRight className="mt-1" />
      </div>
    );

    switch(state.category) {
      case AddVideoModalCategory.NONE:
        return (
          <div className="divide-y">
            {getListButton("플레이리스트에서 찾기", () => handlePlayLists())}
            {getListButton("좋아요한 목록에서 찾기", () => handleLikeList())}
            {getListButton("검색해서 찾기", () => handleSearchList())}
          </div>
        );
      case AddVideoModalCategory.PLAYLISTS:
        return (
          <div className="divide-y">
            {categoryState.playLists.map((val, idx) => getListButton(val.snippet.title, ()=>handlePlayList(val.id, val.snippet.title), idx))}
            {nextPageButton(state)}
          </div>
        );
      case AddVideoModalCategory.PLAYLIST:
        return (
          <div className="divide-y">
            <VideoListModal videos={categoryState.videos} handleClose={handleClose} setVideo={props.setVideo} />
            {nextPageButton(state)}
          </div>
        );
      case AddVideoModalCategory.LIKELIST:
        return (
          <div className="divide-y">
            <VideoListModal videos={categoryState.videos} handleClose={handleClose} setVideo={props.setVideo} />
            {nextPageButton(state)}
          </div>
        );
      case AddVideoModalCategory.SEARCHLIST:
        return (
          <div>
            <input value={keyword} onChange={handleChangeKeyword} className="inline-block h-8 my-2 pl-2 border"/>
            <FaSearch className="inline-block h-8 ml-2 text-lg" />
            <div className="divide-y">
              <VideoListModal videos={categoryState.videos} handleClose={handleClose} setVideo={props.setVideo} />
              {nextPageButton(state)}
            </div>
          </div>
        );
    }
  };

  const handleClose = () => setShow(false);
  const handleBack = (state: AddVideoModalState) => {
    switch(state.category) {
      case AddVideoModalCategory.NONE:
        return handleClose;
      case AddVideoModalCategory.PLAYLISTS:
        return initCategoryState;
      case AddVideoModalCategory.PLAYLIST:
        return backToPlayLists;
      case AddVideoModalCategory.LIKELIST:
        return initCategoryState;
      case AddVideoModalCategory.SEARCHLIST:
        return initCategoryState;
    }
  }
  const getTitle = (state: AddVideoModalState) => {
    switch(state.category) {
      case AddVideoModalCategory.NONE:
        return "유튜브에서 찾아보기";
      case AddVideoModalCategory.PLAYLISTS:
        return "플레이리스트";
      case AddVideoModalCategory.PLAYLIST:
        return state.playListName;
      case AddVideoModalCategory.LIKELIST:
        return "좋아요";
      case AddVideoModalCategory.SEARCHLIST:
        return "검색";
    }
  }
  const handleShow = () => {
    initCategoryState();
    setShow(true);
  }
  
  const modal = show ? (
    <Modal show={show} onHide={handleClose} centered scrollable>
      <Modal.Header className="block">
        <FaArrowLeft onClick={handleBack(categoryState)} className="inline-block cursor-pointer text-lg" />
        <div className="inline-block ml-2">
          {getTitle(categoryState)}
        </div>
      </Modal.Header>
      <Modal.Body className="h-144 pt-0">
        {renderSwitchBody(categoryState)}
      </Modal.Body>
    </Modal>
  ) : null;

  return (<div className="inline-block">
    <div className="inline-block">
      <span className="inline-block rounded bg-main mt-1 mb-1 py-1 px-2.5 font-bold text-white text-sm text-center align-baseline cursor-pointer" onClick={()=>handleShow()}>
        유튜브에서 찾아보기
      </span>
    </div>
    {modal}
  </div>);
}

export default AddVideoModal;