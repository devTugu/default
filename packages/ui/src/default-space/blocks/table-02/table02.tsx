// @ts-nocheck
"use client";

import { useState, useMemo } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@default/ui/primitives/table";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@default/ui/primitives/select";
import { Badge } from "@default/ui/primitives/badge";
import { Card } from "@default/ui/primitives/card";
import { Checkbox } from "@default/ui/primitives/checkbox";
import { Input } from "@default/ui/primitives/input";
import { Eye, Search, Pen, Trash } from "lucide-react";


// ---------------- SAMPLE INVOICE DATA ---------------- //

const invoices = [
    {
        id: "#5099",
        status: "Paid",
        client: "Olivia Rhye",
        role: "UI/UX designer",
        avatar: "https://images.shadcnspace.com/assets/profiles/user-1.jpg",
        total: 3120,
        date: "03 Apr 2025",
    },
    {
        id: "#5008",
        status: "Draft",
        client: "Barbara Steele",
        role: "Frontend developer",
        avatar: "https://images.shadcnspace.com/assets/profiles/user-2.jpg",
        total: 1450,
        date: "12 May 2025",
    },
    {
        id: "#5101",
        status: "Draft",
        client: "Leonard Gordon",
        role: "Graphic designer",
        avatar: "https://images.shadcnspace.com/assets/profiles/user-3.jpg",
        total: 1200,
        date: "26 Jun 2025",
    },
    {
        id: "#4586",
        status: "Paid",
        client: "Evelyn Pope",
        role: "UI/UX designer",
        avatar: "https://images.shadcnspace.com/assets/profiles/user-4.jpg",
        total: 2680,
        date: "05 Jul 2025",
    },
    {
        id: "#4360",
        status: "Paid",
        client: "Tommy Garza",
        role: "Backend developer",
        avatar: "https://images.shadcnspace.com/assets/profiles/user-5.jpg",
        total: 3120,
        date: "07 Aug 2025",
    },
    {
        id: "#4312",
        status: "Past Due",
        client: "James Carter",
        role: "Full-stack developer",
        avatar: "https://images.shadcnspace.com/assets/profiles/user-6.jpg",
        total: 3890,
        date: "11 Aug 2025",
    },
    {
        id: "#4982",
        status: "Past Due",
        client: "Mia Thompson",
        role: "Project Manager",
        avatar: "https://images.shadcnspace.com/assets/profiles/user-7.jpg",
        total: 2200,
        date: "15 Sep 2025",
    },
    {
        id: "#4877",
        status: "Paid",
        client: "Daniel Ross",
        role: "DevOps Engineer",
        avatar: "https://images.shadcnspace.com/assets/profiles/user-8.jpg",
        total: 1750,
        date: "21 Sep 2025",
    },
    {
        id: "#4622",
        status: "Draft",
        client: "Sophia Lane",
        role: "Content Writer",
        avatar: "https://images.shadcnspace.com/assets/profiles/user-9.jpg",
        total: 980,
        date: "02 Oct 2025",
    },
    {
        id: "#4766",
        status: "Paid",
        client: "Henry Wilson",
        role: "QA Engineer",
        avatar: "https://images.shadcnspace.com/assets/profiles/user-10.jpg",
        total: 1320,
        date: "10 Oct 2025",
    },
    {
        id: "#4893",
        status: "Paid",
        client: "Emma Walker",
        role: "Product Designer",
        avatar: "https://images.shadcnspace.com/assets/profiles/user-11.jpg",
        total: 2480,
        date: "18 Oct 2025",
    },
    {
        id: "#4120",
        status: "Past Due",
        client: "Liam Johnson",
        role: "Marketing Manager",
        avatar: "https://images.shadcnspace.com/assets/profiles/user-12.jpg",
        total: 1990,
        date: "28 Oct 2025",
    },
    {
        id: "#5090",
        status: "Paid",
        client: "Ava Brown",
        role: "UI Developer",
        avatar: "https://images.shadcnspace.com/assets/profiles/user-1.jpg",
        total: 2780,
        date: "03 Nov 2025",
    },
    {
        id: "#4451",
        status: "Draft",
        client: "Noah Smith",
        role: "HR Manager",
        avatar: "https://images.shadcnspace.com/assets/profiles/user-9.jpg",
        total: 1120,
        date: "06 Nov 2025",
    },
    {
        id: "#4539",
        status: "Past Due",
        client: "Ella Davis",
        role: "SEO Specialist",
        avatar: "https://images.shadcnspace.com/assets/profiles/user-6.jpg",
        total: 3050,
        date: "19 Nov 2025",
    }
];

// Status colors
const statusColors: Record<any, any> = {
    Paid: "bg-teal-400/10 text-teal-400",
    Draft: "bg-orange-400/10 text-orange-400",
    "Past Due": "bg-red-500/10 text-red-500",
};

// ---------------- COMPONENT ---------------- //

