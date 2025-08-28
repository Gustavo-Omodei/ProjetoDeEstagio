import styled from "styled-components";

export const PageContainer = styled.div`
  width: 100%;
  max-width: 1200px;
  padding: 40px;
  display: flex;
  flex-direction: column;
  gap: 30px;
`;

export const Title = styled.h1`
  font-size: 32px;
  font-weight: bold;
`;

export const Content = styled.div`
  display: flex;
  gap: 60px;
  align-items: flex-start;
`;

export const LeftSide = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

export const UploadBox = styled.div`
  width: 380px;
  height: 320px;
  background-color: #fcf8f4;
  border-radius: 16px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 40px;
  color: #555;
`;

export const Thumbnails = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

export const Thumbnail = styled.div`
  width: 60px;
  height: 60px;
  border: 2px dashed #ccc;
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
  outline: none;

  &:focus {
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
  width: 200px;
  padding: 12px;
  background-color: #ab8d69;
  color: #fff;
  font-weight: 600;
  border: none;
  border-radius: 12px;
  cursor: pointer;
  font-size: 16px;
  margin-top: 10px;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #8e7554;
  }
`;
