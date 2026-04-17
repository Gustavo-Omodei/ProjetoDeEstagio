function Grid({ children }) {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(4, minmax(250px, 500px))",
        gap: "20px",
        marginTop: "20px",
      }}
    >
      {children}
    </div>
  );
}
export default Grid;
