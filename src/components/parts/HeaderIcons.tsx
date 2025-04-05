import Home from "../../assets/svg/home.svg";
import Health from "../../assets/svg/health.svg";
import Sports from "../../assets/svg/sports.svg";
import Question from "../../assets/svg/question.svg";
import Sportandjob from "../../assets/svg/sportandjob.svg";
import Memory from "../../assets/svg/memory.svg";
import Carender from "../../assets/svg/carender.svg";

import Image from "next/image";

type Props = {
	iconId: number;
	className?: string;
};

export default function NavIcons(props: Props) {
	const { iconId, className } = props;
	const setImage = () => {
		switch (iconId) {
			case 1:
				return Home;
			case 2:
				return Health;
			case 3:
				return Sports;
			case 4:
				return Question;
			case 5:
				return Sportandjob;
			case 6:
				return Memory;
			case 7:
				return Carender;
			default:
				return Home;
		}
	};
	// const setImage = () => {
	// 	switch (iconId) {
	// 		case 1:
	// 			return "/assets/svg/home.svg";
	// 		case 2:
	// 			return "/assets/svg/health.svg";
	// 		case 3:
	// 			return "/assets/svg/sports.svg";
	// 		case 4:
	// 			return "/assets/svg/question.svg";
	// 		case 5:
	// 			return "/assets/svg/sportandjob.svg";
	// 		case 6:
	// 			return "/assets/svg/memory.svg";
	// 		case 7:
	// 			return "/assets/svg/carender.svg";
	// 		default:
	// 			return "/assets/svg/home.svg";
	// 	}
	// };

	const IconSrc = setImage();
	return (
		<>
			<IconSrc
				width="20"
				height="20"
				className={["header-side-icon", className ?? ""].join(" ")}
				style={{ objectFit: "cover", width: "20px", height: "auto" }}
			/>
		</>
	);
};
