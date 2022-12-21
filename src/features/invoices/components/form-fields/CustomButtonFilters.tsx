import * as React from "react";
import clsx from "clsx";
import { ButtonUnstyledProps, useButton } from "@mui/base/ButtonUnstyled";
import { styled } from "@mui/system";
import Stack from "@mui/material/Stack";
import FilterModal from "../FilterModal";
import { useTranslation } from "react-i18next";
import { useAppDispatch, useAppSelector } from "../../../../app/hooks";
import  { setopenModalFilter }  from  "../../store/invoice.reducer"
import  { selectOpenFilter  }  from   "../../store/invoice.selectors"

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
  border-radius: 10px;
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

export interface ButtonPropsFilters {
    filterTitle: string;
    transformedTitle: string;
    type: FilterType;
    multiOption?: boolean;
    filterItems: FillterItem[];
    parentFn?: Function;
    paramKey: string;
    soloValue?: any;
    filterId?:  number;
}
// TODO MAX Factory
interface ButtonFilterProps {
  groupButton?: ButtonPropsFilters[];
  soloButton?: ButtonPropsFilters;
}

export interface FillterItem {
    index: number;
    name: string;
    value: string | any;
  }

type FilterType = "solo" | "multi" | "date";

export default function CustomButtonFilters({
  soloButton,
  groupButton,
}: ButtonFilterProps): JSX.Element {
  const { t } = useTranslation();
  const dispach = useAppDispatch();
  

  return (
    <>
    
      {groupButton && (
        <Stack spacing={2} direction="row">
          {groupButton.filter((item)  => item.filterId === 2  ||   item.filterId ===   3 ).map((button: ButtonPropsFilters, index: number) => {
            return (
              <CustomButton
                key={index}
                onClick={async ()  =>  await dispach(setopenModalFilter({open: true, filterName: t(button.filterTitle)}))}
                //disabled={button.disabled}
              >
                {t(button.filterTitle)}
              </CustomButton>
            );
          })}
        </Stack>
      )}
      {soloButton && (
        <CustomButton //onClick={soloButton.btnFn} 
                      //disabled={soloButton.disabled}
        >
          {t(soloButton.filterTitle)}
        </CustomButton>
      )}
    </>
  );
}
