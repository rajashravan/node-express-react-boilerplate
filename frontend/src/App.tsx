import { useState } from "react";
import "./App.css";

function App() {
  const [message, setMessage] = useState("hi");
  const [inputValue, setInputValue] = useState("");

  const getMessage = () => {
    const url = `http://localhost:3000/`;

    // fetch from url, result will be a string
    fetch(url)
      .then((response) => response.text())
      .then((result) => {
        console.log(result);
        setMessage(result);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  const postMessage = () => {
    const url = `http://localhost:3000/`;
    const data = { message: inputValue };

    // send a POST request with data
    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((result) => {
        console.log("Success:", result);
        setMessage(result.message);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
    console.log(event.target.value);
  };

  return (
    <>
      <div>
        <span>Message is {message}</span>
        <br />
        <br />
        <div>
          <button onClick={() => getMessage()}>Get Message</button>
        </div>
        <br />
        <div>
          <button onClick={() => postMessage()}>Post Message</button>
        </div>
        <input
          type="text"
          value={inputValue}
          onChange={handleChange}
          placeholder="Type something..."
        />
      </div>
    </>
  );
}

export default App;
