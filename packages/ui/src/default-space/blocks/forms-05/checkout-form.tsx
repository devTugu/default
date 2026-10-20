// @ts-nocheck
"use client";

import { useState } from "react";
import { CreditCard, Truck, Package, Banknote } from "lucide-react";
import { Button } from "@default/ui/primitives/button";
import { Input } from "@default/ui/primitives/input";
import { Label } from "@default/ui/primitives/label";
import { RadioGroup, RadioGroupItem } from "@default/ui/primitives/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@default/ui/primitives/select";
import { Separator } from "@default/ui/primitives/separator";
import { Field, FieldLabel } from "@default/ui/primitives/field";
import { Textarea } from "@default/ui/primitives/textarea";
import { cn } from "@default/ui/lib/cn";

const SectionHeader = ({
  step,
  title,
  description,
}: {
  step: number;
  title: string;
  description: string;
}) => (
  <div className="flex items-center gap-3">
    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
      <span className="font-semibold text-sm">{step}</span>
    </div>
    <div>
      <p className="text-xl font-medium tracking-tight text-foreground">
        {title}
      </p>
      <p className="text-sm text-muted-foreground">{description}</p>
    </div>
  </div>
);

const PayPalIcon = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 435.505 435.505"
    className={cn("fill-current text-muted-foreground", className)}
  >
    <path d="M403.496 101.917c-4.104-5.073-8.877-9.705-14.166-13.839.707 13.117-.508 27.092-3.668 41.884-8.627 40.413-29.256 74.754-59.656 99.304-30.375 24.533-68.305 37.502-109.686 37.502h-60.344l-19.533 91.512c-3.836 17.959-19.943 30.99-38.303 30.99H70.938l-4.898 22.484a19.6 19.6 0 0 0 3.887 16.453 19.58 19.58 0 0 0 15.25 7.298h66.498c9.24 0 17.225-6.459 19.152-15.495L193.667 313h76.188c36.854 0 70.527-11.464 97.384-33.152 26.869-21.697 45.129-52.186 52.807-88.162 7.776-36.377 2.207-66.58-16.55-89.769" />
    <path d="m117.292 354.191 22.84-107.008h76.188c36.852 0 70.527-11.465 97.383-33.154 26.867-21.697 45.129-52.186 52.809-88.161 7.773-36.378 2.207-66.58-16.553-89.769C331.952 13.832 301.17 0 269.633 0H103.639a19.585 19.585 0 0 0-19.135 15.414L12.505 345.938a19.583 19.583 0 0 0 19.135 23.749h66.5c9.24 0 17.22-6.458 19.152-15.496m60.943-278.9h52.229c12.287 0 23.274 5.149 30.145 14.129 7.297 9.539 9.431 22.729 5.853 36.188q-.069.256-.131.516c-6.57 27.73-33.892 50.291-60.898 50.291h-50.05z" />
  </svg>
);

const DELIVERY_OPTIONS = [
  {
    id: "standard",
    label: "Standard Delivery",
    desc: "3-5 business days",
    price: "Free",
  },
  {
    id: "express",
    label: "Express Delivery",
    desc: "1-2 business days",
    price: "$15.00",
  },
  {
    id: "sameday",
    label: "Same Day Delivery",
    desc: "Delivered before 8 PM today",
    price: "$29.00",
  },
];

const PAYMENT_OPTIONS = [
  {
    id: "card",
    label: "Credit Card",
    icon: CreditCard,
    iconClasses: "size-6 text-muted-foreground",
  },
  {
    id: "paypal",
    label: "PayPal",
    icon: PayPalIcon,
    iconClasses: "size-6 fill-current text-muted-foreground",
  },
  {
    id: "cod",
    label: "Cash on Delivery",
    icon: Banknote,
    iconClasses: "size-6 text-muted-foreground",
  },
];

const inputClasses =
  "bg-transparent border-border dark:border-border shadow-none focus-visible:ring-1";

