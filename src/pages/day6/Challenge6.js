import { useState } from "react";
import Input from "../../components/Input";
import Output from "../../components/Output";

export default function Challenge6() {
  const [code, setCode] = useState([]);

  // get the input and store it as the code
  const handleSubmit = (event) => {
    event.preventDefault();
    const input = event.target.textInput.value.split("");
    setCode(input);
  };

  //   create a decoder to keep track of what you've reviewed
  const decoder = [];

  //go through the code and prepare it for analysis
  const preparedCode = (minStartingLength) => code.map((char, index) => {
    const charArr = code.slice(0, index + 1);
    const lastFour = charArr.slice(charArr.length - minStartingLength, charArr.length);
    return charArr.length >= minStartingLength
      ? //return an array that includes only duplicated values
        lastFour.filter((item, index) => lastFour.indexOf(item) !== index)
      : //arrays with less than minStartingLength characters are not valid
        ["n/a"];
  });

  //map through the prepared code and find the first item with a length of 0 (i.e. no duplicates found)
  const findFirstValidCodeString = (minStartingLength) => preparedCode(minStartingLength).findIndex(array => array.length === 0)

  

  const solution1Answer = findFirstValidCodeString(4) + 1
  const solution2Answer = findFirstValidCodeString(14) + 1

  return (
    <div className="main-wrapper">
      <Input
        title="day6"
        heading="Tuning Trouble"
        handleSubmit={handleSubmit}
        defaultInput="1bvwbjplbgvbhsrlpgdmjqwftvncz"
      />
      <Output
        solution={solution1Answer}
        part2Solution={solution2Answer}
        // clickSolution1={}
        // clickSolution2={}
      />
    </div>
  );
}
