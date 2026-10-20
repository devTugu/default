// @ts-nocheck
"use client";

import { useEffect, useMemo, useState } from "react";
import { format, addMonths } from "date-fns";
import { Calendar } from "@default/ui/primitives/calendar";
import i18n from "i18next";
import { initReactI18next, useTranslation } from "react-i18next";
import { cn } from "@default/ui/lib/cn";
import { Button } from "@default/ui/primitives/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@default/ui/primitives/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@default/ui/primitives/dropdown-menu";
import {
  CalendarIcon,
  ChevronDownIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from "lucide-react";
import { Input } from "@default/ui/primitives/input";

export interface DateSelectorValue {
  period: "day" | "month" | "year";
  date?: Date;
  month?: number; // 0-11
  year?: number;
}

export interface DateSelectorI18nConfig {
  apply: string;
  cancel: string;
  periodTypes: {
    day: string;
    month: string;
    year: string;
  };
  months: string[];
  monthsShort: string[];
  placeholder: string;
}

export const DEFAULT_DATE_SELECTOR_I18N: DateSelectorI18nConfig = {
  apply: "Apply",
  cancel: "Cancel",
  periodTypes: {
    day: "Day",
    month: "Month",
    year: "Year",
  },
  months: [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ],
  monthsShort: [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ],
  placeholder: "Select date...",
};

export function formatDateValue(
  value: DateSelectorValue,
  i18n: DateSelectorI18nConfig,
  dateFormat: string,
): string {
  const formatSingleDate = (d: Date) => {
    try {
      return format(d, dateFormat);
    } catch {
      return "";
    }
  };

  const { period } = value;

  if (period === "day") {
    return value.date ? formatSingleDate(value.date) : "";
  }

  const yearStr = value.year ? ` ${value.year}` : "";

  if (period === "month") {
    const monthName = value.month !== undefined ? i18n.months[value.month] : "";
    return `${monthName}${yearStr}`;
  }

  if (period === "year") {
    return value.year ? `${value.year}` : "";
  }

  return "";
}

interface DateSelectorProps {
  value?: DateSelectorValue;
  onChange?: (value: DateSelectorValue | undefined) => void;
  i18n: DateSelectorI18nConfig;
  dayDateFormat?: string;
  weekStartsOn?: 0 | 1 | 2 | 3 | 4 | 5 | 6;
}

export function DateSelector({
  value,
  onChange,
  i18n,
  dayDateFormat,
  weekStartsOn = 0,
}: DateSelectorProps) {
  const activeValue = useMemo<DateSelectorValue>(() => {
    return (
      value || {
        period: "day",
        year: new Date().getFullYear(),
        month: new Date().getMonth(),
        date: new Date(),
      }
    );
  }, [value]);

  const [localYear, setLocalYear] = useState<number>(
    activeValue.year || new Date().getFullYear(),
  );
  const [currentMonth, setCurrentMonth] = useState<Date>(
    activeValue.date || new Date(),
  );

  // Keep currentMonth and localYear in sync when value changes
  useEffect(() => {
    if (activeValue.date) {
      setCurrentMonth(activeValue.date);
    } else if (
      activeValue.year !== undefined &&
      activeValue.month !== undefined
    ) {
      setCurrentMonth(new Date(activeValue.year, activeValue.month, 1));
    }
    if (activeValue.year !== undefined) {
      setLocalYear(activeValue.year);
    }
  }, [activeValue.date, activeValue.year, activeValue.month]);

  const handlePeriodChange = (per: DateSelectorValue["period"]) => {
    updateValue({ period: per });
  };

  const updateValue = (updater: Partial<DateSelectorValue>) => {
    const nextValue: DateSelectorValue = {
      ...activeValue,
      ...updater,
    };

    if ("date" in updater) {
      if (updater.date) {
        nextValue.year = updater.date.getFullYear();
        nextValue.month = updater.date.getMonth();
      } else {
        nextValue.date = undefined;
      }
    } else if (updater.year !== undefined || updater.month !== undefined) {
      const baseDate = activeValue.date || new Date();
      const newYear =
        updater.year !== undefined
          ? updater.year
          : (activeValue.year ?? baseDate.getFullYear());
      const newMonth =
        updater.month !== undefined
          ? updater.month
          : (activeValue.month ?? baseDate.getMonth());

      const targetDay = baseDate.getDate();
      const newDate = new Date(baseDate);
      newDate.setDate(1);
      newDate.setFullYear(newYear);
      newDate.setMonth(newMonth);

      const maxDays = new Date(newYear, newMonth + 1, 0).getDate();
      const safeDay = Math.min(targetDay, maxDays);
      newDate.setDate(safeDay);

      nextValue.date = newDate;
      nextValue.year = newYear;
      nextValue.month = newMonth;
    }

    onChange?.(nextValue);
  };

  const handlePrev = () => {
    if (activeValue.period === "day") {
      setCurrentMonth((prev) => addMonths(prev, -1));
    } else {
      const newY = localYear - 1;
      setLocalYear(newY);
      updateValue({ year: newY });
    }
  };

  const handleNext = () => {
    if (activeValue.period === "day") {
      setCurrentMonth((prev) => addMonths(prev, 1));
    } else {
      const newY = localYear + 1;
      setLocalYear(newY);
      updateValue({ year: newY });
    }
  };

  const periodOptions = [
    { value: "day", label: i18n.periodTypes.day },
    { value: "month", label: i18n.periodTypes.month },
    { value: "year", label: i18n.periodTypes.year },
  ] as const;

  return (
    <div className="flex flex-col gap-4 w-full bg-background text-foreground">
      {/* Input display */}
      <div className="w-full">
        <Input
          type="text"
          readOnly
          value={
            value
              ? formatDateValue(value, i18n, dayDateFormat || "MM/dd/yyyy")
              : ""
          }
          placeholder={i18n.placeholder}
          className="w-full h-9"
        />
      </div>

      {/* Period Selection & Navigation arrows */}
      <div className="flex items-center justify-between gap-4">
        {/* Period Pills */}
        <div className="flex items-center gap-1 p-1 bg-muted rounded-lg w-fit border border-border/40">
          {periodOptions.map((opt) => {
            const isActive = activeValue.period === opt.value;
            return (
              <Button
                key={opt.value}
                type="button"
                variant={isActive ? "secondary" : "ghost"}
                size="sm"
                onClick={() => handlePeriodChange(opt.value)}
                className={cn(
                  "px-3.5 py-1 text-sm rounded-md transition-all font-medium cursor-pointer h-7",
                  isActive
                    ? "bg-background text-foreground shadow-xs border border-border/20 hover:bg-background hover:text-foreground"
                    : "text-muted-foreground hover:text-foreground hover:bg-background/50",
                )}
              >
                {opt.label}
              </Button>
            );
          })}
        </div>

        {/* Prev / Next navigation arrows */}
        <div className="flex items-center gap-2">
          <Button
            type="button"
            variant="ghost"
            size="icon"
            onClick={handlePrev}
            className="h-8 w-8 text-muted-foreground hover:text-foreground cursor-pointer"
          >
            <ChevronLeftIcon className="size-4" />
          </Button>
          <Button
            type="button"
            variant="ghost"
            size="icon"
            onClick={handleNext}
            className="h-8 w-8 text-muted-foreground hover:text-foreground cursor-pointer"
          >
            <ChevronRightIcon className="size-4" />
          </Button>
        </div>
      </div>

      {/* Picker content wrapper */}
      <div className="flex flex-col items-center justify-center rounded-lg mt-1 w-full overflow-hidden">
        {activeValue.period === "day" && (
          <div className="w-full flex justify-center">
            <Calendar
              mode="single"
              selected={activeValue.date}
              onSelect={(d) => updateValue({ date: d })}
              weekStartsOn={weekStartsOn}
              numberOfMonths={1}
              month={currentMonth}
              onMonthChange={setCurrentMonth}
              className="rounded-md border-0 p-0"
              classNames={{
                nav: "hidden",
                months: "w-full",
                month: "space-y-4 w-full",
                caption_label:
                  "text-sm font-semibold text-foreground text-center w-full block",
                weekday:
                  "text-muted-foreground rounded-md w-9 font-normal text-[0.8rem]",
                day: "h-9 w-9 text-center p-0 relative [&:has([data-selected])]:bg-transparent focus-within:relative focus-within:z-20",
              }}
            />
          </div>
        )}

        {activeValue.period === "month" && (
          <div className="w-full flex flex-col gap-4 max-w-md bg-muted/10 p-4 border border-border rounded-xl">
            <div className="text-center font-semibold text-sm text-foreground">
              {localYear}
            </div>
            <div className="grid grid-cols-3 gap-2">
              {i18n.monthsShort.map((mShort, index) => {
                const isSelected =
                  activeValue.month === index && activeValue.year === localYear;
                return (
                  <Button
                    key={index}
                    type="button"
                    variant={isSelected ? "default" : "outline"}
                    className={cn(
                      "h-10 text-xs border-input cursor-pointer rounded-lg",
                      isSelected
                        ? "bg-primary text-primary-foreground hover:bg-primary/90"
                        : "text-foreground bg-transparent hover:bg-accent hover:text-accent-foreground",
                    )}
                    onClick={() =>
                      updateValue({ month: index, year: localYear })
                    }
                  >
                    {mShort}
                  </Button>
                );
              })}
            </div>
          </div>
        )}

        {activeValue.period === "year" && (
          <div className="w-full flex flex-col gap-4 max-w-md bg-muted/10 p-4 border border-border rounded-xl">
            <div className="text-center text-sm text-muted-foreground font-medium">
              Select Year
            </div>
            <div className="grid grid-cols-3 gap-2">
              {Array.from({ length: 9 }).map((_, i) => {
                const yearNum = localYear - 4 + i;
                const isSelected = activeValue.year === yearNum;
                return (
                  <Button
                    key={yearNum}
                    type="button"
                    variant={isSelected ? "default" : "outline"}
                    className={cn(
                      "h-10 text-sm border-input cursor-pointer rounded-lg",
                      isSelected
                        ? "bg-primary text-primary-foreground hover:bg-primary/90"
                        : "text-foreground bg-transparent hover:bg-accent hover:text-accent-foreground",
                    )}
                    onClick={() => {
                      setLocalYear(yearNum);
                      updateValue({ year: yearNum });
                    }}
                  >
                    {yearNum}
                  </Button>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// Helper function to create i18n config from translations
function createI18nConfig(
  translations: Partial<DateSelectorI18nConfig>,
): DateSelectorI18nConfig {
  return { ...DEFAULT_DATE_SELECTOR_I18N, ...translations };
}

// Language-specific translations
const translations: Record<string, Partial<DateSelectorI18nConfig>> = {
  zh: {
    apply: "确定",
    cancel: "取消",
    periodTypes: {
      day: "日",
      month: "月",
      year: "年",
    },
    months: [
      "一月",
      "二月",
      "三月",
      "四月",
      "五月",
      "六月",
      "七月",
      "八月",
      "九月",
      "十月",
      "十一月",
      "十二月",
    ],
    monthsShort: [
      "1月",
      "2月",
      "3月",
      "4月",
      "5月",
      "6月",
      "7月",
      "8月",
      "9月",
      "10月",
      "11月",
      "12月",
    ],
    placeholder: "选择日期...",
  },
  fr: {
    apply: "Appliquer",
    cancel: "Annuler",
    periodTypes: {
      day: "Jour",
      month: "Mois",
      year: "Année",
    },
    months: [
      "Janvier",
      "Février",
      "Mars",
      "Avril",
      "Mai",
      "Juin",
      "Juillet",
      "Août",
      "Septembre",
      "Octobre",
      "Novembre",
      "Décembre",
    ],
    monthsShort: [
      "Jan",
      "Fév",
      "Mar",
      "Avr",
      "Mai",
      "Juin",
      "Juil",
      "Aoû",
      "Sep",
      "Oct",
      "Nov",
      "Déc",
    ],
    placeholder: "Sélectionner une date...",
  },
};

const resources = {
  en: { translation: DEFAULT_DATE_SELECTOR_I18N },
  zh: { translation: createI18nConfig(translations.zh) },
  fr: { translation: createI18nConfig(translations.fr) },
};

if (!i18n.isInitialized) {
  i18n.use(initReactI18next).init({
    resources,
    lng: "fr",
    fallbackLng: "en",
    interpolation: {
      escapeValue: false,
    },
  });
}

// Language metadata
const languageMetadata = {
  en: {
    label: "English",
    flag: "https://images.shadcnspace.com/assets/flags/flag-us.svg",
    dateFormat: "MM/dd/yyyy",
    weekStartsOn: 0 as const,
    ui: {
      label: "Due date",
      placeholder: "Select a date",
    },
  },
  zh: {
    label: "中文",
    flag: "https://images.shadcnspace.com/assets/flags/flag-china.svg",
    dateFormat: "yyyy/MM/dd",
    weekStartsOn: 1 as const,
    ui: {
      label: "截止日期",
      placeholder: "请选择日期",
    },
  },
  fr: {
    label: "Français",
    flag: "https://images.shadcnspace.com/assets/flags/flag-france.svg",
    dateFormat: "dd/MM/yyyy",
    weekStartsOn: 1 as const,
    ui: {
      label: "Date d'échéance",
      placeholder: "Sélectionner une date",
    },
  },
};

// Language options for the selector
const languageOptions = Object.entries(languageMetadata).map(
  ([value, meta]) => ({
    value,
    label: meta.label,
    flag: meta.flag,
  }),
);

export default function Pattern() {
  const { t, i18n: i18nInstance } = useTranslation();
  const [value, setValue] = useState<DateSelectorValue | undefined>();
  const [open, setOpen] = useState(false);
  const [internalValue, setInternalValue] = useState<
    DateSelectorValue | undefined
  >(value);
  const [currentLanguage, setCurrentLanguage] =
    useState<keyof typeof languageMetadata>("fr");

  // Sync language with i18n instance
  useEffect(() => {
    i18nInstance.changeLanguage(currentLanguage);
  }, [currentLanguage, i18nInstance]);

  // Get current language metadata and i18n config
  const currentMeta = useMemo(
    () => languageMetadata[currentLanguage] || languageMetadata.en,
    [currentLanguage],
  );

  const currentI18n = useMemo<DateSelectorI18nConfig>(() => {
    return {
      apply: t("apply"),
      cancel: t("cancel"),
      periodTypes: {
        day: t("periodTypes.day"),
        month: t("periodTypes.month"),
        year: t("periodTypes.year"),
      },
      months: t("months", { returnObjects: true }) as string[],
      monthsShort: t("monthsShort", { returnObjects: true }) as string[],
      placeholder: t("placeholder"),
    };
  }, [t]);

  useEffect(() => {
    if (open) {
      setInternalValue(value);
    }
  }, [open, value]);

  const formattedValue = useMemo(
    () =>
      value ? formatDateValue(value, currentI18n, currentMeta.dateFormat) : "",
    [value, currentI18n, currentMeta.dateFormat],
  );

  const displayText = formattedValue || currentMeta.ui.placeholder;

  const handleApply = () => {
    setValue(internalValue);
    setOpen(false);
  };

  const handleCancel = () => {
    setInternalValue(value);
    setOpen(false);
  };

  return (
    <div className="flex h-full w-full grow items-center justify-center gap-3">
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger
          render={
            <Button
              variant="outline"
              className="w-56 justify-start cursor-pointer"
            >
              <CalendarIcon />
              {displayText}
            </Button>
          }
        />
        <DialogContent
          className="w-full h-full max-h-none sm:h-auto max-w-full sm:max-w-95 p-6 bg-background rounded-none sm:rounded-xl border-0 sm:border border-border/80 text-foreground overflow-y-auto sm:overflow-visible"
          showCloseButton={false}
        >
          <DialogHeader className="space-y-1.5 text-left">
            <DialogTitle className="text-foreground text-lg font-semibold tracking-tight">
              {currentMeta.ui.label}
            </DialogTitle>
          </DialogHeader>
          <DateSelector
            value={internalValue}
            onChange={setInternalValue}
            i18n={currentI18n}
            dayDateFormat={currentMeta.dateFormat}
            weekStartsOn={currentMeta.weekStartsOn}
          />
          <DialogFooter className="mt-4 flex items-center justify-end gap-2.5 -mx-6 -mb-6">
            <DialogClose
              render={
                <Button
                  variant="outline"
                  onClick={handleCancel}
                  className="border-input text-foreground hover:bg-accent hover:text-accent-foreground rounded-lg cursor-pointer"
                >
                  {currentI18n.cancel}
                </Button>
              }
            />
            <Button
              onClick={handleApply}
              className="bg-primary text-primary-foreground hover:bg-primary/80 border-0 rounded-lg font-medium cursor-pointer"
            >
              {currentI18n.apply}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <DropdownMenu>
        <DropdownMenuTrigger
          render={
            <Button
              variant="outline"
              className="flex items-center gap-2 cursor-pointer"
            >
              {currentMeta.flag.startsWith("http") ? (
                <img
                  src={currentMeta.flag}
                  alt=""
                  className="h-3.5 w-5 object-cover rounded-xs shrink-0"
                />
              ) : (
                <span>{currentMeta.flag}</span>
              )}
              <span>{currentMeta.label}</span>
              <ChevronDownIcon />
            </Button>
          }
        />
        <DropdownMenuContent align="end">
          {languageOptions.map((lang) => (
            <DropdownMenuItem
              key={lang.value}
              onClick={() =>
                setCurrentLanguage(
                  lang.value as keyof typeof languageMetadata,
                )
              }
              className="flex items-center gap-2 cursor-pointer"
            >
              {lang.flag.startsWith("http") ? (
                <img
                  src={lang.flag}
                  alt=""
                  className="h-3.5 w-5 object-cover rounded-xs shrink-0"
                />
              ) : (
                <span>{lang.flag}</span>
              )}
              <span>{lang.label}</span>
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
