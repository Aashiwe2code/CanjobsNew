import React, { useState } from "react";
import { Editor, EditorState, ContentState } from "draft-js";

const CommentEditor = ({ onSubmit }) => {
  const [editorState, setEditorState] = useState(EditorState.createEmpty());

  const handleEditorChange = (newEditorState) => {
    setEditorState(newEditorState);
  };

  const handleSubmit = () => {
    const contentState = editorState.getCurrentContent();
    const rawText = contentState.getPlainText();

    if (rawText.trim() !== "") {
      // You can send the rawText to your backend or handle it as needed
      onSubmit(rawText);
      setEditorState(EditorState.createEmpty());
    }
  };

  return (
    <div>
      <Editor
        editorState={editorState}
        onChange={handleEditorChange}
        placeholder="Type your comment..."
      />
      <button onClick={handleSubmit}>Submit Comment</button>
    </div>
  );
};

export default CommentEditor;
