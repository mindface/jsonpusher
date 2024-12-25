import type { Meta, StoryObj } from "@storybook/react";

import { Loading } from "./Loading";

const meta = {
	title: "Example/Loading",
	component: Loading,
	parameters: {
		layout: "centered",
	},
	tags: ["autodocs"],
	argTypes: {
		backgroundColor: { control: "color" },
	},
} satisfies Meta<typeof Loading>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
	args: {
		backgroundColor: "#1ea7fd"
	},
};
