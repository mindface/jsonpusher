import type { Meta, StoryObj } from "@storybook/react";
import { fn } from "@storybook/test";

import { IconButton } from "./IconButton";

const meta = {
	title: "Example/IconButton",
	component: IconButton,
	parameters: {
		layout: "centered",
	},
	tags: ["autodocs"],
	argTypes: {
		backgroundColor: { control: "color" },
	},
	args: { 
		onClick: fn(),
		children: "This is the IconButtom content.",
	},
} satisfies Meta<typeof IconButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
	args: {
		primary: true,
		label: "IconButton",
	},
};

export const Secondary: Story = {
	args: {
		label: "IconButton",
	},
};

export const Large: Story = {
	args: {
		size: "large",
		label: "IconButton",
	},
};

export const Small: Story = {
	args: {
		size: "small",
		label: "IconButton",
	},
};
