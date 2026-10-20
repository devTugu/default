// @ts-nocheck
"use client";

import { useState } from "react";
import { Trash2 } from "lucide-react";
import { Button } from "@default/ui/primitives/button";
import { Avatar, AvatarFallback, AvatarImage } from "@default/ui/primitives/avatar";
import { Checkbox } from "@default/ui/primitives/checkbox";
import {
  Field,
  FieldGroup,
  FieldLabel,
  FieldTitle,
} from "@default/ui/primitives/field";

const initialUsers = [
  {
    id: "user-1",
    name: "Emma Wilson",
    avatar: "https://images.shadcnspace.com/assets/profiles/user-1.jpg",
    initials: "EW",
    defaultChecked: true,
  },
  {
    id: "user-2",
    name: "James Miller",
    avatar: "https://images.shadcnspace.com/assets/profiles/user-2.jpg",
    initials: "JM",
    defaultChecked: false,
  },
  {
    id: "user-3",
    name: "Sophia Davis",
    avatar: "https://images.shadcnspace.com/assets/profiles/user-3.jpg",
    initials: "SD",
    defaultChecked: true,
  },
];

export function Pattern() {
  const [users, setUsers] = useState(initialUsers);
  const [checkedUsers, setCheckedUsers] = useState<Record<string, boolean>>(
    () =>
      initialUsers.reduce(
        (acc, user) => {
          acc[user.id] = user.defaultChecked;
          return acc;
        },
        {} as Record<string, boolean>,
      ),
  );

  const handleCheckedChange = (id: string, checked: boolean) => {
    setCheckedUsers((prev) => ({
      ...prev,
      [id]: checked,
    }));
  };

  const handleDeleteSelected = () => {
    setUsers((prev) => prev.filter((user) => !checkedUsers[user.id]));
  };

  const selectedCount = users.filter((user) => checkedUsers[user.id]).length;

  return (
    <div className="flex flex-col gap-3 w-full max-w-xs">
      <div className="flex items-center justify-between pb-1">
        <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
          Members ({users.length})
        </span>
        <Button
          variant="ghost"
          size="sm"
          onClick={handleDeleteSelected}
          disabled={selectedCount === 0}
          className="h-8 text-destructive hover:text-destructive hover:bg-destructive/10 gap-2 px-2.5 cursor-pointer"
        >
          <Trash2 className="size-3.5" />
          <span className="text-xs">Delete Selected</span>
        </Button>
      </div>

      {users.length === 0 ? (
        <div className="text-center py-6 text-sm text-muted-foreground border border-dashed rounded-lg">
          No members remaining
        </div>
      ) : (
        <FieldGroup className="w-full gap-4">
          {users.map((user) => (
            <FieldLabel key={user.id} className="relative p-0 cursor-pointer">
              <Field orientation="horizontal">
                <FieldTitle className="flex items-center gap-2">
                  <Avatar>
                    <AvatarImage src={user.avatar} alt={user.name} />
                    <AvatarFallback>{user.initials}</AvatarFallback>
                  </Avatar>
                  <div className="flex flex-col items-start">
                    <span className="text-sm font-medium">{user.name}</span>
                  </div>
                </FieldTitle>
                <Checkbox
                  checked={checkedUsers[user.id] || false}
                  onCheckedChange={(checked) =>
                    handleCheckedChange(user.id, !!checked)
                  }
                />
              </Field>
            </FieldLabel>
          ))}
        </FieldGroup>
      )}
    </div>
  );
}

export default Pattern;