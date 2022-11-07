export interface NavItem {
    name: string;
    href: string;
    icon: string;
    children?: NavItem[] | undefined;
  }