// @ts-nocheck
"use client";

import { cn } from "@default/ui/lib/cn";
import { NavMain } from "./nav-main";
import Logo from "../../assets/logo/logo";
import { useSidebar, Sidebar, SidebarContent } from "@default/ui/primitives/sidebar";
import {
  Cpu,
  HardDrive,
  Layers,
  Globe,
  Shield,
  BarChart3,
  Zap,
  Code,
  Settings,
  Share2,
  Search,
  ChevronLeft,
  LucideIcon,
} from "lucide-react";

export type MegaGroupItem = {
  title: string;
  href: string;
};

export type MegaGroup = {
  title: string;
  items: MegaGroupItem[];
};

export type NavItem = {
  label?: string;
  isSection?: boolean;
  title?: string;
  icon?: LucideIcon;
  href?: string;
  badge?: string | number;
  megaGroups?: MegaGroup[];
  children?: NavItem[];
};

export const navData: NavItem[] = [
  {
    title: "Compute",
    icon: Cpu,
    megaGroups: [
      {
        title: "Virtual Servers",
        items: [
          { title: "EC2 (Elastic Compute Cloud)", href: "#" },
          { title: "Lightsail (VPS)", href: "#" },
          { title: "App Runner (Container Apps)", href: "#" },
        ],
      },
      {
        title: "Containers",
        items: [
          { title: "ECS (Elastic Container Service)", href: "#" },
          { title: "EKS (Elastic Kubernetes Service)", href: "#" },
          { title: "ECR (Elastic Container Registry)", href: "#" },
        ],
      },
      {
        title: "Serverless",
        items: [
          { title: "Lambda (Serverless Functions)", href: "#" },
          { title: "Fargate (Serverless Containers)", href: "#" },
          { title: "Serverless Application Repo", href: "#" },
        ],
      },
    ],
  },
  {
    title: "Storage",
    icon: HardDrive,
    megaGroups: [
      {
        title: "Object Storage",
        items: [
          { title: "S3 (Simple Storage Service)", href: "#" },
          { title: "S3 Glacier (Archive Storage)", href: "#" },
        ],
      },
      {
        title: "Block & File",
        items: [
          { title: "EBS (Elastic Block Store)", href: "#" },
          { title: "EFS (Elastic File System)", href: "#" },
          { title: "FSx (Lustre / Windows)", href: "#" },
        ],
      },
      {
        title: "Data Transfer",
        items: [
          { title: "Snowball (Physical transfer)", href: "#" },
          { title: "DataSync (Online migration)", href: "#" },
        ],
      },
    ],
  },
  {
    title: "Database",
    icon: Layers,
    megaGroups: [
      {
        title: "Relational",
        items: [
          { title: "RDS for PostgreSQL", href: "#" },
          { title: "RDS for MySQL", href: "#" },
          { title: "RDS for MariaDB", href: "#" },
          { title: "RDS for Oracle", href: "#" },
          { title: "RDS for SQL Server", href: "#" },
          { title: "Aurora PostgreSQL", href: "#" },
          { title: "Aurora MySQL", href: "#" },
          { title: "Aurora Serverless", href: "#" },
        ],
      },
      {
        title: "Key-Value",
        items: [
          { title: "DynamoDB (NoSQL)", href: "#" },
          { title: "DynamoDB Accelerator (DAX)", href: "#" },
          { title: "ElastiCache Redis", href: "#" },
          { title: "ElastiCache Memcached", href: "#" },
          { title: "MemoryDB for Redis", href: "#" },
        ],
      },
      {
        title: "Document",
        items: [
          { title: "DocumentDB (MongoDB)", href: "#" },
          { title: "MongoDB Compatible", href: "#" },
        ],
      },
      {
        title: "Other",
        items: [
          { title: "Neptune (Graph)", href: "#" },
          { title: "Timestream (Time Series)", href: "#" },
          { title: "QLDB (Ledger Database)", href: "#" },
          { title: "Keyspaces (Cassandra)", href: "#" },
          { title: "Redshift (Data Warehouse)", href: "#" },
          { title: "Redshift Serverless", href: "#" },
        ],
      },
    ],
  },
  {
    title: "Networking",
    icon: Globe,
    megaGroups: [
      {
        title: "Connectivity",
        items: [
          { title: "VPC (Virtual Private Cloud)", href: "#" },
          { title: "CloudFront (CDN)", href: "#" },
          { title: "Route 53 (DNS)", href: "#" },
        ],
      },
      {
        title: "Delivery",
        items: [
          { title: "API Gateway", href: "#" },
          { title: "Elastic Load Balancing (ELB)", href: "#" },
        ],
      },
    ],
  },
  {
    title: "Security & Identity",
    icon: Shield,
    megaGroups: [
      {
        title: "Access Control",
        items: [
          { title: "IAM (Identity & Access)", href: "#" },
          { title: "Cognito (User Auth)", href: "#" },
          { title: "Directory Service", href: "#" },
        ],
      },
      {
        title: "Protection",
        items: [
          { title: "Shield (DDoS Protection)", href: "#" },
          { title: "WAF (Web App Firewall)", href: "#" },
          { title: "Key Management Service (KMS)", href: "#" },
        ],
      },
    ],
  },
  {
    title: "Analytics",
    icon: BarChart3,
    megaGroups: [
      {
        title: "Data Lake",
        items: [
          { title: "Athena (Interactive Query)", href: "#" },
          { title: "EMR (Hadoop/Spark)", href: "#" },
          { title: "Redshift (Data Warehouse)", href: "#" },
        ],
      },
      {
        title: "Streaming",
        items: [
          { title: "Kinesis (Real-time data)", href: "#" },
          { title: "MSK (Managed Kafka)", href: "#" },
        ],
      },
    ],
  },
  { title: "Machine Learning", icon: Zap, href: "#" },
  { title: "Developer Tools", icon: Code, href: "#" },
  { title: "Management", icon: Settings, href: "#" },
  { title: "Application Integration", icon: Share2, href: "#" },
];

