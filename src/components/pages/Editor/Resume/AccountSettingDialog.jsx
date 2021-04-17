import React, { useState } from "react";

import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import AccountForm from "./AccountForm";
import { useAuth } from "../../../../Providers/AuthProvider";

export default function AccountDailog({ resume, open, setOpen }) {
	const [value, setValue] = useState(0);
	const { currentUser, currentResume } = useAuth();
	const type = ["Main Contact", "Social"];
	const handleClose = () => {
		setOpen(false);
	};
	console.log("Dialog");
	const handleTabChange = (event, newValue) => {
		setValue(newValue);
	};

	return (
		<div>
			<Dialog
				open={open}
				onClose={handleClose}
				aria-labelledby="form-dialog-title"
			>
				<DialogContent>
					<Typography variant="h6" display="block">
						Account Settings
					</Typography>

					<Paper elevation={0} square>
						<Tabs
							value={value}
							indicatorColor="primary"
							textColor="primary"
							onChange={handleTabChange}
							centered
							aria-label="Settings Tab"
						>
							<Tab label="Main Contact" />
							<Tab label="Social" />
						</Tabs>
					</Paper>
					<AccountForm
						currentResume={currentResume}
						type={type[value]}
						currentUser={currentUser}
						handleClose={handleClose}
					></AccountForm>
				</DialogContent>
			</Dialog>
		</div>
	);
}
