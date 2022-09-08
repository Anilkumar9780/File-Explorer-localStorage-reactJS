import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFileUpload, faFolderPlus } from '@fortawesome/free-solid-svg-icons';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
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
}) {
  const [inputFolderName, setInputFolderName] = useState('');
  const [inputFileUpload, setInputFileUpload] = useState('');

  /**
   * handle submit Folders add
   */
  const handleSubmitFolders = (getFolders,keyss) => {
    //create objects
    const folders = {
      id: Math.floor(Math.random() * 1000),
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
        if (item[keyss]) {
          return handleSubmitFolders(item[keyss], keyss);
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
   * handle submit Files add
   */
  const handleSubmitFiles = (getFolders,keyss) => {
    // create objects
    const file = {
      id: Math.floor(Math.random() * 1000),
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
        if (item[keyss]) {
          return handleSubmitFolders(item[keyss], keyss);
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
    setInputFileUpload(URL.createObjectURL(file));
  };

  /**
   *  reload the page 
   */
  const onReload = () => {
    window.location.reload(false);
  }

  return (
    <div>
      {/* navbar top start */}
      <nav className="navbar bg-#666666 navbar-top">
        <div className="container-fluid niner-navers-top">
          <span className="navbar-brand">
            {' '}
            {/* open model button new Folder */}
            <Button variant="outlined" className="text-black" onClick={handleOpenCreateFolderFrom}>
              <FontAwesomeIcon icon={faFolderPlus} />
              New Folder
            </Button>
            <Dialog open={openCreateFolderFrom} onClose={handleCancelFrom}>
              <DialogTitle>Create Folder</DialogTitle>
              <DialogContent>
                <TextField
                  autoFocus
                  margin="dense"
                  id="name"
                  onChange={handleOnChangeInputText}
                  value={inputFolderName}
                  placeholder="Your Folder name.."
                  label="Folder Name"
                  type="text"
                  fullWidth
                  variant="standard"
                />
              </DialogContent>
              <DialogActions>
                <Button onClick={() => handleSubmitFolders(getFolders, 'children')} >Add</Button>
                <Button onClick={handleCancelFrom} > Cancel</Button>
              </DialogActions>
            </Dialog>
            {/* folder name close*/}
            {' '}
            {/* open model button  File Uploading*/}
            <Button variant="outlined" className="text-black" onClick={handleOpenFileUploadFrom}>
              <FontAwesomeIcon icon={faFileUpload} />
              {' '}
              File Upload
            </Button>
            <Dialog open={openUploadFileFrom} onClose={handleCancelFrom}>
              <DialogTitle>File Upload</DialogTitle>
              <DialogContent>
                <DialogContentText>
                  File Upload
                </DialogContentText>
                <TextField
                  autoFocus
                  margin="dense"
                  id="name"
                  onChange={handleOnChangeFileUpload}
                  placeholder="File Upload.."
                  label="File Upload"
                  type="file"
                  fullWidth
                  variant="standard"
                />
              </DialogContent>
              <DialogActions>
                <Button onClick={()=>handleSubmitFiles(getFolders, 'children')}>Add</Button>
                <Button onClick={handleCancelFrom}>Cancel</Button>
              </DialogActions>
            </Dialog>
            {/* File Uploading  name close*/}
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
