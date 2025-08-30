import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const Title = styled.h2`
  margin-top: 20px;
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
