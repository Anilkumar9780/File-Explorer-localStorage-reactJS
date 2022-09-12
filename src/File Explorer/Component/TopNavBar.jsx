import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFileUpload, faFolderPlus } from '@fortawesome/free-solid-svg-icons';
import Button from '@mui/material/Button';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { Dialog } from '@material-ui/core';

export default function Navbar({
  //open create  Folder Modle
  openCreateFolderFrom,
  handleOpenCreateFolderFrom,
  //Cancel button 
  handleCancelFrom,
  //open create File Modle
  openUploadFileFrom,
  handleOpenFileUploadFrom,
  setOpenCreateFolderFrom,
  setOpenUploadFileFrom,
  //input value
  getFolders,
  folderId,
  inputFolderName, 
  setInputFolderName
}) {
  const [inputFileUpload, setInputFileUpload] = useState('');

  /**
   * handle submit Folders add
   * @param {object} getFolders 
   * @param {object} nestedkey
   * @returns 
   */
  const handleSubmitFolders = (getFolders, nestedkey) => {
    //create objects
    const folders = {
      id: Math.floor(Math.random() * 100),
      name: inputFolderName,
      date: new Date().toLocaleString(),
      type: 'Folder',
      children: [],
    };
    if (!folderId) {
      getFolders.push(folders);
      localStorage.setItem('Folder', JSON.stringify(getFolders));
    } else {
      getFolders.reduce((key, item) => {
        if (key) {
          return key;
        }
        if (item.id === folderId) {
          item.children.push(folders);
        }
        if (item[nestedkey]) {
          return handleSubmitFolders(item[nestedkey], nestedkey);
        }
        return 0;
      }, null);
      localStorage.setItem('Folder', JSON.stringify(getFolders));
    }
    setInputFolderName('');
    setOpenCreateFolderFrom(false);
    setOpenUploadFileFrom(false);
    return;
  };

  /**
   *  handle submit Files add
   * @param {object} getFolders 
   * @param {object} nestedkey 
   * @returns 
   */
  const handleSubmitFiles = (getFolders, nestedkey) => {
    // create objects
    const file = {
      id: Math.floor(Math.random() * 100),
      name: inputFileUpload,
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
        if (item[nestedkey]) {
          return handleSubmitFolders(item[nestedkey], nestedkey);
        }
        return 0;
      }, null);
      localStorage.setItem('Folder', JSON.stringify(getFolders));
    }
    setInputFolderName('');
    setOpenCreateFolderFrom(false);
    setOpenUploadFileFrom(false);
    return;
  };

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
    const file = event.target.files[0];
    if (!file) return;
    setInputFileUpload(file.createObjectURL(file));
  };

  /**
   *  reload the page 
   */
  const onReload = () => {
    window.location.reload(false);
  }

  /**
   *  autofocus  input box 
   * @param {string} input 
   */
  const autoFocusUserFolderNameInputField = (input) => {
    if (input) {
      setTimeout(() => { input.focus() }, 100);
    }
  };

  return (
    <div>
      {/* navbar top start */}
      <nav className="navbar bg-#666666 navbar-top">
        <div className="container-fluid niner-navers-top">
          <span className="navbar-brand">
            {' '}
            {/* start tag open model button new Folder */}
            <Button variant="outlined" className="text-black" onClick={handleOpenCreateFolderFrom}>
              <FontAwesomeIcon icon={faFolderPlus} />
              New Folder
            </Button>
            <Dialog open={openCreateFolderFrom} onClose={handleCancelFrom}>
              <DialogTitle>Create Folder</DialogTitle>
              <DialogContent>
                <input
                  margin="dense"
                  id="name"
                  onChange={handleOnChangeInputText}
                  value={inputFolderName}
                  placeholder="Your Folder name.."
                  label="Folder Name"
                  type="text"
                  fullWidth
                  ref={autoFocusUserFolderNameInputField}
                  variant="standard"
                />
              </DialogContent>
              <DialogActions>
                <Button onClick={() => handleSubmitFolders(getFolders, 'children')} >Add</Button>
                <Button onClick={handleCancelFrom}> Cancel</Button>
              </DialogActions>
            </Dialog>
            {/*  end tag open model button new Folder  */}
            {' '}
            {/*  start tag open model button  File Uploading*/}
            <Button variant="outlined" className="text-black" onClick={handleOpenFileUploadFrom}>
              <FontAwesomeIcon icon={faFileUpload} />
              {' '}
              File Upload
            </Button>
            <Dialog open={openUploadFileFrom} onClose={handleCancelFrom}>
              <DialogTitle>File Upload</DialogTitle>
              <DialogContent>
                <input
                  autoFocus
                  margin="dense"
                  id="name"
                  onChange={handleOnChangeFileUpload}
                  ref={autoFocusUserFolderNameInputField}
                  placeholder="File Upload.."
                  label="File Upload"
                  type="file"
                  fullWidth
                  variant="standard"
                />
              </DialogContent>
              <DialogActions>
                <Button onClick={() => handleSubmitFiles(getFolders, 'children')}>Add</Button>
                <Button onClick={handleCancelFrom}>Cancel</Button>
              </DialogActions>
            </Dialog>
            {/* end tag File Uploading  name close*/}
            {/* ReLoad Button */}
            <button
              onClick={onReload}
              style={{ marginLeft: '10px', backgroundColor: ' #999999', border: '0px' }}
            >
              <i className='fa fa-refresh'></i>
            </button>
          </span>
        </div>
      </nav>
      {/* navbar top end */}
    </div>
  );
}
