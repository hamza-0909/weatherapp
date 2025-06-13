import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, ActivityIndicator, StyleSheet, ImageBackground, TouchableOpacity } from 'react-native';
import * as Location from 'expo-location';

const WEATHER_API_KEY = '9bc4ab0068565fed604cb997e7e00556';

const HomeScreen = ({ navigation }: any) => {
  const [weather, setWeather] = useState<any>(null);
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [location, setLocation] = useState<{ latitude: number; longitude: number } | null>(null);
  const [locLoading, setLocLoading] = useState(true);

  useEffect(() => {
    (async () => {
      setLocLoading(true);
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setError('Permission to access location was denied');
        setLocLoading(false);
        return;
      }
      let loc = await Location.getCurrentPositionAsync({});
      setLocation({ latitude: loc.coords.latitude, longitude: loc.coords.longitude });
      setLocLoading(false);
    })();
  }, []);

  useEffect(() => {
    const fetchWeather = async () => {
      if (!location) return;
      try {
        const res = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${location.latitude}&lon=${location.longitude}&appid=${WEATHER_API_KEY}&units=metric`);
        const data = await res.json();
        setWeather(data);
      } catch (e) {
        setError('Failed to fetch weather');
      }
    };
    const fetchUsers = async () => {
      try {
        const res = await fetch('https://dummyjson.com/users');
        const data = await res.json();
        setUsers(data.users || []);
      } catch (e) {
        setError('Failed to fetch users');
      }
    };
    if (location) {
      setLoading(true);
      Promise.all([fetchWeather(), fetchUsers()]).finally(() => setLoading(false));
    }
  }, [location]);

  const handleLogout = () => {
    navigation.replace('Login');
  };

  if (locLoading) return <ActivityIndicator style={{ flex: 1 }} size="large" />;
  if (loading) return <ActivityIndicator style={{ flex: 1 }} size="large" />;
  if (error) return <Text style={styles.error}>{error}</Text>;

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Text style={styles.logoutButtonText}>Logout</Text>
      </TouchableOpacity>
      <ImageBackground source={{ uri: 'https://picsum.photos/id/1047/5000/3333' }} style={styles.weatherCard}>
        <Text style={styles.weatherTitle}>Current Weather</Text>
        {weather && (
          <View style={styles.weatherInfo}>
            <Text style={styles.weatherLocation}>{weather.name}</Text>
            <Text style={styles.weatherDescription}>{weather.weather?.[0]?.description}</Text>
            <Text style={styles.weatherTemp}>{weather.main?.temp}°C</Text>
          </View>
        )}
      </ImageBackground>

      <Text style={styles.subtitle}>Users Data</Text>
      <FlatList
        data={users}
        keyExtractor={(item: any) => item.id.toString()}
        renderItem={({ item }: { item: any }) => (
          <View style={styles.userCard}>
            <Text style={styles.userName}>{item.firstName} {item.lastName}</Text>
            <Text style={styles.userInfo}>Age: {item.age}</Text>
            <Text style={styles.userInfo}>Gender: {item.gender}</Text>
          </View>
        )}
        contentContainerStyle={styles.userList}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f8f8',
    paddingTop: 20,
  },
  logoutButton: {
    backgroundColor: '#dc3545',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignSelf: 'flex-end',
    marginRight: 20,
    marginBottom: 10,
    marginTop: 10,
  },
  logoutButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  weatherCard: {
    height: 200,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 20,
    borderRadius: 15,
    overflow: 'hidden',
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 8,
  },
  weatherTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 10,
  },
  weatherInfo: {
    alignItems: 'center',
    marginTop: 10,
  },
  weatherLocation: {
    fontSize: 22,
    color: '#fff',
    fontWeight: '500',
  },
  weatherDescription: {
    fontSize: 18,
    color: '#fff',
    textTransform: 'capitalize',
  },
  weatherTemp: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#fff',
    marginTop: 10,
  },
  subtitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginLeft: 20,
    marginBottom: 15,
    borderBottomWidth: 2,
    borderBottomColor: '#007bff',
    paddingBottom: 5,
    alignSelf: 'flex-start',
  },
  userList: {
    paddingHorizontal: 20,
  },
  userCard: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  userName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  userInfo: {
    fontSize: 14,
    color: '#555',
  },
  error: {
    color: 'red',
    textAlign: 'center',
    marginTop: 50,
    fontSize: 16,
  },
});

export default HomeScreen; 