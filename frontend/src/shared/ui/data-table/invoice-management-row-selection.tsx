'use client';

import { Checkbox } from '@default/ui/primitives/checkbox';

export function InvoiceTableSelectHeader({
  table,
}: {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  table: any;
}) {
  const checked = table.getIsAllPageRowsSelected()
    ? true
    : table.getIsSomePageRowsSelected()
      ? 'indeterminate'
      : false;

  return (
    <Checkbox
      checked={checked}
      onCheckedChange={(value) => table.toggleAllPageRowsSelected(Boolean(value))}
      aria-label="Select all rows on page"
      className="cursor-pointer"
    />
  );
}

export function InvoiceTableSelectCell({
  row,
}: {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  row: any;
}) {
  return (
    <Checkbox
      checked={row.getIsSelected()}
      onCheckedChange={(value) => row.toggleSelected(Boolean(value))}
      aria-label="Select row"
      className="cursor-pointer"
    />
  );
}
