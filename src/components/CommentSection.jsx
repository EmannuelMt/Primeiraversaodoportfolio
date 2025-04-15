import React, { useState } from "react";

function CommentSection() {
  const [comments, setComments] = useState([]);
  const [text, setText] = useState("");

  const handleAddComment = () => {
    if (text.trim()) {
      setComments([...comments, text]);
      setText("");
    }
  };

  return (
    <div className="comment-section">
      <input
        type="text"
        placeholder="Escreva um comentário..."
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <button onClick={handleAddComment}>Enviar</button>

      <ul className="comment-list">
        {comments.map((c, i) => (
          <li key={i}>{c}</li>
        ))}
      </ul>
    </div>
  );
}

export default CommentSection;
