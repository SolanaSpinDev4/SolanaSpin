import "./Loading.css"

export const Loading = () => {
  return (
    <div className="spinner">
      {Array.from(Array(36).keys()).map((_, i) => (<div className="light" key={i}></div>))}
    </div>
  );
};
