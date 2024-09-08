import { Home, Map, PlusCircle, Settings } from 'lucide-react';

export interface NavigationItem {
  name: string;
  href: string;
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
}

export const navigationItems: NavigationItem[] = [
  {
    name: 'Home',
    href: '/home',
    icon: Home,
  },
  {
    name: 'Map',
    href: '/map',
    icon: Map,
  },
  {
    name: 'Add Problem',
    href: '/add-problem',
    icon: PlusCircle,
  },
  {
    name: 'Settings',
    href: '/settings',
    icon: Settings,
  },
];