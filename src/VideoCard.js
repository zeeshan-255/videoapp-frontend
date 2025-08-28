// import React, { useState, useEffect } from "react";

// const API = process.env.REACT_APP_API_URL;  // ✅ use env variable

// function VideoCard({ video, user }) {
//   const [comments, setComments] = useState([]);
//   const [newComment, setNewComment] = useState("");
//   const [rating, setRating] = useState(0);
//   const [avgRating, setAvgRating] = useState(null);

//   useEffect(() => {
//     fetch(`${API}/videos/${video.VideoID}/comments`)
//       .then(res => res.json())
//       .then(data => setComments(data));

//     fetch(`${API}/videos/${video.VideoID}/ratings`)
//       .then(res => res.json())
//       .then(data => setAvgRating(data.AvgRating));
//   }, [video.VideoID]);

//   const addComment = async () => {
//     await fetch(`${API}/videos/${video.VideoID}/comments`, {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({ userId: user.UserID, commentText: newComment })
//     });
//     setNewComment("");
//     setComments([...comments, { CommentText: newComment, UserID: user.UserID }]);
//   };

//   const rateVideo = async () => {
//     await fetch(`${API}/videos/${video.VideoID}/rate`, {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({ userId: user.UserID, stars: rating })
//     });
//     alert("Rating submitted!");
//   };

//   return (
//     <div style={{ border: "1px solid #ccc", marginBottom: 20, padding: 10,background:'black' }}>
//       <h3 style={{
//       }}>{video.Title} ({video.Genre})</h3>
//       <p>Publisher: {video.Publisher} | Age Rating: {video.AgeRating}</p>

//       <video width="480" controls>
//         <source src={video.BlobURL} type="video/mp4" />
//       </video>

//       <p>⭐ Average Rating: {avgRating ? avgRating.toFixed(1) : "No ratings yet"}</p>
//       <input 
//         type="number" 
//         min="1" 
//         max="5" 
//         value={rating} 
//         onChange={e => setRating(e.target.value)} 
//       />
//       <button onClick={rateVideo}>Rate</button>

//       <h4>Comments</h4>
//       {comments.map((c, i) => <p key={i}>{c.CommentText}</p>)}
//       <input 
//         value={newComment} 
//         onChange={e => setNewComment(e.target.value)} 
//         placeholder="Add a comment" 
//       />
//       <button onClick={addComment}>Comment</button>
//     </div>
//   );
// }

// export default VideoCard;


// import React, { useState, useEffect, useRef } from "react";

// const API = process.env.REACT_APP_API_URL;  // ✅ env variable

// function VideoCard({ video, user, index }) {
//   const [comments, setComments] = useState([]);
//   const [newComment, setNewComment] = useState("");
//   const [rating, setRating] = useState(0);
//   const [avgRating, setAvgRating] = useState(null);
//   const videoRef = useRef(null);

//   useEffect(() => {
//     fetch(`${API}/videos/${video.VideoID}/comments`)
//       .then(res => res.json())
//       .then(data => setComments(data));

//     fetch(`${API}/videos/${video.VideoID}/ratings`)
//       .then(res => res.json())
//       .then(data => setAvgRating(data.AvgRating));
//   }, [video.VideoID]);

//   // Auto play/pause depending on visibility
//   useEffect(() => {
//     const observer = new IntersectionObserver(
//       (entries) => {
//         entries.forEach((entry) => {
//           if (entry.isIntersecting) {
//             videoRef.current.play().catch(() => { });
//           } else {
//             videoRef.current.pause();
//           }
//         });
//       },
//       { threshold: 0.5 }
//     );
//     if (videoRef.current) observer.observe(videoRef.current);
//     return () => observer.disconnect();
//   }, []);

//   const addComment = async () => {
//     await fetch(`${API}/videos/${video.VideoID}/comments`, {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({ userId: user.UserID, commentText: newComment }),
//     });
//     setNewComment("");
//     setComments([...comments, { CommentText: newComment, UserID: user.UserID }]);
//   };

//   const rateVideo = async () => {
//     await fetch(`${API}/videos/${video.VideoID}/rate`, {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({ userId: user.UserID, stars: rating }),
//     });
//     alert("Rating submitted!");
//   };

