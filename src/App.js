import "react-pdf-highlighter/dist/style.css"; // Important: Required styles for react-pdf-highlighter
import "./App.css"; // Custom global styles
import PdfHighlighterViewer from "./components/PdfHighlighterViewer";
import HighlightSidebar from "./components/HighlightSidebar";
import { useRef, useState } from "react";

function App() {
  // State to store all the highlights made by the user
  const [highlights, setHighlights] = useState([]);

  // Ref to control PdfHighlighter instance, used for scrolling
  const highlighterRef = useRef(null);

  return (
    <div style={{ display: "flex", height: "100vh" }}>
      {/* Sidebar showing list of highlights with ability to scroll to them */}
      <HighlightSidebar
        highlights={highlights}
        highlighterRef={highlighterRef}
      />

      {/* Main PDF view with highlighting capability */}
      <div style={{ flex: "1", position: "relative" }}>
        <PdfHighlighterViewer
          highlights={highlights}
          setHighlight={setHighlights}
          ref={highlighterRef}
        />
      </div>
    </div>
  );
}

export default App;

