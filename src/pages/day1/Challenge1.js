import "./challenge1.css";
import { useEffect, useState } from "react";

export default function Challenge1() {
  const [calorieInput, setCalorieInput] = useState([]);
  const [solution1, setSolution1] = useState({});
  const [solution2, setSolution2] = useState([]);

  const handleSubmit = (event) => {
    event.preventDefault();
    const input = event.target.calories.value.split("\n");
    const inputArray = input.map((num) => {
      return parseInt(num);
    });
    setCalorieInput(inputArray);
    
  };

  useEffect(()=>{
    findTheElfWithTheMostCalories();
  },[calorieInput])

  const findTheElfWithTheMostCalories = () => {
    let result = [];
    let acc = 0;
    for (let i = 0; i <= calorieInput.length; i++) {
      if (isNaN(calorieInput[i])) {
        result.push(acc);
        acc = 0;
      } else {
        acc = acc + calorieInput[i];
      }
    }
    
    const elfObj = result.map((num, index) => {
      return {
        elf: index + 1,
        calories: num,
      };
    });

    const solution = elfObj.reduce((acc, val) => {
      return acc.calories > val.calories ? acc : val;
    });
    setSolution1(solution);
    setSolution2([...result].sort((a, z) => z > a).slice(0, 3));

  };

  return (
    <>
      <div className="challenge1">
        <form className="challenge1-input" onSubmit={handleSubmit}>
          <h2> Challenge One:</h2>
          <div className="challenge1FormWrapper">
            <label htmlFor="calories">Enter Elf Calorie Input:</label>
            <textarea
              className="elfCaloriesInput"
              id="calories"
              name="calories"
            />
          </div>
          <button type="submit">Calculate</button>
        </form>
        <div className="challenge1-output">
          <h2>The Elf with the most Calories Packed:</h2>
          {solution1.calories > 0 && (
            <>
              <div>{`elf: ${solution1.elf}`}</div>
              <div>{`calories: ${solution1.calories}`}</div>
            </>
          )}
          {solution2.length > 0 && (
            <h2>
              The Top 3 Elves are carrying a total of{" "}
              {solution2.reduce((acc, val) => {
                return acc + val;
              })}{" "}
              calories
            </h2>
          )}
        </div>
      </div>
    </>
  );
}
