import React from 'react';
import TreeView from './TreeView';

export default function LeftSideBar({ data }) {

  return (
    <div>
      <div className="card sider-show-folder-tree-contniner ">
        <div className="card-body">
          {/* passing props in TreeView Component */}
          <TreeView data={data} />
        </div>
      </div>
    </div>
  );
}
