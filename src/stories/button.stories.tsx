import React from "react";
import { Button, ButtonProps } from "@chakra-ui/react";
import { Meta, Story } from "@storybook/react";

export default {
  title: "Button",
  component: Button,
} as Meta;

const Template: Story<ButtonProps> = (args) => (
  <Button {...args}>Button</Button>
);

export const Primary = Template.bind({});
Primary.args = { colorScheme: "blue" };

export const Secondary = Template.bind({});
Secondary.args = { ...Primary.args, variant: "outline" };
