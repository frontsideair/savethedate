// @flow

import format from "date-fns/format";
import parse from "date-fns/parse";
import isValid from "date-fns/is_valid";
import eachDay from "date-fns/each_day";
import startOfWeek from "date-fns/start_of_week";
import lastDayOfWeek from "date-fns/last_day_of_week";
import startOfMonth from "date-fns/start_of_month";
import lastDayOfMonth from "date-fns/last_day_of_month";
import isBefore from "date-fns/is_before";
import isAfter from "date-fns/is_after";
import isWithinRange from "date-fns/is_within_range";

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
