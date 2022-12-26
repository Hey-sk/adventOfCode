import { useEffect, useState } from "react";
import "./challenge2.css";

export default function Challenge2() {
  const [strategyGuide, setStrategyGuide] = useState([]);
  const [totalScore, setTotalScore] = useState("");
  const [newTotals, setNewTotals] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const inputArray = e.target.rpsInput.value.split("\n");

    setStrategyGuide(
      inputArray.map((str) => {
        const decode = (letter) => {
          switch (letter) {
            case "A":
            case "X":
              return "Rock";
            case "B":
            case "Y":
              return "Paper";
            case "C":
            case "Z":
              return "Scissors";
          }
        };

        const responseAction = (letter) => {
          switch (letter) {
            case "X":
              return "lose";
            case "Y":
              return "tie";
            case "Z":
              return "win";
          }
        };

        const getModifier = (code) => {
          if (code === "X") {
            return 1;
          } else if (code === "Y") {
            return 2;
          } else {
            return 3;
          }
        };

        const youWin = ["A Y", "B Z", "C X", "A B", "B C", "C A"];
        const youTie = ["A X", "B Y", "C Z", "A A", "B B", "C C"];

        const scoreHand = (heHas, youHave) => {
          if (youWin.includes(`${heHas} ${youHave}`)) {
            return 6;
          } else if (youTie.includes(`${heHas} ${youHave}`)) {
            return 3;
          } else {
            return 0;
          }
        };

        const youShouldChoose = (opponentsHand, code) => {
          if (code === "X") {
            // you should lose
            switch (opponentsHand) {
              case "A":
                return { hand: "C", modifier: 3 };
              case "B":
                return { hand: "A", modifier: 1 };
              default:
                return { hand: "B", modifier: 2 };
            }
          } else if (code === "Y") {
            //you should tie
            switch (opponentsHand) {
              case "A":
                return { hand: "A", modifier: 1 };
              case "B":
                return { hand: "B", modifier: 2 };
              default:
                return { hand: "C", modifier: 3 };
            }
          } else {
            //you should win
            switch (opponentsHand) {
              case "A":
                return { hand: "B", modifier: 2 };
              case "B":
                return { hand: "C", modifier: 3 };
              default:
                return { hand: "A", modifier: 1 };
            }
          }
        };

        return {
          opponentHand: decode(str[0]),
          yourHand: decode(str[2]),
          modifier: getModifier(str[2]),
          score: scoreHand(str[0], str[2]),
          neededAction: responseAction(str[2]),
          yourNewHand: decode(youShouldChoose(str[0], str[2]).hand),
          yourNewModifier: youShouldChoose(str[0], str[2]).modifier,
          yourNewScore: scoreHand(str[0], youShouldChoose(str[0], str[2]).hand),
        };
      })
    );
  };

  const calcTotalScore = () => {
    const scores =
      strategyGuide.length > 0 &&
      strategyGuide.map((obj) => {
        return obj.score + obj.modifier;
      });
    setTotalScore(
      scores.length > 0 &&
        scores.reduce((acc, val) => {
          return acc + val;
        })
    );
  };

  const calcTotalScoreNew = () => {
    const scores =
      strategyGuide.length > 0 &&
      strategyGuide.map((obj) => {
        return obj.yourNewScore + obj.yourNewModifier;
      });
    setNewTotals(
      scores.length > 0 &&
        scores.reduce((acc, val) => {
          return acc + val;
        })
    );
  };

  useEffect(() => {
    console.table(strategyGuide);
    calcTotalScore();
    calcTotalScoreNew();
  }, [strategyGuide]);

  return (
    <>
      <div className="challenge2">
        <div className="input">
          <h2>Day2 Challenge:</h2>
          <form onSubmit={handleSubmit} className="inputForm">
            <label htmlFor="rpsInput">
              Rock Paper Scissors Strategy Guide:
            </label>
            <textarea className="rpsInput" id="rpsInput" name="rpsInput" />
            <button type="submit">Calculate</button>
          </form>
        </div>
        <div className="output">
          <h2>{`total score is: ${totalScore}`}</h2>
          <h3>{`...but the score should have been ${newTotals}`}</h3>
        </div>
      </div>
    </>
  );
}
