import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
<<<<<<< HEAD
import DashboardLayout, { MarketplaceNavItemProp } from '../components/DashboardLayout';
import api from '../services/api';
import {
  Users,
  PiggyBank,
  ShoppingBasket,
  Cross,
  Briefcase,
  TrendingUp,
  ShoppingBag,
  User,
  CheckCircle,
  DollarSign,
  CreditCard,
  Activity,
  Shield,
  ChevronRight,
  LayoutDashboard,
  Calendar,
  BarChart2,
  MessageSquare,
  Home,
  FileText,
  UserPlus,
  ShieldCheck,
} from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import moment from 'moment';
import { toast } from 'react-toastify';
import { userNavItems, adminNavItems, marketplaceNavItem } from '../navItems';
=======
import Button from '../components/Button';
import Layout from '../components/Layout';
import { getCurrentUser, logout } from '../utils/auth';
import api from '../services/api';
>>>>>>> 2ea9360 (Complete rewrite with new UI and social login components)

interface UserData {
  id: number;
  email: string;
  name: string;
<<<<<<< HEAD
  created_at: string;
  profilePicture?: string;
  role: 'admin' | 'member';
}

interface UserStats {
  walletBalance: number;
  activeGroupsCount: number;
  totalContributions: number;
  recentTransactions: {
    id: number;
    amount: number;
    date: string;
    type: string;
    description: string;
  }[];
  monthlySummary: {
    month: string;
    total: number;
  }[];
}

interface StokvelGroup {
  id: number;
  name: string;
  description: string;
  contributionAmount: number;
  contributionFrequency: string;
  memberCount: number;
  maxMembers: number;
  status: 'active' | 'pending' | 'inactive';
}

const horizontalNavItems = [
  { id: 'home', label: 'Home', path: '/dashboard' },
  { id: 'offers', label: 'Offers', path: '/dashboard/offers' },
  { id: 'contributions-overview', label: 'Contributions overview', path: '/dashboard/contributions-overview' },
  { id: 'recent-activity', label: 'Recent activity', path: '/dashboard/recent-activity' },
  { id: 'payout-schedule', label: 'Payout Schedule', path: '/dashboard/payout-schedule' },
  { id: 'ai-features', label: 'AI features', path: '/dashboard/ai-features' },
];

interface CategoryCardProps {
  icon: React.ComponentType;
  title: string;
  onClick: () => void;
}

const CategoryCard: React.FC<CategoryCardProps> = ({ icon: Icon, title, onClick }) => {
  return (
    <div
      onClick={onClick}
      className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200 cursor-pointer flex flex-col items-center justify-center text-center"
    >
      <div className="p-3 bg-blue-100 rounded-full mb-3">
        <Icon className="w-8 h-8 text-blue-600" />
      </div>
      <div>
        <h3 className="text-base font-semibold text-gray-800">{title}</h3>
      </div>
    </div>
  );
};

const mockUser: UserData = {
  id: 1,
  email: 'demo@example.com',
  name: 'Demo User',
  created_at: new Date().toISOString(),
  role: 'member',
};

const mockUserStats: UserStats = {
  walletBalance: 1550.75,
  activeGroupsCount: 2,
  totalContributions: 7500.00,
  recentTransactions: [
    { id: 1, amount: 500.00, date: new Date('2023-05-20').toISOString(), type: 'deposit', description: 'Contribution to Group A' },
    { id: 2, amount: 300.00, date: new Date('2023-05-15').toISOString(), type: 'deposit', description: 'Contribution to Group B' },
    { id: 3, amount: 700.00, date: new Date('2023-04-25').toISOString(), type: 'deposit', description: 'Contribution to Group A' },
  ],
  monthlySummary: [
    { month: '2023-01', total: 800 },
    { month: '2023-02', total: 1200 },
    { month: '2023-03', total: 1500 },
    { month: '2023-04', total: 1700 },
    { month: '2023-05', total: 2000 },
  ],
};

