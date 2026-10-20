// @ts-nocheck
"use client";

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@default/ui/primitives/table";
import { Badge } from "@default/ui/primitives/badge";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@default/ui/primitives/dropdown-menu";
import { Card } from "@default/ui/primitives/card";
import { CirclePlus, Ellipsis, SquarePen, Trash } from "lucide-react";

const hoverTableData: any[] = [
    {
        avatar: 'https://images.shadcnspace.com/assets/blog/blog-img1.jpg',
        name: 'Top Authors',
        handle: 'Successful Fellas',
        users: '4300 Users',
        courses: [
            {
                status: 'Angular',
                statuscolor: 'bg-red-500/10 text-red-500'
            },
            {
                status: 'PHP',
                statuscolor: 'bg-blue-500/10 text-blue-500'
            }
        ]
    },
    {
        avatar: 'https://images.shadcnspace.com/assets/blog/blog-img2.jpg',
        name: 'Popular Authors',
        handle: 'Most Successful',
        users: '1200 Users',
        courses: [
            {
                status: 'Bootstrap',
                statuscolor: 'bg-blue-500/10 text-blue-500'
            }
        ]
    },
    {
        avatar: 'https://images.shadcnspace.com/assets/blog/blog-img3.jpg',
        name: 'New Users',
        handle: 'Awesome Users',
        users: '2000 Users',
        courses: [
            {
                status: 'Reactjs',
                statuscolor: 'bg-muted text-foreground'
            },
            {
                status: 'Angular',
                statuscolor: 'bg-red-500/10 text-red-500'
            }
        ]
    },
    {
        avatar: 'https://images.shadcnspace.com/assets/blog/blog-img4.jpg',
        name: 'Active Customers',
        handle: 'Best Customers',
        users: '1500 Users',
        courses: [
            {
                status: 'Bootstrap',
                statuscolor: 'bg-blue-500/10 text-blue-500'
            }
        ]
    },
    {
        avatar: 'https://images.shadcnspace.com/assets/blog/blog-img5.jpg',
        name: 'Bestseller Theme',
        handle: 'Amazing Templates',
        users: '9500 Users',
        courses: [
            {
                status: 'Angular',
                statuscolor: 'bg-red-500/10 text-red-500'
            },
            {
                status: 'Reactjs',
                statuscolor: 'bg-muted text-foreground'
            }
        ]
    }
];


const Table03 = () => {
    const tableActionData = [
        {
            icon: CirclePlus,
            listtitle: "Add",
        },
        {
            icon: SquarePen,
            listtitle: "Edit",
        },
        {
            icon: Trash,
            listtitle: "Delete",
        },
    ];

    return (
        <div className="lg:py-20 sm:py-16 py-8 px-4 max-w-4xl mx-auto">
            <Card className="max-w-4xl w-full rounded-md border-0 py-2 px-2 overflow-hidden">
                <div className="overflow-x-auto">
                    <Table>
                        <TableHeader>
                            <TableRow className="hover:bg-transparent!">
                                <TableHead className="text-sm font-medium py-3">
                                    Authors
                                </TableHead>
                                <TableHead className="text-sm font-medium py-3">
                                    Courses
                                </TableHead>
                                <TableHead className="text-sm font-medium py-3">
                                    Users
                                </TableHead>
                                <TableHead className="text-sm font-medium py-3"></TableHead>
                            </TableRow>
                        </TableHeader>

                        <TableBody className="divide-y divide-border">
                            {hoverTableData.map((item, index) => (
                                <TableRow
                                    key={index}
                                    className="hover:bg-accent/50 cursor-pointer"
                                >
                                    {/* Authors */}
                                    <TableCell className="whitespace-nowrap">
                                        <div className="flex gap-3 items-center">
                                            <img
                                                src={item.avatar}
                                                alt="icon"
                                                className="h-10 w-10 rounded-md"
                                                width={40}
                                                height={40}
                                            />

                                            <div className="truncate line-clamp-2 max-w-56">
                                                <h6 className="text-sm font-medium">{item.name}</h6>
                                                <p className="text-sm text-muted-foreground">{item.handle}</p>
                                            </div>
                                        </div>
                                    </TableCell>

                                    {/* Courses */}
                                    <TableCell className="whitespace-nowrap">
                                        <div className="flex gap-2">
                                            {item.courses.map((crs: any, index: any) => (
                                                <Badge
                                                    key={index}
                                                    className={`text-xs font-medium ${crs.statuscolor}`}>
                                                    {crs.status}
                                                </Badge>
                                            ))}
                                        </div>
                                    </TableCell>

                                    {/* Users */}
                                    <TableCell className="whitespace-nowrap">
                                        <p className="text-sm">{item.users}</p>
                                    </TableCell>

                                    {/* Dropdown */}
                                    <TableCell className="whitespace-nowrap text-right">
                                        <DropdownMenu>
                                            <DropdownMenuTrigger>
                                                <span className="h-9 w-9 flex justify-center items-center rounded-full hover:bg-lightprimary hover:text-primary cursor-pointer">
                                                    <Ellipsis size={22} />
                                                </span>
                                            </DropdownMenuTrigger>

                                            <DropdownMenuContent align="end">
                                                {tableActionData.map((action, i) => (
                                                    <DropdownMenuItem
                                                        key={i}
                                                        className="group flex gap-3 cursor-pointer hover:bg-accent!"
                                                    >
                                                        <action.icon size={18} className="text-popover-foreground" />
                                                        <span>{action.listtitle}</span>
                                                    </DropdownMenuItem>
                                                ))}
                                            </DropdownMenuContent>
                                        </DropdownMenu>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>
            </Card>
        </div>
    );
};

export default Table03;
