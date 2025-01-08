import type { Meta, StoryObj } from "@storybook/react";

import { CLink } from "./CLink";

const meta = {
	title: "Example/CLink",
	component: CLink,
	parameters: {
		layout: "centered",
	},
	tags: ["autodocs"],
	argTypes: {},
} satisfies Meta<typeof CLink>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
	args: {
		type: "link",
		href: "#",
		label: "link",
	},
};

export const Button: Story = {
	args: {
		type: "button",
		href: "#",
		label: "link",
	},
};

export const Large: Story = {
	args: {
		type: "link",
		href: "#",
		size: "large",
		label: "link",
	},
};

export const Small: Story = {
	args: {
		type: "link",
		href: "#",
		size: "small",
		label: "link",
	},
};
