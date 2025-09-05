import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 100vh;
`;

export const Title = styled.h2`
  margin-top: 20px;
  align-self: "flex-start";
  margin-top: "10%";
  font-size: 48px;
  font-weight: bold;
  margin-bottom: 20px;
  color: #333;
`;

export const ToastContainer = styled.div`
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
`;

export const IconButton = styled.div`
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;

  svg {
    transition: transform 0.2s;
  }

  &:hover svg {
    transform: scale(1.2);
  }
`;

export const PageContainer = styled.div`
  min-height: 100vh;
  width: 100%;
  max-width: 1500px;
  padding: 40px;
  display: flex;
  flex-direction: column;
  gap: 30px;
  margin: 0 auto;
`;

export const Content = styled.div`
  display: flex;
  gap: 60px;
  align-items: center;
`;

export const LeftSide = styled.div`
  display: flex;
  gap: 20px;
`;

export const UploadBox = styled.div`
  width: 600px;
  height: 600px;
  background-color: #fcf7f2;
  border-radius: 16px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 40px;
  color: #555;
  overflow: "hidden";
`;

export const Thumbnails = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 10px;
`;

export const Thumbnail = styled.div`
  width: 80px;
  height: 120px;
  border: 2px dashed #b3b3b3;
  border-radius: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 24px;
  color: #888;
  cursor: pointer;
`;

export const RightSide = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

export const Label = styled.label`
  font-weight: 500;
  font-size: 14px;
  margin-bottom: 6px;
  display: block;
`;

export const Input = styled.input`
  width: 100%;
  height: 42px;
  padding: 0 12px;
  border: 1px solid #ddd;
  border-radius: 12px;
  background-color: #fff;
  font-size: 14px;
  outline: none;

  &:focus {
    border-color: #ab8d69;
    box-shadow: 0 0 4px rgba(171, 141, 105, 0.4);
  }
`;

export const Select = styled.select`
  width: 100%;
  height: 42px;
  padding: 0 12px;
  border: 1px solid #ddd;
  border-radius: 12px;
  background-color: #fff;
  font-size: 14px;
  cursor: pointer;
  outline: none;

  &:focus {
    outline: none;
    border-color: #ab8d69;
    box-shadow: 0 0 4px rgba(171, 141, 105, 0.4);
  }
`;

export const TextArea = styled.textarea`
  width: 100%;
  min-height: 100px;
  padding: 12px;
  border: 1px solid #ddd;
  border-radius: 12px;
  font-size: 14px;
  outline: none;
  resize: vertical;

  &:focus {
    border-color: #ab8d69;
    box-shadow: 0 0 4px rgba(171, 141, 105, 0.4);
  }
`;

export const ColorPicker = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

export const ColorCircle = styled.div`
  width: 28px;
  height: 28px;
  border-radius: 50%;
  background-color: ${(props) => props.color || "transparent"};
  border: ${(props) => (props.add ? "2px dashed #bbb" : "2px solid #ccc")};
  color: ${(props) => (props.add ? "#666" : "transparent")};
  font-weight: bold;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;

  ${(props) =>
    props.selected &&
    `
      border: 2px solid #ab8d69;
      box-shadow: 0 0 6px rgba(171, 141, 105, 0.6);
    `}
`;

export const Button = styled.button`
  align-self: center;
  height: 42px;
  width: 50%;
  padding: 0 20px;
  background-color: #ab8d69;
  color: white;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  font-weight: bold;
  transition: background-color 0.3s;

  &:hover {
    background-color: #8e7554;
  }
`;

export const FormContainer = styled.form`
  display: flex;
  flex-direction: column;
  background-color: #fff;
  padding: 20px;
  height: 100%;
  width: 100%;
  gap: 20px;
`;

export const InputArea = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

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
