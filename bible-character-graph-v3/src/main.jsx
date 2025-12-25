import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';

// 글로벌 스타일
const globalStyles = `
  @import url('https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@300;400;500;700&display=swap');
  
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
  
  body {
    font-family: 'Noto Sans KR', sans-serif;
    background: #0a0a1a;
    overflow: hidden;
  }
  
  ::-webkit-scrollbar {
    width: 8px;
    height: 8px;
  }
  
  ::-webkit-scrollbar-track {
    background: rgba(255,255,255,0.05);
  }
  
  ::-webkit-scrollbar-thumb {
    background: rgba(255,255,255,0.2);
    border-radius: 4px;
  }
  
  ::-webkit-scrollbar-thumb:hover {
    background: rgba(255,255,255,0.3);
  }
  
  select option {
    background: #1a1a2e;
    color: #fff;
  }
  
  @keyframes pulse {
    0%, 100% { opacity: 0.4; }
    50% { opacity: 0.8; }
  }
  
  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(10px); }
    to { opacity: 1; transform: translateY(0); }
  }
`;

// 스타일 삽입
const styleSheet = document.createElement('style');
styleSheet.textContent = globalStyles;
document.head.appendChild(styleSheet);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
