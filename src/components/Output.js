import "./output.css";

export default function Output({solution, part2Solution}) {
  return (
    <>
      <div className="outputComponent">
        <div>The answer is</div>
        <div className="outputSolution">{solution ? solution : '[ answer]'}</div>
        <div>The answer to part II is</div>
        <div className="outputSolution">{part2Solution ? part2Solution : '[ answer ]'}</div>
      </div>
    </>
  );
}
