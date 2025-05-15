import React from "react";
import {
  AreaHighlight,
  Highlight,
  PdfHighlighter,
  PdfLoader,
  Tip,
} from "react-pdf-highlighter";

/**
 * PdfHighlighterViewer renders PDF with highlighting functionality.
 * It uses PdfHighlighter from the react-pdf-highlighter package.
 */
const PdfHighlighterViewer = ({ highlights, setHighlight }, ref) => {
  // Function to add new highlight to the list
  const handleAddHighlight = (highlight) => {
    setHighlight((prev) => [
      ...prev,
      { ...highlight, id: String(Math.random()) }, // Random ID for each highlight
    ]);
  };

  return (
    <PdfLoader url="/sample.pdf" beforeLoad={<div>Loading PDF...</div>}>
      {(pdfDocument) => (
        <PdfHighlighter
          ref={ref}
          pdfDocument={pdfDocument}
          highlights={highlights}
          enableAreaSelection={(event) => event.altKey} // Hold Alt to select area
          onScrollChange={() => {}}
          onSelectionFinished={(
            position,
            content,
            hideTipAndSelection,
            transformSelection
          ) => (
            <Tip
              onOpen={transformSelection}
              onConfirm={(comment) => {
                handleAddHighlight({ content, position, comment });
                hideTipAndSelection();
              }}
            />
          )}
          highlightTransform={(highlight, isScrolledTo) => {
            const isText = !highlight?.content?.image;

            return isText ? (
              <Highlight
                key={highlight.id}
                isScrolledTo={isScrolledTo}
                position={highlight.position}
                comment={highlight.comment}
              />
            ) : (
              <AreaHighlight
                key={highlight.id}
                highlight={highlight}
                onChange={(boundingRect) => {
                  const updatedHighlight = {
                    ...highlight,
                    position: {
                      ...highlight.position,
                      boundingRect,
                    },
                  };

                  setHighlight((prev) =>
                    prev.map((h) =>
                      h.id === highlight.id ? updatedHighlight : h
                    )
                  );
                }}
              />
            );
          }}
        />
      )}
    </PdfLoader>
  );
};

export default React.forwardRef(PdfHighlighterViewer);