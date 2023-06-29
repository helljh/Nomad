import * as Location from "expo-location";
import { StatusBar } from 'expo-status-bar';
import React, {useState, useEffect} from "react";
import {  View, Text, StyleSheet, ScrollView, Dimensions} from 'react-native';


const {width : SCREEN_WIDTH} = Dimensions.get('window');

const API_KEY = "30ee8c50fc87cfc3a9732b745562eb8a";

export default function App() {
  const [city, setCity] = useState("Loading...")
  const [days, setDays] = useState([]);
  const [ok, setOk] = useState(true);
  const getWeather = async() => {
    const {granted} = await Location.requestForegroundPermissionsAsync();
    if(!granted){
      setOk(false);
    }
    const {coords:{latitude, longitude}} = await Location.getCurrentPositionAsync({accuracy:5})
    const location = await Location.reverseGeocodeAsync({latitude,longitude}, {useGoogleMaps:false})
    setCity(location[0].city)
    const response = await fetch(`api.openweathermap.org/data/2.5/forecast/daily?lat=${latitude}&lon=${longitude}&cnt={7}&appid=${API_KEY}`)
    const json = await response.json();
    setDays(json.list);
  };
  useEffect(()=>{
    getWeather();
  }, []);
  return (
    <View style={styles.container}> 
      <View style={styles.city}>
        <Text style={styles.cityName}>{city}</Text>
      </View>
      <ScrollView
      indicatorStyle='white'
      pagingEnabled
      horizontal 
      contentContainerStyle={styles.weather}>
      {days.length === 0 ?(
        <View style={styles.day}>
          <Text>Loading...</Text>
        </View>
        ) : (
          days.map((day, index)=>(
            <View key={index} style={styles.day}>
              <Text style={styles.temp}>{day.temp.day}</Text>
              <Text style={styles.description}>{day.weather[0].main}</Text>
            </View>
          ))
        )};
        
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container:{
    flex:1, 
    backgroundColor:"tomato",
  },
  city:{
    flex:1,
    justifyContent: "center",
    alignItems:"center",
  },
  cityName:{
    fontSize: 60,
    fontWeight: "500",
  },
  weather:{
  
  },
  day:{
    width: SCREEN_WIDTH,
    alignItems:"center",

  },
  temp:{
    marginTop:50,
    fontSize:170,

  },
  description:{
    marginTop:-30,
    fontSize:60,
  },
})

