import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import { View, Text, ActivityIndicator, FlatList, TouchableOpacity, TextInput, Linking  } from 'react-native';
import React, { useState, useEffect } from 'react';
import KeyboardAvoidingWrapper from '../../components/KeyboardAvoidingWrapper';
import { PageTitle2 } from '../../components/styles';
import { SubTitle2 } from '../../components/styles';
import SyncStorage from 'sync-storage';
import { GreyNumber } from '../../components/styles';
import { StyledButtonSmall2 } from '../../components/styles';
import { Octicons, Fontisto, Ionicons } from '@expo/vector-icons';
import { createStackNavigator } from '@react-navigation/stack';

import {
  StyledContainer,
  PageTitle,
  SubTitle,
  InnerContainer,
  Colors,
} from './../../components/styles';

// colors
const { darkLight, brand, primary } = Colors;


export default function Projects(props) {
  const [customersData, setCustomersData] = useState([])
  const [_id, set_Id] = useState()
  const [change, setChange] = useState(false)

  useEffect(() => {
    const token = SyncStorage.get('token')
<<<<<<< HEAD
<<<<<<< HEAD
    axios.get(`http://3.81.96.115:5001/api/client/data/${props.route.params.customerId}`, {headers: {Authorization: `Bearer ${token}`}})
=======
    axios.get(`http://54.174.203.232:5001/api/client/data/${props.route.params.customerId}`, {headers: {Authorization: `Bearer ${token}`}})
>>>>>>> parent of 1ca7190 (ht)
=======
    axios.get(`http://54.174.203.232:5001/api/client/data/${props.route.params.customerId}`, {headers: {Authorization: `Bearer ${token}`}})
>>>>>>> parent of 1ca7190 (ht)
    .then(res => {
      set_Id(props.route.params.customerId)
      setTableData(res.data.customerData)
    }).catch(err => console.log('error'))
  }, [props, change])
  const [tableData, setTableData] = useState(customersData);
  const navigation = useNavigation();
  const handlePhoneNumberPress = () => { 
    const phoneUrl = `tel:${props.route.params.customerPhone}}`;
    Linking.openURL(phoneUrl);
  };
  const handleRowPress = (item) => {
    console.log(item._id)
    navigation.navigate('Benod', { projectId: item._id, customerId: props.route.params.customerId, customerName: props.route.params.customerName, customerPhone: props.route.params.customerPhone }); // Navigate to the Benod page
  };
  const handleBackButtonPress = () => {
    navigation.navigate('Customer'); // Navigate back to the previous screen
  };

  const renderTableRow = ({ item, index }) => (
    <TouchableOpacity id={item._id} onPress={() => handleRowPress(item)}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          paddingVertical: 10,
          borderBottomWidth: 1,
          borderBottomColor: '#454545',
          alignItems: 'center',
        }}
      >
        <TextInput
          style={{ textAlign: 'right', flex: 2 }}
          value={item.projectLocation}
          onChangeText={(text) => handleTextChange(item._id, 'projectLocation', text)}
        />
        <Text style={{ textAlign: 'right', flex: 2 }}>|</Text>
        <TextInput
          style={{ textAlign: 'right', flex: 2, color: '#00FF00' }}
          value={item.projectName}
          onChangeText={(text) => handleTextChange(item._id, 'projectName', text)}
        />
        <Text style={{ textAlign: 'right', flex: 1 }}>{index + 1}</Text>
      </View>
    </TouchableOpacity>
  );

  const renderSeparator = () => (
    <View
      style={{
        height: 10,
        backgroundColor: 'transparent',
      }}
    />
  );
