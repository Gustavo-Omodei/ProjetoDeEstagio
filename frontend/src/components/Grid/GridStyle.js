import styled from "styled-components";

export const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
`;

export const Thead = styled.thead`
  background-color: #f5f5f5;
`;

export const Tbody = styled.tbody`
  tr:nth-child(even) {
    background-color: #fafafa;
  }
`;

export const Tr = styled.tr`
  border-bottom: 1px solid #ddd;
`;

export const Th = styled.th`
  padding: 12px;
  text-align: center; /* centraliza título */
  font-weight: bold;
`;

export const Td = styled.td`
  padding: 12px;
  text-align: center;
  vertical-align: middle;

  img {
    display: block;
    margin: 0 auto;
  }
`;
