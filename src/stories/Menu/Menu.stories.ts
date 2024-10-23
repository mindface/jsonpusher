import type { Meta, StoryObj } from "@storybook/react";
import { fn } from "@storybook/test";

import { Menu } from "./Menu";

const meta = {
	title: "Example/Menu",
	component: Menu,
	parameters: {
		layout: "centered",
	},
	tags: ["autodocs"],
	argTypes: {
		backgroundColor: { control: "color" },
	},
	args: { onClick: fn() },
} satisfies Meta<typeof Menu>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
	args: {
		primary: true,
		pathList: [],
	},
};

export const Secondary: Story = {
	args: {
		primary: false,
		pathList: [],
	},
};
