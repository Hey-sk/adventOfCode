import { useState } from "react";
import Input from "../components/Input";
import Output from "../components/Output";
import defaultInputs from "../components/Day9inputs";

export default function Challenge9() {
  const [sol1, setSol1] = useState("");
  const [sol2, setSol2] = useState("");

  let headDirections = [];
  const headMovements = [{ row: 0, col: 0 }];
  const tailMovements = [{ row: 0, col: 0 }];

  const handleSubmit = (event) => {
    event.preventDefault();
    const input = event.target.textInput.value.split("\n");
    headDirections = parseInput(input);
    runDirections(headDirections);
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
  const tailShouldMove = (thisHead, thisTail) => {
    const goodRow = [thisHead.row - 1, thisHead.row, thisHead.row + 1];
    const goodCol = [thisHead.col - 1, thisHead.col, thisHead.col + 1];
    const inRange =
      goodRow.includes(thisTail.row) && goodCol.includes(thisTail.col);
    return !inRange;
  };

  //determine where the tail should move based on the position of the knot which preceeds it.
  const adjustCoord = (thisHead, thisTail) => {
    const { row: headRow, col: headCol } = thisHead;
    const { row: tailRow, col: tailCol } = thisTail;
    if (tailShouldMove(thisHead, thisTail)) {
      if (headRow > tailRow) {
        if (headCol > tailCol) {
          return { row: tailRow + 1, col: tailCol + 1 };
        }
        if (headCol === tailCol) {
          return { row: tailRow + 1, col: tailCol };
        }
        if (headCol < tailCol) {
          return { row: tailRow + 1, col: tailCol - 1 };
        }
      }
      if (headRow === tailRow) {
        if (headCol > tailCol) {
          return { row: tailRow, col: tailCol + 1 };
        }
        if (headCol < tailCol) {
          return { row: tailRow, col: tailCol - 1 };
        }
      }
      if (headRow < tailRow) {
        if (headCol > tailCol) {
          return { row: tailRow - 1, col: tailCol + 1 };
        }
        if (headCol === tailCol) {
          return { row: tailRow - 1, col: tailCol };
        }
        if (headCol < tailCol) {
          return { row: tailRow - 1, col: tailCol - 1 };
        }
      }
    } else {
      return thisTail;
    }
  };

  //for sol2: we need to build a longer tail...
  //set the knot positions as an array
  const longTailMovements = [
    [
      { row: 0, col: 0 },
      { row: 0, col: 0 },
      { row: 0, col: 0 },
      { row: 0, col: 0 },
      { row: 0, col: 0 },
      { row: 0, col: 0 },
      { row: 0, col: 0 },
      { row: 0, col: 0 },
      { row: 0, col: 0 },
      { row: 0, col: 0 },
    ],
  ];

  //when the head moves update the next knot
  const setLongTail = (thisHead, thisTail) => {
    console.log("setting Long Tail");
    const lastLongTail = longTailMovements[longTailMovements.length - 1];
    let newTail = lastLongTail.map((coord, index) =>
      index === 0 ? thisHead : coord
    );
    newTail = newTail.map((coord, index) => (index === 1 ? thisTail : coord));
    for (let i = 2; i <= 9; i++) {
      let currentTail = newTail;
      newTail = currentTail.map((coord, index) =>
        index === i ? adjustCoord(currentTail[i - 1], currentTail[i]) : coord
      );
    }
    return newTail;
  };

  //iterate through the directions and update knot positions accordingly
  const runDirections = (headDirections) => {
    headDirections.forEach((dir) => {
      for (let i = 0; i < dir.numSteps; i++) {
        const { row: headRow, col: headCol } = getLastCoordinate(headMovements);
        const headMove = updatedMovement(dir.bearing, headRow, headCol);
        headMovements.push(headMove);
        tailMovements.push(
          adjustCoord(
            getLastCoordinate(headMovements),
            getLastCoordinate(tailMovements)
          )
        );
        longTailMovements.push(
          setLongTail(
            getLastCoordinate(headMovements),
            getLastCoordinate(tailMovements)
          )
        );
      }
    });

    const tailCoords = tailMovements.map((val) => JSON.stringify(val));
    const uniqueTailCoords = tailCoords.reduce((acc, val) => {
      !acc.includes(val) && acc.push(val);
      return acc;
    }, []);
    
    const endOfLongTail = longTailMovements.map((arr)=> arr.filter((val, index)=> index === 9)).flat()
    const longTailCoords = endOfLongTail.map((val) => JSON.stringify(val));
    const uniqueLongTailCoords = longTailCoords.reduce((acc, val) => {
      !acc.includes(val) && acc.push(val);
      return acc;
    }, []);
    
    setSol1(uniqueTailCoords.length)
    setSol2(uniqueLongTailCoords.length)
  };

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
        part2Solution={sol2}
        clickSolution1={() => alert(sol1)}
        clickSolution2={() => alert(sol2)}
      />
    </div>
  );
}
