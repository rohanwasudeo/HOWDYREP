import React, { useEffect, useState } from "react";
import './App.css';
import { supabase } from "./supabaseClient";

function App() {
  const [dark, setDark] = useState(() => {
    const saved = localStorage.getItem('theme');
    return saved === 'dark';
  });
  const [loading, setLoading] = useState(true);
  const [messages, setMessages] = useState([]);
  const [error, setError] = useState(null);

  // Fetch only the 'message' column from the 'message' table
  useEffect(() => {
    let ignore = false;
    async function fetchMessage() {
      setLoading(true);
      setError(null);
      const { data, error } = await supabase
        .from('message')
        .select('message');
      if (!ignore) {
        if (error) {
          setError(error.message);
          setMessages([]);
        } else {
          setMessages(Array.isArray(data) ? data : []);
        }
        setLoading(false);
      }
    }
    fetchMessage();
    return () => { ignore = true; };
  }, []);

  useEffect(() => {
    if (dark) {
      document.body.classList.add('dark-mode');
    } else {
      document.body.classList.remove('dark-mode');
    }
    localStorage.setItem('theme', dark ? 'dark' : 'light');
  }, [dark]);

  // Determine what to render for mapped components
  let navbarBrandContent = "Hello Jahan";
  let h1Content = "Hello Jahan";
  if (!loading && !error && messages.length === 1) {
    navbarBrandContent = messages[0].message || "";
    h1Content = messages[0].message || "";
  }

  return (
    <div className={`container-fluid vh-100 d-flex flex-column p-0 bg-light${dark ? ' bg-dark' : ''}`}
      style={{ transition: 'background 0.4s', minHeight: '100vh' }}>
      {/* Navbar */}
      <nav className={`navbar navbar-expand-lg shadow-sm animate__animated animate__fadeInDown${dark ? ' bg-dark navbar-dark' : ' bg-white navbar-light'}`} style={{ transition: 'background 0.4s' }}>
        <div className="container">
          <a className="navbar-brand fw-bold" href="#" style={{ letterSpacing: '1px' }}>
            <i className="bi bi-stars text-primary me-2"></i>
            {navbarBrandContent}
          </a>
          <button
            className={`btn btn-sm ${dark ? 'btn-light' : 'btn-dark'} rounded-pill px-3 ms-auto`}
            onClick={() => setDark(d => !d)}
            aria-label="Toggle light/dark mode"
            style={{ transition: 'background 0.3s, color 0.3s' }}
          >
            <i className={`bi ${dark ? 'bi-sun-fill text-warning' : 'bi-moon-stars-fill text-primary'}`}></i>
            <span className="ms-2">{dark ? 'Light' : 'Dark'} Mode</span>
          </button>
        </div>
      </nav>
      {/* Main Content */}
      <div className="flex-grow-1 d-flex flex-column justify-content-center align-items-center">
        <div className={`card shadow-lg p-4 animate__animated animate__fadeInDown${dark ? ' dark-mode' : ''}`} style={{ maxWidth: 400, background: dark ? '#23272f' : undefined, color: dark ? '#f3f4f6' : undefined }}>
          {loading ? (
            <div className="d-flex flex-column align-items-center justify-content-center" style={{ minHeight: 120 }}>
              <div className="spinner-border text-primary mb-2" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
              <span className="text-secondary small mt-2">Loading message...</span>
            </div>
          ) : error ? (
            <div className="alert alert-danger text-center animate__animated animate__fadeIn animate__faster" role="alert">
              {error}
            </div>
          ) : messages.length === 1 ? (
            <>
              <h1 className="display-4 text-primary text-center mb-3 animate__animated animate__fadeInUp">{h1Content}</h1>
              <p className="lead text-center text-secondary animate__animated animate__fadeIn animate__delay-1s">
                Welcome to your modern React app!
              </p>
            </>
          ) : messages.length > 1 ? (
            <>
              <h2 className="h4 text-primary text-center mb-3 animate__animated animate__fadeInUp">Messages</h2>
              <div className="table-responsive animate__animated animate__fadeIn animate__delay-1s">
                <table className="table table-striped table-hover align-middle mb-0">
                  <thead>
                    <tr>
                      <th>Message</th>
                    </tr>
                  </thead>
                  <tbody>
                    {messages.map((row, idx) => (
                      <tr key={idx}>
                        <td>{row.message}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </>
          ) : (
            <div className="alert alert-warning text-center animate__animated animate__fadeIn animate__faster" role="alert">
              No message found.
            </div>
          )}
        </div>
      </div>
      {/* Footer */}
      <footer className={`footer mt-auto py-3 animate__animated animate__fadeInUp${dark ? ' bg-dark text-light' : ' bg-white text-secondary'}`} style={{ borderTop: '1px solid #e5e7eb', transition: 'background 0.4s, color 0.4s' }}>
        <div className="container text-center small">
          <span>&copy; {new Date().getFullYear()} Hello Jahan React App. Crafted with <i className="bi bi-heart-fill text-danger"></i></span>
        </div>
      </footer>
    </div>
  );
}

export default App;
