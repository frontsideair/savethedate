// @flow

import {
  format,
  parse,
  isValid,
  eachDay,
  startOfWeek,
  lastDayOfWeek,
  startOfMonth,
  lastDayOfMonth,
  isBefore,
  isAfter,
  isWithinRange,
} from "date-fns";

export function parseDate(date: string, fmt: string): Date | null {
  const parsed = parse(date);

  if (!isValid(parsed) || format(parsed, fmt) !== date) {
    return null;
  }

  return parsed;
}

export function withinRange(date: Date, { start, end }: { start: Date | null, end: Date | null }) {
  if (start === null) {
    if (end === null) {
      return true;
    } else {
      return isBefore(date, end);
    }
  } else {
    if (end === null) {
      return isAfter(date, start);
    } else {
      return isWithinRange(date, start, end);
    }
  }
}

export function daysOfMonth(date: Date): Date[] {
  return eachDay(startOfWeek(startOfMonth(date)), lastDayOfWeek(lastDayOfMonth(date)));
}