//   return (
//     <section
//       style={{
//         width: "100%",
//         height: "100vh",
//         scrollSnapAlign: "start",   // ⬅️ snap point
//         display: "flex",
//         flexDirection: "column",
//         justifyContent: "flex-end",
//         alignItems: "center",
//         position: "relative",
//         color: "white",
//       }}
//     >
//       {/* Video fills background */}
//       <video
//         ref={videoRef}
//         loop
//         muted
//         playsInline
//         autoPlay
//         style={{
//           position: "absolute",
//           inset: 0,
//           width: "100%",
//           height: "100%",
//           objectFit: "cover",
//           zIndex: -1,
//         }}
//       >
//         <source src={video.BlobURL} type="video/mp4" />
//       </video>

//       {/* Overlay info + actions */}
//       <div style={{ width: "100%", padding: 20, background: "rgba(0,0,0,0.35)" }}>
//         <h3 style={{ margin: 0 }}>{video.Title} ({video.Genre})</h3>
//         <p style={{ margin: "4px 0" }}>
//           Publisher: {video.Publisher} | Age Rating: {video.AgeRating}
//         </p>

//         <p>⭐ Average Rating: {avgRating ? avgRating.toFixed(1) : "No ratings yet"}</p>
//         <input
//           type="number"
//           min="1"
//           max="5"
//           value={rating}
//           onChange={e => setRating(e.target.value)}
//         />
//         <button onClick={rateVideo}>Rate</button>

//         <h4>Comments</h4>
//         {comments.map((c, i) => <p key={i}>{c.CommentText}</p>)}
//         <input
//           value={newComment}
//           onChange={e => setNewComment(e.target.value)}
//           placeholder="Add a comment"
//         />
//         <button onClick={addComment}>Comment</button>
//       </div>
//     </section>
//   );
// }

// export default VideoCard;


import React, { useEffect, useRef, useState } from "react";

const API = process.env.REACT_APP_API_URL;

