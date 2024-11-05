import Link from "next/link";
import { Menu } from "../stories/Menu/Menu";

import pathList from "../json/menuPathList.json";
import menuList from "../json/menuInfoList.json";

export default function Header() {
	return (
		<div className="flex items-center justify-between shadow-lg p-6 pb-4 ">
			<div className="links">
				{pathList.map((item) => (
					<Link
            key={item.pathId}
            href={item.path}
            className="inline-block mr-2 p-2 leading-none rounded-lg transition-colors link"
          >
						{item.name}
					</Link>
				))}
			</div>
      <Menu pathList={menuList} size="large" />
		</div>
	);
}
