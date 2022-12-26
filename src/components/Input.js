import { useEffect, useState } from "react";
import "./input.css";

export default function Input({ title, heading, handleSubmit, defaultInputs }) {
  const [selectedInput, setSelectedInput] = useState('');

  useEffect(()=> {
    setSelectedInput(defaultInputs[0].defaultInput)
  },[])

  const handleChange = (event) => {
    setSelectedInput(event.target.value);
  };

  const defaultInputSelector = defaultInputs.map((val) => {
    return (
      <label key={val.name}>
        <input
          onChange={handleChange}
          type="radio"
          value={val.defaultInput}
          name="defaultInputSelector"
          style={{ marginRight: "7px" }}
        />
        {val.name}
      </label>
    );
  });

  return (
    <>
      <div className="inputComponent">
        <div className="inputTitle">{title}</div>
        <div className="inputHeading">{heading}</div>
        <form className="inputComponentForm" onSubmit={(e) => handleSubmit(e)}>
          <div className="inputRadioWrapper">{defaultInputSelector}</div>
          <textarea
            id="textInput"
            name="textInput"
            value={selectedInput}
            onChange={(e) => setSelectedInput(e.target.value)}
          />
          <button type="submit"> LOAD INPUT </button>
        </form>
      </div>
    </>
  );
}
