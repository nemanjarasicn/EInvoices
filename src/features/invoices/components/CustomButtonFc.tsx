import * as React from "react";
import clsx from "clsx";
import { ButtonUnstyledProps, useButton } from "@mui/base/ButtonUnstyled";
import { styled } from "@mui/system";
import Stack from "@mui/material/Stack";

const red = {
  600: "rgb(231, 49, 79)",
};

const CustomButtonRoot = styled("button")`
  font-family: IBM Plex Sans, sans-serif;
  font-weight: bold;
  font-size: 0.875rem;
  background-color: white;
  padding: 12px 24px;
  border-radius: 12px;
  color: black;
  transition: all 150ms ease;
  cursor: pointer;
  border: 1px solid ${red[600]};
  width: 220px;
  &:hover {
    background-color: ${red[600]};
  }

  &.active {
    background-color: white;
  }

  &.focusVisible {
    box-shadow: 0 4px 20px 0 rgba(61, 71, 82, 0.1),
      0 0 0 5px rgba(0, 127, 255, 0.5);
    outline: none;
  }

  &.disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const CustomButton = React.forwardRef(function CustomButton(
  props: ButtonUnstyledProps,
  ref: React.ForwardedRef<any>
) {
  const { children } = props;
  const { active, disabled, focusVisible, getRootProps } = useButton({
    ...props,
    ref,
  });

  const classes = {
    active,
    disabled,
    focusVisible,
  };

  return (
    <CustomButtonRoot {...getRootProps()} className={clsx(classes)}>
      {children}
    </CustomButtonRoot>
  );
});

interface ButtonFcProps {
  disabled?: boolean;
  btnFn?: () => void;
}

export default function CustomButtonFc({}: ButtonFcProps[]): JSX.Element {
  return (
    <Stack spacing={2} direction="row">
      <CustomButton onClick={() => console.log("click!")}>Button</CustomButton>
      <CustomButton disabled>Disabled</CustomButton>
    </Stack>
  );
}
