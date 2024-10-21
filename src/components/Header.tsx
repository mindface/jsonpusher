import Link from "next/link";

const pathList = [
	{
		pathId: 1,
		path: "/",
		name: "home",
	},
	{
		pathId: 2,
		path: "/health",
		name: "health",
	},
	{
		pathId: 3,
		path: "/sports",
		name: "sports",
	},
];

export default function Header() {
	return (
		<div className="items-center justify-items-center p-8 pb-4">
			<div className="links">
				{pathList.map((item) => (
					<Link key={item.pathId} href={item.path} className="p-1">
						{item.name}
					</Link>
				))}
			</div>
		</div>
	);
}
