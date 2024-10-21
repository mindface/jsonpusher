import type { Meta, StoryObj } from "@storybook/react";

import { Title3h } from "./Title3h";

const meta = {
	title: "Example/Title3h",
	component: Title3h,
	tags: ["autodocs"],
	parameters: {
		layout: "fullscreen",
	},
	args: {
		title: "title h3",
	},
} satisfies Meta<typeof Title3h>;

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
