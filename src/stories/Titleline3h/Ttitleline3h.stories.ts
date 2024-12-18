import type { Meta, StoryObj } from "@storybook/react";

import { Titleline3h } from "./Titleline3h";

const meta = {
	title: "Example/Titleline3h",
	component: Titleline3h,
	tags: ["autodocs"],
	parameters: {
		layout: "fullscreen",
	},
	args: {
		title: "title h3",
	},
} satisfies Meta<typeof Titleline3h>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Large: Story = {
	args: {
		size: "large",
	},
};

export const Small: Story = {
	args: {
		size: "small",
	},
};
