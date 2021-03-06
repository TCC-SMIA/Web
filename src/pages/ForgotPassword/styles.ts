import styled from 'styled-components';

import bgSignIn from '../../assets/bg-forgotpassword.jpg';

export const Container = styled.div`
  overflow-x: scroll;
  display: flex;
  min-height: 100vh;
  height: 100%;

  ::-webkit-scrollbar {
    display: none;
  }
`;

export const ImageContainer = styled.div`
  display: flex;
  flex: 1;
  align-items: center;
  justify-content: center;
  background: url(${bgSignIn}) no-repeat center;
  background-size: cover;

  @media (max-width: 450px) {
    display: none;
  }
`;

export const FormContainer = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  height: 100%;
  align-items: center;
  justify-content: center;
  width: 100%;
  max-width: 700px;
  background: var(--color-smia);
  text-align: center;

  > div {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin-bottom: 30px;

    > p {
      margin-top: 8px;
      font-weight: bold;
      font-size: 2.2rem;
      color: var(--color-white);
    }
  }
  form {
    display: flex;
    flex-direction: column;
    align-items: center;

    @media (max-width: 450px) {
      div {
        width: 300px;
        input {
          width: 280px;
        }
      }
    }
  }
`;

export const BackToLogonContainer = styled.div`
  margin: 16px 0;
  padding: 16px;

  a {
    font-size: 1rem;
    text-decoration: none;
    color: var(--color-bg-button);

    display: flex;
    align-items: center;

    svg {
      margin-right: 16px;
    }
  }
`;

export const LogoImage = styled.img`
  width: 300px;
  height: 300px;

  @media (max-width: 450px) {
    width: 140px;
    height: 140px;
  }
`;
