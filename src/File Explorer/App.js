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
  const [selectFolderId, setSelectFolderId] = useState();

  /**
   * set getFolders in LocalStorage
   */
  useEffect(() => {
    localStorage.setItem('Folder', JSON.stringify(getFolders));
  }, [getFolders]);

  /**
   * Delete Folder in the getFolderay getFolders
   * @param {index} id 
   */
  const handleOnClickDeleteFolders = (id, keys) => {
    // console.log(id);
    const index = getFolders.indexOf(id);
    const result = window.confirm('Are you sure you want to Delete this Folder!');
    if (result) {
      if (!folderId) {
        getFolders.splice(index, 1);
        setGetFolders([...getFolders]);
      } else {
        getFolders.reduce((key, item) => {
          if (key) {
            return key;
          }
          if (item.id === folderId) {
            item.children.splice(index, 1);
          }
          if (item[keys]) {
            return handleOnClickDeleteFolders(item[keys], keys);
          }
          return 0;
        }, null);
        setGetFolders([...getFolders]);
      }
    }
  };

  /**
   * Rename Folder Name  value set the input box  
   * @param {id} id 
   */
  const handleOnClickRenameFolder = (name) => {
    const enteredName = prompt('Please enter your name', name);
    getFolders.forEach((item) => {
      if (item.id === selectFolderId) {
        item.name = enteredName;
        localStorage.setItem('Folder', JSON.stringify(getFolders));
      }
      item.children.forEach((citem) => {
        if (citem.id === selectFolderId) {
          citem.name = enteredName
          localStorage.setItem('Folder', JSON.stringify(getFolders));
        }
      });
    });
  };


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
   * 
   * @param {Folder id} ids 
   */
  const openModel = (foldersid) => {
    setSelectFolderId(foldersid);
  };

  /**
   * set the All Folders
   */
  useEffect(()=>{
    setAllFolders(getFolders);
  },[getFolders])
  return (
    <div className='App'>
      <div className="card w-75 h-75  mt-5 mx-auto main-div border-1">
        <div className="card-body">
          {/* passing props TopNavBar Component */}
          <TopNavbar
            getFolders={getFolders}
            setGetFolders={setGetFolders}
            handleOpenCreateFolderFrom={handleOpenCreateFolderFrom}
            openCreateFolderFrom={openCreateFolderFrom}
            setOpenCreateFolderFrom={setOpenCreateFolderFrom}
            handleCancelFrom={handleCancelFrom}
            handleOpenFileUploadFrom={handleOpenFileUploadFrom}
            openUploadFileFrom={openUploadFileFrom}
            setOpenUploadFileFrom={setOpenUploadFileFrom}
            allFoldres={allFoldres}
            folderId={folderId}
          />
          {/* passing prpos LeftSideBar Component */}
          <LeftSideBar
            getFolders={getFolders}

          />
          {/* passing props RightSiderBar Component */}
          <RightSideBar
            getFolders={getFolders}
            onDelete={handleOnClickDeleteFolders}
            onRename={handleOnClickRenameFolder}
            handleOpenCreateFolderFrom={handleOpenCreateFolderFrom}
            handleOpenFileUploadFrom={handleOpenFileUploadFrom}
            handleClickNestedFolders={handleClickNestedFolders}
            openModel={openModel}
            handleCancelFrom={handleCancelFrom}
            openCreateFolderFrom={openCreateFolderFrom}
            handleDetailS={handleDetailS}
            detailPage={detailPage}
            folderId={folderId}
            allFoldres={allFoldres}
            setAllFolders={setAllFolders}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
