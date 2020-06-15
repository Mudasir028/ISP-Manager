import React, { Component } from "react";
import Joi from "joi-browser";
import {
  FormGroup,
  Input,
  CustomInput,
  InputGroupAddon,
  InputGroup,
  InputGroupText,
} from "reactstrap";

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

    // data[input.name] = input.value ? input.value : input.files[0];
    data[input.name] = input.value;

    this.setState({
      data,
      errors,
    });
  };

  renderButton(label, extraClasses = "") {
    const classes = `btn btn-primary ${extraClasses}`;
    return <button className={classes}>{label}</button>;
  }

  renderInput(name, label, type = "text", placeholder, readOnly = false) {
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
          readOnly={readOnly}
          // error={errors[name]}
          // defaultValue=""
        />
        {errors[name] && (
          <div className="alert alert-danger">{errors[name]}</div>
        )}
      </FormGroup>
    );
  }
  renderLoginInput(name, type = "text", placeholder, fontawesom) {
    const { data, errors } = this.state;

    return (
      <FormGroup className="mb-3">
        <InputGroup className="input-group-alternative">
          <InputGroupAddon addonType="prepend">
            <InputGroupText>
              <i className={fontawesom} />
            </InputGroupText>
          </InputGroupAddon>
          <Input
            name={name}
            id={name}
            value={data[name]}
            type={type}
            autoComplete="new-email"
            onChange={this.handleChange}
            placeholder={placeholder}
          />
        </InputGroup>

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
  renderSelect(name, label, options, handleSelectChange) {
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
          onChange={async (e) => {
            await this.handleChange(e);
            if (handleSelectChange) handleSelectChange();
          }}
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

  renderGenderInput(name, lable, type = "radio") {
    const { data, errors } = this.state;

    return (
      <>
        <FormGroup>
          <label className="form-control-label" htmlFor={name}>
            {lable}
          </label>

          <div className="radio">
            <label>
              <input
                name={name}
                type={type}
                value="Male"
                checked={data[name] === "Male"}
                onChange={this.handleChange}
              />
              Male
            </label>
          </div>
          <div className="radio">
            <label>
              <input
                name={name}
                type={type}
                value="Female"
                checked={data[name] === "Female"}
                onChange={this.handleChange}
              />
              Female
            </label>
          </div>
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
