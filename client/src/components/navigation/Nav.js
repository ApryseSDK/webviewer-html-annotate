import React from 'react';
import './Nav.css';

const Nav = ({ handleSubmit, handleChange }) => {

  const onChange = (e) => {
    e.preventDefault();
    handleChange(e);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    handleSubmit(e);
  }

  return (
    <div className="Nav">
      <h2>WebViewer HTML Annotate</h2>
      <p>
        In this demo, you can pass any URL. The URL passed in will be scraped
        and saved server-side as a snapshot in time. Then you will be annotate
        that copy here.
      </p>
      <form onSubmit={onSubmit}> 
        <label>
          URL
          <input type="url" onChange={onChange}/>
        </label>
        <input type="submit" value="Open"/>
      </form>
    </div>
  );
};

export default Nav;
