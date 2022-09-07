import './App.css';
import React,{ useState, useEffect } from 'react';
import axios from "axios"
import Navbar from './components/Navbar';
import Home from './components/Home';
const App = () => {
  const [quotes, setQuotes] = useState("");
  const [author, setAuthor] = useState("");
 
   const API = async () => {
    let quotesarr = [];
    try{
      const data = await axios.get("http://localhost:9292/quotes");
      quotesarr = data.data;
    
    
    }catch(error){
      console.log(error)
    }
    try {
     setQuotes(quotesarr.content);
     setAuthor(quotesarr.author);
    }catch (error){
      console.log(error)
    }
  };
    useEffect(() => {
      API();
    }, []);
    function handleUpdateQuote(updatedQuote) {
      const updatedQuotes = quotes.map((quote) => {
        if (quote.id === updatedQuote.id) {
          return updatedQuote;
        } else {
          return quote;
        }
      });
      setQuotes(updatedQuotes);
    }
   
  return (
    <>
    
    <Navbar/>
      <div className="App">
        <div className="quotebox">
          <div className="container">
            <div className="quote">
              <h2>{quotes}</h2>
            </div>
            <div className="quotebutton">
              <button onClick={API}>Generate Quotes</button>
            </div>
          </div>
        </div>
      </div>
      <Home onUpdateQuotes={handleUpdateQuote}/>
    </>
  );
}

export default App;