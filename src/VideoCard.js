import React, { useState, useEffect } from "react";

const API = process.env.REACT_APP_API_URL;  // ✅ use env variable

function VideoCard({ video, user }) {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [rating, setRating] = useState(0);
  const [avgRating, setAvgRating] = useState(null);

  useEffect(() => {
    fetch(`${API}/videos/${video.VideoID}/comments`)
      .then(res => res.json())
      .then(data => setComments(data));

    fetch(`${API}/videos/${video.VideoID}/ratings`)
      .then(res => res.json())
      .then(data => setAvgRating(data.AvgRating));
  }, [video.VideoID]);

  const addComment = async () => {
    await fetch(`${API}/videos/${video.VideoID}/comments`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId: user.UserID, commentText: newComment })
    });
    setNewComment("");
    setComments([...comments, { CommentText: newComment, UserID: user.UserID }]);
  };

  const rateVideo = async () => {
    await fetch(`${API}/videos/${video.VideoID}/rate`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId: user.UserID, stars: rating })
    });
    alert("Rating submitted!");
  };

  return (
    <div style={{ border: "1px solid #ccc", marginBottom: 20, padding: 10 }}>
      <h3>{video.Title} ({video.Genre})</h3>
      <p>Publisher: {video.Publisher} | Age Rating: {video.AgeRating}</p>
      
      <video width="480" controls>
        <source src={video.BlobURL} type="video/mp4" />
      </video>

      <p>⭐ Average Rating: {avgRating ? avgRating.toFixed(1) : "No ratings yet"}</p>
      <input 
        type="number" 
        min="1" 
        max="5" 
        value={rating} 
        onChange={e => setRating(e.target.value)} 
      />
      <button onClick={rateVideo}>Rate</button>

      <h4>Comments</h4>
      {comments.map((c, i) => <p key={i}>{c.CommentText}</p>)}
      <input 
        value={newComment} 
        onChange={e => setNewComment(e.target.value)} 
        placeholder="Add a comment" 
      />
      <button onClick={addComment}>Comment</button>
    </div>
  );
}

export default VideoCard;
