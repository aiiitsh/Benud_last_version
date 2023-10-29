
import { Linking } from 'react-native';
import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import KeyboardAvoidingWrapper from '../../components/KeyboardAvoidingWrapper'
import { StyledContainer } from '../../components/styles';
import { InnerContainer } from '../../components/styles';
import { PageTitle } from '../../components/styles';
import { SubTitle } from '../../components/styles';

export default function Customers() {
  const email = 'benudhelp@gmail.com';

  const handleEmailPress = () => {
    Linking.openURL(`mailto:${email}`);
  }

  return (
    <KeyboardAvoidingWrapper>
      <StyledContainer>
        <InnerContainer>
          <PageTitle>للتواصل</PageTitle>
          <TouchableOpacity onPress={handleEmailPress}>
            <SubTitle>{email}</SubTitle>
          </TouchableOpacity>
        </InnerContainer>
      </StyledContainer>
    </KeyboardAvoidingWrapper>
  );
}
