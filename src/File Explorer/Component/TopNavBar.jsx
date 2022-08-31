import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFileUpload, faFolderPlus } from '@fortawesome/free-solid-svg-icons';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { Select, MenuItem, FormHelperText, FormControl, InputLabel, Dialog } from '@material-ui/core';

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
  //get all Data
  setGetFolders,
  getFolders,
}) {
  const [selected, setSelected] = React.useState();

  /**
   * 
   * @param {event} event traget value in input box
   */
  const selectionChangeHandler = (event) => {
    setSelected(event.target.value);
  };

  /**
   *  Sorting by Name Alphabetical orders
   */
  const sortByName = () => {
    const ascendingByName = [...getFolders];
    const sorts = ascendingByName.sort((a, b) => a.name.localeCompare(b.name));
    setGetFolders(sorts);
  }

  /**
  
   * sorting by Name Ascending Orders
   */
  const sortAscending = () => {
    const ascendingByName = [...getFolders];
    const sorting = ascendingByName.sort((a, b) => a.name > b.name ? 1 : -1);
    setGetFolders(sorting);
  };

  /**
   * Sorting by Name Descending Oders
   */
  const sortDescending = () => {
    const descendingByName = [...getFolders];
    const sort = descendingByName.sort((a, b) => a.name > b.name ? -1 : 1);
    setGetFolders(sort);
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
          </span>
          {/* sorting button by asc and Ascending and Descending */}
          <FormControl style={{ marginTop: '-18px' }}>
            <InputLabel>Sort By</InputLabel>
            <Select value={selected} onChange={selectionChangeHandler}>
              <MenuItem onClick={sortByName} value={1}>Name</MenuItem>
              <MenuItem onClick={sortAscending} value={2}>Name(Asc)</MenuItem>
              <MenuItem onClick={sortDescending} value={3}>Name(Desc)</MenuItem>
            </Select>
            <FormHelperText>Sort By Name</FormHelperText>
          </FormControl>
        </div>
      </nav>
      {/* navbar top end */}
    </div>
  );
}
