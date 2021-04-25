import React, { Component } from "react";
import Joi from "joi-browser";

class Form extends Component {
	state = { mainContent: {}, errors: {} };

	validate = (type) => {
		if (type === "label") {
			const { error } = Joi.validate(
				this.state.mainContent[type],
				this.schema[type],
				{
					abortEarly: false,
				}
			);
			return error ? { [type]: error.details[0].message } : null;
		} else {
			let result = {};
			for (let item of this.state.mainContent[type]) {
				result[item.id] = Joi.validate(item, this.schema[type], {
					abortEarly: false,
				});
			}
			const errors = {};
			for (let obj of Object.keys(result)) {
				if (result[obj].error) {
					for (let item of result[obj].error.details) {
						errors[item.path[0] + [obj]] = errors[item.path[0]]
							? errors[item.path[0]]
							: item.message;
					}
				}
			}
			return errors;
		}
	};

	validateProperty({ name, value }, type) {
		const obj = { [name]: value };
		let schema = {};
		if (type === "label") {
			schema = { [name]: this.schema[name] };
		} else {
			schema = { [name]: this.schema[type][name] };
		}
		const { error } = Joi.validate(obj, schema);
		return error ? error.details[0].message : null;
	}

	handleChange = (type) => ({ currentTarget: input }) => {
		const errors = { ...this.state.errors };

		const errorMsg = this.validateProperty(input, type);

		if (errorMsg) errors[input.id] = errorMsg;
		else delete errors[input.id];
		const data = { ...this.state.mainContent };
		if (type === "label") {
			data[type] = input.value;
		} else {
			let target = data[type].find((e) => {
				return `${input.name}${e.id}` === input.id;
			});
			target[input.name] = input.value;
		}
		this.setState({ mainContent: data, errors });
	};

	handleSubmit = (type) => (e) => {
		e.preventDefault();
		const error1 = this.validate(type);
		const error2 = this.validate("label");
		const errors = Object.assign(error1, error2);
		this.setState({ errors: errors || {} });
		if (Object.keys(errors).length > 0) {
			console.log(errors);
			return;
		}

		this.doSubmit(type);
	};
	handlePresentCheck = (id, type) => (event) => {
		const mainContent = { ...this.state.mainContent };
		let target = mainContent[type].find((e) => e.id === id);
		target.present = event.target.checked;
		this.setState({ mainContent });
	};
	handleDateChange = (date, obj) => {
		const mainContent = { ...this.state.mainContent };
		let target = mainContent[obj.type].find((e) => {
			return e.id === obj.id;
		});
		target[obj.name] = date;
		this.setState({ mainContent });
	};
	handleRatingChange = (value, id, type) => {
		const mainContent = { ...this.state.mainContent };
		let target = mainContent[type].find((e) => e.id === id);
		target.value = value;
		console.log(target);
		this.setState({ mainContent });
	};
	handleRatingHoverChange = (event, value) => {
		// console.log(event.target, value);
	};
}

export default Form;
