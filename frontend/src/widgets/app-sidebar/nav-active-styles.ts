/** Top-level nav: strong contrast (primary fill). */
export const sidebarNavActiveClass =
  'font-semibold shadow-sm bg-sidebar-primary text-sidebar-primary-foreground hover:bg-sidebar-primary hover:text-sidebar-primary-foreground data-[active=true]:bg-sidebar-primary data-[active=true]:text-sidebar-primary-foreground [&>svg]:text-sidebar-primary-foreground';

/** Nested nav (Users, Roles, …): slightly darker than sidebar bg, not primary black. */
export const sidebarNavSubActiveClass =
  'h-8 font-semibold bg-sidebar-foreground/10 text-sidebar-foreground hover:bg-sidebar-foreground/14 data-[active=true]:bg-sidebar-foreground/10 data-[active=true]:text-sidebar-foreground [&>svg]:text-sidebar-foreground';
