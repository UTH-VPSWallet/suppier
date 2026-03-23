interface Order {
  id: string; customer: string; email: string; product: string;
  provider: string; amount: number; months: number;
  status: 'active' | 'pending' | 'paid' | 'expired' | 'cancelled'; date: string;
}
