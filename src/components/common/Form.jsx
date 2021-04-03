import React, { Component } from "react";
import Joi from "joi-browser";

class Form extends Component {
	state = { mainContent: {}, errors: {} };

	validate = () => {
		const result = Joi.validate(this.state.mainContent, this.schema, {
			abortEarly: false,
		});
		if (!result.error) return null;

		const errors = {};
		for (let item of result.error.details)
			errors[item.path[0]] = errors[item.path[0]]
				? errors[item.path[0]]
				: item.message;
		return errors;
	};

	validateProperty({ name, value }) {
		const obj = { [name]: value };
		const schema = { [name]: this.schema[name] };
		const { error } = Joi.validate(obj, schema);
		return error ? error.details[0].message : null;
	}

	handleChange = ({ currentTarget: input }) => {
		const errors = { ...this.state.errors };
		const errorMsg = this.validateProperty(input);
		if (errorMsg) errors[input.name] = errorMsg;
		else delete errors[input.name];

		const mainContent = { ...this.state.mainContent };
		mainContent[input.name] = input.value;
		this.setState({ mainContent, errors });
	};

	handleSubmit = (e) => {
		e.preventDefault();
		const errors = this.validate();
		this.setState({ errors: errors || {} });
		if (errors) return;

		this.doSubmit();
	};
}

export default Form;
