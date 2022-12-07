import * as React from "react";
import clsx from "clsx";
import { ButtonUnstyledProps, useButton } from "@mui/base/ButtonUnstyled";
import { styled } from "@mui/system";
import Stack from "@mui/material/Stack";
import { useTranslation } from "react-i18next";

const red = {
  600: "rgb(231, 49, 79)",
};
const gray = {
  600: "rgb(181 181 181)",
};

const CustomButtonRoot = styled("button")`
  font-family: IBM Plex Sans, sans-serif;
  font-weight: bold;
  font-size: 0.875rem;
  background-color: white;
  padding: 12px 24px;
  border-radius: 30px;
  color: black;
  transition: all 150ms ease;
  cursor: pointer;
  border: thin solid ${gray[600]};
  width: 220px;
  &:hover {
    background-color: ${gray[600]};
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

export interface ButtonProps {
  disabled: boolean;
  title: string;
  btnFn: () => void;
}
// TODO MAX Factory
interface ButtonFcProps {
  groupButton?: ButtonProps[];
  soloButton?: ButtonProps;
}

export interface SelectButtonProps {
  name: string;
  label: string;
  selector:  any;
}
// TODO MAX Factory
interface ButtonFcProps {
  groupButton?: ButtonProps[];
  soloButton?: ButtonProps;
}

export default function CustomButtonFc({
  soloButton,
  groupButton,
}: ButtonFcProps): JSX.Element {
  const { t } = useTranslation();
  return (
    <>
      {groupButton && (
        <Stack spacing={2} direction="row">
          {groupButton.map((button: ButtonProps, index: number) => {
            return (
              <CustomButton
                key={index}
                onClick={button.btnFn}
                disabled={button.disabled}
              >
                {t(button.title)}
              </CustomButton>
            );
          })}
        </Stack>
      )}
      {soloButton && (
        <CustomButton onClick={soloButton.btnFn} disabled={soloButton.disabled}>
          {t(soloButton.title)}
        </CustomButton>
      )}
    </>
  );
}
