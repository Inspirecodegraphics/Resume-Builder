import React from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import AccountForm from "./AccountForm";
export default function AccountDailog({ open, setOpen, user }) {
	const [value, setValue] = React.useState(0);

	const handleClose = () => {
		setOpen(false);
	};

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
					<Accordion elevation={0}>
						<AccordionSummary
							expandIcon={<ExpandMoreIcon />}
							aria-controls="panel1a-content"
							id="panel1a-header"
							className="px-0"
						>
							<Typography>Account Settings</Typography>
						</AccordionSummary>
						<AccordionDetails>
							<Typography>
								Lorem ipsum dolor sit amet, consectetur adipiscing elit.
								Suspendisse malesuada lacus ex, sit amet blandit leo lobortis
								eget.
							</Typography>
						</AccordionDetails>
					</Accordion>
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
					<AccountForm user={user} handleClose={handleClose}></AccountForm>
				</DialogContent>
				{/* <DialogActions>
					<Button onClick={handleClose} color="primary">
						Cancel
					</Button>
					<Button onClick={handleClose} color="primary">
						Save
					</Button>
				</DialogActions> */}
			</Dialog>
		</div>
	);
}
