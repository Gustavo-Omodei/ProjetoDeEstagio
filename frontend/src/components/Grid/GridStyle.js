import styled from "styled-components";

export const Table = styled.table`
  width: 100%;
  max-width: 900px;
  background-color: #fff;
  border-collapse: collapse;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.05);
  border-radius: 8px;
  overflow: hidden;
`;

export const Thead = styled.thead`
  background-color: #2c73d2;
  color: white;
`;

export const Tbody = styled.tbody``;

export const Tr = styled.tr`
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  align-items: center;
  border-bottom: 1px solid #ddd;
  padding: 10px 0;
`;

export const Th = styled.th`
  padding: 12px;
  text-align: left;
`;

export const Td = styled.td`
  padding: 12px;
  text-align: left;
  color: #333;
  display: flex;
  align-items: center;
  justify-content: start;
`;
