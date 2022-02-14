import React, { useCallback } from 'react';
import { Button } from 'react-bootstrap';
import { useNavigate, useLocation, useParams } from 'react-router-dom';

import { useAppSelector } from '../../store/hooks';
import { userDataSelector } from '../../store/user/selectors';
import {
  useCreateParticipant,
  useDeleteParticipant,
} from '../../shared/api/hooks';
import routes from '../../routes';
import FaIcon from '../faIcon/faIcon';

type ParticipantButtonType = {
  isOwner: boolean;
  isGoing: boolean;
  fetchEventData: () => void;
};

const ParticipationButton = ({
  isOwner,
  isGoing,
  fetchEventData,
}: ParticipantButtonType): JSX.Element | null => {
  const navigate = useNavigate();
  const location = useLocation();
  const { eventId } = useParams();
  const { id: userId } = useAppSelector(userDataSelector);

  const { call: createParticipant, isLoading: isCreateParticipantLoading } =
    useCreateParticipant();
  const { call: deleteParticipant, isLoading: isDeleteParticipantLoading } =
    useDeleteParticipant();

  const onGoing = useCallback(async () => {
    if (!userId) {
      navigate(routes.LOGIN.PATH, {
        state: { from: location },
        replace: true,
      });
    } else {
      await createParticipant({
        userId,
        eventId,
      });
      fetchEventData();
    }
  }, [navigate, createParticipant, fetchEventData, location, userId, eventId]);

  const onNotGoing = useCallback(async () => {
    await deleteParticipant({
      userId,
      eventId,
    });
    fetchEventData();
  }, [deleteParticipant, fetchEventData, userId, eventId]);

  if (isOwner) {
    return null;
  }

  const isLoading = isCreateParticipantLoading || isDeleteParticipantLoading;

  return (
    <>
      {isGoing ? (
        <Button onClick={onNotGoing} variant="danger" disabled={isLoading}>
          <FaIcon icon="minus-circle" size={14} />
          not Going
        </Button>
      ) : (
        <Button onClick={onGoing} variant="success" disabled={isLoading}>
          <FaIcon icon="check-circle" size={14} />
          Going
        </Button>
      )}
    </>
  );
};

export default ParticipationButton;
