import React, { useRef, useState, useEffect } from "react";
import Socket from "../services/SocketServices";
import { throttleFunction } from "../services/UtlitsServices";

function MarkdownEditor() {
  const containerRef = useRef(null);
  const [markdown, SetMarkdown] = useState("");
  const [HTML, SetHTML] = useState("");

  //handel the textarea value
  const handelTextArea = (event) => {
    const { value } = event.target;
    SetMarkdown(value);
    Socket.sendMarkdown(value);
  };

  useEffect(() => {
    // const container = containerRef.current;
    // container.innerHTML = markdown;
  }, [markdown]);

  // handel the onchange function in the input box make the delay using the dwbounce
  const throttlingHandleInput = throttleFunction(handelTextArea, 1000);

  useEffect(() => {
    /**
     * To load the socket Message
     * @message we receive the latest sended message details in Object format
     **/
    Socket.getHTML(async (message) => {
      SetHTML(message);
      // await console.log("message from socket", message);
    });
  });

  useEffect(() => {
    Socket.connect();
    return () => Socket.disconnect();
  }, []);

  return (
    <section>
      <div className="container full-height">
        <div className="row markdown full-height">
          <div className="col-6 full-height">
            <textarea
              onChange={throttlingHandleInput}
              name="markdown"
              className="textarea source full-height"
            ></textarea>
          </div>
          <div className="col-6 full-height">
            {/* <div className="preview full-height" markdown ref={containerRef}></div> */}
            {/* <div className="preview full-height">{HTML}</div> */}
            <div
              className="preview full-height"
              dangerouslySetInnerHTML={{ __html: HTML }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}

export default React.memo(MarkdownEditor);
