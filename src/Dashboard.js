import React, { useEffect, useState, useRef } from "react";
import VideoCard from "./VideoCard";

const API = process.env.REACT_APP_API_URL;

function Dashboard({ user, logout }) {
  const [videos, setVideos] = useState([]);
  const [title, setTitle] = useState("");
  const [publisher, setPublisher] = useState("");
  const [genre, setGenre] = useState("");
  const [ageRating, setAgeRating] = useState("");
  const [videoFile, setVideoFile] = useState(null);

  const feedRef = useRef(null); // internal scroller root

  useEffect(() => {
    fetch(`${API}/videos/latest`)
      .then((res) => res.json())
      .then((data) => setVideos(data));
  }, []);

  const handleUpload = async () => {
    const formData = new FormData();
    formData.append("video", videoFile);
    formData.append("title", title);
    formData.append("publisher", publisher);
    formData.append("genre", genre);
    formData.append("ageRating", ageRating);
    formData.append("creatorId", user.UserID);

    const res = await fetch(`${API}/creator/upload`, { method: "POST", body: formData });
    if (res.ok) {
      alert("Video uploaded successfully!");
      window.location.reload();
    } else {
      alert("Upload failed");
    }
  };

  const topbarH = 60;

  return (
    <div
      style={{
        width: "100%",
        height: "100vh",
        background: "black",
        color: "white",
        overflow: "hidden",           // <— lock page scroll
        position: "relative",
      }}
    >
      {/* Top bar */}
      <div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          height: topbarH,
          // background: "rgba(0,0,0,0.6)",
          padding: "0 16px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          zIndex: 10,
          color: 'white'
        }}
      >
        <span style={{ fontWeight: 600 }}>
          Welcome, {user.Username} ({user.Role})
        </span>
        <button
          onClick={logout}
          style={{
            padding: "8px 16px",
            borderRadius: 9999,
            background: "#FE2C55",
            color: "#fff",
            fontWeight: 600,
            border: "none",
            cursor: "pointer",
          }}
        >
          Logout
        </button>
      </div>

      {/* Internal scroller (the feed) */}
      <div
        ref={feedRef}
        style={{
          position: "absolute",
          inset: `${topbarH}px 0 0 0`, // below topbar
          overflowY: "scroll",
          scrollSnapType: "y mandatory",
          WebkitOverflowScrolling: "touch",
        }}
      >
        {/* Optional creator panel above first video */}
        {user.Role === "Creator" && (
          <section
            style={{
              height: "100vh",
              scrollSnapAlign: "start",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              padding: 20,
            }}
          >
            <div
              style={{
                width: "92%",
                maxWidth: 500,
                background: "rgba(20,20,20,0.85)",
                border: "1px solid rgba(255,255,255,0.12)",
                borderRadius: 24,
                padding: 20,
              }}
            >
              <h3 style={{ marginTop: 0 }}>Upload New Video</h3>
              <input placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} /><br />
              <input placeholder="Publisher" value={publisher} onChange={(e) => setPublisher(e.target.value)} /><br />
              <input placeholder="Genre" value={genre} onChange={(e) => setGenre(e.target.value)} /><br />
              <input placeholder="Age Rating" value={ageRating} onChange={(e) => setAgeRating(e.target.value)} /><br />
              <input type="file" onChange={(e) => setVideoFile(e.target.files[0])} /><br />
              <button
                onClick={handleUpload}
                style={{
                  marginTop: 10,
                  padding: "10px 16px",
                  borderRadius: 9999,
                  background: "#FE2C55",
                  color: "white",
                  fontWeight: 600,
                  border: "none",
                  cursor: "pointer",
                }}
              >
                Upload Video
              </button>
            </div>
          </section>
        )}




        {/* Videos */}
        {videos.map((video) => (
          <VideoCard key={video.VideoID} video={video} user={user} rootRef={feedRef} />
        ))}
      </div>
    </div>
  );
}

export default Dashboard;
