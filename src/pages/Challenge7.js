import { useState } from "react";
import Input from "../components/Input";
import Output from "../components/Output";
import defaultInputs from "../components/Day7inputs";

export default function Challenge7() {
  const [sol1, setSol1] = useState("");

  const maxSize = 100000;
  const handleSubmit = (event) => {
    event.preventDefault();
    const input = parseInput(event.target.textInput.value);
    directories = getCurrentDir(input);
    const updatedDirectories = getChildren(directories);
    // const updatedDirectories2 = getChildren2(directories);
    const completedDirectories = getChildFileSizes(updatedDirectories);

    console.log(getSolution1(completedDirectories));
    console.log(getSolution2(completedDirectories));
  };

  //parse the input
  const parseInput = (input) => {
    input = input
      .split("$ ")
      .filter((str) => str !== "")
      .map((str) => str.split("\n"))
      .map((line) => line.filter((str) => str !== ""))
      .map((line) => line.filter((item) => item !== "ls"));
    return input;
  };

  let currentDir = ["/"];
  let directories = [];

  //identify the current directory path.
  const getCurrentDir = (input) => {
    console.log("starting getCurrentDir");
    input.forEach((line) => {
      const [cmd, arg] = line[0].split(" ");
      if (cmd === "cd") {
        if (arg === "/") {
          currentDir = currentDir.slice();
        }
        if (arg === "..") {
          currentDir = currentDir.slice(0, currentDir.length - 1);
        }
        if (arg !== "/" && arg !== "..") {
          currentDir = currentDir.concat(arg);
        }
      } else {
        //update the directories with key value details
        directories.push({
          dirName: currentDir[currentDir.length - 1],
          dir: currentDir,
          dirContents: [],
          children: [],
          fileSize: 0,
          childrenFileSize: [],
          allSizesAreValid: true,
        });
        line.forEach((lsResult) => {
          const [prefix, suffix] = lsResult.split(" ");
          //update key values for dirContents
          if (prefix === "dir") {
            directories = directories.map((prev) => {
              if (prev.dir === currentDir) {
                return { ...prev, dirContents: [...prev.dirContents, suffix] };
              } else {
                return prev;
              }
            });
            //update key values for fileSize
          } else {
            directories = directories.map((prev) => {
              if (prev.dir === currentDir) {
                return {
                  ...prev,
                  fileSize: Number(prev.fileSize) + Number(prefix),
                };
              } else {
                return prev;
              }
            });
          }
        });
      }
    });
    console.log({ getCurrentDirResults: directories });
    return directories;
  };

  //update the input with an array of children-indices
  const getChildren = (input) => {
    console.log("starting getChildren");
    // for (const dirIndex in input) {
    input.forEach((thisInput, dirIndex) => {
      const thisDir = input[dirIndex];
      const thisDirStr = thisInput.dir.toString();
      let children = [];
      input.forEach((altDir, altIndex) => {
        const altDirStr = altDir.dir.toString();
        if (altDirStr.includes(thisDirStr)) {
          children.push(altIndex);
        }
        input = input.map((prev) => {
          if (prev === thisInput) {
            return { ...prev, children: children };
          } else {
            return prev;
          }
        });
      });
      // }
    });
    console.log({ input });
    return input;
  };

  //update fileSizes of all dirs using indices set in getChildren() and check to see if the sizes are valid.
  const getChildFileSizes = (input) => {
    console.log("getting ChildFileSizes -- new version");
    input.forEach((inputVal) => {
      const childFileSizes = inputVal.children.map(numVal => input[numVal].fileSize).reduce((acc, val) => acc + val, 0)
      const isValid = childFileSizes <= maxSize
      console.log({thisDir: inputVal.dirName, children: inputVal.children, childFileSizes, isValid})
      input = input.map(prev => {
        if (prev === inputVal) {
          return {...prev, childrenFileSize: childFileSizes, allSizesAreValid: isValid}
        } else {
          return prev
        }
      })
    })
    console.log({
      getChildFileSizesResult: input.map((val) => {
        return {
          dir: val.dir,
          children: val.children,
          fileSize: val.fileSize,
          childrenFileSize: val.childrenFileSize,
        };
      }),
    });
    return input;
  };

  //filter for anything over the max size and reduce to get the solution.
  const getSolution1 = (input) => {
    console.log("starting getSolution1");
    const validDirs = input.filter(
      (dirObj) => dirObj.allSizesAreValid === true
    );
    const validSizes = validDirs.map(dir => dir.childrenFileSize)
    return validSizes.reduce((acc, val) => acc + val, 0);
  };

  const getSolution2 = (input) => {
    console.log('starting getSolution2')
    const diskSpace = 70000000
    const sizeReqdForUpdate = 30000000
    const sizeOfRoot = input[0].childrenFileSize
    const unusedSpace = diskSpace - sizeOfRoot
    const spaceNeeded = sizeReqdForUpdate - unusedSpace
    const validDirectories = input.filter(inputVal => inputVal.childrenFileSize >= spaceNeeded)
    const validSizes = validDirectories.map(dir => dir.childrenFileSize)
    const solution = validSizes.reduce((acc, val) => val > acc ? acc : val)
    return solution
  }

  return (
    <div className="main-wrapper">
      <Input
        title="day7"
        heading="No Space Left on Device"
        handleSubmit={handleSubmit}
        defaultInputs={defaultInputs}
      />
      <Output
        solution={sol1}
        part2Solution=""
        // clickSolution1={}
        // clickSolution2={}
      />
    </div>
  );
}
