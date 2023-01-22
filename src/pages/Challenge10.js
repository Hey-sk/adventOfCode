import { useEffect, useState } from "react";
import Input from "../components/Input";
import Output from "../components/Output";
import defaultInputs from "../components/Day10inputs";

export default function Challenge10() {
  const [cyclesLog, setCyclesLog] = useState([])
  const [crv, setCrv] = useState("");
  const [sol1, setSol1] = useState("");
  const [sol2, setSol2] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    const commands = parseInput(event.target.textInput.value);
    const sol1Arr = runCommands(commands);
    setSol1(sol1Arr.reduce((acc, val) => acc + val));
    setSol2("coming soon");
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
    let spritePosition = [0, 1, 2];
    const commandResultsLog = [];

    commands.forEach((command, index) => {
      for (let i = 0; i < command.cycles; i++) {
        cycles = cycles + 1;
        if (i === 0) {
          x = index - 1 >= 0 ? x + commands[index - 1].modifier : x;
          spritePosition = [x - 1, x, x + 1];
        }
        commandResultsLog.push({
          cycles,
          crvIndex: (cycles - 1) - (Math.floor((cycles - 1)/40) * 40),
          x,
          spritePosition,
          pixel: spritePosition.includes((cycles - 1) - (Math.floor((cycles - 1)/40) * 40)) ? "#" : "_",
        });
      }
    });
    const lastCycle = commandResultsLog[commandResultsLog.length - 1].cycles;
    const targetIndices = [];
    for (let i = 20; i <= lastCycle; i += 40) {
      targetIndices.push(i);
    }

    const signals = targetIndices.map((index) =>
      commandResultsLog.find((val) => val.cycles === index)
    );
    console.log({ signals });

    const pixelArr = commandResultsLog.map((val) => val.pixel);
    const pixelStr = pixelArr.join("");
    const crvArr = [];
    for (let i = 0; i < pixelStr.length; i += 40) {
      crvArr.push(pixelStr.slice(i, i + 39));
    }
    setCrv(
      crvArr.map((str, index) => {
        return <div key={index} style={{fontSize:'16px'}}>{str}</div>;
      })
    );
    setCyclesLog(commandResultsLog)
    return signals.map((signal) => signal.cycles * signal.x);
  };

  const renderCSV = (log) => {
    if (log.length) {
      console.log('rendering CSV begins');
      const logCopy = [...log]
      const readableSteps = logCopy.map((step, index) => {
        return {
          index,
          crvIndex: step.crvIndex
        }
      })
      console.log({readableSteps})
    }
  }

  useEffect(()=> {
    renderCSV(cyclesLog)
  },[cyclesLog])

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
        part2Solution={crv}
        clickSolution1={() => alert(sol1)}
        clickSolution2={() => alert(sol2)}
      />
    </div>
  );
}
