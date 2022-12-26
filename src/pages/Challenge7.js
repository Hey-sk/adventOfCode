import { useState } from 'react'
import Input from "../components/Input";
import Output from "../components/Output";

export default function Challenge7() {
  const [sol1, setSol1] = useState('')

  const maxSize = 100000
  const handleSubmit = (event) => {
    event.preventDefault();
    const input = parseInput(event.target.textInput.value);
    directories = getCurrentDir(input);
    const updatedDirectories = getChildren(directories);
    const completedDirectories = getChildFileSizes(updatedDirectories);
    console.log(getSolution1(completedDirectories))
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

  const getCurrentDir = (input) => {
    //identify the current directory path.
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
          allSizesAreValid: true
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
    return directories;
  };

  const getChildren = (input) => {
    input.forEach((dirObj) => {
      const thisDir = dirObj.dirName;
      const children = [];
      input.forEach((dirObj) => {
        if (dirObj.dir.includes(thisDir)) {
          const fullPath = dirObj.dir;
          const indexOfThisDir = fullPath.indexOf(thisDir);
          const path = dirObj.dir.slice(indexOfThisDir, dirObj.dir.length);
          path.forEach((dirName) => {
            !children.includes(dirName) && children.push(dirName);
          });
          input = input.map((prev) => {
            if (prev.dir === dirObj.dir) {
              return { ...prev, children: children };
            } else {
              return prev;
            }
          });
        }
      });
    });
    console.log({
      result: input.map((dir) => {
        return { dirName: dir.dirName, children: dir.children, childrenFileSize: dir.childrenFileSize};
      }),
    });

    return input;
  };

  const getChildFileSizes = (input) => {
    console.log('getting ChildFileSizes')
    input.forEach(dirObj => {
      console.log(`updating ${dirObj.dirName}`)
      const thisDir = dirObj.dirName
      const fileSizesForChildren = dirObj.children.map(dirName => input.filter(dirObj => dirObj.dirName === dirName).map(dirObj => dirObj.fileSize)).flat()
      const allSizesAreValid = fileSizesForChildren.map(size => size <= maxSize).every(val => val === true)
      console.log({thisDir, fileSizesForChildren, allSizesAreValid})
      input = input.map(prev => {
        if (prev.dirName === thisDir) {
          return {...prev, childrenFileSize: [...prev.childrenFileSize, ...fileSizesForChildren], allSizesAreValid: allSizesAreValid}
        } else {
          return prev
        }
      })
    })
    return input
  }

  const getSolution1 = (input) => {
    const validDirs = input.filter(dirObj => dirObj.allSizesAreValid === true)
    const validSizes = validDirs.map(dirObj => dirObj.childrenFileSize.reduce((acc, val) => acc + val, 0))
    const result = validSizes.reduce((acc, val) => acc + val, 0)
    console.log({validDirs, result})
    return result 
  }

  return (
    <div className="main-wrapper">
      <Input
        title="day7"
        heading="No Space Left on Device"
        handleSubmit={handleSubmit}
        defaultInput={`$ cd /\n$ ls\ndir a\n14848514 b.txt\n8504156 c.dat\ndir d\n$ cd a\n$ ls\ndir e\n29116 f\n2557 g\n62596 h.lst\n$ cd e\n$ ls\n584 i\n$ cd ..\n$ cd ..\n$ cd d\n$ ls\n4060174 j\n8033020 d.log\n5626152 d.ext\n7214296 k`}
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
