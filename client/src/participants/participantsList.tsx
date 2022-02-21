import React, { useEffect, useCallback, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Table } from 'react-bootstrap';

import useModal from '../shared/hooks/useModal.hook';
import { useDeleteParticipant } from '../shared/api/hooks';
import Loading from '../displayComponents/loading/loading';

import ParticipantItem from './participantListItem';
import DeleteParticipant from './deleteParticipant';
import { useFetchParticipants } from './api/hooks';
import { ParticipantType } from './types';
import styles from './participants.module.scss';

const Participants = (): JSX.Element => {
  const { eventId } = useParams();
  const { Modal, showModal } = useModal();

  const [participants, setParticipants] = useState<ParticipantType[]>();

  const { call: fetchParticipants, isLoading: isFetchParticipantsLoading } =
    useFetchParticipants();
  const { call: deleteParticipant, isLoading: isDeleteParticipantLoading } =
    useDeleteParticipant();

  const fetchParticipantsData = useCallback(async () => {
    const users = await fetchParticipants({ filters: { eventId } });
    setParticipants(users);
  }, [fetchParticipants, eventId]);

  useEffect(() => {
    fetchParticipantsData();
  }, [fetchParticipantsData]);

  const onParticipantRemove = useCallback(
    async (participantToDelete: ParticipantType) => {
      if (participantToDelete?.id) {
        await deleteParticipant({
          userId: participantToDelete.userId,
          eventId: participantToDelete.eventId,
        });
        fetchParticipantsData();
      }
    },
    [deleteParticipant, fetchParticipantsData],
  );

  const isLoading = isFetchParticipantsLoading || isDeleteParticipantLoading;

  const title =
    eventId && participants?.length
      ? `${participants[0].event.title} Participants`
      : 'All Participants';

  return (
    <>
      <div className="container" data-testid="all-participants">
        <div className={styles.participantsList}>
          <Loading isLoading={isLoading} />
          <div className={styles.participantsListTitle}>
            <h3>{title}</h3>
          </div>
          {participants?.length ? (
            <Table hover responsive>
              <thead>
                <tr>
                  <th>User</th>
                  <th>Email</th>
                  <th>First Name</th>
                  <th>Last Name</th>
                  <th>Event</th>
                  <th>Title</th>
                  <th>Event Date</th>
                  <th>Delete</th>
                </tr>
              </thead>
              <tbody>
                {participants?.map((participant) => (
                  <ParticipantItem
                    key={participant.id}
                    participant={participant}
                    onDeleteClick={showModal}
                  />
                ))}
              </tbody>
            </Table>
          ) : (
            <div>Sorry. There are no Participants.</div>
          )}
        </div>
      </div>
      <Modal
        title="Remove Participant"
        body={DeleteParticipant}
        confirmButtonDescription="Remove"
        onConfirm={onParticipantRemove}
      />
    </>
  );
};

export default Participants;
