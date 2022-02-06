import React, { useEffect, useCallback, useState } from 'react';
import { Table } from 'react-bootstrap';

import useModal from '../shared/hooks/useModal.hook';
import { useDeleteParticipant } from '../shared/api/hooks';
import Loading from '../displayComponents/loading/loading';

import ParticipantItem from './participantListItem';
import DeleteParticipant from './deleteParticipant';
import { useFetchParticipants } from './api/hooks';
import { ParticipantType } from './types';
import './participants.scss';

const AllParticipants = (): JSX.Element => {
  const { Modal, showModal } = useModal();

  const [participants, setParticipants] = useState<ParticipantType[]>();

  const { call: fetchParticipants, isLoading: isFetchParticipantsLoading } =
    useFetchParticipants();
  const { call: deleteParticipant, isLoading: isDeleteParticipantLoading } =
    useDeleteParticipant();

  const fetchParticipantsData = useCallback(async () => {
    const users = await fetchParticipants({});
    setParticipants(users);
  }, [fetchParticipants]);

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

  return (
    <>
      <div className="container">
        <div className="participants-list">
          <Loading isLoading={isLoading} />
          <div className="participants-list-title">
            <h3>All Users</h3>
          </div>
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

export default AllParticipants;