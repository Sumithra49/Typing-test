import React, { useEffect, useRef, useState } from 'react';
import './App.css'; // Import the CSS file

// Sample sentences array
const sentences = [
  "The quick brown fox jumps over the lazy dog.",
  "A journey of a thousand miles begins with a single step.",
  "To be or not to be, that is the question.",
  "All that glitters is not gold.",
  "Beauty is in the eye of the beholder."
];

function App() {
  const [sentence, setSentence] = useState("");
  const [input, setInput] = useState("");
  const [wpm, setWpm] = useState(null);
  const startTimeRef = useRef(null);

  // On initial render and on reset, set a new random sentence
  useEffect(() => {
    resetTest();
  }, []);

  // Track typing start time only once (when typing begins)
  useEffect(() => {
    if (input.length === 1 && startTimeRef.current === null) {
      startTimeRef.current = new Date().getTime();
    }
  }, [input]);

  // Check if sentence is completed correctly and calculate WPM
  useEffect(() => {
    if (input === sentence) {
      const endTime = new Date().getTime();
      const timeTakenInMinutes = (endTime - startTimeRef.current) / 60000; // Convert ms to minutes
      const words = sentence.split(" ").length;
      const calculatedWpm = Math.round(words / timeTakenInMinutes);

      setWpm(calculatedWpm);
    }
  }, [input, sentence]);

  const handleInputChange = (e) => {
    setInput(e.target.value);
  };

  const resetTest = () => {
    const randomSentence = sentences[Math.floor(Math.random() * sentences.length)];
    setSentence(randomSentence);
    setInput("");
    setWpm(null);
    startTimeRef.current = null;
  };

  return (
    <div className="container">
      <h1>Typing Speed Test</h1>
      <p><strong>Type the following sentence as quickly as you can:</strong></p>
      <blockquote>{sentence}</blockquote>
      
      <input
        type="text"
        value={input}
        onChange={handleInputChange}
        placeholder="Start typing here..."
      />
      
      {wpm !== null && (
        <p className="result">
          You typed at <strong>{wpm} WPM</strong>!
        </p>
      )}

      <button onClick={resetTest}>Reset Test</button>
    </div>
  );
}

export default App;
