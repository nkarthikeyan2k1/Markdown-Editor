import "./MarkdownEditor.css";
import React, { useRef, useState, useEffect } from "react";
import Socket from "./../../services/SocketServices";
import { throttleFunction } from "./../../services/UtlitsServices";
import parse from "html-react-parser";
import { useTheme } from "../../Context";

function MarkdownEditor() {
  const [markdown, setMarkdown] = useState("");
  const [HTML, setHTML] = useState("");
  const [select, setSelect] = useState("Preview");
  const [loading, setLoading] = useState(false);
  const [characterCount, setCharacterCount] = useState(0);
  const { theme, toggleTheme } = useTheme();

  const leftPaneRef = useRef(null);
  const rightPaneRef = useRef(null);

  //handel the textarea value
  const handelTextArea = (event) => {
    const { value } = event.target;
    setCharacterCount(value.trim().length);
    setMarkdown(value);
    Socket.sendMarkdown(value);
  };

  // handel the onchange function in the input box make the delay using the dwbounce
  const throttlingHandleInput = throttleFunction(handelTextArea, 1000);

  //  To receive the HTML code form the socket
  Socket.getHTML(async (message) => {
    setHTML(message);
  });

  useEffect(() => {
    Socket.connect();
    leftPaneRef.current.focus();
    return () => Socket.disconnect();
  }, []);

  // To handel the clear button action
  const handelReset = () => {
    leftPaneRef.current.value = "";
    setMarkdown("");
    setHTML("");
    setCharacterCount(0);
    leftPaneRef.current.focus();
  };

  //To handel the .md file download actions
  const handleDownload = async () => {
    setLoading(true); // Set loading state

    const blob = new Blob([markdown], { type: "text/markdown;charset=utf-8" });
    const url = window.URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.download = "markdown-file.md";
    link.click();

    window.URL.revokeObjectURL(url); // Clean up memory leak
    setLoading(false); // Reset loading state
  };

  return (
    <section>
      <div className="modal-switch">
        <label>
          <input
            type="checkbox"
            defaultChecked={theme === "dark"}
            name="toggle"
            onChange={toggleTheme}
          />
          <span className="slider round">
            <img
              src={
                theme === "dark"
                  ? "../../../assets/img/Moon.png"
                  : "../../../assets/img/sun.png"
              }
              height="100%"
              width="100%"
              alt="IMG"
            />
          </span>
        </label>
      </div>
      <div className="container">
        <h1>Markdown Editor</h1>
      </div>
      <div className="container full-height">
        <div className="row markdown full-height">
          <div className="col-6 full-height">
            <div className="controls ">
              <div className="form-group d-flex align-items-center">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={handelReset}
                >
                  Clear
                </button>
                <h4>Count : {characterCount}</h4>
              </div>
            </div>
            <textarea
              ref={leftPaneRef}
              onChange={throttlingHandleInput}
              name="markdown"
              className="textarea source full-height"
            ></textarea>
          </div>
          <div className="col-6 full-height">
            <div className="controls ">
              <div
                className="form-group d-flex "
                style={{
                  alignItems: "center",
                }}
              >
                <select
                  className="form-select"
                  name="markdownSelect"
                  defaultValue="Preview"
                  onChange={(e) => setSelect(e.target.value)}
                >
                  <option value="Preview">Preview</option>
                  <option value="HTML">HTML Source</option>
                </select>
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={handleDownload}
                  disabled={loading === true || characterCount === 0}
                >
                  {loading === true ? "Downloading..." : "Download"}
                </button>
              </div>
            </div>
            <div ref={rightPaneRef} className="preview full-height">
              {select === "Preview" ? (
                parse(HTML)
              ) : (
                <pre>
                  <code>{HTML}</code>
                </pre>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default React.memo(MarkdownEditor);
