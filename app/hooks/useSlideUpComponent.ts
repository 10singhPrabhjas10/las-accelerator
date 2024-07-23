import {useCallback, useRef, useState} from 'react';
import {Animated} from 'react-native';

const useSlideUpComponent = () => {
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const animatedHeight = useRef(new Animated.Value(0)).current;

  const toggleVisibility = useCallback(() => {
    if (isVisible) {
      animatedHeight.stopAnimation(); //Clear the animation when hiding the component
    }
    setIsVisible(prevState => !prevState);
    Animated.timing(animatedHeight, {
      toValue: isVisible ? 0 : 1, // Change from 0 to 1 to represent the percentage of height change
      duration: 300,
      useNativeDriver: false,
    }).start();
  }, [isVisible, animatedHeight]);

  const modalHeight: Animated.AnimatedInterpolation<string | number> =
    animatedHeight.interpolate({
      inputRange: [0, 1],
      outputRange: ['0%', '100%'],
    });

  return {isVisible, animatedHeight, modalHeight, toggleVisibility};
};

export default useSlideUpComponent;
