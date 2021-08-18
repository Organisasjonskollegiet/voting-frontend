import React, { HTMLAttributes } from 'react';
import ReactDatePicker, { registerLocale } from 'react-datepicker';
import nb from 'date-fns/locale/nb';
import { Input, InputGroup, InputRightElement, useColorMode } from '@chakra-ui/react';
import CalendarIcon from './icon.svg';
import { inputStyle } from '../../particles/formStyles';

import 'react-datepicker/dist/react-datepicker.css';
import './date-picker.css';

interface Props {
  isClearable?: boolean;
  onChange: (date: Date) => void;
  selectedDate: Date | undefined;
  showPopperArrow?: boolean;
}

const CustomInput = (props: React.HTMLProps<HTMLInputElement>, ref: React.Ref<HTMLInputElement>) => {
  return (
    <InputGroup width="100%" sx={inputStyle}>
      <Input value={props.value} placeholder={props.placeholder} onClick={props.onClick} onChange={props.onChange} />
      <InputRightElement onClick={props.onClick} children={<img alt="calendar" src={CalendarIcon} />} />
    </InputGroup>
  );
};

const DatePicker: React.FC<Props & HTMLAttributes<HTMLElement>> = ({
  selectedDate,
  onChange,
  isClearable = false,
  showPopperArrow = false,
  ...props
}) => {
  const isLight = useColorMode().colorMode === 'light'; //you can check what theme you are using right now however you want
  registerLocale('nb', nb);
  return (
    // if you don't want to use chakra's colors or you just wwant to use the original ones,
    // set className to "light-theme-original" ↓↓↓↓
    <div className={isLight ? 'light-theme' : 'dark-theme'}>
      <ReactDatePicker
        dateFormat="HH:mm dd.MM.yyyy"
        selected={selectedDate}
        onChange={onChange}
        locale="nb"
        isClearable={isClearable}
        showPopperArrow={showPopperArrow}
        showTimeInput
        className="react-datapicker__input-text" //input is white by default and there is no already defined class for it so I created a new one
        customInput={React.createElement(React.forwardRef(CustomInput))}
      />
    </div>
  );
};

export default DatePicker;
