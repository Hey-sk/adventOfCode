import { useState } from "react";
import Input from "../components/Input";
import Output from "../components/Output";
import defaultInputs from "../components/Day9inputs";

export default function Challenge9() {
  const [sol1, setSol1] = useState("");
  // const [sol2, setSol2] = useState("");

  let headDirections = [];
  const headMovements = [{ row: 0, col: 0 }];
  const tailMovements = [{ row: 0, col: 0 }];

  const handleSubmit = (event) => {
    event.preventDefault();
    const input = event.target.textInput.value.split("\n");
    headDirections = parseInput(input);
    const resultOfTail = runDirections(headDirections);
    setSol1(resultOfTail.length)
  };

  //parse the input so we get an array that contains the direction
  //the head should move and number of spaces for each line.
  const parseInput = (input) => {
    const directions = input.map((arr) => {
      const [bearing, numSteps] = arr.split(" ");
      return { bearing, numSteps };
    });
    return directions;
  };

  //determine new coordinates based on bearing and existing coordinates
  const updatedMovement = (bearing, thisRow, thisCol) => {
    switch (bearing) {
      case "R":
        return { row: ++thisRow, col: thisCol };
      case "L":
        return { row: --thisRow, col: thisCol };
      case "U":
        return { row: thisRow, col: ++thisCol };
      case "D":
        return { row: thisRow, col: --thisCol };
      default:
        console.log(`${bearing} is not a valid direction`);
    }
  };

  //examine movement and get the bearing and last coordinates.
  const getLastCoordinate = (array) => {
    return array[array.length - 1];
  };

  //determine if tail needs to move-- tail should follow if there's a +/- 1 difference
  //with either row or column
  const tailShouldMove = () => {
    const headObj = getLastCoordinate(headMovements);
    const tailObj = getLastCoordinate(tailMovements);
    const goodRow = [headObj.row - 1, headObj.row, headObj.row + 1];
    const goodCol = [headObj.col - 1, headObj.col, headObj.col + 1];
    const inRange = goodRow.includes(tailObj.row) && goodCol.includes(tailObj.col);;
    return !inRange;
  };

  const updatedTailMovement = (bearing) => {
    let headRow = getLastCoordinate(headMovements).row;
    let tailRow = getLastCoordinate(tailMovements).row;
    let headCol = getLastCoordinate(headMovements).col;
    let tailCol = getLastCoordinate(tailMovements).col;

    switch (bearing) {
      case "R":
        if (headCol === tailCol) {
          return { row: ++tailRow, col: tailCol };
        } else {
          return { row: headRow -1, col: headCol};
        }
      case "L":
        if (headCol === tailCol) {
          return { row: --tailRow, col: tailCol };
        } else {
          return { row: headRow + 1, col: headCol};
        }
      case "U":
        if (headRow === tailRow) {
          return { row: tailRow, col: ++tailCol };
        } else {
          return { row: headRow, col: headCol - 1 };
        }
      case "D":
        if (headRow === tailRow) {
          return { row: tailRow, col: --tailCol };
        } else {
          return { row: headRow, col: headCol + 1 };
        }
      default:
        console.log(`${bearing} is not a valid direction`);
    }
  };

  const runDirections = (headDirections) => {
    headDirections.forEach((dir) => {
      for (let i = 0; i < dir.numSteps; i++) {
        const headRow = getLastCoordinate(headMovements).row;
        const headCol = getLastCoordinate(headMovements).col;
        const moveResult = updatedMovement(dir.bearing, headRow, headCol);
        headMovements.push(moveResult);
        tailShouldMove() && tailMovements.push(updatedTailMovement(dir.bearing))
        console.log({bearing: dir.bearing, head: getLastCoordinate(headMovements), tail: getLastCoordinate(tailMovements)});
      }
    });
    const tailCoords = tailMovements.map(val => `${val.col}-${val.row}`)
    const uniqueTailCoords = tailCoords.reduce((acc, val) => {
      !acc.includes(val) && acc.push(val)
      return acc
    },[])
    console.log({uniqueTailCoords})
    return uniqueTailCoords;
  };

  //establish logic of when a tail should move (and how it should move)

  //each time the headMovement is updated (and the tail should be moved)
  //move the tail.

  //once all movements are complete, reduce the tailMovements to a count of
  //unique coordinates.

  return (
    <div className="main-wrapper">
      <Input
        title="day9"
        heading="Rope Bridge"
        handleSubmit={handleSubmit}
        defaultInputs={defaultInputs}
      />
      <Output
        solution={sol1}
        part2Solution={"coming soon!"}
        // clickSolution1={}
        // clickSolution2={}
      />
    </div>
  );
}
