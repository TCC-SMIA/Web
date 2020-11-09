import React, { useCallback, useState } from 'react';
import { IoMdPin } from 'react-icons/io';
import { FiSend } from 'react-icons/fi';
import { Link, useNavigate } from 'react-router-dom';

import {
  Container,
  Header,
  AvatarContainer,
  Description,
  Options,
  AddComentContainer,
} from './styles';
import IComplaint from '../../entities/Complaint';
import { RANDOM_AVATAR } from '../../utils/constants';
import api from '../../services/api';
import { useAuth } from '../../hooks/useAuth';
import { ButtonSend } from '../../pages/Messages/styles';

interface ICreateCommentRequestParams {
  complaint_id: string;
  content: string;
}

interface ICreateChatRequestParams {
  contact_id: string;
}
interface ICardProps {
  complaint: IComplaint;
}

const Card: React.FC<ICardProps> = ({ complaint }) => {
  const [inputMessage, setInputMessage] = useState('');
  const navigate = useNavigate();
  const { user } = useAuth();

  const handleCreateChatWithReporter = useCallback(
    (user_id) => {
      api.post('/chats', {
        contact_id: user_id,
      } as ICreateChatRequestParams);

      navigate('/messages');
    },
    [navigate],
  );

  const handleCreateComment = useCallback(
    (event) => {
      event.preventDefault();

      if (!inputMessage) return;

      api
        .post('/comments', {
          complaint_id: complaint.id,
          content: inputMessage,
        } as ICreateCommentRequestParams)
        .then(() => {
          setInputMessage('');
        });
    },
    [complaint.id, inputMessage],
  );

  return (
    <Container>
      <Header>
        <AvatarContainer>
          {complaint.anonymous && (
            <>
              <img src={RANDOM_AVATAR} alt="avatar" />
              <p>Anônimo</p>
            </>
          )}
          {!complaint.anonymous && (
            <>
              <img
                src={complaint.user.avatar_url || RANDOM_AVATAR}
                alt="avatar"
              />
              <p>{complaint.user.name}</p>
            </>
          )}
        </AvatarContainer>
        <Link
          to={{
            pathname: `/complaint/${complaint.id}`,
          }}
        >
          <IoMdPin />
        </Link>
      </Header>
      <Description>
        <p>{complaint.description}</p>
      </Description>
      <img
        src={
          complaint.image_url ||
          'https://images.unsplash.com/photo-1502472584811-0a2f2feb8968?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=750&q=80'
        }
        alt="default"
      />

      <Options>
        <button
          type="button"
          onClick={() => handleCreateChatWithReporter(complaint.user.id)}
        >
          Chamar relator
        </button>

        <button
          type="button"
          onClick={() => navigate(`/complaint/${complaint.id}`)}
        >
          Comentários
        </button>
      </Options>
      <AddComentContainer>
        <AvatarContainer>
          <img src={user.avatar_url || RANDOM_AVATAR} alt="avatar" />
        </AvatarContainer>
        <form onSubmit={(event) => handleCreateComment(event)}>
          <input
            type="text"
            placeholder="Adicionar um comentário"
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
          />
          <ButtonSend type="submit">
            <FiSend color="white" size={20} />
          </ButtonSend>
        </form>
      </AddComentContainer>
    </Container>
  );
};

export default Card;
