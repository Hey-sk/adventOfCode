import { useState } from "react";
import Input from "../components/Input";
import Output from "../components/Output";
import defaultInputs from "../components/Day8inputs";

export default function Challenge_template() {
  const [sol1, setSol1] = useState("");
  const [sol2, setSol2] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    const input = (JSON.stringify(event.target.textInput.value));
    console.log(input)
  };

  return (
    <div className="main-wrapper">
      <Input
        title="day7"
        heading="No Space Left on Device"
        handleSubmit={handleSubmit}
        defaultInputs={defaultInputs}
      />
      <Output
        solution={sol1}
        part2Solution={sol2}
        // clickSolution1={}
        // clickSolution2={}
      />
    </div>
  );
}
