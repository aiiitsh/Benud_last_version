import { View, Text, FlatList, TouchableOpacity, TextInput } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import {  ActivityIndicator  } from 'react-native';
import React, { useState, useEffect } from 'react';
import SyncStorage from 'sync-storage'
import axios from 'axios';
import KeyboardAvoidingWrapper from '../../components/KeyboardAvoidingWrapper';
import { PageTitle2 } from '../../components/styles';
import { SubTitle2 } from '../../components/styles';
import { GreyNumber } from '../../components/styles';
import { StyledButtonSmall2 } from '../../components/styles';
import { Octicons, Fontisto, Ionicons } from '@expo/vector-icons';
import { BackHandler } from 'react-native';

import {
  StyledContainer,
  InnerContainer,
} from './../../components/styles';

export default function Customer() {
  const navigation = useNavigation();
  const [tableData, setTableData] = useState([]);
  const [name, setName] = useState()
  const numOfCustomers = tableData.length;
  const [change, setChange] = useState(false)
  useEffect(() => {
    const fullName = SyncStorage.get('name')
    setName(fullName?.split(' ')[0])
    const token = SyncStorage.get('token')
    axios.get('http://3.81.96.115:5001/api/client', {headers: {Authorization: `Bearer ${token}`}})
    .then(res => {
      console.log(res.data)
      setTableData(res.data.clients)
    }).catch(err => console.log('error'))
  },[change])

  const handleRowPress = (item) => {
    navigation.navigate('Projects', { customerId: item._id, customerName: item.name, customerPhone: item.phoneNumber });
  };
  const handleBackButtonPress = () => {
    // Prevent the default behavior (navigating back)
    return true;
  };
  useEffect(() => {
    // Add event listener for hardware back button press
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      handleBackButtonPress
    );

    // Remove the event listener when the component unmounts
    return () => {
      backHandler.remove();
    };
  }, []);

  const handleInputChange = (text, index, field, _id) => {
    console.log(text,field, _id)
    const token = SyncStorage.get('token');
    const headers = {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json', // Assuming JSON content type, adjust as needed
    };
    if(field === 'name')
      axios
        .put('http://3.81.96.115:5001/api/client/update', {name: text, _id}, { headers })
        .then((res) => {
          console.log(res.data)
        })
        .catch((err) => console.log(err));
    if(field === 'phoneNumber')
      axios
          .put('http://3.81.96.115:5001/api/client/update', {phoneNumber: text, _id}, { headers })
          .then((res) => {
            console.log(res.data)
          })
          .catch((err) => console.log(err));
    const updatedTableData = tableData.map((item, i) => {
      if (index === i) {
        return { ...item, [field]: text };
      }
      return item;
    });
    setTableData(updatedTableData);
  };

  const renderTableRow = ({ item, index }) => (
  <TouchableOpacity onPress={() => handleRowPress(item)}>
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 10,
        borderBottomWidth: 1,
        borderBottomColor: 'grey',
        alignItems: 'center',
      }}
    >
      <TouchableOpacity onPress={() => handleEditPress(item._id)}>
        <Octicons name="pencil" size={24} color={item.isEditing ? 'green' : 'black'} style={{ marginRight: 10 }} />
      </TouchableOpacity>
      {item.isEditing ? (
        <>
          <TextInput
            style={{
              textAlign: 'right',
              flex: 2,
              backgroundColor: 'white',
              color: 'black',
            }}
            placeholder="رقم الهاتف"
            value={item.phoneNumber}
            onChangeText={(text) => handleInputChange(text, index, 'phoneNumber', item._id)}
          />
          <TextInput
            style={{
              textAlign: 'right',
              flex: 2,
              backgroundColor: 'white',
              color: 'black',
            }}
            placeholder="الاسم"
            value={item.name}
            onChangeText={(text) => handleInputChange(text, index, 'name', item._id)}
          />
        </>
      ) : (
        <>
          <Text style={{ textAlign: 'right', flex: 2 }}>{item.phoneNumber}</Text>
          <Text style={{ textAlign: 'right', flex: 2 }}>{item.name}</Text>
        </>
      )}
      <Text style={{ textAlign: 'right', flex: 1 }}>{index + 1}</Text>
    </View>
  </TouchableOpacity>
);

  

  const handleEditPress = (_id) => {
    const updatedTableData = tableData.map((item) => {
      if (item._id === _id) {
        return { ...item, isEditing: !item.isEditing };
      } else {
        return { ...item, isEditing: false };
      }
    });
    setTableData(updatedTableData);
  };
  
  
  const renderSeparator = () => (
    <View
      style={{
        height: 10, // Adjust this value to add more spacing between rows
        backgroundColor: 'transparent', // Use any color you want for the separator
      }}
    />
  );

  const handlePlusButtonPress = () => {
    const token = SyncStorage.get('token');
    const headers = {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json', // Assuming JSON content type, adjust as needed
    };
    setChange(prev => !prev)
    axios
      .post('http://3.81.96.115:5001/api/client/create', {}, { headers })
      .then((res) => {
        const newRow = { id: res.data.client._id, name: '', phone: '' };
        setTableData([...tableData, newRow]);
      })
      .catch((err) => console.log(err));
  };

  return (
    
      <StyledContainer>
        <PageTitle2 style={{ textAlign: 'right' }}>آهلا {name}</PageTitle2>
        <InnerContainer style={{ flexDirection: 'row-reverse', alignItems: 'center' }}>
          <SubTitle2 style={{ marginRight: 10 }}>العملاء</SubTitle2>
          <GreyNumber>({numOfCustomers})</GreyNumber>
        </InnerContainer>

        {/* Table Header */}
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            paddingVertical: 10,
            borderBottomWidth: 1,
            borderBottomColor: 'black',
            alignItems: 'center',
            marginTop: 10,
          }}
        >
          <Text style={{ textAlign: 'right', flex: 2 }}>رقم الهاتف</Text>
          <Text style={{ textAlign: 'right', flex: 2 }}>الاسم</Text>
          <Text style={{ textAlign: 'right', flex: 1 }}></Text>
        </View>

        {/* Table Data */}
        <FlatList
  data={tableData}
  renderItem={renderTableRow}
  keyExtractor={(item, index) => index.toString()} // Use the index as the key
  style={{ width: '100%' }}
  ItemSeparatorComponent={renderSeparator}
  keyboardShouldPersistTaps="handled"
/>


        {/* Plus Button Container */}
        <View
          style={{
            position: 'absolute',
            bottom: 20,
            left: 20,
          }}
        >
          {/* Plus Button */}
          <TouchableOpacity
            onPress={handlePlusButtonPress}
            style={{
              backgroundColor: '#000000',
              width: 60,
              height: 60,
              borderRadius: 25,
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Text style={{ color: 'white', fontSize: 36 }}>+</Text>
          </TouchableOpacity>
          
        </View>
      </StyledContainer>
   
  );
}