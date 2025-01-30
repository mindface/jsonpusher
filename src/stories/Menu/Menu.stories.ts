import type { Meta, StoryObj } from "@storybook/react";
import { fn } from "@storybook/test";

import { Menu } from "./Menu";

const meta = {
	title: "Example/Menu",
	component: Menu,
	parameters: {
		layout: "fullscreen",
	},
	tags: ["autodocs"],
	argTypes: {},
	args: { onClick: fn() },
} satisfies Meta<typeof Menu>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
	args: {
		primary: true,
		pathList: [
			{ pathId: "home", name: "Home", path: "/" },
			{ pathId: "about", name: "About", path: "/about" },
			{ pathId: "contact", name: "Contact", path: "/contact" },
		],
	},
};

export const Secondary: Story = {
	args: {
		primary: false,
		pathList: [
			{ pathId: "home", name: "Home", path: "/" },
			{ pathId: "about", name: "About", path: "/about" },
			{ pathId: "contact", name: "Contact", path: "/contact" },
		],
	},
};
