import React, { useEffect, useState } from "react";
import VideoCard from "./VideoCard";

const API = process.env.REACT_APP_API_URL;  // ✅ Use environment variable

function Dashboard({ user, logout }) {
  const [videos, setVideos] = useState([]);
  const [title, setTitle] = useState("");
  const [publisher, setPublisher] = useState("");
  const [genre, setGenre] = useState("");
  const [ageRating, setAgeRating] = useState("");
  const [videoFile, setVideoFile] = useState(null);

  useEffect(() => {
    fetch(`${API}/videos/latest`)
      .then(res => res.json())
      .then(data => setVideos(data));
  }, []);

  const handleUpload = async () => {
    const formData = new FormData();
    formData.append("video", videoFile);
    formData.append("title", title);
    formData.append("publisher", publisher);
    formData.append("genre", genre);
    formData.append("ageRating", ageRating);
    formData.append("creatorId", user.UserID);

    const res = await fetch(`${API}/creator/upload`, {
      method: "POST",
      body: formData
    });

    if (res.ok) {
      alert("Video uploaded successfully!");
      window.location.reload();
    } else {
      alert("Upload failed");
    }
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>
        Welcome, {user.Username} ({user.Role})
        <button style={{ marginLeft: 20 }} onClick={logout}>Logout</button>
      </h2>

      {user.Role === "Creator" && (
        <div style={{ marginBottom: 30 }}>
          <h3>Upload New Video</h3>
          <input placeholder="Title" value={title} onChange={e => setTitle(e.target.value)} /><br />
          <input placeholder="Publisher" value={publisher} onChange={e => setPublisher(e.target.value)} /><br />
          <input placeholder="Genre" value={genre} onChange={e => setGenre(e.target.value)} /><br />
          <input placeholder="Age Rating" value={ageRating} onChange={e => setAgeRating(e.target.value)} /><br />
          <input type="file" onChange={e => setVideoFile(e.target.files[0])} /><br />
          <button onClick={handleUpload}>Upload Video</button>
        </div>
      )}

      <h3>Latest Videos</h3>
      {videos.map(video => (
        <VideoCard key={video.VideoID} video={video} user={user} />
      ))}
    </div>
  );
}

export default Dashboard;
