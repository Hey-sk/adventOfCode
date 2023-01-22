import { useEffect, useState } from "react";
import Input from "../components/Input";
import Output from "../components/Output";
import defaultInputs from "../components/Day11inputs";

export default function Challenge11() {
  const [sol1, setSol1] = useState("");
  const [sol2, setSol2] = useState("");

  useEffect(() => {
    setSol1("coming soon");
    setSol2("coming soon");
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    const input = parseInput(event.target.textInput.value);
    console.log(input)
  };

  const parseInput = (input) => {
    const monkeyArr = input
      .split("Monkey ")
      .filter((val) => val !== "")
      .map((monkey) => monkey.split("\n"));
    const result = monkeyArr.map((monkey) => {
      let [
        monkeyNum,
        startingItems,
        operation,
        divideByTest,
        monkeyIfDivisible,
        monkeyIfNotDivisible,
      ] = monkey;
      monkeyNum = parseInt(monkeyNum);
      startingItems = startingItems
        .split(":")[1]
        .split(",")
        .map((num) => parseInt(num));
      operation = operation.split("new = ")[1];
      divideByTest = parseInt(divideByTest.split("divisible by ")[1]);
      monkeyIfDivisible = parseInt(
        monkeyIfDivisible.split("throw to monkey ")[1]
      );
      monkeyIfNotDivisible = parseInt(
        monkeyIfNotDivisible.split("throw to monkey ")[1]
      );
      return {
        monkeyNum,
        startingItems,
        operation,
        divideByTest,
        monkeyIfDivisible,
        monkeyIfDivisible,
        monkeyIfNotDivisible,
      };
    });
    return result;
  };

  return (
    <div className="main-wrapper">
      <Input
        title="day 11"
        heading="Monkey in the Middle"
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