export function AppSidebar({
  openMegaMenu,
  setOpenMegaMenu,
  activeItem,
  setActiveItem,
}: {
  openMegaMenu: string | null;
  setOpenMegaMenu: (title: string | null) => void;
  activeItem: string;
  setActiveItem: (title: string) => void;
}) {
  const { open, toggleSidebar } = useSidebar();
  const collapsed = !open;

  return (
    <Sidebar collapsible="icon" className="border-r border-sidebar-border bg-sidebar text-sidebar-foreground">
      {/* Logo Header */}
      <div
        onClick={collapsed ? toggleSidebar : undefined}
        className={cn(
          "flex items-center border-b border-sidebar-border px-4 transition-all duration-300",
          collapsed ? "h-14 justify-center cursor-pointer hover:bg-sidebar-accent/50" : "h-14 gap-3"
        )}
        title={collapsed ? "Expand Sidebar" : undefined}
      >
        {collapsed ? (
          <div className="w-8 h-8 overflow-hidden shrink-0 flex items-center justify-start">
            <Logo className="h-8 w-[117.6px] min-w-[117.6px] max-w-none" />
          </div>
        ) : (
          <Logo />
        )}


      </div>

      {/* Search Input */}
      {!collapsed && (
        <div className="px-3 pt-3 mb-2">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-sidebar-foreground/50" />
            <input
              type="text"
              placeholder="Search..."
              className="w-full bg-sidebar-accent/50 border border-sidebar-border rounded-lg py-1.5 pl-9 pr-4 text-xs text-sidebar-foreground placeholder-sidebar-foreground/50 focus:outline-none focus:ring-1 focus:ring-sidebar-ring focus:border-sidebar-ring"
            />
          </div>
        </div>
      )}

      {/* Navigation */}
      <SidebarContent className="px-3 py-2 overflow-y-auto overflow-x-hidden scrollbar-thin scrollbar-track-transparent scrollbar-thumb-sidebar-border">
        <NavMain
          items={navData}
          collapsed={collapsed}
          openMegaMenu={openMegaMenu}
          setOpenMegaMenu={setOpenMegaMenu}
          activeItem={activeItem}
          setActiveItem={setActiveItem}
        />
      </SidebarContent>

      {/* User Footer */}
      <div className="border-t border-sidebar-border p-3">
        <div
          className={cn(
            "group/user flex cursor-pointer items-center gap-3 rounded-xl p-2 transition-all duration-200 hover:bg-sidebar-accent/50",
            collapsed ? "justify-center" : ""
          )}
        >
          {/* Avatar with animated ring */}
          <div className="relative shrink-0">
            <div className="h-8 w-8 rounded-full ring-2 ring-primary/20 ring-offset-1 ring-offset-background overflow-hidden transition-all duration-200 group-hover/user:ring-primary/50">
              <img
                src="https://images.shadcnspace.com/assets/profiles/user-11.jpg"
                alt="User"
                className="h-full w-full object-cover"
              />
            </div>
            {/* Online status dot */}
            <span className="absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full bg-emerald-500 ring-2 ring-background" />
          </div>

          {/* User info */}
          {!collapsed && (
            <div className="min-w-0 flex-1 text-left">
              <p className="truncate text-sm font-semibold text-sidebar-foreground leading-none mb-0.5">
                John Doe
              </p>
              <p className="truncate text-[11px] text-sidebar-foreground/75">
                john@example.com
              </p>
            </div>
          )}

          {/* Settings cog */}
          {!collapsed && (
            <Settings
              size={14}
              className="shrink-0 text-sidebar-foreground/50 opacity-0 transition-opacity group-hover/user:opacity-100"
            />
          )}
        </div>
      </div>
    </Sidebar>
  );
}
