import styled from 'styled-components';

export const Container = styled.div`
  width: 100%;
  height: 80px;
  background: var(--color-smia);
  display: flex;
`;

export const LogoImage = styled.img`
  width: 80px;
  height: 80px;
  margin-left: 20px;
`;

export const Botoes = styled.div`
  display: flex;
  flex: 1;
  justify-content: flex-end;
  position: relative;
`;

export const Botao = styled.button`
  justify-content: space-evenly;
  align-items: center;
  display: flex;
  margin: 30px;
  background: none;
  border: none;
`;

export const Title = styled.p`
  color: var(--color-title-header);
  font-size: 16px;

  font-weight: bold;

  :hover {
    color: var(--color-hover-tooltip);
  }
`;

export const ProfileArea = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;

  &:hover {
    > strong {
      color: var(--color-title-green);
    }
  }

  div {
    margin-left: 10px;

    strong {
      font-size: 16px;
      display: block;
      color: ${(props) => props.theme.colors.headerText};
    }

    > p {
      display: block;
      font-size: 10px;
      margin-top: 2px;
      color: var(--color-white);
    }
  }

  img {
    margin-left: 12px;
  }
`;
