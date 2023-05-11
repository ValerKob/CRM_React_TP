import React, { forwardRef } from 'react';
import DatePicker, { registerLocale } from 'react-datepicker';
import classNames from 'classnames';
import ru from 'date-fns/locale/ru';
registerLocale('ru', ru);

interface DatepickerInputProps {
  onClick?: () => void;
  value?: string;
  inputClass: string;
  placeholder?: string;
  children?: React.ReactNode;
  onChange?: () => void;
}

/* Datepicker with Input */
const DatepickerInput = forwardRef<HTMLInputElement, DatepickerInputProps>(
  ({ value, onClick, onChange, inputClass, placeholder }, ref) => {
    return (
      <input
        type="text"
        className={classNames('form-control', inputClass)}
        onClick={onClick}
        value={value}
        placeholder={placeholder}
        onChange={onChange}
        ref={ref}
      />
    );
  }
);

/* Datepicker with Addon Input */
const DatepickerInputWithAddon = forwardRef<
  HTMLInputElement,
  DatepickerInputProps
>((props, ref) => (
  <div className="input-group input-group-sm" ref={ref}>
    <input
      type="text"
      className={classNames('form-control', props.inputClass)}
      onClick={props.onClick}
      value={props.value}
      readOnly
    />
    <span className="input-group-text bg-blue border-blue text-white">
      <i className="mdi mdi-calendar-range"></i>
    </span>
  </div>
));

interface HyperDatepickerProps {
  value: Date | null;
  onChange: (date: any) => void;
  hideAddon?: boolean;
  inputClass?: string;
  dateFormat?: string;
  minDate?: Date;
  maxDate?: Date;
  showTimeSelect?: boolean;
  showMonthDropdown?: boolean;
  showYearDropdown?: boolean;
  dropdownMode?: 'scroll' | 'select' | undefined;
  locale?: string;
  tI?: number;
  timeCaption?: string;
  timeFormat?: string;
  showTimeSelectOnly?: boolean;
  monthsShown?: number;
  inline?: boolean;
  placeholder?: string;
}

const HyperDatepicker = (props: HyperDatepickerProps) => {
  // handle custom input
  const input =
    (props.hideAddon || false) === true ? (
      <DatepickerInput
        inputClass={props.inputClass!}
        placeholder={props.placeholder}
      />
    ) : (
      <DatepickerInputWithAddon inputClass={props.inputClass!} />
    );

  return (
    <>
      {/* date picker control */}
      <DatePicker
        customInput={input}
        timeIntervals={props.tI}
        selected={props.value}
        onChange={(date) => props.onChange(date)}
        showTimeSelect={props.showTimeSelect}
        timeFormat={props.timeFormat || 'hh:mm a'}
        timeCaption={props.timeCaption}
        dateFormat={props.dateFormat || 'MM/dd/yyyy'}
        minDate={props.minDate}
        maxDate={props.maxDate}
        locale={props.locale}
        showMonthDropdown={props.showMonthDropdown}
        showYearDropdown={props.showYearDropdown}
        dropdownMode={props.dropdownMode}
        monthsShown={props.monthsShown}
        showTimeSelectOnly={props.showTimeSelectOnly}
        inline={props.inline}
        autoComplete="off"
        placeholderText={props.placeholder}
      />
    </>
  );
};

export default HyperDatepicker;
