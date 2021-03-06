import styled, { css } from 'styled-components';

interface NotificationProps {
  isVisible: boolean;
}

export const Container = styled.div<NotificationProps>`
  position: absolute;
  overflow-y: scroll;
  width: 300px;
  height: 360px;
  top: calc(100px + 0px);
  background: var(--color-white);
  border-radius: 0px 0px 8px 8px;
  border: 2px solid var(--color-smia);
  opacity: 0;
  visibility: hidden;
  z-index: 10;

  box-shadow: 5px 7px 5px rgb(61, 61, 61, 0.5);

  ${(props) =>
    props.isVisible &&
    css`
      display: block;
      opacity: 1;
      visibility: visible;
    `}

  > div {
    padding: 12px 0;
  }
  h1 {
    font-size: 1.5rem;
    color: var(--color-notification);
  }
`;

export const NotificationItem = styled.div`
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  border-bottom: 1px solid var(--color-icons);
  padding: 6px 12px;

  p {
    color: var(--color-notification);
  }
`;

export const EmptyContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;

  h2 {
    color: var(--color-smia);
  }

  img {
    margin-top: 8px;
    max-height: 180px;
  }
`;

export const ReadButton = styled.div``;

export const NotificationButton = styled.div<{ hasNotification: number }>`
  display: flex;
  flex-direction: column;
  align-items: center;

  span {
    display: ${(props) => (props.hasNotification ? 'flex' : 'none')};
    align-items: center;
    justify-content: center;
    font-size: 14px;
    font-weight: bold;
    color: #fff;
    padding: 6px;
    margin-top: -10px;

    position: absolute;
    margin-left: 12px;
    width: 24px;
    height: 24px;
    background: #ff882e;
    content: '';
    border-radius: 50%;
  }
`;

export const Title = styled.p`
  color: var(--color-title-header);
  font-size: 12px;

  font-weight: bold;
`;
