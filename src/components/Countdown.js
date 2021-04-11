import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { Colors } from '../utils/colors';
import { fontSizes, paddingSizes } from '../utils/sizes';

const minutesToMillis = (min) => min * 1000 * 60;
// const formatTime=
const formatTime = (time) => (time < 10 ? `0${time}` : time);

export const Countdown = ({ minutes = 1, isPaused, onProgress, onEnd }) => {
  const interval = React.useRef(null);
  const countDown = () => {
    setMillis((time) => {
      if (time === 0) {
        clearInterval(interval.current);
        onEnd();
        return time;
      }
      const timeLeft = time - 1000;
      onProgress(timeLeft / minutesToMillis(minutes));
      return timeLeft;
    });
  };
  useEffect(() => {}, [millis]);

  useEffect(() => {
    setMillis(minutesToMillis(minutes));
  }, [minutes]);

  useEffect(() => {
    if (isPaused) {
      if (interval.current) clearInterval(interval.current);
      return;
    }
    interval.current = setInterval(countDown, 1000);
    return () => clearInterval(interval.current);
  }, [isPaused]);
  const [millis, setMillis] = useState(minutesToMillis(minutes));
  const minute = Math.floor(millis / 1000 / 60) % 60;
  const secends = Math.floor(millis / 1000) % 60;
  return (
    <Text style={styles.text}>
      {formatTime(minute)}:{formatTime(secends)}
    </Text>
  );
};

const styles = StyleSheet.create({
  text: {
    fontSize: fontSizes.xxxl,
    fontWeight: 'bold',
    color: Colors.white,
    padding: paddingSizes.lg,
    backgroundColor: 'rgba(94,132,226,0.6)',
  },
});
