import Head from 'next/head';
import Image from 'next/image';
import { useState } from 'react';
import buildspaceLogo from '../assets/buildspace-logo.png';
<link href='https://unpkg.com/boxicons@2.0.7/css/boxicons.min.css' rel='stylesheet'>

const Home = () => {
  const [userInput, setUserInput] = useState('');
  const [apiOutput, setApiOutput] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);

  const callGenerateEndpoint = async () => {
    setIsGenerating(true);

    console.log("Calling OpenAI...");
    const response = await fetch('/api/generate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ userInput }),
    });

    const data = await response.json();
    const { output } = data;
    console.log("OpenAI replied...", data.output.text);

    setApiOutput(`${output.text}`);
    setIsGenerating(false);
  };
  
  const onUserChangedText = (event) => {
    console.log(event.target.value);
    setUserInput(event.target.value);
  };

  const onCopyOutput = () => {
    navigator.clipboard.writeText(apiOutput);
  }

  return (
    <div className="root">
      <Head>
     <header>
    <div class="company-logo">D</div>
    <nav class="navbar">
      <ul class="nav-items">
        <li class="nav-item"><a href="#" class="nav-link">HOME</a></li>
        <li class="nav-item"><a href="#" class="nav-link">OFFER</a></li>
        <li class="nav-item"><a href="#" class="nav-link">SHOP</a></li>
        <li class="nav-item"><a href="#" class="nav-link">CONTACT</a></li>
      </ul>
    </nav>
    <div class="menu-toggle">
      <i class="bx bx-menu"></i>
      <i class="bx bx-x"></i>
    </div>
  </header>
        <title>Midjourney V5 Prompt Generation</title>
      </Head>
      <div className="container">
        <div className="header">
          <div className="header-title">
            <h1>Midjourney V5 Prompt Generation</h1>
          </div>
          <div className="header-subtitle">
            <h2><center>Use Midjourney V5 Prompts Generator to unleash your writing potential! Our AI-powered tool provides endless prompts to inspire your writing journey. </center></h2>
          </div>
        </div>
      </div>
      <div className="prompt-container">
        <textarea
          placeholder="start typing here"
          className="prompt-box"
          value={userInput}
          onChange={onUserChangedText}
        />
        <div className="prompt-buttons">
       <a className={isGenerating ? 'generate-button loading' : 'generate-button'}
    onClick={callGenerateEndpoint}
    >
            <div className="generate">
            {isGenerating ? <span className="loader"></span> : <p>Generate</p>}
            </div>
          </a>
        </div>
      </div>
      {apiOutput && (
       <div className="output">
  <div className="output-header-container">
    <div className="output-header">
      <h3>Output</h3>
      <button onClick={() => navigator.clipboard.writeText(apiOutput)}>Copy</button>
    </div>
  </div>
  <div className="output-content">
    <p>{apiOutput}</p>
  </div>
</div>
        </div>
      )}
     <div className="badge-container grow">
  <a href="https://buildspace.so/builds/ai-writer" target="_blank" rel="noreferrer"></a>
</div>
<footer>
  <div className="footer-content">
    <p>Copyright © 2023 Midjourney
      <a href="#">About Us</a>
    </p>
  </div>
</footer>
  );
};

export default Home;
