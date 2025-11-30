function Grid({ children }) {
  return (
    <div
      style={{
        display: "flex",
        gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
        gap: "20px",
        marginTop: "20px",
      }}
    >
      {children}
    </div>
  );
}
export default Grid;
