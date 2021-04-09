import React, { Component } from "react";
import Joi from "joi-browser";

class Form extends Component {
	state = { mainContent: {}, errors: {}, social: {} };

	validate = (type) => {
		const result = Joi.validate(this.state[type], this.schema[type], {
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

	validateProperty({ name, value }, type) {
		const obj = { [name]: value };
		const schema = { [name]: this.schema[type][name] };
		const { error } = Joi.validate(obj, schema);
		return error ? error.details[0].message : null;
	}

	handleChange = (type) => ({ currentTarget: input }) => {
		const errors = { ...this.state.errors };
		const errorMsg = this.validateProperty(input, type);
		if (errorMsg) errors[input.name] = errorMsg;
		else delete errors[input.name];

		const data = { ...this.state[type] };
		data[input.name] = input.value;
		this.setState({ [type]: data, errors });
	};

	handleSubmit = (type) => (e) => {
		e.preventDefault();
		// console.log(type, "submit");
		const errors = this.validate(type);
		this.setState({ errors: errors || {} });
		if (errors) return;

		this.doSubmit(type);
	};
}

export default Form;
