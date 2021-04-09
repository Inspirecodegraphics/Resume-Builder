import React from "react";
import TextField from "@material-ui/core/TextField";
import InputAdornment from "@material-ui/core/InputAdornment";
import { RestoreOutlined } from "@material-ui/icons";

const InputField = ({
	handleChange,
	error,
	type,
	value,
	icon,
	placeholder,
	name,
	label,
	...rest
}) => {
	return (
		<TextField
			error={error}
			placeholder={placeholder}
			id={name}
			label={label}
			{...rest}
			type={type}
			fullWidth
			name={name}
			value={value}
			onChange={handleChange}
			variant="standard"
			color="primary"
			helperText={error}
			InputProps={{
				startAdornment: (
					<InputAdornment position="start">{icon}</InputAdornment>
				),
			}}
		></TextField>
	);
};

export default InputField;
