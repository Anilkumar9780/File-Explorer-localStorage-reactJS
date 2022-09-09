import React from "react";
import TreeView from "@material-ui/lab/TreeView";
import TreeItem from "@material-ui/lab/TreeItem";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";

function App({ data, setTreeId,treeId }) {

  const treeDisplay = (id) => {
    setTreeId(id);
  };

  /**
   * display tree view using recursion
   * @param {treeItems} treeItems 
   * @returns array
   */
  const getTreeItemsFromData = treeItems => {
    return treeItems.map(treeItemData => {
      let children = undefined;
      if (treeItemData.children && treeItemData.children.length > 0) {
        children = getTreeItemsFromData(treeItemData.children);
      }
      return (
        <TreeItem
          onClick={() => treeDisplay(treeItemData, 'children')}
          key={treeItemData.id}
          nodeId={treeItemData.id}
          children={children}
          label={treeItemData.type === 'File' ? (treeItemData.type) : (treeItemData.name)}
          icon={treeItemData.type === 'File' ? (<i className="fa fa-file" />) : (<i className="fa fa-folder" />)}
        />
      );
    });
  };

  /**
   * display tree view using recursion
   * @param {treeItems} param0 
   * @returns array
   */
  const DataTreeView = ({ treeItems }) => {
    return (
      <TreeView
        defaultCollapseIcon={<ExpandMoreIcon />}
        defaultExpandIcon={<ChevronRightIcon />}
      >
        {getTreeItemsFromData(treeItems)}
      </TreeView>
    );
  };
  return (
    <div className="App text-black">
      <DataTreeView treeItems={data} />
    </div>
  );
}
export default App;

