import type { Product, ProductImage, Variant, SizeStock, Collection, Order, OrderItem } from '@prisma/client'

// ──────────────────────────────────────────────────────────────────────────────
// PRODUCT TYPES
// ──────────────────────────────────────────────────────────────────────────────

export type ProductWithImages = Product & {
  images: ProductImage[]
}

export type ProductWithDetails = Product & {
  images: ProductImage[]
  variants: (Variant & { sizes: SizeStock[] })[]
  collections: { collection: Collection }[]
  _count: { reviews: number }
  avgRating?: number
}

export type ProductCard = Pick<Product, 'id' | 'name' | 'slug' | 'price' | 'comparePrice' | 'isNew' | 'status'> & {
  images: Pick<ProductImage, 'url' | 'altText'>[]
}

// ──────────────────────────────────────────────────────────────────────────────
// CART TYPES
// ──────────────────────────────────────────────────────────────────────────────

export interface CartItem {
  id: string            // sizeStockId
  productId: string
  variantId: string
  name: string
  variantName: string
  size: string
  price: number
  comparePrice?: number
  quantity: number
  imageUrl: string
  slug: string
  maxStock: number
}

export interface Cart {
  items: CartItem[]
  subtotal: number
  itemCount: number
}

// ──────────────────────────────────────────────────────────────────────────────
// CHECKOUT TYPES
// ──────────────────────────────────────────────────────────────────────────────

export interface ShippingAddress {
  firstName: string
  lastName: string
  email: string
  phone: string
  addressLine1: string
  addressLine2?: string
  city: string
  state: string
  postalCode: string
  country: string
}

export interface CheckoutSession {
  cartItems: CartItem[]
  shippingAddress?: ShippingAddress
  shippingMethod?: ShippingMethod
  couponCode?: string
  couponDiscount?: number
}

export interface ShippingMethod {
  id: string
  name: string
  description: string
  price: number
  estimatedDays: string
}

// ──────────────────────────────────────────────────────────────────────────────
// ORDER TYPES
// ──────────────────────────────────────────────────────────────────────────────

export type OrderWithItems = Order & {
  items: (OrderItem & { product: Pick<Product, 'name' | 'slug'> })[]
}

// ──────────────────────────────────────────────────────────────────────────────
// NAVIGATION
// ──────────────────────────────────────────────────────────────────────────────

export interface NavItem {
  label: string
  href: string
  children?: NavItem[]
}

// ──────────────────────────────────────────────────────────────────────────────
// FILTERS
// ──────────────────────────────────────────────────────────────────────────────

export interface ProductFilters {
  collection?: string
  sizes?: string[]
  minPrice?: number
  maxPrice?: number
  sortBy?: 'newest' | 'price-asc' | 'price-desc' | 'name-asc'
  search?: string
  page?: number
  limit?: number
}

// ──────────────────────────────────────────────────────────────────────────────
// API RESPONSES
// ──────────────────────────────────────────────────────────────────────────────

export interface ApiResponse<T = unknown> {
  data?: T
  error?: string
  message?: string
}

export interface PaginatedResponse<T> {
  items: T[]
  total: number
  page: number
  limit: number
  totalPages: number
  hasNextPage: boolean
  hasPrevPage: boolean
}

// ──────────────────────────────────────────────────────────────────────────────
// FORM TYPES
// ──────────────────────────────────────────────────────────────────────────────

export interface LoginFormData {
  email: string
  password: string
}

export interface RegisterFormData {
  firstName: string
  lastName: string
  email: string
  password: string
  confirmPassword: string
}

export interface NewsletterFormData {
  email: string
  firstName?: string
}

export interface WaitlistFormData {
  email: string
  firstName: string
  lastName?: string
  size?: string
}

export interface ContactFormData {
  name: string
  email: string
  subject: string
  message: string
}

// ──────────────────────────────────────────────────────────────────────────────
// ADMIN TYPES
// ──────────────────────────────────────────────────────────────────────────────

export interface DashboardStats {
  totalRevenue: number
  revenueChange: number
  totalOrders: number
  ordersChange: number
  totalCustomers: number
  customersChange: number
  totalProducts: number
  lowStockCount: number
}

export interface RevenueDataPoint {
  date: string
  revenue: number
  orders: number
}

// ──────────────────────────────────────────────────────────────────────────────
// SEO
// ──────────────────────────────────────────────────────────────────────────────

export interface SeoProps {
  title?: string
  description?: string
  image?: string
  url?: string
  type?: 'website' | 'article' | 'product'
}

// ──────────────────────────────────────────────────────────────────────────────
// MISC
// ──────────────────────────────────────────────────────────────────────────────

export type Size = 'XS' | 'S' | 'M' | 'L' | 'XL' | 'XXL' | 'XXXL'

export const SIZES: Size[] = ['XS', 'S', 'M', 'L', 'XL', 'XXL', 'XXXL']

export const COUNTRIES = [
  { code: 'US', name: 'United States' },
  { code: 'CA', name: 'Canada' },
  { code: 'GB', name: 'United Kingdom' },
  { code: 'AU', name: 'Australia' },
  { code: 'AE', name: 'United Arab Emirates' },
  { code: 'SA', name: 'Saudi Arabia' },
  { code: 'KW', name: 'Kuwait' },
  { code: 'QA', name: 'Qatar' },
  { code: 'BH', name: 'Bahrain' },
  { code: 'OM', name: 'Oman' },
  { code: 'IQ', name: 'Iraq' },
] as const
