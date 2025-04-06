// import { useEffect, useState } from "react";
// import "./App.css";
// import io from "socket.io-client";
// import Editor from "@monaco-editor/react";

// const socket = io("https://realtime-code-editor-final.onrender.com");

// const App = () => {
//   const [joined, setJoined] = useState(false);
//   const [roomId, setRoomId] = useState("");
//   const [userName, setUserName] = useState("");
//   const [language, setLanguage] = useState("javascript");
//   const [code, setCode] = useState("// start code here");
//   const [copySuccess, setCopySuccess] = useState("");
//   const [users, setUsers] = useState([]);
//   const [typing, setTyping] = useState("");
//   const [outPut, setOutPut] = useState("");
//   const [version, setVersion] = useState("*");

//   useEffect(() => {
//     socket.on("userJoined", (users) => {
//       setUsers(users);
//     });

//     socket.on("codeUpdate", (newCode) => {
//       setCode(newCode);
//     });

//     socket.on("userTyping", (user) => {
//       setTyping(`${user.slice(0, 8)}... is Typing`);
//       setTimeout(() => setTyping(""), 2000);
//     });

//     socket.on("languageUpdate", (newLanguage) => {
//       setLanguage(newLanguage);
//     });

//     socket.on("codeResponse", (response) => {
//       setOutPut(response.run.output);
//     });

//     return () => {
//       socket.off("userJoined");
//       socket.off("codeUpdate");
//       socket.off("userTyping");
//       socket.off("languageUpdate");
//       socket.off("codeResponse");
//     };
//   }, []);

//   useEffect(() => {
//     const handleBeforeUnload = () => {
//       socket.emit("leaveRoom");
//     };

//     window.addEventListener("beforeunload", handleBeforeUnload);

//     return () => {
//       window.removeEventListener("beforeunload", handleBeforeUnload);
//     };
//   }, []);

//   const joinRoom = () => {
//     if (roomId && userName) {
//       socket.emit("join", { roomId, userName });
//       setJoined(true);
//     }
//   };

//   const leaveRoom = () => {
//     socket.emit("leaveRoom");
//     setJoined(false);
//     setRoomId("");
//     setUserName("");
//     setCode("// start code here");
//     setLanguage("javascript");
//   };

//   const copyRoomId = () => {
//     navigator.clipboard.writeText(roomId);
//     setCopySuccess("Copied!");
//     setTimeout(() => setCopySuccess(""), 2000);
//   };

//   const handleCodeChange = (newCode) => {
//     setCode(newCode);
//     socket.emit("codeChange", { roomId, code: newCode });
//     socket.emit("typing", { roomId, userName });
//   };

//   const handleLanguageChange = (e) => {
//     const newLanguage = e.target.value;
//     setLanguage(newLanguage);
//     socket.emit("languageChange", { roomId, language: newLanguage });
//   };

//   const runCode = () => {
//     socket.emit("compileCode", { code, roomId, language, version });
//   };

//   if (!joined) {
//     return (
//       <div className="join-container">
//         <div className="join-form">
//           <h1>Join Code Room</h1>
//           <input
//             type="text"
//             placeholder="Room Id"
//             value={roomId}
//             onChange={(e) => setRoomId(e.target.value)}
//           />
//           <input
//             type="text"
//             placeholder="Your Name"
//             value={userName}
//             onChange={(e) => setUserName(e.target.value)}
//           />
//           <button onClick={joinRoom}>Join Room</button>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="editor-container">
//       <div className="sidebar">
//         <div className="room-info">
//           <h2>Code Room: {roomId}</h2>
//           <button onClick={copyRoomId} className="copy-button">
//             Copy Id
//           </button>
//           {copySuccess && <span className="copy-success">{copySuccess}</span>}
//         </div>
//         <h3>Users in Room:</h3>
//         <ul>
//           {users.map((user, index) => (
//             <li key={index}>{user.slice(0, 8)}...</li>
//           ))}
//         </ul>
//         <p className="typing-indicator">{typing}</p>
//         <select
//           className="language-selector"
//           value={language}
//           onChange={handleLanguageChange}
//         >
//           <option value="javascript">JavaScript</option>
//           <option value="python">Python</option>
//           <option value="java">Java</option>
//           <option value="cpp">C++</option>
//         </select>
//         <button className="leave-button" onClick={leaveRoom}>
//           Leave Room
//         </button>
//       </div>

