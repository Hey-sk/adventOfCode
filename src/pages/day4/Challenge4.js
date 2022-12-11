import { useEffect, useState } from "react";
import Input from "../../components/Input";
import Output from "../../components/Output";

export default function Challenge4() {
  const [cleanUpTasks, setCleanUpTasks] = useState([]);
  //get your input
  const handleSubmit = (event) => {
    event.preventDefault();
    setCleanUpTasks(event.target.textInput.value.split("\n"));
  };

  //make an array for each elf.

  const makeElfArrays = () => {
    const result = cleanUpTasks.map((line) => {
      const splitTasks = line.split(",");
      const elfOneTasks = splitTasks[0].split("-");
      const elfTwoTasks = splitTasks[1].split("-");

      const start = (thisElfsTasks) => parseInt(thisElfsTasks[0]);
      const end = (thisElfsTasks) => parseInt(thisElfsTasks[1]);

      const elfOneTaskArray = [];
      const elfTwoTaskArray = [];

      for (let i = start(elfOneTasks); i <= end(elfOneTasks); i++) {
        elfOneTaskArray.push(i);
      }

      for (let i = start(elfTwoTasks); i <= end(elfTwoTasks); i++) {
        elfTwoTaskArray.push(i);
      }

      return [elfOneTaskArray, elfTwoTaskArray];
    });
    return result;
  };

  useEffect(() => {
    makeElfArrays();
    console.log(`result is ${JSON.stringify(comparedArrays)}`);
  }, [cleanUpTasks]);

  //compare the first array and second array; increment a counter
  //whenever everything from the first array appears in the second
  //or vice-versa
  const comparedArrays = makeElfArrays().map((line) => {
    const isEveryItemIncluded = (a, b) => a.every((item) => b.includes(item));
    const condition1 = isEveryItemIncluded(line[0], line[1]);
    const condition2 = isEveryItemIncluded(line[1], line[0]);
    return condition1 || condition2 ? 1 : 0;
  });

  //Part 2: using the same compared arrays find if there's any overlap between the pairings.
  const hasOverlap = makeElfArrays().map((line) => {
    const isAnyItemIncluded = (a, b) => a.some((item) => b.includes(item));
    const condition1 = isAnyItemIncluded(line[0], line[1]);
    const condition2 = isAnyItemIncluded(line[1], line[0]);
    return condition1 || condition2 ? 1 : 0;
  });

  const solution =
    comparedArrays.length && comparedArrays.reduce((acc, val) => acc + val);
  const solution2 =
    hasOverlap.length && hasOverlap.reduce((acc, val) => acc + val);

  return (
    <>
      <main className="main-wrapper">
        <Input
          title="Day 4"
          heading="Camp Cleanup!"
          handleSubmit={handleSubmit}
        />
        <Output solution={solution} part2Solution={solution2} />
      </main>
    </>
  );
}
