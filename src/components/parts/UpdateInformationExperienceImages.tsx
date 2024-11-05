import Image from "next/image";

import updateInfo01 from "../../assets/images/update_info01.jpg";
import updateInfo02 from "../../assets/images/update_info02.jpg";
import updateInfo03 from "../../assets/images/update_info03.jpg";
import updateInfo04 from "../../assets/images/update_info04.jpg";

type Props = {
  imageId: string;
}

export default function UpdateInformationExperienceImages(props: Props) {
  const { imageId } = props;
  const setImage = () => {
    switch (imageId) {
      case "1":
        return updateInfo01;
      case "2":
        return updateInfo02;
      case "3":
        return updateInfo03;
      case "4":
        return updateInfo04;
      default:
        return updateInfo01;
    }
  }
  return <Image
    src={setImage()}
    className="rounded-lg"
    width={300}
    height={200}
    alt="sports image"
    priority
    style={{ objectFit: "cover", height: "auto" }}
  />
}
