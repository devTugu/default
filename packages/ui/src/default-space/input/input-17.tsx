// @ts-nocheck
import { Input } from "@default/ui/primitives/input"
import { Label } from "@default/ui/primitives/label"

const InputWithLabelDemo = () => {
    return (
        <div className="grid w-full max-w-sm items-center gap-1.5">
            <Label htmlFor="email">Label</Label>
            <Input type="email" id="email" placeholder="example@shadcnspace.com" />
        </div>
    )
}

export default InputWithLabelDemo
