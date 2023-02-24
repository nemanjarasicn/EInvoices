import * as React from 'react';
import clsx from 'clsx';
import { ButtonUnstyledProps, useButton } from '@mui/base/ButtonUnstyled';
import { styled } from '@mui/system';
import Stack from '@mui/material/Stack';

import { useTranslation } from 'react-i18next';
import { useAppDispatch } from '../../../../app/hooks';
import { setopenModalFilter } from '../../store/invoice.reducer';

const gray = {
  600: 'rgb(181 181 181)',
};

const paddingButton =
  window.devicePixelRatio === 1.5 ? '8px  15px' : '12px 24px';
const widthButton = window.devicePixelRatio === 1.5 ? '150px' : '220px';
const fontSizeButton = window.devicePixelRatio === 1.5 ? '10px' : '14px';

const CustomButtonRoot = styled('button')`
  font-family: IBM Plex Sans, sans-serif;
  font-weight: bold;
  font-size: ${fontSizeButton};
  background-color: white;
  padding: ${paddingButton};
  border-radius: 10px;
  color: #;
  transition: all 150ms ease;
  cursor: pointer;
  border: thin solid ${gray[600]};
  width: ${widthButton};
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
  filterId?: number;
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

type FilterType = 'solo' | 'multi' | 'date';

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
          {groupButton
            .filter((item) => item.filterId === 2 || item.filterId === 3)
            .map((button: ButtonPropsFilters, index: number) => {
              return (
                <CustomButton
                  key={index}
                  onClick={async () =>
                    await dispach(
                      setopenModalFilter({
                        open: true,
                        filterName: t(button.filterTitle),
                      })
                    )
                  }
                  //disabled={button.disabled}
                >
                  {t(button.filterTitle)}
                </CustomButton>
              );
            })}
        </Stack>
      )}
      {soloButton && <CustomButton>{t(soloButton.filterTitle)}</CustomButton>}
    </>
  );
}
