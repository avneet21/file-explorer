import "./styles.css";
import { useState } from "react";
import { explorer } from "./data/folderData";
import { Folder } from "./components/Folder";
import { useTraverseTree } from "./hooks/use-traverse-tree";

export default function App() {
  const [explorerData, setExplorerData] = useState(explorer);
  const { insertNode } = useTraverseTree();

  const hanldeInsertNode = (folderId, item, isFolder) => {
    const updatedTree = insertNode(explorer, folderId, item, isFolder);
    setExplorerData(updatedTree);
  };

  return (
    <div className="App">
      <Folder explorer={explorerData} hanldeInsertNode={hanldeInsertNode} />
    </div>
  );
}
