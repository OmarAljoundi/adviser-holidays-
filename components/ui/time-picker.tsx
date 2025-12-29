"use client";

import React from "react";
import { TimeValue } from "react-aria";
import { TimeFieldStateOptions } from "react-stately";
import { TimeField } from "./time-field";

type TimePickerProps = Omit<TimeFieldStateOptions<TimeValue>, "locale">;

function TimePicker(props: TimePickerProps) {
  const { ...timeFieldProps } = props;
  return <TimeField {...timeFieldProps} />;
}

TimePicker.displayName = "TimePicker";

export { TimePicker };
