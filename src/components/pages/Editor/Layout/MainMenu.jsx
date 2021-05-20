import React from "react";
import FontSelect from "./../Resume/FontSelect";
import { ReactComponent as Settings } from "../../../../static/icon/settings.svg";
// import Settings from "./Settings";
import Layout from "./Layout";
import Theme from "./Theme";
const MainMenu = ({ setSelectedFont }) => {
	const fonts = ["Merriweather", "Raleway", "Ubuntu", "Roboto", "Kiwi Maru"];

	return (
		<div>
			<div className="w-100 d-flex justify-content-center">
				<div className="row rb-editor-setting">
					<div className="col-3 p-2">
						<FontSelect
							setSelectedFont={setSelectedFont}
							item={fonts}
						></FontSelect>
					</div>
					<div className="col-3 p-2">
						<p className="m-0">
							<Theme></Theme>
						</p>
					</div>
					<div className="col-3 p-2">
						<Layout></Layout>
					</div>
					<div className="col-3 p-2">
						<p className="m-0">
							<Settings className="svg"></Settings> Settings
						</p>
					</div>
				</div>
			</div>
		</div>
	);
};

export default MainMenu;
