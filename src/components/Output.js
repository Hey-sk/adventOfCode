import "./output.css";

export default function Output({solution, part2Solution, clickSolution1, clickSolution2}) {
  return (
    <>
      <div className="outputComponent">
        <div className="outputHeading">Part 1:</div>
        <div className="outputSolution">{solution ? solution : ' '}</div>
        <button onClick={clickSolution1}>SOLVE</button>
        
        <div className="outputHeading">Part 2:</div>
        <div className="outputSolution">{part2Solution ? part2Solution : ' '}</div>
        <button onClick={clickSolution2}>SOLVE</button>
      </div>
    </>
  );
}
