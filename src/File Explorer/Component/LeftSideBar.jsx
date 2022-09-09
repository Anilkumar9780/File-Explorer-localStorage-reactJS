import React from 'react';
import TreeView from './TreeView';

export default function LeftSideBar({ getFolders, treeId, setTreeId }) {

  return (
    <div>
      <div className="card sider-show-folder-tree-contniner">
        <div className="card-body">
          {/* passing props in TreeView Component */}
          <TreeView
            data={getFolders}
            setTreeId={setTreeId}
            treeId={treeId}
          />
        </div>
      </div>
    </div>
  );
}
