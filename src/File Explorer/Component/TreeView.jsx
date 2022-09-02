import React from "react";
import TreeView from "@material-ui/lab/TreeView";
import TreeItem from "@material-ui/lab/TreeItem";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";

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
        key={treeItemData.id}
        nodeId={treeItemData.id}
        label={treeItemData.name} 
        children={children}
        icon={<i className="fa fa-folder" />}
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

/**
 * 
 * @param {data} param0 
 * @returns array
 */
function App({data}) {
  return (
    <div className="App text-black">
      <DataTreeView treeItems={data} />
    </div>
  );
}

export default App;
