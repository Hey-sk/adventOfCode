import { useState } from "react";
import Input from "../components/Input";
import Output from "../components/Output";
import defaultInputs from "../components/Day8inputs";

export default function Challenge8() {
  const [sol1, setSol1] = useState("");
  const [sol2, setSol2] = useState("");

  const dayNum = 8;
  const puzzleName = "Treetop Tree House";

  const handleSubmit = (event) => {
    event.preventDefault();
    let input = parseInput(event.target.textInput.value);
    input = checkColumn(input, "topDown");
    input = checkColumn(input, "bottomUp");
    input = checkRow(input, "leftToRight");
    input = checkRow(input, "rightToLeft");
    const result1 = input.map(element => element.isVisible).filter(visible => visible === true).length
    setSol1(result1)
    return input;
  };

  let maxRow = 0;
  let maxCol = 0;

  // parse the puzzle input into rows each row should contain an object with height,
  // the coordinates, and an isVisible. isVisible will initially be set to false for everything.
  const parseInput = (input) => {
    let grid = input.split("\n").map((str) => [...str]);
    grid = grid.map((gridVal, rowIndex) =>
      gridVal.map((height, colIndex) => {
        return {
          row: rowIndex,
          col: colIndex,
          height: Number(height),
          isVisible: false,
        };
      })
    );
    grid = grid.flat();
    console.log({ grid });

    // isVisible values should be changed to true for all outside trees.
    // outside trees include everything in the first row. everything in the last row,
    // and the first and last items from each column.
    maxRow = grid
      .map((val) => val.row)
      .reduce((acc, val) => (acc > val ? acc : val));
    maxCol = grid
      .map((val) => val.col)
      .reduce((acc, val) => (acc > val ? acc : val));
    return grid;
  };

  //review top to bottom- update any values that should be changed to isVisible: true.
  const checkColumn = (input, order) => {
    if (order === "topDown") {
      for (let colIndex = 0; colIndex <= maxCol; colIndex++) {
        console.log(`evaluating column ${colIndex}`);
        const heightsInCol = input
          .filter((gridItem) => gridItem.col === colIndex)
          .map((val) => val.height);
        heightsInCol.forEach((height, rowIndex) => {
          console.log({ height, rowIndex });
          const treesAbove = heightsInCol.slice(0, rowIndex);
          const smallestTreeAbove = treesAbove.reduce(
            (acc, val) => (acc < val ? val : acc),
            -1
          );
          const isVisible = height > smallestTreeAbove;
          console.log({ treesAbove, smallestTreeAbove, isVisible });
          if (isVisible) {
            input = input.map((prev) => {
              if (prev.row === rowIndex && prev.col === colIndex) {
                return { ...prev, isVisible: true };
              } else {
                return prev;
              }
            });
          }
        });
        console.log({ index: colIndex, heightsInCol });
      }
      return input;
    } else if (order === "bottomUp") {
      for (let colIndex = maxCol; colIndex >= 0; colIndex--) {
        const heightsInCol = input
          .filter((gridItem) => gridItem.col === colIndex)
          .map((val) => val.height)
          .slice()
          .reverse();
        heightsInCol.forEach((height, rowIndex) => {
          const reversedIndex = maxRow - rowIndex;
          const treesBelow = heightsInCol.slice(0, rowIndex);
          const smallestTreeBelow = treesBelow.reduce(
            (acc, val) => (acc < val ? val : acc),
            -1
          );
          const isVisible = height > smallestTreeBelow;
          if (isVisible) {
            input = input.map((prev) => {
              if (prev.row === reversedIndex && prev.col === colIndex) {
                return { ...prev, isVisible: true };
              } else {
                return prev;
              }
            });
          }
        });
      }
      return input;
    } else {
      console.log(`invalid parameter: ${order}`);
    }
  };

  //review right and change to false any items that are not visible
  //review left and change to false any items that are not visible
  const checkRow = (input, order) => {
    if (order === "leftToRight") {
      console.log(order);
      for (let rowIndex = 0; rowIndex <= maxRow; rowIndex++) {
        console.log(`evaluating row ${rowIndex}`);
        const heightsInRow = input
          .filter((gridItem) => gridItem.row === rowIndex)
          .map((val) => val.height);
        heightsInRow.forEach((height, colIndex) => {
          console.log({ height, colIndex });
          const treesBefore = heightsInRow.slice(0, colIndex);
          const smallestTreeBefore = treesBefore.reduce(
            (acc, val) => (acc < val ? val : acc),
            -1
          );
          const isVisible = height > smallestTreeBefore;
          console.log({ treesBefore, smallestTreeBefore, isVisible });
          if (isVisible) {
            input = input.map((prev) => {
              if (prev.col === colIndex && prev.row === rowIndex) {
                return { ...prev, isVisible: true };
              } else {
                return prev;
              }
            });
          }
        });
        console.log({ result: input });
      }
      return input;
    } else if (order === "rightToLeft") {
      console.log(order);
      for (let rowIndex = maxRow; rowIndex >= 0; rowIndex--) {
        console.log(`evaluating row ${rowIndex}`);
        const heightsInRow = input
          .filter((gridItem) => gridItem.row === rowIndex)
          .map((val) => val.height)
          .slice()
          .reverse();
        heightsInRow.forEach((height, colIndex) => {
          const reversedColIndex = maxCol - colIndex;
          console.log({ height, reversedColIndex });
          const treesAfter = heightsInRow.slice(0, colIndex);
          const smallestTreeAfter = treesAfter.reduce(
            (acc, val) => (acc < val ? val : acc),
            -1
          );
          const isVisible = height > smallestTreeAfter;
          console.log({ treesAfter, smallestTreeAfter, isVisible });
          if (isVisible) {
            input = input.map((prev) => {
              if (prev.col === reversedColIndex && prev.row === rowIndex) {
                return { ...prev, isVisible: true };
              } else {
                return prev;
              }
            });
          }
        });
        console.log({ result: input });
      }
      return input;
    } else {
      console.log(`invalid parameter: ${order}`);
    }
  };
  return (
    <div className="main-wrapper">
      <Input
        title={`day ${dayNum}`}
        heading={puzzleName}
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
