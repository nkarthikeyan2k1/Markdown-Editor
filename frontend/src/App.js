import "./App.css";
import MarkdownEditor from "./components/Markdown/MarkdownEditor.js";
import Context from "./Context.js";

function App() {
  return (
    <>
      <Context>
        <MarkdownEditor></MarkdownEditor>
      </Context>
    </>
  );
}

export default App;
