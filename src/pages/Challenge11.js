import { useEffect, useState } from "react";
import Input from "../components/Input";
import Output from "../components/Output";
import defaultInputs from "../components/Day11inputs";

export default function Challenge11() {
  const [sol1, setSol1] = useState("");
  const [sol2, setSol2] = useState("");

  useEffect(()=> {
    setSol1('coming soon')
    setSol2('coming soon')
  },[])

  const handleSubmit = (event) => {
    event.preventDefault();
    const input = (JSON.stringify(event.target.textInput.value));
    console.log(input)
  };

  return (
    <div className="main-wrapper">
      <Input
        title="day11"
        heading="Monkey in the Middle"
        handleSubmit={handleSubmit}
        defaultInputs={defaultInputs}
      />
      <Output
        solution={sol1}
        part2Solution={sol2}
        clickSolution1={()=> alert(sol1)}
        clickSolution2={()=> alert(sol2)}
      />
    </div>
  );
}
