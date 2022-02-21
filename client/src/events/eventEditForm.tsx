import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import { Form, Field, FormikProps } from 'formik';

import Input from '../displayComponents/forms/inputFormik';
import DropzoneFormik from '../displayComponents/forms/dropzoneFormik';
import TextareaQuillFormik from '../displayComponents/forms/textareaQuillFormik';
import { getEventImageSrc } from '../displayComponents/imageComponent/getImageSrc';

import { EventFormValues } from './types';
import styles from './styles.module.scss';

type EventEditProps = {
  disableEditMode: () => void;
} & FormikProps<EventFormValues>;

const EventEdit = ({
  dirty,
  values,
  disableEditMode,
}: EventEditProps): JSX.Element => {
  const [imagePreview, setImagePreview] = useState();

  const imageSrc = getEventImageSrc({
    image: imagePreview || values.image,
  });

  return (
    <Form data-testid="event-details-form">
      <div
        className={`${styles.eventHeader} ${styles.eventImage}`}
        style={{ backgroundImage: `url(${imageSrc}` }}
      >
        <div className={`row ${styles.eventDetails}`}>
          <div className="col-md-9 col-lg-7 col-xl-7">
            <div className={styles.eventWrapper}>
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
              <Field
                label="Event image"
                name="file"
                className="event-dropzone"
                component={DropzoneFormik}
                setImagePreview={setImagePreview}
              />
            </div>
          </div>
        </div>

        <div className={styles.eventEditButtons}>
          <Button type="submit" variant="success" disabled={!dirty}>
            Save Changes
          </Button>
          <Button onClick={disableEditMode} variant="danger">
            Cancel
          </Button>
        </div>
      </div>
      <div className={styles.eventDescription}>
        <Field name="description" component={TextareaQuillFormik} />
      </div>
    </Form>
  );
};

export default EventEdit;