const mockAvailableGroups: StokvelGroup[] = [
  {
    id: 101,
    name: 'New Investment Stokvel',
    description: 'Focuses on group investments in stocks.',
    contributionAmount: 1000.00,
    contributionFrequency: 'monthly',
    memberCount: 5,
    maxMembers: 20,
    status: 'active'
  },
  {
    id: 102,
    name: 'Weekend Savings Group',
    description: 'Save for weekend getaways.',
    contributionAmount: 200.00,
    contributionFrequency: 'weekly',
    memberCount: 15,
    maxMembers: null,
    status: 'active'
  },
];

interface DashboardContentProps {
  user: UserData | null;
  userStats: UserStats | null;
  availableGroups: StokvelGroup[];
  chartData: { month: string; Total: number }[];
  navigate: (path: string) => void;
  offers: Offer[];
  loading: boolean;
  error: string | null;
}

const DashboardContent: React.FC<DashboardContentProps> = ({ user, userStats, availableGroups, chartData, navigate, offers, loading, error }) => {
  const usingMockData = user?.email === mockUser.email;

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen-minus-header">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-4xl mx-auto p-4 mt-8">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
          <strong className="font-bold">Error: </strong>
          <span className="block sm:inline">{error}</span>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto p-4">
      {usingMockData && (
        <div className="bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-3 rounded relative mb-4" role="alert">
          <strong className="font-bold">Demo Mode: </strong>
          <span className="block sm:inline">Displaying sample data. Connect to a backend to see real data.</span>
        </div>
      )}
        <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
            Welcome, {user?.name || 'User'}
          </h1>
          <p className="text-gray-600">
            {user?.role === 'admin'
              ? 'Manage your platform and monitor user activities.'
              : 'Effortlessly track contributions and financial goals for your group.'}
          </p>
        </div>
        {user?.role === 'admin' && (
          <span className="inline-flex items-center rounded-md bg-blue-50 px-2 py-1 text-xs font-medium text-blue-700 ring-1 ring-inset ring-blue-700/10">
            Admin
          </span>
        )}
      </div>

      {user?.role !== 'admin' && (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4 mb-8">
          <CategoryCard
            icon={PiggyBank}
            title="Savings"
            onClick={() => navigate('/dashboard/savings')}
          />
          <CategoryCard
            icon={ShoppingBasket}
            title="Grocery"
            onClick={() => navigate('/dashboard/grocery')}
          />
          <CategoryCard
            icon={Cross}
            title="Burial"
            onClick={() => navigate('/dashboard/burial')}
          />
          <CategoryCard
            icon={Briefcase}
            title="Business"
            onClick={() => navigate('/dashboard/business')}
          />
          <CategoryCard
            icon={TrendingUp}
            title="Investment"
            onClick={() => navigate('/dashboard/investment')}
          />
        </div>
      )}

      <div className="bg-white p-6 rounded-lg shadow-md mb-8">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Contributions Overview</h2>
        {chartData.length > 0 ? (
          <div className="w-full h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={chartData}
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip formatter={(value: number) => `R ${value.toFixed(2)}`} />
                <Legend />
                <Bar dataKey="Total" fill="#3B82F6" name="Total Contribution" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        ) : (
          <div className="w-full h-64 flex items-center justify-center text-gray-500">No monthly contribution data available for chart.</div>
        )}
        <div className="mt-6">
          <h3 className="text-lg font-medium text-gray-700 mb-2">Recent Activity</h3>
          {userStats?.recentTransactions && userStats.recentTransactions.length > 0 ? (
            <ul className="list-disc list-inside text-gray-600 ml-4">
              {userStats.recentTransactions.map((transaction) => (
                <li key={transaction.id}>
                  {moment(transaction.date).format('YYYY-MM-DD')}: R{transaction.amount.toFixed(2)} - {transaction.description}
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-600 ml-4">No recent contributions found.</p>
          )}
        </div>
      </div>

      {user?.role !== 'admin' && (
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Available Stokvel Groups</h2>
          {availableGroups.length > 0 ? (
            <ul className="divide-y divide-gray-200">
              {availableGroups.map((group) => (
                <li key={group.id} className="py-4">
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="text-lg font-medium text-gray-900">{group.name}</p>
                      <p className="text-sm text-gray-600">{group.description}</p>
                      <p className="text-sm text-gray-600 mt-1">
                        Contribution: R{group.contributionAmount} - {group.contributionFrequency}
                      </p>
                      <p className="text-sm text-gray-600 mt-1">
                        Members: {group.memberCount} / {group.maxMembers ?? 'Unlimited'}
                      </p>
                    </div>
                    <button
                      onClick={() => navigate(`/dashboard/groups/${group.id}`)}
                      className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition duration-200 ease-in-out"
                    >
                      View Details
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-600">No available groups found.</p>
          )}
        </div>
      )}

      {user?.role === 'admin' && (
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Admin Dashboard Content Placeholder</h2>
          <p className="text-gray-600">This area would display admin-specific statistics, user management links, group management, etc. based on the admin nav items.</p>
        </div>
      )}
    </div>
  );
=======
>>>>>>> 2ea9360 (Complete rewrite with new UI and social login components)
}

const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
<<<<<<< HEAD
  const [userStats, setUserStats] = useState<UserStats | null>(null);
  const [availableGroups, setAvailableGroups] = useState<StokvelGroup[]>([]);
  const [offers, setOffers] = useState([]);

  const fetchDashboardData = async () => {
    try {
      const userResponse = await api.authAPI.getCurrentUser();
      const currentUser = userResponse.data.user;

      setUser(currentUser);

      let statsResponse;
      let groupsResponse;

      if (currentUser.role === 'admin') {
        statsResponse = await api.adminAPI.getStats();
        groupsResponse = await api.adminAPI.getGroups();
      } else {
        statsResponse = await api.userAPI.getUserStats();
        groupsResponse = await api.userAPI.getAvailableGroups();
      }

      setUserStats(statsResponse.data);
      setAvailableGroups(groupsResponse.data);

      setError(null);

    } catch (err: any) {
      console.error('Error fetching dashboard data:', err);
      setError(err.response?.data?.message || 'Failed to fetch dashboard data.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const chartData = userStats?.monthlySummary ? userStats.monthlySummary.map(item => ({
    month: moment(item.month).format('MMM'),
    Total: item.total
  })) : [];

  const currentSidebarNavItems = user?.role === 'admin' ? adminNavItems : userNavItems;

  return (
    <DashboardLayout
      user={user}
      sidebarNavItems={currentSidebarNavItems}
      marketplaceNavItem={marketplaceNavItem}
    >
      <DashboardContent
        user={user}
        userStats={userStats}
        availableGroups={availableGroups}
        chartData={chartData}
        navigate={navigate}
        offers={offers}
        loading={loading}
        error={error}
      />
    </DashboardLayout>
  );
};

const validateEmail = (email: string): boolean => {
  const re = /^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/;
  return re.test(email);
};

const handlePartnerSubmit = (e: React.FormEvent) => {
  e.preventDefault();
  const email = (e.target as HTMLFormElement).elements.namedItem('partner-email') as HTMLInputElement;

  if (!validateEmail(email.value)) {
    toast.error('Please enter a valid email address');
    return;
  }
  // proceed with submission
};

=======

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await api.get('/auth/me');
        setUser(response.data);
      } catch (error: any) {
        setError(error.response?.data?.message || 'Failed to fetch user data');
        if (error.response?.status === 401) {
          navigate('/login');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [navigate]);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  if (loading) {
    return (
      <Layout>
        <div className="flex justify-center items-center h-screen">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-emerald-500"></div>
        </div>
      </Layout>
    );
  }

  if (error) {
    return (
      <Layout>
        <div className="max-w-4xl mx-auto p-4">
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
            {error}
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="max-w-4xl mx-auto p-4">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">
            Welcome, {user?.name || 'User'} to i-STOKVEL
          </h1>
          <Button variant="secondary" onClick={handleLogout}>
            Logout
          </Button>
        </div>
        <div className="bg-white rounded-lg shadow-md p-6">
          <p className="text-gray-600">
            This is your dashboard. More features coming soon!
          </p>
        </div>
      </div>
    </Layout>
  );
};

>>>>>>> 2ea9360 (Complete rewrite with new UI and social login components)
export default Dashboard; 