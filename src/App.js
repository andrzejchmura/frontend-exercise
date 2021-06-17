import { useState } from "react";
import { convert } from "./convert/convert";

function App() {
  const [text, setText] = useState("");

  return (
    <div>
      <label htmlFor="converter" style={{ display: "block" }}>
        Converter
      </label>
      <input
        id="converter"
        type="text"
        value={text}
        onChange={(event) => setText(event.target.value)}
      />
      <div>
        <p data-testid="output">Output: {convert(text)}</p>
      </div>
    </div>
  );
}

export default App;
