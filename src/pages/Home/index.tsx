import { useEffect } from "react";
import React from "react";
import CountriesAPI from "../../services/api/countries";
function Home() {
  const getAll = async () => {
    const response = await CountriesAPI.getAll();
    console.log(response);
  };
  useEffect(() => {
    getAll();
  }, []);
  return (
    <div className="App">
      <header className="App-header">
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default Home;
