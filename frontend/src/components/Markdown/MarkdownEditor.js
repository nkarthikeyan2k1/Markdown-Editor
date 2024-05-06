import "./MarkdownEditor.css";
import React, { useRef, useState, useEffect } from "react";
import Socket from "./../../services/SocketServices";
import { throttleFunction } from "./../../services/UtlitsServices";
import parse from "html-react-parser";

// intial focus--complete
// clear button--complete
// select options in the rightside with preview/(html)higlight-complete
// handel the function in API side
// create a button to download the .md file if conntent have-complete
// handel the download function in API side
// handel the both scroll bar
//infinal add the body padding then only the iver all scroll bar can hide

function MarkdownEditor() {
  const [HTML, setHTML] = useState("");

  const leftPaneRef = useRef(null);
  const rightPaneRef = useRef(null);

  //handel the textarea value
  const handelTextArea = (event) => {
    const { value } = event.target;
    Socket.sendMarkdown(value);
  };

  // handel the onchange function in the input box make the delay using the dwbounce
  const throttlingHandleInput = throttleFunction(handelTextArea, 1000);

  //  To receive the HTML code form the socket
  Socket.getHTML(async (message) => {
    setHTML(parse(message));
  });

  useEffect(() => {
    Socket.connect();
    leftPaneRef.current.focus();
    return () => Socket.disconnect();
  }, []);

  // To handel the both scroll to the current view point
  const handleScroll = (event, panelside) => {
    console.log("event.target", event.target);
    const { scrollTop, scrollHeight, clientHeight } = event.target;
    const scrollPercentage = scrollTop / (scrollHeight - clientHeight);
    console.log("scrollPercentage", scrollPercentage);
    // Calculate corresponding scroll position in the other pane
    const targetScrollTop =
      scrollPercentage *
      (rightPaneRef.current.scrollHeight - rightPaneRef.current.clientHeight);

    // Set scroll position of the other pane
    rightPaneRef.current.scrollTop = targetScrollTop;
  };

  // To handel the clear button action
  const handelReset = () => {
    if (leftPaneRef.current) {
      leftPaneRef.current.value = "";
      setHTML("");
      leftPaneRef.current.focus();
    }
  };

  const handelSelect = (event) => {
    console.log("select", event.target.value);
  };

  //To handel the .md file download actions
  const handelDownload = () => {};

  return (
    <section>
      <div className="container">
        <h1>Markdown Editor</h1>
      </div>
      <div className="container full-height">
        <div className="row markdown full-height">
          <div className="col-6 full-height">
            <div className="controls ">
              <button
                type="button"
                className="btn btn-secondary"
                onClick={handelReset}
              >
                Clear
              </button>
            </div>
            <textarea
              ref={leftPaneRef}
              onChange={throttlingHandleInput}
              onScroll={(e) => handleScroll(e, "leftPaneRef")}
              name="markdown"
              className="textarea source full-height"
            ></textarea>
          </div>
          <div className="col-6 full-height">
            <div className="controls ">
              <div className="form-group d-flex">
                <select
                  className="form-select"
                  name="markdownSelect"
                  defaultValue="Preview"
                  onChange={handelSelect}
                >
                  <option value="Preview">Preview</option>
                  <option value="HTML">HTML Source</option>
                </select>
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={handelDownload}
                >
                  Download
                </button>
              </div>
            </div>
            <div
              ref={rightPaneRef}
              onScroll={(e) => handleScroll(e, "rightPaneRef")}
              className="preview full-height"
            >
              {HTML}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default React.memo(MarkdownEditor);