//       <div className="editor-wrapper">
//         <Editor
//           height={"60%"}
//           defaultLanguage={language}
//           language={language}
//           value={code}
//           onChange={handleCodeChange}
//           theme="vs-dark"
//           options={{
//             minimap: { enabled: false },
//             fontSize: 14,
//           }}
//         />
//         <button className="run-btn" onClick={runCode}>
//           Execute
//         </button>
//         <textarea
//           className="output-console"
//           value={outPut}
//           readOnly
//           placeholder="Output will appear here ..."
//         />
//       </div>
//     </div>
//   );
// };

// export default App;

import { useEffect, useState } from "react";
import "./App.css";
import io from "socket.io-client";
import Editor from "@monaco-editor/react";
import { v4 as uuidv4 } from "uuid";

const socket = io("https://realtime-code-edit.onrender.com");

const App = () => {
  const [joined, setJoined] = useState(false);
  const [roomId, setRoomId] = useState("");
  const [userName, setUserName] = useState("");
  const [language, setLanguage] = useState("javascript");
  const [code, setCode] = useState("// start code here");
  const [copySuccess, setCopySuccess] = useState("");
  const [users, setUsers] = useState([]);
  const [typing, setTyping] = useState("");
  const [outPut, setOutPut] = useState("");
  const [version, setVersion] = useState("*");

  useEffect(() => {
    socket.on("userJoined", (users) => {
      setUsers(users);
    });

    socket.on("codeUpdate", (newCode) => {
      setCode(newCode);
    });

    socket.on("userTyping", (user) => {
      setTyping(`${user.slice(0, 8)}... is Typing`);
      setTimeout(() => setTyping(""), 2000);
    });

    socket.on("languageUpdate", (newLanguage) => {
      setLanguage(newLanguage);
    });

    socket.on("codeResponse", (response) => {
      setOutPut(response.run.output);
    });

    return () => {
      socket.off("userJoined");
      socket.off("codeUpdate");
      socket.off("userTyping");
      socket.off("languageUpdate");
      socket.off("codeResponse");
    };
  }, []);

  useEffect(() => {
    const handleBeforeUnload = () => {
      socket.emit("leaveRoom");
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, []);

  const joinRoom = () => {
    if (roomId && userName) {
      socket.emit("join", { roomId, userName });
      setJoined(true);
    }
  };

  const leaveRoom = () => {
    socket.emit("leaveRoom");
    setJoined(false);
    setRoomId("");
    setUserName("");
    setCode("// start code here");
    setLanguage("javascript");
  };

  const copyRoomId = () => {
    navigator.clipboard.writeText(roomId);
    setCopySuccess("Copied!");
    setTimeout(() => setCopySuccess(""), 2000);
  };

  const handleCodeChange = (newCode) => {
    setCode(newCode);
    socket.emit("codeChange", { roomId, code: newCode });
    socket.emit("typing", { roomId, userName });
  };

  const handleLanguageChange = (e) => {
    const newLanguage = e.target.value;
    setLanguage(newLanguage);
    socket.emit("languageChange", { roomId, language: newLanguage });
  };

  const runCode = () => {
    socket.emit("compileCode", { code, roomId, language, version });
  };

  const handleCreateRoom = () => {
    const id = uuidv4();
    setRoomId(id);
  };

  if (!joined) {
    return (
      <div className="join-container">
        <div className="join-form">
          <h1>Join Code Room</h1>
          <input
            type="text"
            placeholder="Room Id"
            value={roomId}
            onChange={(e) => setRoomId(e.target.value)}
            className="input-field"
          />
          <input
            type="text"
            placeholder="Your Name"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            className="input-field"
          />
          <button onClick={joinRoom} className="join-button">
            Join Room
          </button>
          <div className="invite-message">
            If you don't have an room id then create{" "}
            <button onClick={handleCreateRoom} className="create-room-btn">
              new room
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="editor-container">
      <div className="sidebar">
        <div className="room-info">
          <h3>
            Code RoomId: <br /> <h6>{roomId}</h6>
          </h3>
          <div className="copy-container">
            <button onClick={copyRoomId} className="copy-button">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                viewBox="0 0 16 16"
              >
                <path d="M4 1.5H3a2 2 0 0 0-2 2V14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V3.5a2 2 0 0 0-2-2h-1v1h1a1 1 0 0 1 1 1V14a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V3.5a1 1 0 0 1 1-1h1v-1z" />
                <path d="M9.5 1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1-.5-.5v-1a.5.5 0 0 1 .5-.5h3zm-3-1A1.5 1.5 0 0 0 5 1.5v1A1.5 1.5 0 0 0 6.5 4h3A1.5 1.5 0 0 0 11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3z" />
              </svg>
              Copy Id
            </button>
            {copySuccess && <span className="copy-success">{copySuccess}</span>}
          </div>
        </div>

        <div className="users-section">
          <h3>Users in Room</h3>
          <ul className="users-list">
            {users.map((user, index) => (
              <li key={index} className="user-item">
                <span className="user-avatar">
                  {user.charAt(0).toUpperCase()}
                </span>
                <span className="user-name">{user.slice(0, 8)}...</span>
              </li>
            ))}
          </ul>
        </div>

        <p className="typing-indicator">{typing}</p>

        <div className="controls-section">
          <label htmlFor="language-select">Language:</label>
          <select
            id="language-select"
            className="language-selector"
            value={language}
            onChange={handleLanguageChange}
          >
            <option value="javascript">JavaScript</option>
            <option value="python">Python</option>
            <option value="java">Java</option>
            <option value="cpp">C++</option>
          </select>

          <button className="leave-button" onClick={leaveRoom}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              viewBox="0 0 16 16"
            >
              <path
                fillRule="evenodd"
                d="M10 12.5a.5.5 0 0 1-.5.5h-8a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 .5.5v2a.5.5 0 0 0 1 0v-2A1.5 1.5 0 0 0 9.5 2h-8A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h8a1.5 1.5 0 0 0 1.5-1.5v-2a.5.5 0 0 0-1 0v2z"
              />
              <path
                fillRule="evenodd"
                d="M15.854 8.354a.5.5 0 0 0 0-.708l-3-3a.5.5 0 0 0-.708.708L14.293 7.5H5.5a.5.5 0 0 0 0 1h8.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3z"
              />
            </svg>
            Leave Room
          </button>
        </div>
      </div>

      <div className="editor-wrapper">
        <div className="editor-header">
          <div className="editor-tabs">
            <div className="editor-tab active">
              <span className={`language-icon ${language}`}></span>
              {language === "javascript" && "script.js"}
              {language === "python" && "main.py"}
              {language === "java" && "Main.java"}
              {language === "cpp" && "main.cpp"}
            </div>
          </div>
        </div>

        <Editor
          height={"60%"}
          defaultLanguage={language}
          language={language}
          value={code}
          onChange={handleCodeChange}
          theme="vs-dark"
          options={{
            minimap: { enabled: false },
            fontSize: 14,
            scrollBeyondLastLine: false,
            renderLineHighlight: "all",
            lineNumbers: "on",
            folding: true,
            fontFamily: 'JetBrains Mono, Consolas, "Courier New", monospace',
          }}
          className="code-editor"
        />

        <div className="output-section">
          <div className="output-header">
            <h3>Output</h3>
            <button className="run-btn" onClick={runCode}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                viewBox="0 0 16 16"
              >
                <path d="M11.596 8.697l-6.363 3.692c-.54.313-1.233-.066-1.233-.697V4.308c0-.63.692-1.01 1.233-.696l6.363 3.692a.802.802 0 0 1 0 1.393z" />
              </svg>
              Execute
            </button>
          </div>
          <textarea
            className="output-console"
            value={outPut}
            readOnly
            placeholder="Output will appear here ..."
          />
        </div>
      </div>
    </div>
  );
};

export default App;
