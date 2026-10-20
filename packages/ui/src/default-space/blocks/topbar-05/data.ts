"use client";

import { BringToFront, CalendarHeart, ChartColumnBig, CircleArrowDown, Flag, Form, GalleryVerticalEnd, Grid2x2Plus, Layers2, PanelRightClose, Pentagon, Presentation, RectangleCircle, Shapes, Shredder, Zap } from "lucide-react";

const NavData: any[] = [
    {
        type: "dropdown",
        label: "Dashboards",
        icon: Layers2,
        items: [
            { label: "Ecommerce", icon: Grid2x2Plus, href: "#" },
            { label: "Analytics", icon: ChartColumnBig, href: "#" },
            { label: "Projects", icon: BringToFront, href: "#" },
            { label: "Frontend Pages", icon: Form, href: "#" },
            { label: "Landing Pages", icon: Presentation, href: "#" },
        ],
    },
    {
        type: "dropdown",
        label: "Default UI",
        icon: Shapes,
        items: [
            { label: "Accordian", icon: CircleArrowDown, href: "#" },
            { label: "Alert", icon: Flag, href: "#" },
            { label: "Bedge", icon: Pentagon, href: "#" },
            { label: "Button", icon: RectangleCircle, href: "#" },
            { label: "Dropdown", icon: GalleryVerticalEnd, href: "#" },
            { label: "Dialog", icon: Zap, href: "#" },
            { label: "Drawer", icon: PanelRightClose, href: "#" },
            { label: "Datepicker", icon: CalendarHeart, href: "#" }
        ]
    },
    {
        type: "link",
        label: "Docs",
        icon: Shredder,
        href: '#'
    }
]

export default NavData;