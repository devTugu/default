'use client';

import { Input } from '@/shared/ui/input';
import { cn } from '@/shared/lib/utils';

interface TotpCodeInputProps {
  id?: string;
  value: string;
  onChange: (value: string) => void;
  disabled?: boolean;
  autoFocus?: boolean;
  className?: string;
}

export function TotpCodeInput({
  id = 'totp-code',
  value,
  onChange,
  disabled = false,
  autoFocus = false,
  className,
}: TotpCodeInputProps) {
  return (
    <Input
      id={id}
      inputMode="numeric"
      autoComplete="one-time-code"
      maxLength={6}
      placeholder="000000"
      value={value}
      autoFocus={autoFocus}
      disabled={disabled}
      onChange={(event) => onChange(event.target.value.replace(/\D/g, '').slice(0, 6))}
      className={cn(
        'h-12 text-center font-mono text-2xl tracking-[0.45em] tabular-nums',
        className,
      )}
    />
  );
}
