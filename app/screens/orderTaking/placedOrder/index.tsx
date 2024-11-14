import Layout from '@/components/Layout';
import React from 'react';
import {Text} from 'react-native-paper';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import ShareIcon from '../../../../assets/icons/share_white.svg';
import CheckCircle from '../../../../assets/icons/check_circle_contained.svg';
import CustomButton from '@/components/button/CustomButton';
import {COLORS} from '@/theme/colors';
import CommonStyles from '@/utils/commonStyle';
import {useNavigation} from '@react-navigation/native';
import {RootNavigationProp} from '@/routes/RootNavigation';
import {getTranslationLabel} from '@/utils/commonMethods';
const OrderPlaced = () => {
  const navigation = useNavigation<RootNavigationProp>();
  const GotoTop = () => {
    navigation.popToTop();
  };
  return (
    <Layout>
      <View style={styles.container}>
        <CheckCircle />
        <Text variant="labelLarge" style={{marginTop: 10}}>
          {getTranslationLabel('OrderHasBeenPlacedSuccessfully')}
        </Text>
        <Text variant="bodySmall" style={{marginTop: 5}}>
          {getTranslationLabel('YouMayShareOrderSummary')}
        </Text>
        <TouchableOpacity style={styles.btn}>
          <ShareIcon style={CommonStyles.marginR10} />
          <Text variant="bodySmall" style={{color: COLORS.white}}>
            Share Order Summary
          </Text>
        </TouchableOpacity>
        <Text onPress={GotoTop} variant="bodySmall" style={styles.goHome}>
          GO HOME
        </Text>
      </View>
    </Layout>
  );
};
export default OrderPlaced;
const styles = StyleSheet.create({
  goHome: {
    color: COLORS.dgreen,
    marginTop: 5,
  },
  btn: {
    backgroundColor: COLORS.dgreen,
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  container: {
    justifyContent: 'center',
    flex: 1,
    alignItems: 'center',
  },
});
