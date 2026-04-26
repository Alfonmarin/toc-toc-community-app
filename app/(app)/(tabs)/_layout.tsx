import { Tabs } from 'expo-router';
import { StyleSheet, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const PURPLE = '#5B4FE8';
const DARK_BG = '#0F0E1A';
const TAB_BG = '#13122A';
const BORDER = '#2D2B4E';
const TEXT_INACTIVE = '#5E5C80';

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: styles.tabBar,
        tabBarActiveTintColor: PURPLE,
        tabBarInactiveTintColor: TEXT_INACTIVE,
        tabBarLabelStyle: styles.tabLabel,
        tabBarBackground: () => <View style={styles.tabBarBg} />,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Inicio',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Mi perfil',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="person" size={size} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    position: 'absolute',
    borderTopWidth: 1,
    borderTopColor: BORDER,
    height: 70,
    paddingBottom: 12,
    paddingTop: 8,
    backgroundColor: 'transparent',
    elevation: 0,
  },
  tabBarBg: {
    flex: 1,
    backgroundColor: TAB_BG,
    opacity: 0.98,
  },
  tabLabel: {
    fontSize: 11,
    fontWeight: '600',
    letterSpacing: 0.2,
  },
});
