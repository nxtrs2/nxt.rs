"use client";
import { useState, ChangeEvent } from "react";
import Head from "next/head";

const Home = () => {
  const [inputText, setInputText] = useState<string>("");
  const [result, setResult] = useState<string>("");

  // Custom Caesar cipher that uses the described transformation.
  // For uppercase letters A-F: A -> F, B -> E, ..., F -> A
  // For uppercase letters G-Z: G -> Z, H -> Y, ..., Z -> G
  // The same mapping is applied to lowercase letters.
  const caesarCipher = (text: string): string => {
    let transformed = "";

    for (let i = 0; i < text.length; i++) {
      const c = text[i];

      // For uppercase letters A-F
      if (/[A-F]/.test(c)) {
        const code = c.charCodeAt(0);
        // 'A' is 65 and 'F' is 70 in ASCII.
        transformed += String.fromCharCode(70 - (code - 65));
      }
      // For uppercase letters G-Z
      else if (/[G-Z]/.test(c)) {
        const code = c.charCodeAt(0);
        // 'G' is 71 and 'Z' is 90 in ASCII.
        transformed += String.fromCharCode(90 - (code - 71));
      }
      // For lowercase letters a-f
      else if (/[a-f]/.test(c)) {
        const code = c.charCodeAt(0);
        // 'a' is 97 and 'f' is 102 in ASCII.
        transformed += String.fromCharCode(102 - (code - 97));
      }
      // For lowercase letters g-z
      else if (/[g-z]/.test(c)) {
        const code = c.charCodeAt(0);
        // 'g' is 103 and 'z' is 122 in ASCII.
        transformed += String.fromCharCode(122 - (code - 103));
      }
      // Leave any other characters unchanged
      else {
        transformed += c;
      }
    }

    return transformed;
  };

  const applyCipher = (): void => {
    setResult(caesarCipher(inputText));
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>): void => {
    setInputText(event.target.value);
  };

  return (
    <div>
      <h2 className="text-2xl font-heading mb-6">
        Speak &amp; Spell Caesar Cipher
      </h2>
      <div className="grid gap-6">
        <p className="font-mono mb-2">Enter your text below and click "=":</p>
      </div>{" "}
      <div className="grid grid-cols-3 gap-6 m-4 border-2 p-10 rounded border-green-500">
        <input
          className="border-2 border-gray-300 rounded p-2 text-gray-900 font-mono"
          type="text"
          maxLength={20}
          value={inputText}
          onChange={handleChange}
          placeholder="Enter your text here"
        />
        <button
          onClick={applyCipher}
          className="py-2 pixelated-button bg-green-400 rounded text-gray-900 hover:bg-green-500 transition-colors"
        >
          =
        </button>
        <div className="flex font-mono text-2xl" style={{ fontWeight: "bold" }}>
          {result ? result : "????"}
        </div>
      </div>{" "}
      <h2 className="text-2xl font-heading mb-6">How it works</h2>
      <div className="grid gap-6">
        <p className="font-mono  mb-2">
          The cipher works by transforming letters in the following way:
        </p>
        <p className="font-mono  mb-2">
          This substitution cipher divides the alphabet into two distinct
          groups—letters A–F and letters G–Z—and then reverses the order of the
          letters within each group. In the first group, the transformation maps
          A to F, B to E, C to D, D to C, E to B, and F to A. The second group
          follows a similar logic: G becomes Z, H becomes Y, I becomes X (hence,
          N<span className="text-green-400">X</span>TRS), continuing this
          pattern until Z is mapped to G. This method creates a mirror effect
          for each section of the alphabet. The cipher preserves the case of the
          original letters, so uppercase and lowercase letters are both
          translated into their respective reversed versions, while any
          non-alphabet characters remain unchanged.{" "}
        </p>
        <p className="font-mono mb-2">
          Unlike a traditional Caesar cipher—which uniformly shifts each
          character by a fixed number of positions—this cipher’s unique approach
          of splitting the alphabet into two segments makes it cooler. By
          handling the two segments separately, the cipher obscures the message
          and introduces an unexpected twist that can make decryption
          challenging without the proper key.
        </p>
      </div>
    </div>
  );
};

export default Home;
