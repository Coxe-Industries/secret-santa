import React from 'react';
import { withFormik } from 'formik';

const FamilyNameForm = (props) => {
  const {
    values,
    touched,
    errors,
    isSubmitting,
    handleChange,
    handleBlur,
    handleSubmit,
  } = props;

  const { familyName } = values;

  return(
    <form className="p-5" onSubmit={handleSubmit}>
      <h1>Set family name</h1>
      <div className="form-group">
        <label>Family name</label>
        <input name="familyName" type="text" 
          value={familyName} 
          onChange={handleChange}
          onBlur={handleBlur} />
          {errors.familyName && touched.familyName && <div id="feedback">{errors.familyName}</div>}
      </div>
      <button type="submit" className="btn btn-outline-primary" disabled={isSubmitting}>
        {isSubmitting ? 'WAIT PLIZ' : 'CLICK ME'}
      </button>
    </form>
  );
}

export default withFormik({
  mapPropsToValues: ({ familyName }) => ({ 
    familyName: familyName,
  }),

  // Custom sync validation
  validate: values => {
    const errors = {};

    if (!values.familyName) {
      errors.familyName = 'Required';
    }

    return errors;
  },

  handleSubmit: (values, { setSubmitting, props: { onSubmit } }) => {
    // submit them do the server. do whatever you like!
    setSubmitting(true)
    onSubmit(values);
    setSubmitting(false)
  },

  displayName: 'family-name-form',
})(FamilyNameForm);