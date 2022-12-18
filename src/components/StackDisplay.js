import './stackdisplay.css'

export default function StackDisplay({supplyZones}) {
  const stackDisplay =
    supplyZones.length &&
    supplyZones.map((obj) => {
      const contentsCopy = obj.contents;
      return (
        <div className="stack" key={obj.stackID}>
          <div className="stackArrangement">
            {contentsCopy.map((box, index) => {
              return (
                <span className="stackContents" key={index}>
                  <span className="singleBox">{box}</span>
                </span>
              );
            })}
          </div>
          <div>{obj.stackID}</div>
        </div>
      );
    });
    return (
        <>
            <div className="stackChart">{stackDisplay}</div>
        </>
    )
}
