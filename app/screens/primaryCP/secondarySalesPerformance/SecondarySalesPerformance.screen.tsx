import {View} from 'react-native';
import React from 'react';
import Layout from 'components/Layout';
import {TabScreen, Tabs, TabsProvider} from 'react-native-paper-tabs';
import CommonStyles from 'utils/commonStyle';
import {COLORS} from 'theme/colors';
import {RouteProp, useRoute} from '@react-navigation/native';
import {RootNavigationTypes} from 'routes/RootNavigation';
import {SECONDARY_SALES_TYPE} from 'utils/Constants';
import SecondarySalesData from '../components/SecondarySalesData';
import {currentMonthShort, currentYearShort} from 'utils/commonMethods';

const SecondarySalesPerformance = () => {
  const route =
    useRoute<RouteProp<RootNavigationTypes, 'SecondarySalesPerformance'>>();
  const {salesType, retailerChannelPartnerId} = route.params;

  const isMTD = salesType === SECONDARY_SALES_TYPE.MTD;

  return (
    <Layout
      headerTitle={isMTD ? 'MTD Sales Performance' : 'YTD Sales Performance'}>
      <TabsProvider>
        <View style={CommonStyles.flexOne}>
          <Tabs disableSwipe theme={{colors: {surface: COLORS.white}}}>
            <TabScreen label={isMTD ? 'MTD Sales' : 'YTD Sales'}>
              <SecondarySalesData
                retailerChannelPartnerId={retailerChannelPartnerId}
                type={isMTD ? 'MTD' : 'YTD'}
              />
            </TabScreen>
            <TabScreen
              label={
                isMTD
                  ? `PY Sales ${currentMonthShort} ${currentYearShort}`
                  : 'PFY Sales'
              }>
              <SecondarySalesData
                retailerChannelPartnerId={retailerChannelPartnerId}
                type={isMTD ? 'PYMTD' : 'PYYTD'}
              />
            </TabScreen>
          </Tabs>
        </View>
      </TabsProvider>
    </Layout>
  );
};

export default SecondarySalesPerformance;
