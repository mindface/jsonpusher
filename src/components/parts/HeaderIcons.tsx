import Image from "next/image";

import Home from "../../assets/svg/home.svg";
import Health from "../../assets/svg/health.svg";
import Sports from "../../assets/svg/sports.svg";
import Question from "../../assets/svg/question.svg";
import Sportandjob from "../../assets/svg/sportandjob.svg";
import Memory from "../../assets/svg/memory.svg";
import Carender from "../../assets/svg/carender.svg";

type Props = {
	iconId: number;
};

export default function NavIcons(props: Props) {
	const { iconId } = props;
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
	return (
		<Image
			src={setImage()}
			className="rounded-lg"
			width={20}
			height={20}
			alt="icon"
			priority
			style={{ objectFit: "cover", width: "20px" }}
		/>
	);
}
