import React, { useState } from "react";
import CommentEditor from "./CommentEditor";
const GoogleDrive = () => {
  const [comments, setComments] = useState([]);

  const handleCommentSubmit = (newComment) => {
    setComments([...comments, newComment]);
  };

  return (
    <div>
      <h2>Comment Section</h2>
      <CommentEditor onSubmit={handleCommentSubmit} />
      <div>
        <h3>Comments:</h3>
        {comments.map((comment, index) => (
          <div key={index}>{comment}</div>
        ))}
      </div>
    </div>
  );
};

export default GoogleDrive;
