import Home from "../../assets/svg/home.svg";
import Health from "../../assets/svg/health.svg";
import Sports from "../../assets/svg/sports.svg";
import Question from "../../assets/svg/question.svg";
import Sportandjob from "../../assets/svg/sportandjob.svg";
import Memory from "../../assets/svg/memory.svg";
import Carender from "../../assets/svg/carender.svg";

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
	const Icon = setImage();
	return (
		<>
			<Icon
				width="20"
				height="20"
				className={["header-side-icon", className ?? ""].join(" ")}
				style={{ objectFit: "cover", width: "20px", height: "auto" }}
			/>
		</>
	);
}
