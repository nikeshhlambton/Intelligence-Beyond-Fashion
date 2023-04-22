import React, { useCallback, useEffect, useRef, useState } from "react";
import { Animated, PanResponder, View, Text } from "react-native";

import Card from "../Card";
import Footer from "../Footer";
import { ACTION_OFFSET, CARD } from "../../utils/constants";
import { currentTrends as trendsArray } from "../../Data/data";
import { styles } from "./styles";

const CurrentTrends = () => {
  const [currentTrends, setCurrentTrend] = useState(trendsArray);
  const swipe = useRef(new Animated.ValueXY()).current;
  const tiltSign = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    if (!currentTrends.length) {
      setCurrentTrend(currentTrends);
    }
  }, [currentTrends.length]);

  const panResponder = PanResponder.create({
    onMoveShouldSetPanResponder: () => true,
    onPanResponderMove: (_, { dx, dy, y0 }) => {
      swipe.setValue({ x: dx, y: dy });
      tiltSign.setValue(y0 > CARD.HEIGHT / 2 ? 1 : -1);
    },
    onPanResponderRelease: (_, { dx, dy }) => {
      const direction = Math.sign(dx);
      const isActionActive = Math.abs(dx) > ACTION_OFFSET;

      if (isActionActive) {
        Animated.timing(swipe, {
          duration: 200,
          toValue: {
            x: direction * CARD.OUT_OF_SCREEN,
            y: dy,
          },
          useNativeDriver: true,
        }).start(removeTopCard);
      } else {
        Animated.spring(swipe, {
          toValue: {
            x: 0,
            y: 0,
          },
          useNativeDriver: true,
          friction: 5,
        }).start();
      }
    },
  });

  const removeTopCard = useCallback(() => {
    setCurrentTrend((prevState) => prevState.slice(1));
    swipe.setValue({ x: 0, y: 0 });
  }, [swipe]);

  const handleChoice = useCallback(
    (direction) => {
      Animated.timing(swipe.x, {
        toValue: direction * CARD.OUT_OF_SCREEN,
        duration: 400,
        useNativeDriver: true,
      }).start(removeTopCard);
    },
    [removeTopCard, swipe.x]
  );

  return (
    <View style={styles.container}>
      {currentTrends.length > 0 ? (
        currentTrends
          .map(({ title, img }, index) => {
            const isFirst = index === 0;
            const dragHandlers = isFirst ? panResponder.panHandlers : {};

            return (
              <>
                <Card
                  key={title}
                  name={title}
                  source={img}
                  isFirst={isFirst}
                  swipe={swipe}
                  tiltSign={tiltSign}
                  {...dragHandlers}
                />
                <Footer handleChoice={handleChoice} />
              </>
            );
          })
          .reverse()
      ) : (
        <View>
          <Text>No Trends To Show</Text>
        </View>
      )}
    </View>
  );
};

export default CurrentTrends;
