function Home({ goLogin, goSignup }) {
  return (
    <div
      style={{
        width: "100%",
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        position: "relative", 
        overflow: "hidden",
        color: "white",
      }}
    >
      <video
        autoPlay
        loop
        muted
        playsInline
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          objectFit: "cover",
          zIndex: -1, 
          filter: "brightness(0.6)", 
        }}
      >
        <source src="https://res.cloudinary.com/dyh8wkiqp/video/upload/v1756331756/3569294-hd_1920_1080_24fps_s3likd.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      <h1
        style={{
          display: "flex",
          justifyContent: "center",
          marginBottom: 20,
        }}
      >
        Welcome to Video Sharing App
      </h1>

      <div
        style={{
          width: "20%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          paddingInline: 40,
          paddingBlock: 80,
          gap: 16, 
        }}
      >
        <button
          onClick={goLogin}
          style={{
            width: "100%",
            padding: "12px 16px",
            borderRadius: "9999px",
            backgroundColor: "#FE2C55",
            color: "#fff",
            fontWeight: "600",
            fontSize: "16px",
            border: "none",
            cursor: "pointer",
            transition: "background-color 0.2s ease",
          }}
          onMouseOver={(e) =>
            (e.currentTarget.style.backgroundColor = "#e0254b")
          }
          onMouseOut={(e) =>
            (e.currentTarget.style.backgroundColor = "#FE2C55")
          }
        >
          Login
        </button>

        <button
          onClick={goSignup}
          style={{
            width: "100%",
            padding: "12px 16px",
            borderRadius: "9999px",
            backgroundColor: "#fff",
            color: "#000",
            fontWeight: "600",
            fontSize: "16px",
            border: "1px solid #ccc",
            cursor: "pointer",
            transition: "background-color 0.2s ease",
          }}
          onMouseOver={(e) =>
            (e.currentTarget.style.backgroundColor = "#f2f2f2")
          }
          onMouseOut={(e) =>
            (e.currentTarget.style.backgroundColor = "#fff")
          }
        >
          Create Account (Consumers only)
        </button>
      </div>
    </div>
  );
}

export default Home;
