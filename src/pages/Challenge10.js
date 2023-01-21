import { useState } from "react";
import Input from "../components/Input";
import Output from "../components/Output";
import defaultInputs from "../components/Day10inputs";

export default function Challenge10() {
  const [sol1, setSol1] = useState("");
  const [sol2, setSol2] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    const commands = parseInput(event.target.textInput.value);
    const sol1Arr = runCommands(commands);
    setSol1(sol1Arr.reduce((acc, val) => acc + val))
    setSol2('coming soon')
  };

  const parseInput = (input) => {
    const parsedInput = input.split("\n").map((str) => str.split(" "));
    const updatedInput = parsedInput.map((input) => {
      const [command, modifier] = input;
      return {
        command,
        cycles: command === "noop" ? 1 : 2,
        modifier: isNaN(Number(modifier)) ? 0 : Number(modifier),
      };
    });
    return updatedInput;
  };

  const runCommands = (commands) => {
    let cycles = 0;
    let x = 1;
    const commandResultsLog = [];
    commands.forEach((command) => {
      cycles = cycles + command.cycles;
      x = x + command.modifier;
      commandResultsLog.push({ cycles, x });
    });
    const totalCycles = commandResultsLog[commandResultsLog.length - 1].cycles;
    const targetCycles = [];
    for (let i = 20; i <= totalCycles; i += 40) {
      targetCycles.push(i);
    }

    const targetIndices = targetCycles
      .map((target) =>
        commandResultsLog.findIndex((val) => val.cycles >= target)
      )
      .map((i) => i - 1);

    const targetValues = targetIndices.map((i, index) => {
      console.log({multBy: targetCycles[index], xVal: commandResultsLog[i].x})
      return ( commandResultsLog[i].x * targetCycles[index] )
    }
  
    );
    console.log(targetValues)
    return targetValues
  };

  return (
    <div className="main-wrapper">
      <Input
        title="day 10"
        heading="Cathode-Ray Tube"
        handleSubmit={handleSubmit}
        defaultInputs={defaultInputs}
      />
      <Output
        solution={sol1}
        part2Solution={sol2}
        clickSolution1={() => alert(sol1)}
        clickSolution2={() => alert(sol2)}
      />
    </div>
  );
}
