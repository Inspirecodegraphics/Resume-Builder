import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import ButtonGroup from "@material-ui/core/ButtonGroup";

const Settings = () => {
	const [type, setType] = useState("Predefined");
	const changeType = (type) => {
		setType(type);
	};
	const typeList = ["Predefined", "Custom"];
	return (
		<ButtonGroup color="primary" aria-label="outlined primary button group">
			{typeList.map((type) => (
				<Button onClick={() => changeType("Predefined")}>{type}</Button>
			))}
		</ButtonGroup>
	);
};

export default Settings;
