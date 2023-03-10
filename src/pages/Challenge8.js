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
    const result1 = input
      .map((element) => element.isVisible)
      .filter((visible) => visible === true).length;
    const result2 = input.map(val => val.visScore)
      .map(arr => arr
      .reduce((acc, val) => acc * val))
    setSol1(result1);
    setSol2(Math.max(...result2));
    return input;
  };

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
          visScore: []
        };
      })
    );
    grid = grid.flat();
    return grid;
  };

  const getMaxRow = (grid) => {
    const maxRow = grid
      .map((val) => val.row)
      .reduce((acc, val) => (acc > val ? acc : val));
    return maxRow;
  };

  const getMaxCol = (grid) => {
    const maxCol = grid
      .map((val) => val.col)
      .reduce((acc, val) => (acc > val ? acc : val));
    return maxCol;
  };

  const getIsVisible = (thisArr, thisHeight, thisIndex) => {
    const arrCopy = [...thisArr];
    const treesToEdge = arrCopy.slice(0, thisIndex);
    const smallestTree = treesToEdge.reduce(
      (acc, val) => (acc < val ? val : acc),
      -1
    );
    const isVisible = thisHeight > smallestTree;
    return isVisible;
  };

  const getVisibilityScore = (thisArr, thisHeight, thisIndex) => {
    const treesToEdge = thisArr.slice(0, thisIndex).reverse();
    const hasObstruction = treesToEdge.map((val) => val >= thisHeight).includes(true)
    const viewDistance = !hasObstruction ? treesToEdge.length : treesToEdge.findIndex((val) => val >= thisHeight) + 1;
    return viewDistance;
  };

  const updateIsVisible = (thisInput, thisRow, thisCol, score) => {
    const updatedInput = thisInput.map((prev) => {
      if (prev.row === thisRow && prev.col === thisCol) {
        return { ...prev, isVisible: true, visScore: [...prev.visScore, score] };
      } else {
        return prev;
      }
    });
    return updatedInput;
  };

  const updateVisScore = (thisInput, thisRow, thisCol, score) => {
    const updatedInput = thisInput.map((prev) => {
      if (prev.row === thisRow && prev.col === thisCol) {
        return { ...prev, visScore: [...prev.visScore, score] };
      } else {
        return prev;
      }
    });
    return updatedInput;
  }

  //review top to bottom- update any values that should be changed to isVisible: true.
  const checkColumn = (input, order) => {
    let updatedInput = [...input];

    if (order === "topDown") {
      for (let colIndex = 0; colIndex <= getMaxCol(input); colIndex++) {
        const heightsInCol = input
          .filter((gridItem) => gridItem.col === colIndex)
          .map((val) => val.height);
        for (let rowIndex = 0; rowIndex < heightsInCol.length; rowIndex++) {
          const height = heightsInCol[rowIndex];
          const isVisible = getIsVisible(heightsInCol, height, rowIndex);
          const visScore = getVisibilityScore(heightsInCol, height, rowIndex)
          if (isVisible) {
            updatedInput = updateIsVisible(updatedInput, rowIndex, colIndex, visScore);
          } else {
            updatedInput = updateVisScore(updatedInput, rowIndex, colIndex, visScore);
          }
        }
      }
      return updatedInput;
    } else if (order === "bottomUp") {
      for (let colIndex = getMaxCol(input); colIndex >= 0; colIndex--) {
        const heightsInCol = input
          .filter((gridItem) => gridItem.col === colIndex)
          .map((val) => val.height)
          .slice()
          .reverse();
        for (let rowIndex = 0; rowIndex < heightsInCol.length; rowIndex++) {
          const height = heightsInCol[rowIndex];
          const reversedRowIndex = getMaxRow(input) - rowIndex;
          const isVisible = getIsVisible(heightsInCol, height, rowIndex);
          const visScore = getVisibilityScore(heightsInCol, height, rowIndex)
          if (isVisible) {
            updatedInput = updateIsVisible(
              updatedInput,
              reversedRowIndex,
              colIndex,
              visScore
            );
          } else {
            updatedInput = updateVisScore(
              updatedInput,
              reversedRowIndex,
              colIndex,
              visScore
            ); 
          }
        }
      }
      return updatedInput;
    } else {
      alert(`invalid parameter: ${order}`);
    }
  };

  //review right and change to false any items that are not visible
  //review left and change to false any items that are not visible
  const checkRow = (input, order) => {
    let updatedInput = [...input];

    if (order === "leftToRight") {
      for (let rowIndex = 0; rowIndex <= getMaxRow(input); rowIndex++) {
        const heightsInRow = input
          .filter((gridItem) => gridItem.row === rowIndex)
          .map((val) => val.height);
        for (let colIndex = 0; colIndex < heightsInRow.length; colIndex++) {
          const height = heightsInRow[colIndex];
          const isVisible = getIsVisible(heightsInRow, height, colIndex);
          const visScore = getVisibilityScore(heightsInRow, height, colIndex)

          if (isVisible) {
            updatedInput = updateIsVisible(updatedInput, rowIndex, colIndex, visScore);
          } else {
            updatedInput = updateVisScore(updatedInput, rowIndex, colIndex, visScore);
          }
        }
      }
      return updatedInput;
    } else if (order === "rightToLeft") {
      for (let rowIndex = getMaxRow(input); rowIndex >= 0; rowIndex--) {
        const heightsInRow = input
          .filter((gridItem) => gridItem.row === rowIndex)
          .map((val) => val.height)
          .slice()
          .reverse();
        for (let colIndex = 0; colIndex < heightsInRow.length; colIndex++) {
          const height = heightsInRow[colIndex];
          const reversedColIndex = getMaxCol(input) - colIndex;
          const isVisible = getIsVisible(heightsInRow, height, colIndex);
          const visScore = getVisibilityScore(heightsInRow, height, colIndex)

          if (isVisible) {
            updatedInput = updateIsVisible(
              updatedInput,
              rowIndex,
              reversedColIndex,
              visScore
            );
          } else {
            updatedInput = updateVisScore(
              updatedInput,
              rowIndex,
              reversedColIndex,
              visScore
            );
          }
        }
      }
      return updatedInput;
    } else {
      alert(`invalid parameter: ${order}`);
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
