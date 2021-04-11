import React, { useState, useEffect } from 'react';
import {
  View,
  StyleSheet,
  Text,
  Button,
  Platform,
  AsyncStorage,
} from 'react-native';
import { Focus } from './src/features/focus/Focus';
import { Colors } from './src/utils/colors';
import { Timer } from './src/features/timer/Timer';
import { Spacing } from './src/utils/sizes';
import { FocuseHistory } from './src/features/focus/FocuseHistory';
const STATUSES = {
  COMPLETE: 1,
  CANCELLED: 2,
};
export default function App() {
  const [focusSubject, setFocusSubject] = useState('Pedram');
  const [focuseHistory, setFocuseHistory] = useState([]);

  // useEffect(()=>{
  //   if (focusSubject){
  //     setFocuseHistory([...focuseHistory,setFocusSubject]);
  //   }
  // },[focusSubject])

  const addFocuseHistorySubjectWithState = (subject, statuse) => {
    setFocuseHistory([...focuseHistory, {key:String(focuseHistory.length+1), subject, statuse }]);
  };
  const onClear = () => {
    setFocuseHistory([]);
  };

  const saveFoucseHistory = async () => {
    try {
      await AsyncStorage.setItem(
        'focuseHistory',
        JSON.stringify(focuseHistory)
      );
    } catch (e) {
      console.log(e);
    }
  };
  const loadFocuseHistory = async () => {
    try {
      const history = await AsyncStorage.getItem('focuseHistory');
      if (history && JSON.parse(history).length) {
        setFocuseHistory(JSON.parse(history));
      }
    } catch (e) {
      console.log(e);
    }
  };
  useEffect(() => {
    loadFocuseHistory();
  }, []);
  useEffect(() => {
    saveFoucseHistory();
  }, [focuseHistory]);
  return (
    <View style={styles.container}>
      {focusSubject ? (
        <Timer
          focusSubject={focusSubject}
          onTimerEnd={() => {
            addFocuseHistorySubjectWithState(focusSubject, STATUSES.COMPLETE);
            setFocusSubject(null);
          }}
          clearSubject={() => {
            addFocuseHistorySubjectWithState(focusSubject, STATUSES.CANCELLED);
            setFocusSubject(null);
          }}
        />
      ) : (
        <>
          <Focus addSubject={setFocusSubject} />
          <FocuseHistory focuseHistory={focuseHistory} onClear={onClear} />
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.darkBlue,
    paddingTop: Platform.OS === 'ios' ? Spacing.md : Spacing.lg,
  },
});
