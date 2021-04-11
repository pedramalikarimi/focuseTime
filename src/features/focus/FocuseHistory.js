import React from 'react';
import { View, StyleSheet, FlatList, Text, SafeAreaView } from 'react-native';
import { fontSizes, paddingSizes } from '../../utils/sizes';
import { RoundedButton } from '../../components/RoundedButton';

const HistoryItem = ({ item, index }) => {
  return (
    <Text style={styles.historyItemText(item.statuse)}>{item.subject}</Text>
  );
};
export const FocuseHistory = ({ focuseHistory, onClear }) => {
  const cleareHistory = () => {
    onClear();
  };

  return (
    <>
      <SafeAreaView style={{ flex: 1 }}>
        {!!focuseHistory.length && (
          <>
            <Text style={styles.title}>thing is focuse on</Text>
            <FlatList
              style={{ flex: 1 }}
              contentContainerStyle={{ flex: 1, alignItems: 'center' }}
              data={focuseHistory}
              renderItem={HistoryItem}
            />
            <View style={{alignItems:'center',paddingBottom:10}}> 
            <RoundedButton title="Clear" size={80} onPress={onClear}  />
            </View>
           
          </>
        )}
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  title: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 20,
    paddingBottom: 10,
  },
  historyItemText: (status) => ({
    color: status > 1 ? 'red' : 'green',
    fontSizes: 15,
  }),
});
