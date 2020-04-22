import React, { Component } from "react";
import Joi from "joi-browser";
import { FormGroup, Input, Label, CustomInput } from "reactstrap";
// import { toast } from "react-toastify";

class Form extends Component {
  state = {
    data: {},
    errors: {},
  };

  validate = () => {
    const options = { abortEarly: false };
    const { error } = Joi.validate(this.state.data, this.schema, options);
    if (!error) return null;

    const errors = {};
    for (let item of error.details) {
      errors[item.path[0]] = item.message;
      // toast.error(item.message);
    }
    return errors;
  };

  validateProperty = ({ name, value }) => {
    const obj = { [name]: value };
    const schema = { [name]: this.schema[name] };
    const { error } = Joi.validate(obj, schema);
    return error ? error.details[0].message : null;
  };

  /**
   * Called when data is validated and ready for submit
   *
   * @abstract
   * @param
   * @void
   */
  doSubmit = async () => {
    throw "Abstract method doSubmit not implemented";
  };

  handleSubmit = (e) => {
    e.preventDefault();

    const errors = this.validate();
    this.setState({ errors: errors || {} });
    if (errors) return;

    this.doSubmit();
  };

  handleChange = ({ currentTarget: input }) => {
    const errors = { ...this.state.errors };
    const errorMessage = this.validateProperty(input);
    if (errorMessage) errors[input.name] = errorMessage;
    else delete errors[input.name];

    const data = { ...this.state.data };

    data[input.name] = input.value ? input.value : input.files[0];

    this.setState({
      data,
      errors,
    });
    console.log(data);
  };

  renderButton(label, extraClasses = "") {
    const classes = `btn btn-primary ${extraClasses}`;
    return <button className={classes}>{label}</button>;
  }

  renderInput(name, label, type = "text", placeholder) {
    const { data, errors } = this.state;

    return (
      <FormGroup>
        <label className="form-control-label" htmlFor={name}>
          {label}
        </label>
        <Input
          name={name}
          id={name}
          value={data[name]}
          type={type}
          placeholder={placeholder}
          className="form-control-alternative"
          onChange={this.handleChange}
          error={errors[name]}
          // defaultValue=""
        />
        {errors[name] && (
          <div className="alert alert-danger">{errors[name]}</div>
        )}
      </FormGroup>
    );
  }
  renderImageInput(name, label, type = "text", placeholder) {
    const { data, errors } = this.state;

    return (
      <FormGroup>
        <label className="form-control-label" htmlFor={name}>
          {label}
        </label>
        <CustomInput
          name={name}
          id={name}
          value={data[name]}
          type={type}
          label={placeholder}
          className="form-control-alternative"
          onChange={this.handleChange}
        />
        {errors[name] && (
          <div className="alert alert-danger">{errors[name]}</div>
        )}
      </FormGroup>
    );
  }
  renderSelect(name, label, options) {
    const { data, errors } = this.state;

    return (
      <FormGroup>
        <label className="form-control-label" htmlFor={name}>
          {label}
        </label>
        <Input
          name={name}
          value={data[name]}
          type="select"
          className="form-control-alternative"
          onChange={this.handleChange}
        >
          {options.map((option) => (
            <option key={option.id} value={option.id}>
              {option.name}
            </option>
          ))}
        </Input>
        {errors[name] && (
          <div className="alert alert-danger">{errors[name]}</div>
        )}
      </FormGroup>
    );
  }

  renderGenderInput(name, lable, type = "radio", placeholders) {
    const { data, errors } = this.state;

    return (
      <>
        <FormGroup>
          <label className="form-control-label" htmlFor={name}>
            {lable}
          </label>
          <br />
          <Label check>
            <Input
              type={type}
              name={name}
              value="Male"
              onChange={this.handleChange}
            />{" "}
            Male
          </Label>
          <br />
          <Label check>
            <Input
              type={type}
              name={name}
              value="Female"
              onChange={this.handleChange}
            />
            Female
          </Label>
          {errors[name] && (
            <div className="alert alert-danger">{errors[name]}</div>
          )}
        </FormGroup>
      </>
    );
  }
  // renderLoginFormInput(name, placeholder, type = "text") {
  //   const { data, errors } = this.state;

  //   return (
  //     <LoginFormInput
  //       type={type}
  //       name={name}
  //       value={data[name]}
  //       placeholder={placeholder}
  //       onChange={this.handleChange}
  //       error={errors[name]}
  //     />
  //   );
  // }

  // renderRadioButton(name, placeholder) {
  //   return (
  //     <div className="form-check-inline checkbox_inline" key={placeholder}>
  //       <label className="form-check-label">
  //         <input
  //           type="radio"
  //           className="form-check-input"
  //           id={placeholder}
  //           name={name}
  //           value={placeholder}
  //           onChange={this.handleChange}
  //         />
  //         {placeholder}
  //       </label>
  //     </div>
  //   );
  // }

  // renderRadioButtons(name, placeholders) {
  //   const { errors } = this.state;
  //   const error = errors[name];

  //   return (
  //     <div className="form-group">
  //       {placeholders.map((placeholder) => {
  //         return this.renderRadioButton(name, placeholder);
  //       })}
  //       {error && <div className="alert alert-danger">{error}</div>}
  //     </div>
  //   );
  // }

  // renderCheckBox(name, label) {
  //   const { data } = this.state;
  //   return (
  //     <div>
  //       <label htmlFor={name}>{label}</label>
  //       <br />
  //       <label className="switch">
  //         <input
  //           className="ml-5"
  //           type="checkbox"
  //           name={name}
  //           checked={data[name]}
  //           onChange={({ currentTarget: input }) => {
  //             const data = { ...this.state.data };
  //             data[name] = input.checked;
  //             this.setState({ data });
  //           }}
  //         />
  //         <span className="slider round"></span>
  //       </label>
  //     </div>
  //   );
  // }

  // renderInputHidden(name) {
  //   const { data, errors } = this.state;

  //   return (
  //     <InputHidden
  //       name={name}
  //       value={data[name]}
  //       onChange={this.handleChange}
  //       error={errors[name]}
  //     />
  //   );
  // }
}

export default Form;
