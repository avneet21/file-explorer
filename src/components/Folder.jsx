import { useState } from "react";

export const Folder = ({ explorer, hanldeInsertNode }) => {
  const [expand, setExpand] = useState(false);
  const [showInput, setShowInput] = useState({
    visible: false,
    isFolder: null,
  });

  const handleOnClick = (e, isFolder) => {
    e.stopPropagation();
    setExpand(true);
    setShowInput({
      visible: true,
      isFolder: isFolder,
    });
  };

  const onAddNewFolder = (e, isFolder) => {
    if (e.keyCode === 13 && e.target.value) {
      setShowInput({
        ...showInput,
        visible: false,
      });
      console.log(explorer.id, e.target.value, showInput.isFolder);
      hanldeInsertNode(explorer.id, e.target.value, showInput.isFolder);
    }
  };

  if (explorer.isFolder) {
    return (
      <div style={{ marginTop: "5px" }}>
        <div className="folder" onClick={() => setExpand(!expand)}>
          <span> 🗂️ {explorer.name}</span>
          <div>
            <button onClick={(e) => handleOnClick(e, true)}>🗂️ +</button>
            <button onClick={(e) => handleOnClick(e, false)}>📁 +</button>
          </div>
        </div>
        <div
          style={{ display: expand ? "block" : "none", paddingLeft: "35px" }}
        >
          {showInput.visible && (
            <div className="inputContainer">
              <span>{showInput.isFolder ? "🗂️" : " 📁"}</span>
              <input
                type="text"
                autoFocus
                onBlur={() => setShowInput({ ...showInput, visible: false })}
                onKeyDown={(e) => onAddNewFolder(e)}
              />
            </div>
          )}

          {explorer.items?.map((item) => {
            return (
              <Folder hanldeInsertNode={hanldeInsertNode} explorer={item} />
            );
          })}
        </div>
      </div>
    );
  } else {
    return <span className="file">📁 {explorer.name}</span>;
  }
};
