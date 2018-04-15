// @flow

import { Component, type Node } from "react";
import { format, addMonths, subMonths, startOfMonth } from "date-fns";

import { parseDate, withinRange } from "./utils";

type Props = {
  format: string,
  value: Date,
  onChange: Date => void,
  range: { start: Date | null, end: Date | null },
  render: ({
    inputProps: {
      onFocus: () => void,
      onBlur: () => void,
      value: string,
      onChange: (SyntheticInputEvent<*>) => void,
    },
    calendarProps: { onMouseDown: (SyntheticMouseEvent<*>) => void },
    isOpen: boolean,
    open: () => void,
    close: () => void,
    selectedDate: Date | null,
    onSelect: Date => void,
    viewportDate: Date | null,
    onPrevMonth: () => void,
    onNextMonth: () => void,
  }) => Node,
};

type State = {
  editing: {
    inputValue: string,
    calendarValue: Date,
    viewportDate: Date,
  } | null,
};

class SaveTheDate extends Component<Props, State> {
  state = { editing: null };

  static defaultProps = {
    range: { start: null, end: null },
    format: "YYYY-MM-DD",
  };

  onChange = (date: Date) => {
    if (withinRange(date, this.props.range)) {
      this.props.onChange(date);
    }
  };

  setEditing = (date: Date) => {
    this.setState({
      editing: {
        inputValue: this.format(date),
        calendarValue: date,
        viewportDate: startOfMonth(date),
      },
    });
  };

  open = () => this.setEditing(this.props.value);

  close = () => {
    if (this.state.editing) {
      const { calendarValue } = this.state.editing;
      this.setState({ editing: null }, () => this.onChange(calendarValue));
    }
  };

  handleInput = (e: SyntheticInputEvent<*>) => {
    if (this.state.editing) {
      const date = this.parse(e.target.value);
      if (date !== null) {
        this.setEditing(date);
      } else {
        this.setState({
          editing: { ...this.state.editing, inputValue: e.target.value },
        });
      }
    }
  };

  onSelect = (date: Date) => this.setEditing(date);

  handleIncMonth = () => {
    if (this.state.editing) {
      this.setState({
        editing: {
          ...this.state.editing,
          viewportDate: addMonths(this.state.editing.viewportDate, 1),
        },
      });
    }
  };

  handleDecMonth = () => {
    if (this.state.editing) {
      this.setState({
        editing: {
          ...this.state.editing,
          viewportDate: subMonths(this.state.editing.viewportDate, 1),
        },
      });
    }
  };

  format = (date: Date) => format(date, this.props.format);

  parse = (string: string) => parseDate(string, this.props.format);

  render() {
    const { editing } = this.state;
    const { value, render } = this.props;

    return render({
      inputProps: {
        onFocus: this.open,
        onBlur: this.close,
        value: editing ? editing.inputValue : this.format(value),
        onChange: this.handleInput,
      },
      calendarProps: { onMouseDown: e => e.preventDefault() },
      isOpen: Boolean(editing),
      open: this.open,
      close: this.close,
      selectedDate: editing && editing.calendarValue,
      onSelect: this.onSelect,
      viewportDate: editing && editing.viewportDate,
      onPrevMonth: this.handleDecMonth,
      onNextMonth: this.handleIncMonth,
    });
  }
}

export default SaveTheDate;
