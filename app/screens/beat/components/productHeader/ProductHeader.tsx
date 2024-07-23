import {
  Image,
  ImageStyle,
  TextStyle,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import React, {ReactNode, useState} from 'react';
import {Card, Menu, Text} from 'react-native-paper';
import {VariantProp} from 'react-native-paper/lib/typescript/components/Typography/types';

import FileIcon from '../../../../../assets/icons/file.svg';
import ShareIcon from '../../../../../assets/icons/share.svg';
import styles from './ProductHeader.style';

interface IProfileHeader {
  title?: string;
  subTitle?: string;
  children?: ReactNode;
  imageUri?: object | undefined;
  customCardStyle?: ViewStyle;
  rightIcon?: ReactNode;
  rightIconOnPress?: (e?: any) => void;
  profileStyle?: ImageStyle;
  titleStyle?: TextStyle;
  titleVariant?: VariantProp<never> | undefined;
  subTitleVariant?: VariantProp<never> | undefined;
  subTitleStyle?: TextStyle;
  imageUrl?: string;
  textContainerStyle?: ViewStyle;
  onImagePress?: () => void;
  isMenuRequired?: boolean;
  downloadPdf?: () => void;
  sharePdf?: () => void;
}

const ProductHeader = ({
  title = '',
  subTitle = '',
  imageUri,
  children = <></>,
  customCardStyle,
  rightIcon,
  rightIconOnPress,
  profileStyle,
  titleStyle,
  titleVariant,
  subTitleVariant,
  subTitleStyle,
  imageUrl,
  textContainerStyle,
  onImagePress,
  downloadPdf,
  sharePdf,
  isMenuRequired = false,
}: IProfileHeader) => {
  const [menuVisible, setMenuVisible] = useState(false);
  const [menuAnchor, setMenuAnchor] = useState({x: 0, y: 0});

  const openMenu = (event: any) => {
    setMenuVisible(true);
    setMenuAnchor({x: event.nativeEvent.pageX, y: event.nativeEvent.pageY});
  };

  const closeMenu = () => setMenuVisible(false);

  const onPress = (e: any) => {
    rightIconOnPress && rightIconOnPress();
    isMenuRequired && openMenu(e);
  };
  return (
    <>
      <Card style={[styles.cardBackground, customCardStyle]}>
        <Card.Content>
          <View style={styles.container}>
            <View style={styles.userIcon}>
              {imageUri && (
                <Image
                  style={[styles.profileView, profileStyle]}
                  source={imageUri}
                />
              )}
              {imageUrl && (
                <TouchableOpacity onPress={onImagePress}>
                  <Image
                    style={[styles.profileView, profileStyle]}
                    source={{uri: imageUrl}}
                  />
                </TouchableOpacity>
              )}
            </View>
            <View style={styles.cardRightContainer}>
              <View style={[styles.textContainer, textContainerStyle]}>
                {title ? (
                  <Text
                    style={titleStyle}
                    variant={titleVariant ?? 'headlineMedium'}>
                    {title}
                  </Text>
                ) : (
                  <></>
                )}
                {subTitle ? (
                  <Text
                    style={subTitleStyle}
                    variant={subTitleVariant ?? 'bodySmall'}>
                    {subTitle}
                  </Text>
                ) : (
                  <></>
                )}
              </View>
              {rightIcon ? (
                <TouchableOpacity onPress={onPress}>
                  {rightIcon}
                </TouchableOpacity>
              ) : (
                <></>
              )}
            </View>
          </View>
          {children}
        </Card.Content>
      </Card>
      <Menu
        visible={menuVisible}
        onDismiss={closeMenu}
        anchor={menuAnchor}
        contentStyle={styles.menuContent}>
        <Menu.Item
          leadingIcon={() => <FileIcon />}
          onPress={downloadPdf}
          title="Download Scheme"
          titleStyle={styles.menuTitle}
        />
        <Menu.Item
          leadingIcon={() => <ShareIcon />}
          onPress={sharePdf}
          title="Share Scheme"
          titleStyle={styles.menuTitle}
        />
      </Menu>
    </>
  );
};

export default ProductHeader;
