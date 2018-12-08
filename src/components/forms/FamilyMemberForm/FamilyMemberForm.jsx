import React from 'react';
import { withFormik } from 'formik';

const FamilyMemberForm = (props) => {
  const {
    values,
    touched,
    errors,
    isSubmitting,
    handleChange,
    handleBlur,
    handleSubmit,
  } = props;

  const { name, email } = values;

  return(
    <form className="p-5" onSubmit={handleSubmit}>
      <div className="form-group">
        <label>Name</label>
        <input name="name" type="text" 
          value={name} 
          onChange={handleChange}
          onBlur={handleBlur} />
          {errors.name && touched.name && <div id="feedback">{errors.name}</div>}
      </div>
      <div className="form-group">
        <label>Email</label>
        <input name="email" type="text" 
          value={email} 
          onChange={handleChange}
          onBlur={handleBlur} />
          {errors.email && touched.email && <div id="feedback">{errors.email}</div>}
      </div>
      <button type="submit" className="btn btn-outline-primary" disabled={isSubmitting}>
        {isSubmitting ? 'WAIT PLIZ' : 'Add member'}
      </button>
    </form>
  );
}

export default withFormik({
  mapPropsToValues: () => ({ 
    name: "",
    email: "",
  }),

  // Custom sync validation
  validate: values => {
    const errors = {};

    if (!values.name) {
      errors.name = 'Required';
    }

    if (!values.email) {
      errors.email = 'Required';
    }

    return errors;
  },

  handleSubmit: (values, { setSubmitting, props: { onSubmit } }) => {
    // submit them do the server. do whatever you like!
    setSubmitting(true)
    onSubmit(values);
    setSubmitting(false)
  },

  displayName: 'family-member-form',
})(FamilyMemberForm);