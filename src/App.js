import React from "react";
// import './SideBar.css';
import TreeItem from '@material-ui/lab/TreeItem';
import TreeView from '@material-ui/lab/TreeView';
// import TreeView from "@mui/lab/TreeView";
// import TreeItem from "@mui/lab/TreeItem";
import Folders from "./Folder";
// import FolderIcon from '@mui/icons-material/Folder';
// import { TreeView } from '@mui/lab/TreeView';
// yarn add bootstrap@5.2.0
// yarn add font awesome
export default function SideBar() {
  
  const displayTreeView = (folders) => {
    if (!folders) {
      return "Empty";
    }
    return folders.map((foldersitem) => {
      return (
        <TreeItem
          key={foldersitem.id}
          nodeId={foldersitem.id}
          label={foldersitem.name}
          icon={<i className="fa fa-folder"/>}
        >
          {displayTreeView(foldersitem.subFolders)}
        </TreeItem>
      );
    });
  };

  return (
    <div className="sidebar">
      <TreeView>
        {displayTreeView(Folders)}
      </TreeView>
    </div>
  )
}
