import { ExploreIcon } from '@/components/Icons/ExploreIcon';
import { HomeIcon } from '@/components/Icons/HomeIcon';
import { OrdersIcon } from '@/components/Icons/OrdersIcon';
import { WishlistIcon } from '@/components/Icons/WishlistIcon';
import { BlurView } from 'expo-blur';
import { Tabs } from 'expo-router';

export default function TabLayout() {
  return (
    <Tabs screenOptions={{
      headerShown: true,
      tabBarActiveTintColor: '#0A7AFF',
      tabBarShowLabel: false,
      tabBarStyle: {
        position: 'absolute',
        backgroundColor: 'transparent',
        borderTopWidth: 0,
        elevation: 0,
        shadowOpacity: 0,
      },
      tabBarBackground: () => (
        <BlurView 
          intensity={100} 
          tint="prominent" 
          style={{ flex: 1 }} 
        />
      ),
    }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color, size }) => (
            <HomeIcon color={color} size={size} />
          ),
        }}
      />
      <Tabs.Screen
        name="explore"
        options={{
          title: 'Explore',
          tabBarIcon: ({ color, size }) => (
            <ExploreIcon color={color} size={size} />
          ),
        }}
      />
      <Tabs.Screen
        name="orders"
        options={{
          title: 'Orders',
          tabBarIcon: ({ color, size }) => (
            <OrdersIcon color={color} size={size} />
          ),
        }}
      />
      <Tabs.Screen
        name="wishlist"
        options={{
          title: 'Wishlist',
          tabBarIcon: ({ color, size }) => (
            <WishlistIcon color={color} size={size} />
          ),
        }}
      />
      <Tabs.Screen
        name="post"
        options={{
          href: null,
        }}
      />
    </Tabs>
  );
}