import React, {useEffect, useState} from 'react';
import Layout from 'components/Layout';
import {TabScreen, Tabs, TabsProvider} from 'react-native-paper-tabs';
import {COLORS} from 'theme/colors';
import PrimarySales from './primarySales/PrimarySales';
import SecondarySales from './secondarySales/SecondarySales';
import {
  getCategoryData,
  getChannelPartnersData,
} from '../PerformanceMgmt.business';
import {IDropdownItem, LasType} from '../PerformanceMgmt.interface';
import {useSelector} from 'react-redux';
import {RootState} from 'store/redux/store';
import {getTranslationLabel} from 'utils/commonMethods';

const SalesPerformance = () => {
  const userData = useSelector((state: RootState) => state?.user?.user);
  const lastype = userData?.lasType;

  const [index, setTabIndex] = useState(0);
  const [categoryData, setCategoryData] = useState<IDropdownItem[]>([
    {value: 'electronice', label: 'ak electonices'},
  ]);
  const [channelPartnerId, setChannelPartnerId] = useState<IDropdownItem[]>([
    {value: 'sdfs', label: 'mfdsfs'},
  ]);

  const handleChangeIndex = (tabIndex: number) => {
    setTabIndex(tabIndex);
  };

  useEffect(() => {
    getCategoryData(setCategoryData);
  }, []);

  useEffect(() => {
    getChannelPartnersData(setChannelPartnerId);
  }, []);

  return (
    <Layout headerTitle={'sales_performance'}>
      <TabsProvider>
        <Tabs theme={{colors: {surface: COLORS.white}}} disableSwipe>
          {lastype !== LasType.RE && (
            <TabScreen
              label={'primary_sales'}
              onPress={() => handleChangeIndex(0)}>
              <PrimarySales
                categoryData={categoryData}
                channelPartnerData={channelPartnerId}
                tabCurrentIndex={index}
              />
            </TabScreen>
          )}
          <TabScreen
            label={'secondary_sales'}
            onPress={() => handleChangeIndex(1)}>
            <SecondarySales
              categoryData={categoryData}
              channelPartnerData={channelPartnerId}
              tabCurrentIndex={index}
            />
          </TabScreen>
        </Tabs>
      </TabsProvider>
    </Layout>
  );
};

export default SalesPerformance;
