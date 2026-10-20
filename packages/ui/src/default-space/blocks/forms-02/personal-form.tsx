// @ts-nocheck
import { Field, FieldLabel } from "@default/ui/primitives/field";
import { Input } from "@default/ui/primitives/input";
import { Textarea } from "@default/ui/primitives/textarea"

const PersonalForm = () => {
    return (
        <div className="space-y-4 px-6">
            <div className="grid md:grid-cols-2 grid-cols-1 gap-3 gap-y-4">
                <Field>
                    <FieldLabel
                        htmlFor="firstname"
                        className="text-base text-foreground font-medium">
                        First Name
                    </FieldLabel>
                    <Input
                        id="firstname"
                        type="text"
                        placeholder="Sunil"
                        className="dark:bg-background h-9 text-sm shadow-xs text-foreground"
                    />
                </Field>
                <Field>
                    <FieldLabel
                        htmlFor="lastname"
                        className="text-base text-foreground font-medium">
                        Last Name
                    </FieldLabel>
                    <Input
                        id="lastname"
                        type="text"
                        placeholder="Joshi"
                        className="dark:bg-background h-9 text-sm shadow-xs text-foreground"
                    />
                </Field>
                <Field>
                    <FieldLabel
                        htmlFor="email"
                        className="text-base text-foreground font-medium">
                        Email
                    </FieldLabel>
                    <Input
                        id="email"
                        type="email"
                        placeholder="suniljoshi@example.com"
                        className="dark:bg-background h-9 text-sm shadow-xs text-foreground"
                    />
                </Field>
                <Field>
                    <FieldLabel
                        htmlFor="phone"
                        className="text-base text-foreground font-medium">
                        Mobile No.
                    </FieldLabel>
                    <Input
                        id="phone"
                        type="number"
                        placeholder="+91 123456789"
                        className="dark:bg-background h-9 text-sm shadow-xs text-foreground"
                    />
                </Field>
            </div>
            <Field>
                <FieldLabel
                    htmlFor="address"
                    className="text-base text-foreground font-medium">
                    Address
                </FieldLabel>
                <Textarea placeholder="123 Main St, Apt 4B" className="dark:bg-background h-9 text-sm shadow-xs text-foreground" />
            </Field>
            <div className="grid md:grid-cols-2 grid-cols-1 gap-3">
                <Field>
                    <FieldLabel
                        htmlFor="state"
                        className="text-base text-foreground font-medium">
                        State
                    </FieldLabel>
                    <Input
                        id="state"
                        type="text"
                        placeholder="Gujrat"
                        className="dark:bg-background h-9 text-sm shadow-xs text-foreground"
                    />
                </Field>
                <Field>
                    <FieldLabel
                        htmlFor="pin"
                        className="text-base text-foreground font-medium">
                        Pin
                    </FieldLabel>
                    <Input
                        id="pin"
                        type="number"
                        placeholder="38001"
                        className="dark:bg-background h-9 text-sm shadow-xs text-foreground"
                    />
                </Field>
            </div>
        </div>
    )
}

export default PersonalForm