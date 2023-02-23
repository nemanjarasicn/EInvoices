import * as React from 'react';
import { Theme, useTheme } from '@mui/material/styles';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import { Controller } from 'react-hook-form';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { useAppSelector } from '../../../../app/hooks';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

export default function MultipleSelect(props: any) {
  const data: any[] = useAppSelector(props.props.selector);
  const theme = useTheme();
  const [selectedItem, setSelectedItem] = React.useState<string[]>([]);

  return (
    <div>
      <Controller
        control={props.props.control}
        name={props.props.name}
        render={({ field: { onChange, value }, fieldState: { error } }) => (
          <FormControl sx={{ m: 1, width: 500 }}>
            <InputLabel id="demo-multiple-name-label">Kompanija</InputLabel>
            <Select
              labelId="demo-multiple-name-label"
              id="demo-multiple-name"
              multiple
              value={value}
              onChange={onChange}
              input={<OutlinedInput label="Kompanija" />}
              MenuProps={MenuProps}
            >
              {data.map((item) => (
                <MenuItem
                  key={item.value}
                  value={item.item.main.idCompany}
                  //style={getStyles(name, personName, theme)}
                >
                  {item.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        )}
      />
    </div>
  );
}
