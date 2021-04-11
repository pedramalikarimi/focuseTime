import React,{useState} from 'react';
import { View, Text, StyleSheet, Platform } from 'react-native';
import { TextInput } from 'react-native-paper';
import { RoundedButton } from '../../components/RoundedButton';
import {fontSizes, paddingSizes} from '../../utils/sizes';
import {Colors} from '../../utils/colors';
export const Focus = ({addSubject}) => {
  const [tempItem,setTempItem]=useState(null);
  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}> What would like to focus on? </Text>
        <View style={styles.inputeContainer}>
          <TextInput label="Inpute Name" style={{ flex: 1, marginRight: 20 }} 
          onSubmitEditing={
            ({nativeEvent})=>{setTempItem(nativeEvent.text)}} />
          <RoundedButton title="Start" size={50} onPress={()=>{addSubject(tempItem)}} />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  titleContainer: {
    flex: 0.5,
    padding: Platform.OS === 'android' ? paddingSizes.md : paddingSizes.lg,
    justifyContent: 'center',
  },
  title: {
    color: Colors.white,
    fontWeight: 'bold',
    fontSize: fontSizes.lg,
  },
  inputeContainer: {
    paddingTop: paddingSizes.md,
    flexDirection: 'row',
    alignItems:'center'
  },
});