//dfsgsd
  const handlePlusButtonPress = () => {
    const token = SyncStorage.get('token');
    const headers = {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json', // Assuming JSON content type, adjust as needed
    };
  
    axios
<<<<<<< HEAD
<<<<<<< HEAD
      .post('http://3.81.96.115:5001/api/client/createData', {_id}, { headers })
=======
      .post('http://54.174.203.232:5001/api/client/createData', {_id}, { headers })
>>>>>>> parent of 1ca7190 (ht)
=======
      .post('http://54.174.203.232:5001/api/client/createData', {_id}, { headers })
>>>>>>> parent of 1ca7190 (ht)
      .then((res) => {
        console.log(res.data)
        const newRow = { _id: res.data.clientData[0]._id, name: '', phone: '' };
        setTableData([...tableData, newRow]);
      })
      .catch((err) => console.log(err));
      setChange(prev => !prev)
  };

  const handleTextChange = (itemId, field, text) => {
    const token = SyncStorage.get('token');
    const headers = {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json', // Assuming JSON content type, adjust as needed
    };
    if(field === 'projectName')
      axios
<<<<<<< HEAD
<<<<<<< HEAD
        .put('http://3.81.96.115:5001/api/client/updateData', {projectName: text, _id: itemId}, { headers })
=======
        .put('http://54.174.203.232:5001/api/client/updateData', {projectName: text, _id: itemId}, { headers })
>>>>>>> parent of 1ca7190 (ht)
=======
        .put('http://54.174.203.232:5001/api/client/updateData', {projectName: text, _id: itemId}, { headers })
>>>>>>> parent of 1ca7190 (ht)
        .then((res) => {
          console.log(res.data)
        })
        .catch((err) => console.log(err));
    if(field === 'projectLocation')
      axios
<<<<<<< HEAD
<<<<<<< HEAD
          .put('http://3.81.96.115:5001/api/client/updateData', {projectLocation: text, _id: itemId}, { headers })
=======
          .put('http://54.174.203.232:5001/api/client/updateData', {projectLocation: text, _id: itemId}, { headers })
>>>>>>> parent of 1ca7190 (ht)
=======
          .put('http://54.174.203.232:5001/api/client/updateData', {projectLocation: text, _id: itemId}, { headers })
>>>>>>> parent of 1ca7190 (ht)
          .then((res) => {
            console.log(res.data)
          })
          .catch((err) => console.log(err));
    setTableData((prevData) =>
      prevData.map((item) => {
        if (item._id === itemId) {
          return { ...item, [field]: text };
        }
        return item;
      })
    );
  };

  return (
    <StyledContainer>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: 5, // Adjusted margin for spacing
        }}
      >
        <TouchableOpacity onPress={handleBackButtonPress}>
          {/* Replace text with a back arrow icon */}
          <Ionicons name="arrow-back" size={34} color='#000000' />
        </TouchableOpacity>
        <PageTitle style={{ textAlign: 'right' }}>{props.route.params.customerName}</PageTitle>
      </View>
      <TouchableOpacity onPress={handlePhoneNumberPress}>
        <SubTitle style={{ textAlign: 'right', textDecorationLine: 'underline', color: '#000000', marginBottom: 5 }}>
          {props.route.params.customerPhone}
        </SubTitle>
      </TouchableOpacity>
  
      <InnerContainer style={{ flexDirection: 'row-reverse', alignItems: 'center', marginTop: 5 }}>
        <SubTitle2 style={{ marginRight: 10 }}>المشاريع</SubTitle2>
        <GreyNumber>({tableData.length})</GreyNumber>
      </InnerContainer>
  
      {/* Table Header */}
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          paddingVertical: 5,
          borderBottomWidth: 1,
          borderBottomColor: 'grey',
          alignItems: 'center',
          marginTop: 5,
        }}
      >
        <Text style={{ textAlign: 'right', flex: 2 }}>العنوان</Text>
        <Text style={{ textAlign: 'right', flex: 2 }}>|</Text>
        <Text style={{ textAlign: 'right', flex: 2, color: '#00FF00' }}>المشروع</Text>
        <Text style={{ textAlign: 'right', flex: 1 }}></Text>
      </View>
  
      {/* Table Data */}
      <View style={{ flex: 1, marginTop: 5 }}>
        <FlatList
          data={tableData}
          renderItem={renderTableRow}
          keyExtractor={(item) => item._id}
          style={{ width: '100%' }}
          ItemSeparatorComponent={renderSeparator}
          keyboardShouldPersistTaps="handled"
        />
      </View>
  
      {/* Add Button */}
      <View
        style={{
          alignSelf: 'flex-start',
          marginBottom: 10,
          marginLeft: 10,
        }}
      >
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
          <Text style={{ color: '#FFFFFF', fontSize: 36 }}>+</Text>
        </TouchableOpacity>
      </View>
  
      {/* Black Button */}
      {/* <View
        style={{
          alignSelf: 'center',
          marginVertical: 10,
        }}
      >
        <TouchableOpacity
          onPress={() => {
            const token = SyncStorage.get('token');
            axios.get(`http://54.174.203.232:5001/api/client/getAccount/${props.route.params.customerId}`, { headers: { Authorization: `Bearer ${token}` } })
              .then(res => {
                console.log(res.data);
              }).catch(err => console.log('error'));
            //54.174.203.232:5001/
          }} // Implement the action for the black button here
          style={{
            backgroundColor: 'black',
            width: 300,
            height: 60,
            borderRadius: 30,
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Text style={{ color: 'white', fontSize: 18, fontWeight: 'bold' }}>
            احصل على اسم مستخدم للعميل
          </Text>
        </TouchableOpacity>
      </View> */}
    </StyledContainer>
  );
  
  
}
