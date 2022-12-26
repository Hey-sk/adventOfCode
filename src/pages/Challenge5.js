import initalZones from "../components/initialZones.json";
import { useState } from "react";
import Input from "../components/Input";
import Output from "../components/Output";
import StackDisplay from "../components/StackDisplay";

export default function Challenge5() {
  const supplyZones = (initalZones.data);
  const [instructions, setInstructions] = useState([]);
  

  // define what your input should look like in order to process it...
  const parseInput = (input) => {
    const inputArray = input.map((line) => line.split(" "));
    let cleanArray = inputArray.map((line) => {
      return line.filter((value) => !isNaN(Number(value)));
    });
    cleanArray = cleanArray.map((line) => {
      return line.map((val) => Number(val));
    });
    return cleanArray;
  };

  // get the instructions and process those instructions
  const handleSubmit = (event) => {
    event.preventDefault();
    const input = event.target.textInput.value.split("\n");
    setInstructions(parseInput(input));
    processInstructions2();
  };

  const processInstructions = () => {
    instructions.forEach((line) => {
      const [repititions, fromHere, toHere] = line;
      let oldArrangement = [...supplyZones];

      for (let i = 0; i < repititions; i++) {
        let stackToPickFrom = oldArrangement[fromHere - 1].contents;
        let destinationStack = oldArrangement[toHere - 1].contents;
        const thisPickedCrate = stackToPickFrom[stackToPickFrom.length - 1];
        console.log(
          `step ${i + 1}: move ${thisPickedCrate} from ${fromHere} to ${toHere}`
        );

        stackToPickFrom = stackToPickFrom.pop();
        destinationStack = destinationStack.push(thisPickedCrate);
      }
    });
  };

  const processInstructions2 = () => {
    instructions.forEach((line) => {
      const [stackSize, fromHere, toHere] = line;
      let oldArrangement = [...supplyZones];

      let stackToPickFrom = oldArrangement[fromHere - 1].contents;
      let destinationStack = oldArrangement[toHere - 1].contents;
      const thisPickedStack = stackToPickFrom.slice(stackToPickFrom.length - stackSize, stackToPickFrom.length)
      console.log(
        `move ${thisPickedStack} from ${fromHere} to ${toHere}`
      );

      thisPickedStack.forEach(crate => stackToPickFrom.pop()) 
      thisPickedStack.forEach(crate => destinationStack.push(crate))
      //destinationStack = destinationStack.push(thisPickedCrate);
    });
  };

  const handleSolution1Click = (event) => {
    processInstructions();
  };

  const handleSolution2Click = (event) => {
    console.log("click");
  };

  //get the topCrate from each Zone
  const zoneContents = supplyZones.map((zone) => zone.contents);
  const topCrates = zoneContents.map((crate) =>
    crate.slice(crate.length - 1, crate.length)
  );

  return (
    <div className="main-wrapper">
      <StackDisplay supplyZones={supplyZones} />
      <Input
        title="day5"
        heading="suppy stacks"
        handleSubmit={handleSubmit}
        defaultInput="move 1 from 2 to 1"
      />
      <Output
        solution={topCrates.map((crate) => crate + " ")}
        part2Solution={topCrates.map((crate) => crate + " ")}
        clickSolution1={handleSolution1Click}
        clickSolution2={handleSolution2Click}
      />
    </div>
  );
}
