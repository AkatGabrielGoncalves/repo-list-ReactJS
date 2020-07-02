import styled, { keyframes, css } from 'styled-components';

export const Container = styled.div`
  max-width: 70%;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.2);
  background: #fff;
  margin: 80px auto;
  border-radius: 5px;
  padding: 30px;

  h1 {
    display: flex;
    align-items: center;
    font-size: 40px;
    flex-direction: row;

    svg {
      margin-right: 10px;
    }
  }
`;

export const Form = styled.form`
  display: flex;
  flex-direction: row;
  margin-top: 30px;

  input {
    flex: 1;
    border: 1px solid #eee;
    padding: 10px 15px;
    border-radius: 4px;
    font-size: 16px;
  }
`;

const rotate = keyframes`
  from {
    transform: rotate(0deg)
  }
  to {
    transform: rotate(360deg);
  }
`;

export const SubmitButton = styled.button.attrs((props) => ({
  type: 'submit',
  disabled: props.loading,
}))`
  background: #23967f;
  border: 0;
  padding: 15px;
  border-radius: 5px;
  margin-left: 10px;

  display: flex;
  align-items: center;
  justify-content: center;

  &[disabled] {
    cursor: not-allowed;
    opacity: 0.6;
  }

  ${(props) =>
    props.loading &&
    css`
      svg {
        animation: ${rotate} 2s linear infinite;
      }
    `}
`;

export const List = styled.ul`
  list-style: none;
  margin-top: 30px;
  li {
    padding: 15px 0;
    margin-left: 15px;
    border-top: 1px solid #eee;
  }
  a {
    text-decoration: none;
  }
`;
