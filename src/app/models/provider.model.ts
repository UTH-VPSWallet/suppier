interface Provider {
  id: string; name: string; location: string; rating: number;
  products: number; activeVps: number; revenue: number; status: 'active' | 'inactive';
}