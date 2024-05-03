"use client";
import React, { useState } from "react";

const TextInput: React.FC = () => {
  const [text, setText] = useState<string>("");

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setText(event.target.value);
  };

  return (
    <div>
      <input
        type="text"
        value={text}
        onChange={handleInputChange}
        placeholder="Type something..."
      />
      <p>You typed: {text}</p>
    </div>
  );
};

export default TextInput;
