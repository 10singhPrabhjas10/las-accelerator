import BottomSheetModalComponent from '@/bottomSheets/bottomSheetModal/BottomSheetModalComponent';
import CustomRadioButton from '@/components/radioButton/CustomRadioButton';
import React, {forwardRef, useEffect, useState} from 'react';
import {View} from 'react-native';
import {BottomSheetModal} from '@gorhom/bottom-sheet';
import {getTranslationLabel} from '@/utils/commonMethods';
import {fontConfig} from '@/theme/fonts';
import CustomButton from '@/components/button/CustomButton';
import {ButtonTypes} from '@/types/buttons';
import {COLORS} from '@/theme/colors';
import {Text} from 'react-native-paper';
import {styles} from './styles';
import GreyCheck from '../../../../assets/icons/check_grey.svg';
import RotateIcon from '../../../../assets/icons/rotate_grey.svg';
import CommonStyles from '@/utils/commonStyle';
interface IOptimiseRoute {
  ref: React.RefObject<BottomSheetModal> | null;
}

const routesFilter = [
  {
    value: '1',
    label: getTranslationLabel('traffic'),
  },
  {
    value: '2',
    label: getTranslationLabel('Store_Priority'),
  },
  {
    value: '3',
    label: getTranslationLabel('Sales_Potential'),
  },
];

const OptimiseRoute = forwardRef<BottomSheetModal, IOptimiseRoute>(
  ({}, ref) => {
    const [routeFilter, setRouteFilter] = useState(routesFilter[1].value);
    const [updating, setUpdating] = useState(false);
    const update = () => {
      setUpdating(true);
      setTimeout(() => setUpdating(false), 2000);
    };
    useEffect(() => {
      console.log(routeFilter);
    }, [routeFilter]);
    function getCurrentLabel() {
      return routesFilter.find(item => item.value == routeFilter)?.label;
    }
    return (
      <BottomSheetModalComponent ref={ref} minHeight={'40%'} maxHeight={'40%'}>
        <View style={styles.parent}>
          <CustomRadioButton
            disabled={updating}
            title={getTranslationLabel('Optimise_Route')}
            textStyle={{...fontConfig.headlineLarge, fontSize: 16}} ///add new font when orderTaking is merged
            onChange={function (value: string): void {
              setRouteFilter(value);
            }}
            value={routeFilter}
            data={routesFilter}
            isVerticalButtons={true}
            activeColor={COLORS.dgreen}
          />
          {
            <View style={styles.updatingTextContainer}>
              {updating ? <RotateIcon /> : <GreyCheck />}
              <Text variant="bodyMedium" style={styles.updatingText}>
                {updating
                  ? getTranslationLabel('Routes Updating') + getCurrentLabel()
                  : getTranslationLabel('Routes Updated')}
              </Text>
            </View>
          }
          <CustomButton
            isDisabled={updating}
            type={ButtonTypes.contained}
            text={getTranslationLabel('proceed')}
            onPress={update}
          />
        </View>
      </BottomSheetModalComponent>
    );
  },
);
export default OptimiseRoute;
