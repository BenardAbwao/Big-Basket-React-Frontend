import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Nav1 from './Nav1';

const Home = ({id, onUpdateQuotes,body}) => {
      const [author_id, setAuthor_id] = useState("");
      const [quotes, setQuotes] = useState([]);
      const [content, setContent] = useState("");
      const [data, setData] = useState({
        author: "",
        quote: "",
      });
      function submit(e) {
        e.preventDefault();
        axios
          .post("http://localhost:9292/quotes", {
            author: author_id,
            quote: content,
          })
          .then((res) => {
            setQuotes([...quotes, res.data]);
          });
      }

      function handle(e) {
        const newData = { ...data };
        newData[e.target.id] = e.target.value;
        setData(newData);
        console.log(newData);
      }
            useEffect(() => {
            fetch("http://localhost:9292/allquotes")
              .then((res) => res.json())
              .then((data) => setQuotes(data));
            }, []);
        function handleUpdate(content) {
          setContent(content);
        }

function handleDelete(id) {
  fetch(`http://localhost:9292/quotes${id}`, {
    method: "DELETE",
  });

  const quotearr = quotes.filter((quote) => quote.id !== id);
  setQuotes(quotearr);
}

  return (
    <>
      <div className="home">
        <Nav1 />
        <form onSubmit={(e) => submit(e)}>
          <label>Quote:</label>
          <textarea
            id="txt-area"
            rows="5"
            cols="80"
            required
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
          <button type="submit">Submit</button>
        </form>
        <div className="show">
          {quotes.map((quote) => (
            <p key={quote.id}>
              <button onClick={() => handleDelete(quote.id)}>🗑️</button>
              {quote.content}
            </p>
          ))}
        </div>
      </div>
    </>
  );
}

export default Home;