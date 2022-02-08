import React, { useState, useCallback, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Formik } from 'formik';
import { eventSchemas } from '@common-packages/validators';
import { parseISO } from 'date-fns';

import { useAppSelector } from '../store/hooks';
import { userDataSelector, isAdminSelector } from '../store/user/selectors';
import Loading from '../displayComponents/loading/loading';
import Warning from '../displayComponents/warning/warning';
import { transformToDateTimeLocal } from '../displayComponents/formatters/date';
import { EVENT_STATUS } from '../shared/types';

import {
  useFetchEvent,
  useUpdateEvent,
  useUpdateEventStatus,
  useDeleteEvent,
} from './api/hooks';
import EventDetails from './eventDetails';
import EventEditForm from './eventEditForm';
import { EventType } from './types';

const EventComponent = () => {
  const navigate = useNavigate();
  const { eventId } = useParams();

  const [isEditMode, setIsEditMode] = useState(false);
  const [event, setEvent] = useState<EventType>();

  const isAdmin = useAppSelector(isAdminSelector);
  const { id: userId } = useAppSelector(userDataSelector);
  const isOwner = userId === event?.userId;
  const isAllowedToEdit = isAdmin || isOwner;
  const isGoing = Boolean(
    event?.participants?.some((p) => p.userId === userId),
  );

  const { call: fetchEvent, isLoading: isFetchEventLoading } = useFetchEvent();
  const { call: updateEvent, isLoading: isUpdateEventLoading } =
    useUpdateEvent();
  const { call: updateEventStatus, isLoading: isUpdateEventStatusLoading } =
    useUpdateEventStatus();
  const { call: deleteEvent, isLoading: isDeleteEventLoading } =
    useDeleteEvent();

  const fetchEventData = useCallback(async () => {
    const eventData = await fetchEvent({ eventId });
    const event = {
      ...eventData,
      title: eventData.title || '',
      shortDescription: eventData.shortDescription || '',
      description: eventData.description || '',
    };
    setEvent(event);
  }, [eventId, fetchEvent]);

  const enableEditMode = useCallback(() => {
    setIsEditMode(true);
  }, [setIsEditMode]);

  const disableEditMode = useCallback(() => {
    setIsEditMode(false);
  }, [setIsEditMode]);

  const renderEventEditForm = useCallback(
    (formikProps) => (
      <EventEditForm {...formikProps} disableEditMode={disableEditMode} />
    ),
    [disableEditMode],
  );

  const onEventUpdate = useCallback(
    async (values) => {
      if (!isAllowedToEdit) {
        return;
      }

      await updateEvent({
        eventId: values.id,
        ...values,
        eventDate: parseISO(values.eventDate),
      });
      disableEditMode();
      fetchEventData();
    },
    [updateEvent, fetchEventData, disableEditMode, isAllowedToEdit],
  );

  const onEventStatusUpdate = useCallback(
    async (newStatus: EVENT_STATUS) => {
      if (!isAllowedToEdit || !event) {
        return;
      }

      await updateEventStatus({
        eventId: event.id,
        status: newStatus,
      });
      fetchEventData();
    },
    [updateEventStatus, fetchEventData, event, isAllowedToEdit],
  );

  const onEventDelete = useCallback(async () => {
    if (!isAllowedToEdit || !event) {
      return;
    }

    await deleteEvent({ eventId: event.id });
    navigate(-1);
  }, [deleteEvent, navigate, event, isAllowedToEdit]);

  useEffect(() => {
    fetchEventData();
  }, [fetchEventData]);

  const isLoading =
    isFetchEventLoading ||
    isUpdateEventLoading ||
    isUpdateEventStatusLoading ||
    isDeleteEventLoading;

  return (
    <div className="container">
      <div className="event mx-1">
        {event &&
          (isEditMode ? (
            <Formik
              initialValues={{
                ...event,
                eventDate: transformToDateTimeLocal(String(event.eventDate)),
              }}
              validationSchema={eventSchemas.event}
              component={renderEventEditForm}
              onSubmit={onEventUpdate}
            />
          ) : (
            <EventDetails
              event={event}
              isOwner={isOwner}
              isGoing={isGoing}
              isAdmin={isAdmin}
              isAllowedToEdit={isAllowedToEdit}
              enableEditMode={enableEditMode}
              fetchEventData={fetchEventData}
              onEventStatusUpdate={onEventStatusUpdate}
              onEventDelete={onEventDelete}
            />
          ))}
        <Loading isLoading={isLoading} />
        <Warning
          isWarning={!event && !isLoading}
          warningMessage={`Sorry. Event with ID: ${eventId} does not exist`}
        />
      </div>
    </div>
  );
};

export default EventComponent;
