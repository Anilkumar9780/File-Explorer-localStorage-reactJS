import { useState, useEffect } from 'react';
//import font-awesome and bootstrap file
import 'bootstrap/dist/css/bootstrap.min.css';
import 'font-awesome/css/font-awesome.min.css';
// import external Component 
import RightSideBar from './Component/RightSideBar';
import LeftSideBar from './Component/LeftSideBar';
import TopNavbar from './Component/TopNavBar';
// import external css file
import './Component/css/App.css';

/**
 * get Folders in localstorage
 * @returns getFolderay
 */
const getFolder = () => {
  const getFolders = localStorage.getItem('Folder');
  if (getFolders) {
    return JSON.parse(getFolders);
  }
  return [];
};

function App() {
  const [getFolders, setGetFolders] = useState(getFolder());
  const [openCreateFolderFrom, setOpenCreateFolderFrom] = useState(false);
  const [detailPage, setDetailPage] = useState(false);
  const [openUploadFileFrom, setOpenUploadFileFrom] = useState(false);
  const [allFoldres, setAllFolders] = useState([]);
  const [folderId, setFolderId] = useState();
  const [deleteConfirmation, setDeleteConfirmation] = useState(false);
  const [editFolderFrom, setEditFolderFrom] = useState(false);

  /**
   * set getFolders in LocalStorage
   */
  useEffect(() => {
    localStorage.setItem('Folder', JSON.stringify(getFolders));
    setAllFolders(getFolders);
  }, [getFolders]);

  /**
   * set open modal onclick upload file button 
   */
  const handleOpenFileUploadFrom = () => {
    setOpenUploadFileFrom(true);
  };

  /**
   * set open modal onclick create Folder  button  
   */
  const handleOpenCreateFolderFrom = () => {
    setOpenCreateFolderFrom(true);
  };

  /**
   * set open modal detail Page
   */
  const handleDetailS = () => {
    setDetailPage(true);
  };

  /**
   * set open modal onclick create Folder  close  
   */
  const handleCancelFrom = () => {
    setOpenCreateFolderFrom(false);
    setOpenUploadFileFrom(false);
    setDetailPage(false);
    setDeleteConfirmation(false);
    setEditFolderFrom(false);
  };

  /**
   * set Nested Folders and map Folders
   * @param {items} items 
   */
  const handleClickNestedFolders = (allFolders) => {
    setFolderId(allFolders.id);
    if (allFolders.children) {
      setAllFolders(allFolders.children)
    } else {
      return "Empty";
    }
  };

  /**
   * open delete Confirmation Modle
   */
  const handledeleteConfirmationModle = () => {
    setDeleteConfirmation(true);
  };

  /**
   *  onClick open Modle (Rename From) 
   */
  const handleEditModleFrom = () => {
    setEditFolderFrom(true);
  };

  return (
    <div className='App'>
      <div className="card w-75 h-75  mt-5 mx-auto main-div border-1">
        <div className="card-body">
          {/* passing props TopNavBar Component */}
          <TopNavbar
            // get all Data
            getFolders={getFolders}
            setGetFolders={setGetFolders}
            // open modle from folder input box
            handleOpenCreateFolderFrom={handleOpenCreateFolderFrom}
            openCreateFolderFrom={openCreateFolderFrom}
            setOpenCreateFolderFrom={setOpenCreateFolderFrom}
            // From cancel button
            handleCancelFrom={handleCancelFrom}
            // open modle upload file input box
            handleOpenFileUploadFrom={handleOpenFileUploadFrom}
            openUploadFileFrom={openUploadFileFrom}
            setOpenUploadFileFrom={setOpenUploadFileFrom}
            allFoldres={allFoldres}
            // folders id 
            folderId={folderId}
          />
          {/* passing prpos LeftSideBar Component */}
          <LeftSideBar
            getFolders={getFolders}
          />
          {/* passing props RightSiderBar Component */}
          <RightSideBar
            // all get Data
            getFolders={getFolders}
            setGetFolders={setGetFolders}
            // move nested Folders
            handleClickNestedFolders={handleClickNestedFolders}
            // open modle 
            openCreateFolderFrom={openCreateFolderFrom}
            handleOpenCreateFolderFrom={handleOpenCreateFolderFrom}
            handleOpenFileUploadFrom={handleOpenFileUploadFrom}
            // openModel={openModel}
            // From cancel button
            handleCancelFrom={handleCancelFrom}
            //Detail Modle
            detailPage={detailPage}
            handleDetailS={handleDetailS}
            // folders id 
            folderId={folderId}
            // all Data
            allFoldres={allFoldres}
            setAllFolders={setAllFolders}
            // Delete Confimation 
            deleteConfirmation={deleteConfirmation}
            handledeleteConfirmationModle={handledeleteConfirmationModle}
            setDeleteConfirmation={setDeleteConfirmation}
            // selete Folders id
            // selectFolderId={selectFolderId}
            //
            editFolderFrom={editFolderFrom}
            setEditFolderFrom={setEditFolderFrom}
            handleEditModleFrom={handleEditModleFrom}
            // editName={editName}
            // setEditName={setEditName}
            // editsName={editsName}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
