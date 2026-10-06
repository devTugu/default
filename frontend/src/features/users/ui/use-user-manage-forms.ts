"use client";

import { useEffect, useMemo } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslations } from "next-intl";
import {
  createUserSchema,
  updateUserSchema,
  type CreateUserFormValues,
  type UpdateUserFormValues,
  type UserOutput,
} from "@/entities/user";

interface UseUserManageFormsParams {
  open: boolean;
  isCreate: boolean;
  user: UserOutput | null;
}

export function useUserManageForms({
  open,
  isCreate,
  user,
}: UseUserManageFormsParams) {
  const tVal = useTranslations("validation");

  const validationMessages = useMemo(
    () => ({
      invalidEmail: tVal("invalidEmail"),
      passwordMinLength: tVal("passwordMinLength"),
    }),
    [tVal],
  );

  const createSchema = useMemo(
    () => createUserSchema(validationMessages),
    [validationMessages],
  );

  const updateSchema = useMemo(
    () => updateUserSchema(validationMessages),
    [validationMessages],
  );

  const createForm = useForm<CreateUserFormValues>({
    resolver: zodResolver(createSchema),
    defaultValues: { email: "", password: "", isActive: true },
  });

  const editForm = useForm<UpdateUserFormValues>({
    resolver: zodResolver(updateSchema),
    defaultValues: { password: "", isActive: true },
  });

  useEffect(() => {
    if (!open) return;
    if (isCreate) {
      createForm.reset({ email: "", password: "", isActive: true });
      return;
    }
    if (user) {
      editForm.reset({ password: "", isActive: user.isActive });
    }
  }, [open, isCreate, user, createForm, editForm]);

  return { createForm, editForm };
}
