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
  width: 100%;
  max-width: 1500px;
  padding: 40px;
  display: flex;
  flex-direction: column;
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
  border: 1px solid #ddd;
`;

export const Thead = styled.thead`
  background-color: #f5f5f5;
  border-radius: 500px;
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

export const QtdWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
`;

export const LoginBackground = styled.div`
  width: 100vw;
  height: 100vh;
  background-image: url("/assets/loginBackground.png");
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const LoginCard = styled.div`
  width: 420px;
  background: #fff;
  padding: 40px;
  border-radius: 20px;
  box-shadow: 0px 15px 60px rgba(0, 0, 0, 0.25);
  display: flex;
  flex-direction: column;
  gap: 20px;
  text-align: center;
`;

export const LoginTitle = styled.h2`
  font-size: 28px;
  font-weight: bold;
  color: #222;
  margin-bottom: 10px;
`;

export const LoginInput = styled.input`
  width: 100%;
  padding: 12px;
  border-radius: 16px;
  border: 1px solid #ccc;
  font-size: 15px;
  outline: none;

  &:focus {
    border-color: #ab8d69;
    box-shadow: 0 0 4px rgba(171, 141, 105, 0.4);
  }
`;

export const LoginLabel = styled.label`
  text-align: left;
  font-weight: 500;
  font-size: 14px;
  margin-bottom: -10px;
`;

export const LoginButton = styled.button`
  width: 100%;
  padding: 14px;
  border-radius: 16px;
  background-color: #ab8d69;
  color: white;
  border: none;
  font-size: 1.1rem;
  cursor: pointer;
  margin-top: 10px;
  transition: 0.2s;

  &:hover {
    background-color: #8e7554;
  }
`;

export const SecondaryButton = styled.button`
  width: 100%;
  padding: 14px;
  border-radius: 16px;
  background: transparent;
  border: 2px solid #ab8d69;
  color: #ab8d69;
  font-size: 1.1rem;
  cursor: pointer;
  transition: 0.2s;

  &:hover {
    background-color: rgba(171, 141, 105, 0.1);
  }
`;

export const CartItem = styled.div`
  width: 90%;
  background: #fff;
  padding: 20px;
  border-radius: 16px;
  box-shadow: 0 4px 14px rgba(0, 0, 0, 0.08);
  margin-bottom: 20px;

  h3 {
    margin-bottom: 8px;
  }

  strong {
    margin-top: 10px;
    display: block;
    font-size: 16px;
  }
`;

export const CartControls = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  margin: 10px 0;

  button {
    width: 32px;
    height: 32px;
    border-radius: 8px;
    border: none;
    background: #ab8d69;
    color: #fff;
    font-size: 18px;
    cursor: pointer;

    &:hover {
      background: #8e7554;
    }
  }

  span {
    font-size: 18px;
    font-weight: bold;
    width: 30px;
    text-align: center;
  }
`;

export const CartButton = styled.button`
  padding: 10px 18px;
  border-radius: 12px;
  border: none;
  font-size: 15px;
  cursor: pointer;
  background: ${(props) => (props.remove ? "#d9534f" : "#ab8d69")};
  color: white;

  &:hover {
    background: ${(props) => (props.remove ? "#b64542" : "#8e7554")};
  }
`;
// ===== HERO SECTION =====

export const HeroSection = styled.section`
  width: 100%;
  max-width: 1500px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 80px 40px;
  background: #fcf7f2;
  border-radius: 20px;
  margin-top: 40px;
`;

export const Left = styled.div`
  display: flex;
  flex-direction: column;
  gap: 18px;
  max-width: 500px;
`;

export const Right = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const HeroImg = styled.img`
  width: 420px;
  height: auto;
  object-fit: contain;
`;

export const Desc = styled.p`
  font-size: 18px;
  color: #555;
`;

export const Price = styled.p`
  font-size: 26px;
  font-weight: bold;
  color: #ab8d69;
`;

export const OffersTitle = styled.h3`
  margin-top: 60px;
  font-size: 28px;
  font-weight: bold;
  color: #333;
  align-self: flex-start;
`;
export const Card = styled.div`
  position: relative;
  background: #fff;
  padding: 20px;
  border-radius: 16px;
  box-shadow: 0px 4px 14px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

export const CardImg = styled.img`
  width: 100%;
  height: 180px;
  object-fit: contain;
  border-radius: 10px;
`;

export const CardTitle = styled.h4`
  font-size: 16px;
  font-weight: bold;
  color: #333;
`;

export const CardValue = styled.p`
  font-size: 18px;
  font-weight: bold;
  color: #ab8d69;
`;

export const FavIcon = styled.div`
  position: absolute;
  top: 14px;
  right: 14px;
  cursor: pointer;

  svg {
    font-size: 20px;
  }
`;

export const Layout = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 40px;
  align-items: flex-start;
`;

export const ResumeBox = styled.div`
  background: #fff;
  padding: 24px;
  border-radius: 16px;
  box-shadow: 0 4px 14px rgba(0, 0, 0, 0.08);
  display: flex;
  flex-direction: column;
  gap: 18px;
`;

export const ResumeRow = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 16px;
`;

export const ResumeTotal = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 22px;
  font-weight: bold;
  margin-top: 10px;
`;

export const FreteBox = styled.div`
  display: flex;
  gap: 10px;
  margin-top: 10px;

  input {
    flex: 1;
    height: 42px;
    padding: 0 12px;
    border-radius: 10px;
    border: 1px solid #ccc;
  }
`;
