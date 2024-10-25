import type { Meta, StoryObj } from "@storybook/react";

import { Ccheck } from "./Ccheck";

const meta = {
	title: "Example/Ccheck",
	component: Ccheck,
	parameters: {
		layout: "centered",
	},
	tags: ["autodocs"],
	argTypes: {
		backgroundColor: { control: "color" },
	},
	args: {
		label: "label",
		partsId: "example",
		changing: (check) => console.log("Checkbox state:", check),
	},
} satisfies Meta<typeof Ccheck>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
	args: {
		primary: true,
		label: "Ccheck",
	},
};

export const Secondary: Story = {
	args: {
		label: "Ccheck",
	},
};

export const Large: Story = {
	args: {
		size: "large",
		label: "Ccheck",
	},
};

export const Small: Story = {
	args: {
		size: "small",
		label: "Ccheck",
	},
};
