import type { Meta, StoryObj } from "@storybook/react";

import { TextCommenter } from "./TextCommenter";

const meta = {
	title: "Example/TextComment",
	component: TextCommenter,
	parameters: {
		layout: "centered",
	},
	tags: ["autodocs"],
	argTypes: {
		values: {
			control: "text",
			description: "Value of the textarea",
			table: {
				type: { summary: "string" },
			},
		},
	},
	args: {
		values: ["Default text01","Default text02"],
	},
} satisfies Meta<typeof TextCommenter>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
	args: {
		className: "primary",
		speed: 200,
	},
};

export const Secondary: Story = {
	args: {
		className: "secondary",
		speed: 300
	},
};
