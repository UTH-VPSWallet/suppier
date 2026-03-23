interface StatCard {
  label: string;
  value: string;
  trend: string;
  trendUp: boolean;
  icon: string;
  iconBg: string;
}

interface RecentOrder {
  id: string;
  customer: string;
  product: string;
  amount: number;
  status: 'active' | 'pending' | 'paid' | 'expired' | 'cancelled';
  date: string;
}

interface Activity {
  icon: string;
  text: string;
  time: string;
  color: string;
}