// @ts-nocheck
"use client";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@default/ui/primitives/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@default/ui/primitives/select";
import { Badge } from "@default/ui/primitives/badge";
import { Card } from "@default/ui/primitives/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@default/ui/primitives/tabs";
import { LayoutGrid, Smartphone, CloudUpload, FolderOpen } from "lucide-react";

const TableComp = () => {
    const dropdownItems = ["Sep 2026", "Oct 2026", "Nov 2026"];

    const ProductTableData = [
        {
            img: "https://images.shadcnspace.com/assets/products/dash-prd-1.jpg",
            project: "Minecraf App",
            name: "Jason Roy",
            progrsss: "73.2%",
            variant: "lightWarning",
            statustext: "Medium",
            money: "$3.5K",
            statuscolor: 'bg-blue-500/10 text-blue-500',
        },
        {
            img: "https://images.shadcnspace.com/assets/products/dash-prd-2.jpg",
            project: "Web App Project",
            name: "Mathew Flintoff",
            progrsss: "73.2%",
            variant: "lightInfo",
            statustext: "Very High",
            money: "$24.5K",
            statuscolor: 'bg-red-500/10 text-red-500',
        },
        {
            img: "https://images.shadcnspace.com/assets/products/dash-prd-3.jpg",
            project: "Modernize Dashboard",
            name: "Anil Kumar",
            progrsss: "73.2%",
            variant: "lightSuccess",
            statustext: "Low",
            money: "$12.8K",
            statuscolor: 'bg-teal-400/10 text-teal-400',
        },
        {
            img: "https://images.shadcnspace.com/assets/products/dash-prd-4.jpg",
            project: "Dashboard Co",
            name: "George Cruize",
            progrsss: "73.2%",
            variant: "lightError",
            statustext: "High",
            money: "$2.4K",
            statuscolor: 'bg-orange-400/10 text-orange-400',
        },
    ];

    const ProductTableData2 = [
        {
            img: "https://images.shadcnspace.com/assets/products/dash-prd-2.jpg",
            project: "Web App Project",
            name: "Mathew Flintoff",
            progrsss: "73.2%",
            variant: "lightError",
            statustext: "Very High",
            money: "$24.5K",
            statuscolor: 'bg-red-500/10 text-red-500',
        },
        {
            img: "https://images.shadcnspace.com/assets/products/dash-prd-3.jpg",
            project: "Modernize Dashboard",
            name: "Anil Kumar",
            progrsss: "73.2%",
            variant: "lightSuccess",
            statustext: "Low",
            money: "$12.8K",
            statuscolor: 'bg-amber-300/10 text-amber-300',
        },
        {
            img: "https://images.shadcnspace.com/assets/products/dash-prd-1.jpg",
            project: "Minecraf App",
            name: "Jason Roy",
            progrsss: "73.2%",
            variant: "lightWarning",
            statustext: "Medium",
            money: "$3.5K",
            statuscolor: 'bg-blue-500/10 text-blue-500',
        },
        {
            img: "https://images.shadcnspace.com/assets/products/dash-prd-4.jpg",
            project: "Dashboard Co",
            name: "George Cruize",
            progrsss: "73.2%",
            variant: "lightError",
            statustext: "High",
            money: "$2.4K",
            statuscolor: 'bg-orange-400/10 text-orange-400',
        },
    ];

    const renderTable = (data: any[]) => (
        <div className="overflow-x-auto">
            <Table>
                <TableHeader className="border-b border-border">
                    <TableRow className="hover:bg-transparent!">
                        <TableHead className="py-2 px-3 ps-0 text-sm font-medium">
                            Assigned
                        </TableHead>
                        <TableHead className="text-sm font-medium">Progress</TableHead>
                        <TableHead className="text-sm font-medium">Priority</TableHead>
                        <TableHead className="text-sm font-medium">Budget</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody className="divide-y divide-border">
                    {data.map((item, index) => (
                        <TableRow key={index} className="hover:bg-transparent!">
                            <TableCell className="whitespace-nowrap ps-0">
                                <div className="flex gap-3 items-center">
                                    <img
                                        src={item.img}
                                        alt="icon"
                                        width={48}
                                        height={48}
                                        className="h-12 w-12 rounded-lg"
                                    />
                                    <div className="truncate line-clamp-2 sm:text-wrap max-w-56">
                                        <h6 className="text-sm font-medium">{item.project}</h6>
                                        <p className="text-sm text-muted-foreground">{item.name}</p>
                                    </div>
                                </div>
                            </TableCell>
                            <TableCell className="whitespace-nowrap">
                                <p className="text-sm">{item.progrsss}</p>
                            </TableCell>
                            <TableCell className="whitespace-nowrap">
                                <Badge
                                    className={`text-xs font-medium ${item.statuscolor}`}>
                                    {item.statustext}
                                </Badge>
                            </TableCell>
                            <TableCell className="whitespace-nowrap">
                                <p>{item.money}</p>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    );

    return (
        <div className="lg:py-20 sm:py-16 py-8 px-4 max-w-4xl mx-auto">
            <Card className="p-7 pb-3 max-w-3xl mx-auto w-full border-0 gap-3">
                <div className="sm:flex justify-between align-baseline">
                    <div>
                        <h5 className="text-lg font-semibold text-foreground">Revenue by Product</h5>
                    </div>
                    <Select defaultValue={dropdownItems[0]}>
                        <SelectTrigger className="w-fit sm:my-0 my-4 cursor-pointer data-[size=default]:h-9 shadow-xs">
                            <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                            {dropdownItems.map((item, index) => (
                                <SelectItem key={index} value={item} className="hover:bg-accent text-accent-foreground hover:dark:bg-accent/50 focus-visible:shadow-none!">
                                    {item}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>

                <Tabs defaultValue="App" className="w-full gap-6">
                    <div className="overflow-x-auto py-2 no-scrollbar">
                        <TabsList className="bg-transparent gap-2 p-0 h-10 justify-start items-center flex-nowrap whitespace-nowrap">
                            {[
                                { name: "App", icon: LayoutGrid },
                                { name: "Mobile", icon: Smartphone },
                                { name: "SaaS", icon: CloudUpload },
                                { name: "Others", icon: FolderOpen },
                            ].map((tab) => {
                                const TabIcon = tab.icon;
                                return (
                                    <TabsTrigger
                                        key={tab.name}
                                        value={tab.name}
                                        className="h-9 px-4 rounded-lg cursor-pointer text-sm font-medium text-center flex gap-1.5 items-center transition-all border-0 shadow-none!
                                        bg-secondary text-secondary-foreground hover:bg-secondary/80
                                        data-active:bg-foreground data-active:text-background data-active:hover:bg-foreground data-active:hover:text-background
                                        dark:bg-muted dark:text-muted-foreground dark:hover:bg-muted/80
                                        dark:data-active:bg-foreground dark:data-active:text-background"
                                    >
                                        <TabIcon size={16} />
                                        {tab.name}
                                    </TabsTrigger>
                                );
                            })}
                        </TabsList>
                    </div>
                    <TabsContent value="App" className="mt-0">
                        {renderTable(ProductTableData)}
                    </TabsContent>
                    <TabsContent value="Mobile" className="mt-0">
                        {renderTable(ProductTableData2)}
                    </TabsContent>
                    <TabsContent value="SaaS" className="mt-0">
                        {renderTable(ProductTableData)}
                    </TabsContent>
                    <TabsContent value="Others" className="mt-0">
                        {renderTable(ProductTableData2)}
                    </TabsContent>
                </Tabs>
            </Card>
        </div>
    );
};

export default TableComp;