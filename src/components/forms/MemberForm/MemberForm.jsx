import React from 'react';
import { withFormik } from 'formik';
import AddIcon from '@material-ui/icons/Add';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

const MemberForm = props => {
  const {
    values,
    touched,
    errors,
    handleChange,
    handleBlur,
    handleSubmit,
  } = props;

  return (
    <form onSubmit={handleSubmit}>
      <TextField
        id="member-name"
        label="Name"
        name="name"
        value={values.name}
        onChange={handleChange}
        onBlur={handleBlur}
        margin="normal"
      />
      {errors.name && touched.name && <div id="feedback">{errors.name}</div>}
      <Button type="submit" variant="contained" color="primary">
        Add
        {/* This Button uses a Font Icon, see the installation instructions in the docs. */}
        <AddIcon />
      </Button>
    </form>
  );
};

export default withFormik({
  mapPropsToValues: () => ({
    name: '',
  }),

  // Custom sync validation
  validate: values => {
    const errors = {};

    if (!values.name) {
      errors.name = 'Required';
    }

    return errors;
  },

  handleSubmit: async (values, { setSubmitting, props: { onSubmit } }) => {
    setSubmitting(true);
    await onSubmit(values);
    setSubmitting(false);
  },

  displayName: 'members-form',
})(MemberForm);
