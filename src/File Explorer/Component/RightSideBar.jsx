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
import { Select, FormHelperText, FormControl, InputLabel, } from '@mui/material';
// import MenuItem from '@mui/material/MenuItem';

export default function RightSideBar({
  // get the props 
  onDelete,
  handleOpenCreateFolderFrom,
  handleOpenFileUploadFrom,
  handleClickNestedFolders,
  onRename,
  openModel,
  handleCancelFrom,
  handleDetailS,
  detailPage,
  allFoldres,
  setAllFolders
}) {
  const [selected, setSelected] = React.useState();
  const [visible, setVisible] = useState(2);
  const [searched, setSearched] = useState("");
  
  /**
   * search Folders (name)
   * @param {event} event
   */
   const handleOnSearchFolderName = (searchedVal) => {
    const filteredFolders = allFoldres.filter((folders) => {
      return folders.name.toLowerCase().includes(searchedVal.toLowerCase());
    });
    setAllFolders(filteredFolders);
};

const cancelSearch = () => {
  setSearched("");
  handleOnSearchFolderName(searched);
};

  /**
   * 
   * @param {event} event traget value in input box
   */
  const selectionChangeHandler = (event) => {
    setSelected(event.target.value);
  };

  /**
   * Load More Button 
   */
  const showMoreItems = () => {
    setVisible((prevValue) => prevValue + 1);
  };

  /**
   *  set pagination perPage Three 
  */
  // const foldersPerPage = 3;
  // const ref = useRef(foldersPerPage)
  // const loopWithSlice = (start, end) => {
  //   if (!folderId) {
  //     const slicedfolders = data.slice(start, end);
  //     setAllFolders(slicedfolders);
  //   } else {
  //     // const slicedNestedfolders = folderNested.slice(start, end);
  //     // setFolderNested(slicedNestedfolders);
  //   }
  // };
  // useEffect(() => {
  //   loopWithSlice(0, foldersPerPage)
  // }, [])

  // const handleShowMorePosts = () => {
  //   loopWithSlice(ref.current, ref.current + foldersPerPage)
  //   ref.current += foldersPerPage
  // }

  
  /**
   *  Sorting by Name Alphabetical orders
   */
   const sortByName = () => {
    const ascendingByName = [...allFoldres];
    const sorts = ascendingByName.sort((a, b) => a.name.localeCompare(b.name));
    setAllFolders(sorts);
};

/**
 * sorting by Name Ascending Orders
 */
const sortAscending = () => {
    const ascendingByName = [...allFoldres];
    const sorting = ascendingByName.sort((a, b) => a.name > b.name ? 1 : -1);
    setAllFolders(sorting);
};

/**
* Sorting by Name Descending Oders
*/
const sortDescending = () => {
    const sortbyDescending = [...allFoldres];
    const sort = sortbyDescending.sort((a, b) => a.name > b.name ? -1 : 1);
    setAllFolders(sort);
};

  return (
    <div>
      <div className="card sider-folder-show contniner">
        {/* sorting button by asc and Ascending and Descending select box*/}
        <FormControl
          style={{
            marginTop: '-68px',
            marginLeft: '700px',
            width: '90px',
            cursor: 'pointer'
          }}
          size='small'
          variant='standard'
        >
          <InputLabel>Sort By</InputLabel>
          <Select value={selected} onChange={selectionChangeHandler}>
            <MenuItem onClick={sortByName} value={1}>Name</MenuItem>
            <MenuItem onClick={sortAscending} value={2}>Name(Asc)</MenuItem>
            <MenuItem onClick={sortDescending} value={3}>Name(Desc)</MenuItem>
          </Select>
          <FormHelperText>Sort By Name</FormHelperText>
        </FormControl>
        {/* search bar  */}
        <SearchBar
          style={{ height: '40px', padding: '-300px', backgroundColor: "#999999" }}
          className='serachbar'
          value={searched}
          onChange={(searchVal) => handleOnSearchFolderName(searchVal)}
          onCancelSearch={() => cancelSearch()}
        />
        <div className="card-body rows4" style={{ flexWrap: 'wrap' }}>
          {/*  folders map  */}
          {allFoldres?.slice(0, visible).map((items) => {
            return <div key={items.id} className="card col-md-5" align='left'
              style={{
                width: '12rem',
                height: "200px",
                marginLeft: "40px",
                backgroundColor: '#666666'
              }}>
              <div className="card-body">
                <div className="text-center text-black">
                  {items.type === 'Folder' &&
                    <i
                      className="fa fa-folder pointer"
                      style={{ fontSize: '110px' }}
                      onClick={() => handleClickNestedFolders(items)}
                    />
                  }
                  {items.type === 'File' &&
                    <i
                      className="fa fa-file  pointer"
                      style={{ fontSize: '110px' }}
                      onClick={() => handleClickNestedFolders(items)}
                    />
                  }
                </div>
              </div>
              <div className="card-footer bg-black border-black text-white cards">
                <div style={{ fontSize: '10px' }}>
                  {items.type === 'Folder' && <p className="name">{items.name}</p>}
                  {items.type === 'File' && <p className="name">{items.name}</p>}
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
                  {/* onclick detail button then model open menu  */}
                  <Dialog open={detailPage} onClose={handleCancelFrom}>
                    <DialogTitle>Details</DialogTitle>
                    <DialogContent>
                      {items.type === 'Folder' && <DialogTitle>Name :- {items.name}</DialogTitle>}
                      {items.type === 'File' && <DialogTitle>Name :- {items.name}</DialogTitle>}
                      <DialogTitle>Types :- {items.type}</DialogTitle>
                      <DialogTitle>Date :- {items.date}</DialogTitle>
                      {items.type === 'Folder' && <DialogTitle>Size :- {items.name.length}MB</DialogTitle>}
                      {items.type === 'File' && <DialogTitle>Size :- {items.name.length}MB</DialogTitle>}
                    </DialogContent>
                    <DialogActions>
                      <Button onClick={handleCancelFrom}>Ok</Button>
                    </DialogActions>
                  </Dialog>
                </p>
              </div>
            </div>
          })}
          {/* right click plus icon open menu */}
          <div>
            <ContextMenuTrigger id="same_unique_identifier">
              <div className="fa fa-plus-circle text-black  pointer rightplus" />
            </ContextMenuTrigger>
            <ContextMenu id="same_unique_identifier" className='onrightclick'>
              <MenuItem onClick={handleOpenCreateFolderFrom}>
                <FontAwesomeIcon icon={faFolderPlus} />
                {' '}
                New Folder
              </MenuItem>
              <MenuItem>
                <div className='itemspadding' />
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
        {/* load More button using pagination */}
        {allFoldres.length > 0 ? (
          <Button
            className='mt-4 text-black'
            onClick={showMoreItems}
          >
            Load More...
          </Button>
        ) : (
          <div />
        )}
      </div>
    </div>
  );
}
