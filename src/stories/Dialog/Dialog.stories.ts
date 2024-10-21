import type { Meta, StoryObj } from "@storybook/react";

import { Dialog } from "./Dialog";

const meta = {
	title: "Example/Dialog",
	component: Dialog,
	parameters: {
		layout: "centered",
	},
	tags: ["autodocs"],
	args: {
		label: "Label string",
		// onChange: (value: boolean) => console.log('Dialog state changed:', value),
		children: "This is the dialog content.",
	},
} satisfies Meta<typeof Dialog>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
	args: {
		size: "medium",
		className: "primary-dialog",
	},
};

export const Secondary: Story = {
	args: {
		size: "medium",
		className: "secondary-dialog",
	},
};

export const Large: Story = {
	args: {
		size: "large",
		className: "large-dialog",
	},
};

export const Small: Story = {
	args: {
		size: "small",
		className: "small-dialog",
	},
};
