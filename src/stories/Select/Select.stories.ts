import type { Meta, StoryObj } from "@storybook/react";
import { fn } from "@storybook/test";

import { Select } from "./Select";

const meta = {
	title: "Example/Select",
	component: Select,
	parameters: {
		layout: "centered",
	},
	tags: ["autodocs"],
	argTypes: {},
	args: { onChange: fn() },
} satisfies Meta<typeof Select>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
	args: {
		id: "primary",
		primary: true,
		options: [
			{
				value:"value01",
				label:"label01",
			}
		],
		label: "Select",
	},
};

export const Secondary: Story = {
	args: {
		id: "secondary",
		options: [
			{
				value:"value01",
				label:"label01",
			},
			{
				value:"value02",
				label:"label02",
			}
		],
		label: "Select",
	},
};