const CheckoutForm = () => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [deliveryMethod, setDeliveryMethod] = useState("standard");
  const [paymentMethod, setPaymentMethod] = useState("card");

  const handleCheckout = () => {
    setIsProcessing(true);
    setTimeout(() => setIsProcessing(false), 2000);
  };

  return (
    <section className="py-12 lg:py-24 bg-background">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 w-full space-y-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <p className="text-2xl lg:text-3xl font-semibold tracking-tight text-foreground">
              Checkout
            </p>
            <p className="text-muted-foreground text-sm lg:text-base">
              Complete your order securely.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 lg:gap-16">
          {/* Main Checkout Area */}
          <div className="md:col-span-7 xl:col-span-8">
            <form className="flex flex-col space-y-12">
              {/* Step 1: Address */}
              <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                <SectionHeader
                  step={1}
                  title="Shipping Details"
                  description="Where should we send your order?"
                />
                <div className="space-y-6 md:pl-14">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <Field>
                      <FieldLabel
                        htmlFor="firstName"
                        className="text-muted-foreground"
                      >
                        First Name
                      </FieldLabel>
                      <Input
                        id="firstName"
                        placeholder="Sunil"
                        className={inputClasses}
                      />
                    </Field>
                    <Field>
                      <FieldLabel
                        htmlFor="lastName"
                        className="text-muted-foreground"
                      >
                        Last Name
                      </FieldLabel>
                      <Input
                        id="lastName"
                        placeholder="Joshi"
                        className={inputClasses}
                      />
                    </Field>
                  </div>
                  <Field>
                    <FieldLabel
                      htmlFor="address"
                      className="text-muted-foreground"
                    >
                      Address Line
                    </FieldLabel>
                    <Input
                      id="address"
                      placeholder="123 Creator St."
                      className={inputClasses}
                    />
                  </Field>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                    <Field className="sm:col-span-1">
                      <FieldLabel
                        htmlFor="city"
                        className="text-muted-foreground"
                      >
                        City
                      </FieldLabel>
                      <Input
                        id="city"
                        placeholder="San Francisco"
                        className={inputClasses}
                      />
                    </Field>
                    <Field className="sm:col-span-1">
                      <FieldLabel
                        htmlFor="state"
                        className="text-muted-foreground"
                      >
                        State / Province
                      </FieldLabel>
                      <Select defaultValue="California">
                        <SelectTrigger id="state" className={inputClasses}>
                          <SelectValue placeholder="Select state" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="California">California</SelectItem>
                          <SelectItem value="New York">New York</SelectItem>
                          <SelectItem value="Texas">Texas</SelectItem>
                        </SelectContent>
                      </Select>
                    </Field>
                    <Field className="sm:col-span-1">
                      <FieldLabel
                        htmlFor="zip"
                        className="text-muted-foreground"
                      >
                        ZIP Code
                      </FieldLabel>
                      <Input
                        id="zip"
                        placeholder="94105"
                        className={inputClasses}
                      />
                    </Field>
                  </div>
                  <Field>
                    <FieldLabel
                      htmlFor="phone"
                      className="text-muted-foreground"
                    >
                      Phone Number
                    </FieldLabel>
                    <Input
                      id="phone"
                      type="tel"
                      placeholder="+1 (555) 000-0000"
                      className={inputClasses}
                    />
                  </Field>
                </div>
              </div>

              <Separator className="bg-border/60 dark:bg-border" />

              {/* Step 2: Delivery */}
              <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500 delay-100 fill-mode-both">
                <SectionHeader
                  step={2}
                  title="Delivery Method"
                  description="Choose how you want your items delivered."
                />
                <div className="md:pl-14">
                  <RadioGroup
                    value={deliveryMethod}
                    onValueChange={setDeliveryMethod}
                    className="grid gap-4"
                  >
                    {DELIVERY_OPTIONS.map((option) => {
                      const isChecked = deliveryMethod === option.id;
                      return (
                        <Label
                          key={option.id}
                          htmlFor={option.id}
                          className={cn(
                            "flex items-center justify-between p-5 border rounded-xl cursor-pointer transition-all",
                            isChecked
                              ? "border-primary border-dashed bg-primary/5"
                              : "border-border border-solid hover:border-border hover:bg-muted/20",
                          )}
                        >
                          <div className="flex items-start gap-4">
                            <RadioGroupItem
                              id={option.id}
                              value={option.id}
                              className="mt-0.5"
                            />
                            <div className="space-y-1">
                              <p className="font-medium text-sm leading-none text-foreground">
                                {option.label}
                              </p>
                              <p className="text-sm text-muted-foreground">
                                {option.desc}
                              </p>
                            </div>
                          </div>
                          <span className="font-medium text-sm text-foreground">
                            {option.price}
                          </span>
                        </Label>
                      );
                    })}
                  </RadioGroup>
                </div>
              </div>

              <Separator className="bg-border/60 dark:bg-border" />

              {/* Step 3: Promo */}
              <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500 delay-200 fill-mode-both">
                <SectionHeader
                  step={3}
                  title="Promo Code & Gift"
                  description="Add any final touches to your order."
                />
                <div className="space-y-8 md:pl-14">
                  <Field>
                    <FieldLabel
                      htmlFor="promo"
                      className="text-muted-foreground"
                    >
                      Discount Code
                    </FieldLabel>
                    <div className="flex gap-3">
                      <Input
                        id="promo"
                        placeholder="Enter your code"
                        className={cn(inputClasses, "max-w-xs")}
                      />
                      <Button className="rounded-md px-6 shadow-none cursor-pointer hover:bg-primary/80">
                        Apply
                      </Button>
                    </div>
                  </Field>
                  <div className="space-y-4">
                    <Label className="text-sm font-medium text-foreground">
                      Gift Message{" "}
                      <span className="text-muted-foreground font-normal">
                        (Optional)
                      </span>
                    </Label>
                    <Textarea
                      className={inputClasses}
                      placeholder="Write a personalized note for the recipient..."
                    />
                  </div>
                </div>
              </div>

              <Separator className="bg-border/60 dark:bg-border" />

              {/* Step 4: Payment & Submit */}
              <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500 delay-300 fill-mode-both">
                <SectionHeader
                  step={4}
                  title="Payment Details"
                  description="All transactions are secure and encrypted."
                />
                <div className="space-y-8 md:pl-14">
                  <RadioGroup
                    value={paymentMethod}
                    onValueChange={setPaymentMethod}
                    className="grid grid-cols-1 sm:grid-cols-3 gap-4"
                  >
                    {PAYMENT_OPTIONS.map((option) => {
                      const Icon = option.icon;
                      const isChecked = paymentMethod === option.id;
                      return (
                        <Label
                          key={option.id}
                          htmlFor={option.id}
                          className={cn(
                            `flex flex-col items-center justify-center p-6 border rounded-xl cursor-pointer transition-all text-center`,
                            isChecked
                              ? "border-primary border-dashed bg-primary/5"
                              : "border-border border-solid hover:border-border hover:bg-muted/20",
                          )}
                        >
                          <Icon className={option.iconClasses} />
                          <span className="font-medium text-sm">
                            {option.label}
                          </span>
                          <RadioGroupItem id={option.id} value={option.id} />
                        </Label>
                      );
                    })}
                  </RadioGroup>

                  {/* Conditional Payment Fields */}
                  <div className="min-h-55">
                    {paymentMethod === "card" && (
                      <div className="space-y-5 animate-in fade-in slide-in-from-bottom-4 duration-500">
                        <Field>
                          <FieldLabel
                            htmlFor="cardName"
                            className="text-muted-foreground"
                          >
                            Name on Card
                          </FieldLabel>
                          <Input
                            id="cardName"
                            placeholder="Sunil Joshi"
                            className={inputClasses}
                          />
                        </Field>
                        <Field>
                          <FieldLabel
                            htmlFor="cardNumber"
                            className="text-muted-foreground"
                          >
                            Card Number
                          </FieldLabel>
                          <Input
                            id="cardNumber"
                            placeholder="0000 0000 0000 0000"
                            className={cn(inputClasses, "font-mono text-sm")}
                          />
                        </Field>
                        <div className="grid grid-cols-2 gap-5">
                          <Field>
                            <FieldLabel
                              htmlFor="expiry"
                              className="text-muted-foreground"
                            >
                              Expiry Date
                            </FieldLabel>
                            <Input
                              id="expiry"
                              placeholder="MM/YY"
                              className={inputClasses}
                            />
                          </Field>
                          <Field>
                            <FieldLabel
                              htmlFor="cvv"
                              className="text-muted-foreground"
                            >
                              CVV
                            </FieldLabel>
                            <Input
                              id="cvv"
                              placeholder="123"
                              type="password"
                              maxLength={4}
                              className={inputClasses}
                            />
                          </Field>
                        </div>
                      </div>
                    )}

                    {paymentMethod === "paypal" && (
                      <div className="p-6 rounded-xl border border-border bg-muted dark:bg-muted/40 text-center flex items-center justify-center min-h-50 animate-in fade-in slide-in-from-bottom-4 duration-500">
                        <p className="text-sm text-muted-foreground max-w-sm">
                          You will be redirected to PayPal to complete your
                          purchase securely.
                        </p>
                      </div>
                    )}

                    {paymentMethod === "cod" && (
                      <div className="p-6 rounded-xl border border-border bg-muted dark:bg-muted/40 text-center flex flex-col items-center justify-center min-h-50 gap-3 animate-in fade-in slide-in-from-bottom-4 duration-500">
                        <div className="size-12 bg-background border border-border/50 rounded-full flex items-center justify-center shadow-sm">
                          <Truck className="size-6 text-muted-foreground" />
                        </div>
                        <p className="text-sm text-muted-foreground max-w-sm">
                          You will pay for your order physically when it is
                          delivered to your address.
                        </p>
                      </div>
                    )}
                  </div>

                  <div>
                    <Button
                      onClick={handleCheckout}
                      disabled={isProcessing}
                      className="px-6 h-10 text-base rounded-md hover:bg-primary/80 transition-all cursor-pointer"
                    >
                      {isProcessing
                        ? "Processing..."
                        : paymentMethod === "card"
                          ? "Pay $138.00"
                          : paymentMethod === "paypal"
                            ? "Continue to PayPal"
                            : "Confirm Order"}
                    </Button>
                  </div>
                </div>
              </div>
            </form>
          </div>

          {/* Order Summary Sidebar */}
          <div className="md:col-span-5 xl:col-span-4 md:pl-6">
            <div className="p-6 bg-muted dark:bg-muted/40 rounded-xl sticky top-8 flex flex-col gap-6">
              <p className="text-lg font-medium tracking-tight">
                Order Summary
              </p>

              {/* Items */}
              <div className="space-y-6">
                <div className="flex gap-4 items-start flex-wrap">
                  <div className="size-16 rounded-xl bg-background border border-border flex items-center justify-center shrink-0">
                    <Package className="size-7 text-muted-foreground" />
                  </div>
                  <div className="flex-1 mt-1">
                    <div className="flex justify-between gap-2">
                      <p className="font-medium text-sm leading-tight text-foreground">
                        Premium Wireless Headphones
                      </p>
                      <p className="font-medium text-sm min-w-max text-foreground">
                        $120.00
                      </p>
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">
                      Midnight Black
                    </p>
                    <div className="text-xs text-muted-foreground mt-1">
                      Qty: 1
                    </div>
                  </div>
                </div>
              </div>

              <Separator />

              {/* Subtotals */}
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span className="font-medium text-foreground">$120.00</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Shipping</span>
                  <span className="font-medium text-foreground">
                    Calculated
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Estimated Tax</span>
                  <span className="font-medium text-foreground">$18.00</span>
                </div>
              </div>

              <Separator />

              {/* Total */}
              <div className="flex justify-between items-end">
                <div>
                  <p className="text-base font-medium text-foreground">Total</p>
                  <p className="text-xs text-muted-foreground mt-1">
                    Including taxes
                  </p>
                </div>
                <p className="text-2xl font-semibold tracking-tight text-foreground">
                  $138.00
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CheckoutForm;
