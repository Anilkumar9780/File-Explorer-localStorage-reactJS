import React from 'react';
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
  //hnadle Submit
  handleSubmitFolders,
  handleSubmitFiles,
  //onChnage Input 
  handleOnChangeInputText,
  handleOnChangeFileUpload,
  //input value
  inputFolderName,
}) {

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
                <Button onClick={handleSubmitFolders} >Add</Button>
                <Button onClick={handleCancelFrom}>Cancel</Button>
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
                <Button onClick={handleSubmitFiles}>Add</Button>
                <Button onClick={handleCancelFrom}>Cancel</Button>
              </DialogActions>
            </Dialog>
            {/* File Uploading  name close*/}
            <button
              onClick={onReload}
              style={{ marginLeft:'10px',backgroundColor: ' #999999', border: '0px' }}
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
