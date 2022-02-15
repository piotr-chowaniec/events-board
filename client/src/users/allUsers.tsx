import React, { useEffect, useCallback, useState } from 'react';
import { Table } from 'react-bootstrap';

import { useAppSelector } from '../store/hooks';
import { userDataSelector } from '../store/user/selectors';
import { useUpdateUser, useDeleteUser } from '../shared/api/hooks';
import useModal from '../shared/hooks/useModal.hook';
import Loading from '../displayComponents/loading/loading';
import FormModal from '../displayComponents/modals/formModal';

import UserItem from './userListItem';
import DeleteUser from './deleteUser';
import EditUser from './editUser';
import { useFetchUsers } from './api/hooks';
import { UserType } from './types';
import styles from './users.module.scss';

const AllUsers = (): JSX.Element => {
  const { Modal: EditModal, showModal: showEditModal } = useModal({
    ModalComponent: FormModal,
  });
  const { Modal: DeleteModal, showModal: showDeleteModal } = useModal();

  const [users, setUsers] = useState<UserType[]>();

  const { id: currentUserId } = useAppSelector(userDataSelector);

  const { call: fetchUsers, isLoading: isFetchUsersLoading } = useFetchUsers();
  const { call: updateUser, isLoading: isUpdateProfileLoading } =
    useUpdateUser();
  const { call: deleteUser, isLoading: isDeleteProfileLoading } =
    useDeleteUser();

  const fetchUsersData = useCallback(async () => {
    const users = await fetchUsers({});
    setUsers(users);
  }, [fetchUsers]);

  useEffect(() => {
    fetchUsersData();
  }, [fetchUsersData]);

  const onUserUpdate = useCallback(
    async (userToUpdate: UserType) => {
      await updateUser({ ...userToUpdate, userId: userToUpdate.id });
      fetchUsersData();
    },
    [updateUser, fetchUsersData],
  );

  const onUserRemove = useCallback(
    async (userToDelete: UserType) => {
      if (userToDelete?.id) {
        await deleteUser({ userId: userToDelete.id });
        fetchUsersData();
      }
    },
    [deleteUser, fetchUsersData],
  );

  const isLoading =
    isFetchUsersLoading || isUpdateProfileLoading || isDeleteProfileLoading;

  return (
    <>
      <div className="container">
        <div className={styles.usersList}>
          <Loading isLoading={isLoading} />
          <div className={styles.userListTitle}>
            <h3>All Users</h3>
          </div>
          <Table hover responsive>
            <thead>
              <tr>
                <th>Image</th>
                <th>Email</th>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Events</th>
                <th>Participate at</th>
                <th>Role</th>
                <th>Created Date</th>
                <th>Edit</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
              {users?.map((user) => (
                <UserItem
                  key={user.id}
                  user={user}
                  currentUserId={currentUserId}
                  onEditClick={showEditModal}
                  onDeleteClick={showDeleteModal}
                />
              ))}
            </tbody>
          </Table>
        </div>
      </div>
      <EditModal
        title="Edit User"
        renderBody={EditUser}
        confirmButtonDescription="Save"
        onConfirm={onUserUpdate}
      />
      <DeleteModal
        title="Remove User"
        renderBody={DeleteUser}
        confirmButtonDescription="Remove User permanently"
        onConfirm={onUserRemove}
      />
    </>
  );
};

export default AllUsers;
