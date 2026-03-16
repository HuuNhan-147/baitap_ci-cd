export interface BlogPost {
  _id?: string;
  id?: number | string; // Compatibility
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  category: string;
  tags: string[];
  author: string;
  date?: string; // Compatibility
  createdAt?: string; // From API
  updatedAt?: string; // From API
  readTime: string;
  featured: boolean;
  image: string;
}

export interface Category {
  id: number;
  name: string;
  count: number;
}

export interface NavItem {
  name: string;
  path: string;
}

export type ButtonVariant = 'primary' | 'secondary' | 'outline';