const Table07 = () => {
    const [search, setSearch] = useState("");
    const [filterStatus, setFilterStatus] = useState("All");
    const [showPerPage, setShowPerPage] = useState(5);
    const [page, setPage] = useState(1);

    // Filtered + searched
    const filteredData = useMemo(() => {
        return invoices
            .filter((i) =>
                i.client.toLowerCase().includes(search.toLowerCase())
            )
            .filter((i) => (filterStatus === "All" ? true : i.status === filterStatus));
    }, [search, filterStatus]);

    // Pagination
    const totalPages = Math.ceil(filteredData.length / showPerPage);
    const paginatedData = filteredData.slice((page - 1) * showPerPage, page * showPerPage);

    const perPageOptions = ["5", "10", "15"];
    const statusOptions = ["All", "Paid", "Draft", "Past Due"];

    return (
        <div className="lg:py-20 sm:py-16 py-8 px-4 max-w-4xl mx-auto">
            <Card className="w-full max-w-6xl rounded-md border-0 p-6 gap-6">

                {/* Top Controls */}
                <div className="flex flex-wrap items-center justify-between gap-4 mb-5">
                    <div className="flex items-center gap-2">
                        <p>Show</p>

                        <Select
                            value={String(showPerPage)}
                            onValueChange={(v) => {
                                setShowPerPage(Number(v));
                                setPage(1);
                            }}
                        >
                            <SelectTrigger className="w-16 cursor-pointer data-[size=default]:h-9">
                                <SelectValue />
                            </SelectTrigger>

                            <SelectContent className="cursor-pointer">
                                {perPageOptions.map((opt) => (
                                    <SelectItem key={opt} value={opt} className="hover:bg-accent! data-[state=checked]:bg-accent! mb-0.5 cursor-pointer">
                                        {opt}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>

                    <div className="flex items-center gap-3">
                        <div className="relative w-64">
                            <Input
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                placeholder="Search Customer"
                                className="h-9 pl-10 focus-visible:ring-0! focus-visible:shadow-none!"
                            />
                            <Search size={14} className="absolute left-3 top-2.5 text-gray-400" />
                        </div>

                        <Select value={filterStatus} onValueChange={(val) => val && setFilterStatus(val)}>
                            <SelectTrigger className="w-32 data-[size=default]:h-9 cursor-pointer">
                                <SelectValue />
                            </SelectTrigger>

                            <SelectContent>
                                {statusOptions.map((status) => (
                                    <SelectItem key={status} value={status} className="hover:bg-accent! data-[state=checked]:bg-accent! mb-0.5 cursor-pointer">
                                        {status}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>
                </div>

                {/* Table */}
                <div className="rounded-md border border-border">
                    <Table>
                        <TableHeader>
                            <TableRow className="hover:bg-transparent!">
                                <TableHead></TableHead>
                                <TableHead>ID</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead>Customer</TableHead>
                                <TableHead>Total</TableHead>
                                <TableHead>Issued Date</TableHead>
                                <TableHead>Actions</TableHead>
                            </TableRow>
                        </TableHeader>

                        <TableBody>
                            {paginatedData.map((inv: any, i: any) => (
                                <TableRow key={i}>
                                    <TableCell>
                                        <Checkbox className="cursor-pointer" />
                                    </TableCell>

                                    <TableCell>{inv.id}</TableCell>

                                    <TableCell>
                                        <Badge className={`${statusColors[inv.status]} font-medium`}>{inv.status}</Badge>
                                    </TableCell>

                                    <TableCell>
                                        <div className="flex items-center gap-3">
                                            <img src={inv.avatar} alt="avatar" width={40} height={40} className="rounded-full" />
                                            <div>
                                                <p className="text-sm! font-medium">{inv.client}</p>
                                                <p className="text-xs text-muted-foreground">{inv.role}</p>
                                            </div>
                                        </div>
                                    </TableCell>

                                    <TableCell className="font-medium">${inv.total.toLocaleString()}</TableCell>
                                    <TableCell>{inv.date}</TableCell>

                                    <TableCell>
                                        <div className="flex gap-3 text-gray-600">
                                            <Trash size={16} className="cursor-pointer text-foreground hover:text-red-400" />
                                            <Eye size={16} className="cursor-pointer text-foreground hover:text-foreground/80" />
                                            <Pen size={16} className="cursor-pointer text-foreground hover:text-foreground/80" />
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>

                {/* Pagination */}
                <div className="flex items-center justify-between mt-4">
                    <p className="text-sm text-muted-foreground">Showing {paginatedData.length} of {invoices.length} entries</p>

                    <div className="flex items-center gap-2">
                        <button
                            onClick={() => setPage((p) => Math.max(1, p - 1))}
                            className="px-3 py-1 hover:bg-accent! border rounded-md disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
                            disabled={page === 1}
                        >
                            Previous
                        </button>

                        <div className="px-3 py-1 bg-black text-white rounded-md">{page}</div>

                        <button
                            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                            className="px-3 py-1 hover:bg-accent! border rounded-md disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
                            disabled={page === totalPages}
                        >
                            Next
                        </button>
                    </div>
                </div>
            </Card>
        </div>
    );
}

export default Table07;