function VideoCard({ video, user, rootRef }) {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [rating, setRating] = useState(0);
  const [avgRating, setAvgRating] = useState(null);
  const videoRef = useRef(null);
  const cardRef = useRef(null);
  const [showSearch, setShowSearch] = useState(false);
  const [searchText, setSearchText] = useState("");


  useEffect(() => {
    fetch(`${API}/videos/${video.VideoID}/comments`)
      .then((res) => res.json())
      .then((data) => setComments(data));

    fetch(`${API}/videos/${video.VideoID}/ratings`)
      .then((res) => res.json())
      .then((data) => setAvgRating(data.AvgRating));
  }, [video.VideoID]);

  // Autoplay/pause when at least half the card is visible
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const el = videoRef.current;
          if (!el) return;
          if (entry.isIntersecting) {
            el.play().catch(() => { });
          } else {
            el.pause();
          }
        });
      },
      {
        threshold: 0.5,
        root: rootRef?.current || null, // observe inside the feed scroller
      }
    );
    if (cardRef.current) observer.observe(cardRef.current);
    return () => observer.disconnect();
  }, [rootRef]);

  const addComment = async () => {
    await fetch(`${API}/videos/${video.VideoID}/comments`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId: user.UserID, commentText: newComment }),
    });
    setNewComment("");
    setComments((c) => [...c, { CommentText: newComment, UserID: user.UserID }]);
  };

  const rateVideo = async () => {
    await fetch(`${API}/videos/${video.VideoID}/rate`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId: user.UserID, stars: Number(rating) }),
    });
    alert("Rating submitted!");
  };

  return (
    <section
      ref={cardRef}
      style={{
        height: "100vh",
        width: "100%",
        scrollSnapAlign: "start",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        position: "relative"
      }}
    >
      <div
        style={{
          height: "90vh",
          maxHeight: "100vh",
          aspectRatio: "9 / 16",
          width: "auto",
          maxWidth: "100vw",
          borderRadius: 24,
          boxShadow: "0 10px 30px rgba(0,0,0,0.6)",
          overflow: "hidden",
          background: "black",
          position: "relative",
        }}
      >

        <video
          ref={videoRef}
          loop
          muted
          playsInline
          controls={false}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            display: "block",
          }}
        >
          <source src={video.BlobURL} type="video/mp4" />
        </video>

        {/* --- Search button top-right --- */}
        <div
          style={{
            position: "absolute",
            top: 12,
            right: 12,
            zIndex: 30,
            background: "rgba(0,0,0,0.5)",
            borderRadius: "50%",
            width: 40,
            height: 40,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
            fontSize: 18,
          }}
          onClick={() => setShowSearch(true)}
        >
          🔍
        </div>

        {/* --- Search overlay (slides down) --- */}
        {showSearch && (
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              padding: "12px 16px",
              background: "rgba(0,0,0,0.85)",
              display: "flex",
              alignItems: "center",
              gap: 8,
              zIndex: 40,
            }}
          >
            <input
              type="text"
              placeholder="Search videos..."
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              style={{
                flex: 1,
                padding: "10px 14px",
                borderRadius: 9999,
                border: "1px solid rgba(255,255,255,0.3)",
                background: "rgba(0,0,0,0.45)",
                color: "white",
                outline: "none",
                fontSize: 14,
              }}
            />
            <button
              onClick={() => setShowSearch(false)}
              style={{
                padding: "10px 14px",
                borderRadius: 9999,
                background: "#FE2C55",
                color: "#fff",
                fontWeight: 600,
                border: "none",
                cursor: "pointer",
              }}
            >
              ✕
            </button>
          </div>
        )}


        {/* Overlay panel at bottom (title, rating, comments) */}
        <div
          style={{
            position: "absolute",
            left: 0,
            right: 0,
            bottom: 0,
            padding: 16,
            background: "linear-gradient(180deg, rgba(0,0,0,0) 0%, rgba(0,0,0,0.65) 60%, rgba(0,0,0,0.85) 100%)",
            color: "white",
          }}
        >
          <h3 style={{ margin: "0 0 4px 0" }}>
            {video.Title} ({video.Genre})
          </h3>
          <p style={{ margin: "0 0 8px 0", opacity: 0.9, fontSize: 13 }}>
            Publisher: {video.Publisher} • Age: {video.AgeRating}
          </p>

          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 10 }}>
            <span>⭐ {avgRating ? avgRating.toFixed(1) : "No ratings yet"}</span>
            <input
              type="number"
              min="1"
              max="5"
              value={rating}
              onChange={(e) => setRating(e.target.value)}
              style={{
                width: 64,
                padding: "6px 10px",
                borderRadius: 9999,
                border: "1px solid rgba(255,255,255,0.3)",
                background: "rgba(0,0,0,0.45)",
                color: "white",
                outline: "none",
              }}
            />
            <button
              onClick={rateVideo}
              style={{
                padding: "8px 14px",
                borderRadius: 9999,
                background: "#FE2C55",
                color: "#fff",
                border: "none",
                fontWeight: 600,
                cursor: "pointer",
              }}
            >
              Rate
            </button>
          </div>

          <div style={{ marginTop: 6 }}>
            <h4 style={{ margin: "0 0 6px 0" }}>Comments</h4>
            <div
              style={{
                maxHeight: 120,
                overflowY: "auto",
                paddingRight: 6,
              }}
            >
              {comments.map((c, i) => (
                <p key={i} style={{ margin: "4px 0" }}>
                  {c.CommentText}
                </p>
              ))}
            </div>

            <div style={{ display: "flex", gap: 8, marginTop: 8 }}>
              <input
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                placeholder="Add a comment"
                style={{
                  flex: 1,
                  padding: "10px 14px",
                  borderRadius: 9999,
                  border: "1px solid rgba(255,255,255,0.3)",
                  background: "rgba(0,0,0,0.45)",
                  color: "white",
                  outline: "none",
                }}
              />
              <button
                onClick={addComment}
                style={{
                  padding: "10px 16px",
                  borderRadius: 9999,
                  background: "#fff",
                  color: "#000",
                  fontWeight: 700,
                  border: "1px solid #d4d4d4",
                  cursor: "pointer",
                }}
              >
                Comment
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default VideoCard;
