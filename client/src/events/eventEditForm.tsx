import React from 'react';
import { Button } from 'react-bootstrap';
import { Form, Field, FormikProps } from 'formik';

import eventDefaultImage from '../displayComponents/images/event.jpeg';
import Input from '../displayComponents/forms/inputFormik';
import TextareaQuillFormik from '../displayComponents/forms/textareaQuillFormik';

import { EventFormValues } from './types';

type EventEditProps = {
  disableEditMode: () => void;
} & FormikProps<EventFormValues>;

const EventEdit = ({ dirty, disableEditMode }: EventEditProps): JSX.Element => (
  <Form>
    <div
      className="event-header"
      style={{ backgroundImage: `url(${eventDefaultImage}` }}
    >
      <div className="event-details">
        <div className="event-wrapper">
          <Field
            label="Title"
            name="title"
            placeholder="Title"
            component={Input}
          />
          <Field
            label="Short description"
            name="shortDescription"
            placeholder="Short Description"
            component={Input}
          />
          <Field
            label="Date"
            name="eventDate"
            type="datetime-local"
            component={Input}
          />
        </div>
      </div>

      <div className="event-edit-buttons">
        <Button type="submit" variant="success" disabled={!dirty}>
          Save Changes
        </Button>
        <Button onClick={disableEditMode} variant="danger">
          Cancel
        </Button>
      </div>
    </div>
    <div className="event-description">
      <Field name="description" component={TextareaQuillFormik} />
    </div>
  </Form>
);

export default EventEdit;
