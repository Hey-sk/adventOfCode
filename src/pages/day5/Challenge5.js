import initalZones from "../../components/initialZones.json";
import "./challenge5.css";
import { useEffect, useState } from "react";
import Input from "../../components/Input";
import Output from "../../components/Output";

export default function Challenge5() {
  const [supplyZones, setSupplyZones] = useState([]);
  const [instructions, setInstructions] = useState([]);

  useEffect(() => {
    setSupplyZones(initalZones.data);
  }, []);

  // get the pickedCrate
  const getTargetCrate = (fromZone) => {
    const targetCrate =
      supplyZones[fromZone - 1].contents[
        supplyZones[fromZone - 1].contents.length - 1
      ];
    console.log("target is " + targetCrate);
    return targetCrate;
  };

  // remove the pickedCrate
  const setPullFromContents = (fromZone) => {
    const oldZone = supplyZones[fromZone - 1].contents;
    const newZone = oldZone.slice(0, oldZone.length - 1);
    return newZone;
  };
  // add the picked Crate
  const setAddToContents = (fromZone, toZone) => {
    const oldZone = supplyZones[toZone - 1].contents;
    const newZone = [...oldZone, getTargetCrate(fromZone)];
    return newZone;
  };

  // update the SupplyZones
  const updateSupplyZones = (fromZone, toZone) => {
    // console.log(JSON.stringify(supplyZones.map(zone => zone.contents)))
    setSupplyZones(
      supplyZones.map((prev) => {
        if (prev.stackID === fromZone) {
          return { ...prev, contents: setPullFromContents(fromZone) };
        } else if (prev.stackID === toZone) {
          return { ...prev, contents: setAddToContents(fromZone, toZone) };
        } else {
          return prev;
        }
      })
    );
    return (supplyZones)
  };



  useEffect(() => {
    // supplyZones.length && getTargetCrate(1)
    // supplyZones.length && console.log(setPullFromContents(1))
    // supplyZones.length && console.log(setAddToContents(1, 9))
    supplyZones.length && updateSupplyZones(1, 9);
    console.log(JSON.stringify(supplyZones.map(zone => zone.contents),null))

  }, [instructions]);

  

  const stackDisplay =
    supplyZones.length &&
    
    supplyZones.map((obj) => {
      const contentsCopy = obj.contents;
      return (
        <div className="stack">
          <div className="stackArrangement">
            {contentsCopy.map((box) => {
              return (
                <span className="stackContents">
                  <span className="singleBox">{box}</span>
                </span>
              );
            })}
          </div>
          <div>{obj.stackID}</div>
        </div>
      );
    });

  const handleSubmit = (event) => {
    event.preventDefault();
    const input = event.target.textInput.value.split("\n");
    setInstructions(parseInput(input));
  };

  // remove anything that can't be converted to a number, and convert the remaining values to numbers.
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

  return (
    <div className="main-wrapper">
      <div className="stackChart">{stackDisplay}</div>
      <Input
        title="day5"
        heading="suppy stacks"
        handleSubmit={handleSubmit}
        defaultInput="move 3 from 1 to 9"
      />
      <Output solution="" part2Solution="" />
    </div>
  );
}
