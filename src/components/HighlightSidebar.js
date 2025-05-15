import React from "react";

/**
 * Sidebar component to display all highlights.
 * Allows user to click and scroll to the respective highlight on the PDF.
 */
const HighlightSidebar = ({ highlights, highlighterRef }) => {
  const handleScrollTo = (highlight) => {
    highlighterRef.current.scrollTo(highlight);
  };

  return (
    <div
      style={{
        borderRight: "2px solid #dbdbdb",
        height: "100%",
        width: "350px",
        padding: "20px",
        background: "#e8e8e8",
      }}
    >
      <h2
        style={{
          textAlign: "center",
          marginBottom: "10px",
          borderBottom: "2px solid #dbdbdb",
          paddingBottom: "10px",
        }}
      >
        React PDF Highlight & Backlinking
      </h2>

      <h4 style={{ marginBottom: "20px" }}>Highlights</h4>

      {highlights.map((highlight) => (
        <div
          key={highlight.id}
          style={{ background: "#fff", marginBottom: "10px", padding: "5px" }}
          onClick={() => handleScrollTo(highlight)}
        >
          <strong>{highlight?.comment.text}</strong>
          <div style={{ fontSize: "12px", color: "#666" }}>
            Page : {highlight.position.pageNumber}
          </div>
        </div>
      ))}
    </div>
  );
};

export default HighlightSidebar;