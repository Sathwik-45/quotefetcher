import { useState, useEffect } from "react";

function QuoteFetcher() {
  const [quote, setQuote] = useState('');
  const [author, setAuthor] = useState('');
  const [loading, setLoading] = useState(true);

  const fetchQuote = async () => {
    setLoading(true);
    try {
      const res = await fetch("https://dummyjson.com/quotes/random"); // ✅ working API
      const data = await res.json();
      setQuote(data.quote);
      setAuthor(data.author);
    } catch (error) {
      setQuote("Failed to fetch quote.");
      setAuthor("Error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchQuote();
  }, []);

   return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.heading}>📜 Quote of the Moment</h2>
        {loading ? (
          <p style={styles.loading}>Loading...</p>
        ) : (
          <>
            <p style={styles.quote}>"{quote}"</p>
            <p style={styles.author}>— {author}</p>
          </>
        )}
        <button onClick={fetchQuote} style={styles.button}>New Quote</button>
      </div>
    </div>
  );
}

const styles = {
 container: {
  display: 'flex',
  height: '100vh',
  width: '100vw', // ✅ fixed typo from "with"
  justifyContent: 'center',
  alignItems: 'center',
  background: 'linear-gradient(to right, #74ebd5, #acb6e5)',
  fontFamily: 'sans-serif',
  boxSizing: 'border-box', 
  padding: '10px', 
},

  card: {
    background: '#fff',
    padding: '30px 50px',
    borderRadius: '15px',
    boxShadow: '0 5px 15px rgba(0,0,0,0.2)',
    textAlign: 'center',
    maxWidth: '600px',
  },
  heading: {
    fontSize: '1.8rem',
    marginBottom: '20px',
    color: '#2c3e50',
  },
  quote: {
    fontSize: '1.5rem',
    color: '#34495e',
    marginBottom: '10px',
  },
  author: {
    fontSize: '1.1rem',
    color: '#7f8c8d',
    marginBottom: '20px',
  },
  button: {
    padding: '10px 20px',
    background: '#2980b9',
    color: '#fff',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
  },
  loading: {
    color: '#888',
    fontStyle: 'italic',
  },
};

export default QuoteFetcher;