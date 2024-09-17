import React, {ReactNode} from 'react';
import {List} from 'react-native-paper';
import {
  UIManager,
  LayoutAnimation,
  Platform,
  View,
  TextStyle,
  ViewStyle,
  Image,
} from 'react-native';
import styles from './Accordion.style';
import {COLORS} from 'theme/colors';

if (Platform.OS === 'android') {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

interface IAccordionProps {
  title: string | ReactNode;
  children: ReactNode;
  isExpanded?: boolean;
  headingStyle?: ViewStyle;
  titleStyle?: TextStyle;
  isWhiteAccordion?: boolean;
  leftComponent?: () => React.ReactNode;
  childrenStyles?: ViewStyle;
  customRight?: ReactNode;
  onCustomPress?: () => React.ReactNode;
}

const Accordion = ({
  title,
  children,
  headingStyle,
  titleStyle,
  leftComponent,
  isExpanded = false,
  isWhiteAccordion = false,
  childrenStyles = {},
  customRight,
  onCustomPress,
}: IAccordionProps) => {
  const [expanded, setExpanded] = React.useState(isExpanded);

  const handlePress = () => {
    if (onCustomPress) {
      onCustomPress();
    } else {
      LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
      setExpanded(prev => !prev);
    }
  };
  const right = () => {
    return (
      <>
        {expanded ? (
          <Image
            source={require('../../../assets/images/downArrow.png')}
            style={[styles.iconStyle]}
          />
        ) : (
          <Image
            source={require('../../../assets/images/upArrow.png')}
            style={[styles.iconStyle]}
          />
        )}
      </>
    );
  };
  return (
    <List.Section>
      <List.Accordion
        theme={{colors: {background: COLORS.white}}}
        title={title}
        expanded={expanded}
        onPress={handlePress}
        left={leftComponent}
        right={!!customRight ? () => customRight(expanded) : right}
        titleStyle={[styles.titleStyle, titleStyle]}
        style={[
          styles.heading,
          {
            backgroundColor: COLORS.white,
          },
          headingStyle,
        ]}>
        <View style={[styles.innerContainer, childrenStyles]}>{children}</View>
      </List.Accordion>
    </List.Section>
  );
};

export default Accordion;
