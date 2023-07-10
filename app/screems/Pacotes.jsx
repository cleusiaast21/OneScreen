import React, { useState } from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import Privilegios from '../components/Privilegios';

export default function Pacotes({ route }){

    const { personId } = route.params;

    console.log(personId)

    const [selectedPackage, setSelectedPackage] = useState('Starter');

    const packages = [
      { name: 'Starter', price: 5000, description: 'O pacote Starter inclui:' },
      { name: 'Premium', price: 8000, description: 'O pacote Premium inclui:' },
    ];
  
    const selectedPackageObj = packages.find(p => p.name === selectedPackage);
    const { price, description } = selectedPackageObj || {};
  
    const handlePress = (packageType) => {
      setSelectedPackage(packageType);
    };
  
    return (
  
      <View style={styles.container}>
  
        <View style={styles.bottomSection}>
  
          <View style={styles.pacotes}>
  
            <TouchableOpacity onPress={() => handlePress('Starter')}>
              <Text style={[styles.priceText2, selectedPackage === 'Starter' ? styles.selectedPackage : null]}>Starter  </Text>
            </TouchableOpacity>
  
            <Text style={styles.priceText2}>-</Text>
  
            <TouchableOpacity onPress={() => handlePress('Premium')}>
              <Text style={[styles.priceText2, selectedPackage === 'Premium' ? styles.selectedPackage : null]}>  Premium</Text>
            </TouchableOpacity>
  
          </View>
  
          <Privilegios price={price} description={description} id={personId} />
  
        </View>
  
      </View>
    );
  }
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: 'black',
    },
    header: {
      flexDirection: 'row',
      alignItems: 'center',
      height: 80,
      paddingHorizontal: 10,
    },
    pacotes: {
      flexDirection: 'row',
    },
    iconContainer: {
      width: 50,
      justifyContent: 'center',
      alignItems: 'center',
    },
    titleContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    title: {
      color: 'red',
      fontSize: 300,
      fontWeight: 'bold',
    },
    selectedPackage: {
      color: 'red',
      fontSize: 22,
      paddingTop: 10,
    },
    privilegios: {
      flexDirection: 'row',
      marginBottom: 20,
      marginTop: 15,
    },
    bottomSection: {
      flex: 1,
      width: '100%',
      backgroundColor: 'white',
      alignItems: 'center',
      borderTopLeftRadius: 70,
      borderTopRightRadius: 70,
      position: 'absolute',
      top: '20%',
      left: 0,
      right: 0,
      bottom: 0,
    },
    informationText: {
      color: 'grey',
      fontSize: 15,
      padding: 10,
      marginTop: 30,
      marginBottom: 30,
      marginVertical: 30,
      marginHorizontal: 30,
      alignSelf: 'center',
    },
    informationText2: {
      color: 'grey',
      fontSize: 15,
      fontWeight: '400',
    },
    priceText2: {
      color: 'grey',
      fontSize: 20,
      paddingTop
        : 10,
    },
    headerC:{
        backgroundColor:'yellow',
        height:800,
        width:400
        
    }
  });
  