import { useState, useEffect } from 'react';
//import css and font-awesome and bootstrap file
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
  const data = localStorage.getItem('Folder');
  if (data) {
    return JSON.parse(data);
  }
  return [];
};

function App() {
  const [getFolders, setGetFolders] = useState(getFolder());
  const [openCreateFolderFrom, setOpenCreateFolderFrom] = useState(false);
  const [detailPage, setDetailPage] = useState(false);
  const [openUploadFileFrom, setOpenUploadFileFrom] = useState(false);
  const [inputFolderName, setInputFolderName] = useState('');
  const [inputFileUpload, setInputFileUpload] = useState('');
  const [folderNested, setFolderNested] = useState('');
  const [show, setShow] = useState(false);
  const [folderId, setFolderId] = useState('');
  const [selectFolderId, setSelectFolderId] = useState();
  
  /**
   * set getFolders in LocalStorage
   */
  useEffect(() => {
    localStorage.setItem('Folder', JSON.stringify(getFolders));
  }, [getFolders]);

  /**
  * Set the value in input type folder name onChange
  * @param {event} event 
  */
  const handleOnChangeInputText = (event) => {
    setInputFolderName(event.target.value)
  };

  /**
   * set the value in input type file uploading onChange
   * @param {event} event 
   */
  const handleOnChangeFileUpload = (event) => {
    const filePath = event.target;
    const reader = new FileReader();
    reader.readAsDataURL(filePath.files[0]);
    reader.onload = () => {
      setInputFileUpload(reader.result);
    };
    reader.onerror = () => {
      console.log(reader.error);
    };
  }

  /**
   * handle submit Folders add
   */
  const handleSubmitFolders = (keyss) => {
    //create objects
    const data = {
      id: Math.floor(Math.random() * 100),
      name: inputFolderName,
      date: new Date().toLocaleString(),
      type: 'Folder',
      children: [],
    };
    if (!folderId) {
      getFolders.push(data);
      localStorage.setItem('Folder', JSON.stringify(getFolders));
    } else {
      getFolders.reduce((key, item) => {
        if (key) {
          return key;
        }
        if (item.id === folderId) {
          item.children.push(data);
        }
        if (item[keyss]) {
          return handleSubmitFolders(item[keyss], keyss)
        }
        return 0;
      }, null);
      localStorage.setItem('Folder', JSON.stringify(getFolders));
    }
    setInputFolderName('');
    setOpenCreateFolderFrom(false);
    setOpenUploadFileFrom(false);
    return;
  }

  /**
   * handle submit Folders add
   */
  const handleSubmitFiles = (keyss) => {
    // create objects
    const file = {
      id: Math.floor(Math.random() * 100),
      file: inputFileUpload,
      date: new Date().toLocaleString(),
      type: 'File',
      children: [],
    };
    if (!folderId) {
      getFolders.push(file);
      localStorage.setItem('Folder', JSON.stringify(getFolders));
    } else {
      getFolders.reduce((key, item) => {
        if (key) {
          return key;
        }
        if (item.id === folderId) {
          item.children.push(file);
        }
        if (item[keyss]) {
          return handleSubmitFolders(item[keyss], keyss)
        }
        return 0;
      }, null);
      localStorage.setItem('Folder', JSON.stringify(getFolders));
    }
    setInputFolderName('');
    setOpenCreateFolderFrom(false);
    setOpenUploadFileFrom(false);
    return;
  }

  /**
   * Delete Folder in the getFolderay Data
   * @param {index} id 
   */
  const handleOnClickDeleteFolders = (id, keys) => {
    console.log(id);
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
            item.children.splice(index, 1)
          }
          if (item[keys]) {
            return handleOnClickDeleteFolders(item[keys], keys)
          }
          return 0;
        }, null);
        setGetFolders([...getFolders])
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
      })
    })
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
  const handleClickNestedFolders = (items) => {
    setFolderNested(items.children)
    setFolderId(items.id)
    setShow(true);
  };

  /**
   * 
   * @param {Folder id} ids 
   */
  const openModel = (foldersid) => {
    setSelectFolderId(foldersid)
  };

  return (
    <div>
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
            handleSubmitFolders={handleSubmitFolders}
            handleOnChangeInputText={handleOnChangeInputText}
            handleOnChangeFileUpload={handleOnChangeFileUpload}
            openUploadFileFrom={openUploadFileFrom}
            inputFolderName={inputFolderName}
            inputFileUpload={inputFileUpload}
            handleSubmitFiles={handleSubmitFiles}
          />
          {/* passing prpos LeftSideBar Component */}
          <LeftSideBar
            data={getFolders}
          />
          {/* passing props RightSiderBar Component */}
          <RightSideBar
            data={getFolders}
            onDelete={handleOnClickDeleteFolders}
            onRename={handleOnClickRenameFolder}
            handleOpenCreateFolderFrom={handleOpenCreateFolderFrom}
            handleOpenFileUploadFrom={handleOpenFileUploadFrom}
            folderNested={folderNested}
            setFolderNested={setFolderNested}
            show={show}
            handleClickNestedFolders={handleClickNestedFolders}
            openModel={openModel}
            handleCancelFrom={handleCancelFrom}
            openCreateFolderFrom={openCreateFolderFrom}
            handleDetailS={handleDetailS}
            detailPage={detailPage}
            folderId={folderId}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
