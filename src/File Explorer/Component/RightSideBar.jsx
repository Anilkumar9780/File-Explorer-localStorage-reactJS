import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFileUpload, faFolderPlus } from '@fortawesome/free-solid-svg-icons';
import Button from '@mui/material/Button';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { Dialog } from '@material-ui/core';
import SearchBar from "material-ui-search-bar";
import { ContextMenu, MenuItem, ContextMenuTrigger } from "react-contextmenu";

export default function RightSideBar({
  // get the props 
  data,
  onDelete,
  handleOpenCreateFolderFrom,
  handleOpenFileUploadFrom,
  folderNested,
  handleClickNestedFolders,
  show,
  onRename,
  openModel,
  handleCancelFrom,
  handleDetailS,
  detailPage
}) {
  const [allFoldres, setAllFolders] = useState(data);
  const [searched, setSearched] = useState("");
  const [number, setNumber] = useState(1);
  const [folderPerPage] = useState(3);

  /**
   *  set pagination perPage Three 
   */
  const lastFolder = number * folderPerPage;
  const firsFolder = lastFolder - folderPerPage;
  const currentFolders = data.slice(firsFolder, lastFolder);
  const pageNumber = [];
  for (let i = 1; i <= Math.ceil(data.length / folderPerPage); i += 1) {
    pageNumber.push(i);
  }

  // eslint-disable-next-line no-unused-vars
  const ChangePage = (pageNumber) => {
    setNumber(pageNumber);
  };

  useEffect(() => {
    setNumber(number);
    setAllFolders(currentFolders);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [number, setNumber]);

  /**
   * search Folders (name)
   * @param {event} event
   */
  const handleOnSearchFolderName = (searchedVal) => {
    const filteredFolders = data.filter((folders) => {
      return folders.name.toLowerCase().includes(searchedVal.toLowerCase());
    });
    setAllFolders(filteredFolders);
  };

  const cancelSearch = () => {
    setSearched("");
    handleOnSearchFolderName(searched);
  };
  return (
    <div>
      <div className="card sider-folder-show contniner">
        <SearchBar
          style={{ height: '40px', padding: '-300px', backgroundColor: "#999999" }}
          className='serachbar'
          value={searched}
          onChange={(searchVal) => handleOnSearchFolderName(searchVal)}
          onCancelSearch={() => cancelSearch()}
        />
        {!show ? (
          <div className="card-body rows4" style={{ flexWrap: 'wrap' }}>
            {allFoldres.map((items) => {
              return <div key={items.id} className="card col-md-5" align='left' style={{ width: '12rem', height: "200px", marginLeft: "40px", backgroundColor: '#666666' }}>
                <div className="card-body">
                  <div className="text-center text-black">
                    {items.type === 'Folder' && <i className="fa fa-folder  pointer" style={{ fontSize: '110px' }} onClick={() => handleClickNestedFolders(items)} />}
                    {items.type === 'File' && <i className="fa fa-file  pointer" style={{ fontSize: '110px' }} onClick={() => handleClickNestedFolders(items)} />}
                  </div>
                </div>
                <div className="card-footer bg-black border-black text-white cards">
                  <div style={{ fontSize: '10px' }}>
                    <p className="name">{items.name}</p>
                    <p className="date">{items.date}</p>
                  </div>
                  <p>
                    <div className="menu-nav">
                      <div className="menu-item" />
                      <div className="dropdown-container" tabIndex="-1" onClick={() => openModel(items.id)}>
                        <div className="three-dots" />
                        <div className="dropdown">
                          <div>
                            <div
                              className="nav-link fa fa-folder-open mt-1 btns"
                              onClick={() => handleClickNestedFolders(items)}
                            > {' '} Open
                            </div>
                          </div>
                          <div>
                            <div
                              className="nav-link fa fa-pencil-square mt-1 btns"
                              onClick={() => onRename(items.name)}
                            > {' '} Rename
                            </div>
                          </div>
                          <div>
                            <div
                              className="nav-link fa fa-trash mt-1 btns"
                              onClick={() => onDelete(items)}
                            > {' '} Delete
                            </div>
                          </div>
                          <div>
                            <div
                              className="nav-link fa fa-info-circle mt-1 btns"
                              onClick={handleDetailS}
                            > {' '} Detail
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <Dialog open={detailPage} onClose={handleCancelFrom}>
                      <DialogTitle>Details</DialogTitle>
                      <DialogContent>
                        <DialogTitle>Name :- {items.name}</DialogTitle>
                        <DialogTitle>Types :- {items.type}</DialogTitle>
                        <DialogTitle>Date :- {items.date}</DialogTitle>
                        {items.type === 'Folder' && <DialogTitle>Size :- {items.name.length}MB</DialogTitle>}
                        {items.type === 'File' && <DialogTitle>Size :- {items.file.length}MB</DialogTitle>}
                      </DialogContent>
                      <DialogActions>
                        <Button onClick={handleCancelFrom}>Ok</Button>
                      </DialogActions>
                    </Dialog>
                  </p>
                </div>
              </div>
            })}
            <div>
              <ContextMenuTrigger id="same_unique_identifier">
                <div className="fa fa-plus-circle text-black  pointer"
                  style={{
                    fontSize: '120px',
                    marginLeft: '60px',
                    marginTop: '-20px'
                  }} />
              </ContextMenuTrigger>
              <ContextMenu id="same_unique_identifier"
                style={{
                  width: '120px',
                  height: '100px',
                  backgroundColor: ' #262727',
                  borderRadius: '3px',
                  padding: '7px',
                  textAlign: 'center',
                  cursor: 'pointer'
                }}>
                <MenuItem onClick={handleOpenCreateFolderFrom}>
                  <FontAwesomeIcon icon={faFolderPlus} />
                  {' '}
                  New Folder
                </MenuItem>
                <MenuItem>
                  <div style={{ padding: '5px' }} />
                </MenuItem>
                <MenuItem onClick={handleOpenFileUploadFrom}>
                  <FontAwesomeIcon icon={faFileUpload} />
                  {' '}
                  File Upload
                </MenuItem>
                <MenuItem divider />
              </ContextMenu>
            </div>
          </div>
        ) : (
          <div className="card-body rows4">
            {folderNested.map((items) => {
              return <div key={items.id} className="card col-md-2 " align='left' style={{ marginLeft: "40px", width: '11rem', height: "200px", backgroundColor: '#666666' }}>
                <div className="card-body ">
                  <div className="text-center text-black">
                    {items.type === 'Folder' && <i className="fa fa-folder  pointer" style={{ fontSize: '110px' }} onClick={() => handleClickNestedFolders(items)} />}
                    {items.type === 'File' && <i className="fa fa-file  pointer" style={{ fontSize: '110px' }} onClick={() => handleClickNestedFolders(items)} />}
                  </div>
                </div>
                <div className="card-footer bg-black border-black text-white cards">
                  <div style={{ fontSize: '10px' }}>
                    {items.type === 'Folder' && <p className="name">{items.name}</p>}
                    {items.type === 'File' && <p className="name">{items.type}</p>}
                    <p className="date">{items.date}</p>
                  </div>
                  <p>
                    <div className="menu-nav">
                      <div className="menu-item" />
                      <div className="dropdown-container" tabIndex="-1" onClick={() => openModel(items.id)}>
                        <div className="three-dots" />
                        <div className="dropdown">
                          <div>
                            <div
                              className="nav-link  fa fa-pencil-square  mt-1 btns"
                              onClick={() => onRename(items.name)}
                            >  Rename
                            </div>
                          </div>
                          <div>
                            <div
                              className="nav-link fa fa-trash mt-1 btns"
                              onClick={() => onDelete(items)}
                            >  Delete
                            </div>
                          </div>
                          <div>
                            <div
                              className="nav-link fa fa-info-circle mt-1 btns"
                              onClick={handleDetailS}
                            >  Detail
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </p>
                  <Dialog open={detailPage} onClose={handleCancelFrom}>
                    <DialogTitle>Details</DialogTitle>
                    <DialogContent>
                      <DialogTitle>Name :- {items.name}</DialogTitle>
                      <DialogTitle>Types :- {items.type}</DialogTitle>
                      <DialogTitle>Date :- {items.date}</DialogTitle>
                      {items.type === 'Folder' && <DialogTitle>Size :- {items.name.length}MB</DialogTitle>}
                      {items.type === 'File' && <DialogTitle>Size :- {items.file.length}MB</DialogTitle>}
                    </DialogContent>
                    <DialogActions>
                      <Button onClick={handleCancelFrom}>Ok</Button>
                    </DialogActions>
                  </Dialog>
                </div>
              </div>
            })}
            <div>
              <ContextMenuTrigger id="same_unique_identifier">
                <div className="fa fa-plus-circle text-black  pointer"
                  style={{
                    fontSize: '120px',
                    marginLeft: '60px',
                    marginTop: '-20px'
                  }} />
              </ContextMenuTrigger>
              <ContextMenu id="same_unique_identifier"
                style={{
                  width: '120px',
                  height: '100px',
                  backgroundColor: ' #262727',
                  borderRadius: '3px',
                  padding: '7px',
                  textAlign: 'center',
                  cursor: 'pointer'
                }}>
                <MenuItem onClick={handleOpenCreateFolderFrom}>
                  <FontAwesomeIcon icon={faFolderPlus} />
                  {' '}
                  New Folder
                </MenuItem>
                <MenuItem>
                  <div style={{ padding: '5px' }} />
                </MenuItem>
                <MenuItem onClick={handleOpenFileUploadFrom}>
                  <FontAwesomeIcon icon={faFileUpload} />
                  {' '}
                  File Upload
                </MenuItem>
                <MenuItem divider />
              </ContextMenu>
            </div>
          </div>
        )}
        {currentFolders.length > 0 ? (
          <div className="my-3 text-" style={{ marginLeft: '650px' }}>
            <button
              className={`${number === pageNumber.length ? ('px-3 py-1 m-1 text-center btn btn-#999999 border-0 text-#999999  disabled') : ('px-3 py-1 m-1 text-center text-black btn btn-#666666 border-0 pointer active')}`}
              type="button"
              onClick={() => setNumber((numbers) => (numbers === pageNumber.length ? numbers : numbers + 1))
              }
            >
              Load More...
            </button>
          </div>
        ) : (<div />
        )}
      </div>
    </div>
  );
}
