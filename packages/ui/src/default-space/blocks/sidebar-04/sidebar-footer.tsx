// @ts-nocheck
import { Button } from "@default/ui/primitives/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@default/ui/primitives/card"

export function SidebarFooterComp() {
    return (
        <Card className="gap-2 py-4 shadow-none border-none">
            <CardHeader className="flex flex-col items-center justify-center px-4 gap-0">
                <img src="https://images.shadcnspace.com/assets/backgrounds/download-img.png" alt="sidebar-img" className="h-20 w-20" />
                <CardTitle className="text-lg font-semibold mt-4">Grab default</CardTitle>
                <CardDescription className="text-sm text-foreground mb-1.5">
                    Customize your dashboard
                </CardDescription>
            </CardHeader>
            <CardContent className="px-4">
                <form>
                    <div className="grid gap-2.5 items-center justify-center">
                        <Button
                            id="download-button"
                            className="bg-neutral-900 dark:bg-neutral-500 text-sidebar-primary-foreground w-fit shadow-none cursor-pointer"
                        >
                            Download
                        </Button>
                    </div>
                </form>
            </CardContent>
        </Card>
    )
}
