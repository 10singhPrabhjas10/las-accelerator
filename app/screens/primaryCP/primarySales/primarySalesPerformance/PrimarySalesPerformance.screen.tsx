import React, {useEffect, useState} from 'react';
import Layout from 'components/Layout';
import DataCard from 'components/dataCard/DataCard';
import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';
import {RootNavigationProp, RootNavigationTypes} from 'routes/RootNavigation';
import {
  downloadSalesReportData,
  getPrimarySalesDetails,
} from 'screens/primaryCP/PrimaryChannelPartner.business';
import {View} from 'react-native';
import CommonStyles from 'utils/commonStyle';
import CustomButton from 'components/button/CustomButton';
import {ButtonTypes} from 'types/buttons';
import FileIcon from '../../../../../assets/icons/file.svg';
import VolumeTargetIcon from '../../../../../assets/icons/volumeTargetIcon.svg';
import {useSelector} from 'react-redux';
import {RootState} from 'store/redux/store';
import {DateFormats} from 'constants/dateFormat';
import {convertDateToDisplay, getTranslationLabel} from 'utils/commonMethods';
import EmptyContainer from 'components/emptyContainer/EmptyContainer';
import ModalComponent from 'modals/ModalComponent';
import PrimarySalesModal from './PrimarySalesModal';

const PrimarySalesPerformance = () => {
  const route =
    useRoute<RouteProp<RootNavigationTypes, 'PrimarySalesPerformance'>>();
  const {salesData, categoryId} = route.params;
  const navigation = useNavigation<RootNavigationProp>();
  const channelPartnerId = useSelector(
    (state: RootState) => state.channelPartner.customerCode,
  );

  const [performanceData, setPerformanceData] =
    useState<ITransformedPrimarySalesDetails>();
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    getPrimarySalesDetails(
      channelPartnerId,
      categoryId,
      setPerformanceData,
      salesData,
    );
  }, [channelPartnerId]);

  const handleSubmit = (startDate: string, endDate: string) => {
    const reqBody: IDownloadSalesReportRequestBody = {
      channelPartnerId,
      customDate: {
        fromDate: startDate
          ? convertDateToDisplay(startDate, DateFormats.YYYY_MM_DD)
          : '',
        toDate: endDate
          ? convertDateToDisplay(endDate, DateFormats.YYYY_MM_DD)
          : '',
      },
    };
    downloadSalesReportData(reqBody, startDate, endDate);
  };

  return (
    <Layout
      isScrollable
      headerTitle={getTranslationLabel('primary_sales_performance')}
      style={CommonStyles.padding}>
      {performanceData === undefined ? (
        <View>
          <EmptyContainer
            title={getTranslationLabel('no_primary_sales_data_msg')}
          />
        </View>
      ) : (
        <>
          <View style={CommonStyles.flexOne}>
            <DataCard
              data={performanceData?.data ?? []}
              header={salesData?.category}
            />
          </View>

          <ModalComponent showModal={showModal}>
            <PrimarySalesModal
              setShowModal={setShowModal}
              onSubmit={(startDate, endDate) =>
                handleSubmit(startDate, endDate)
              }
            />
          </ModalComponent>
          <CustomButton
            type={ButtonTypes.outline}
            style={CommonStyles.marginVertical}
            text="Download Report"
            icon={<FileIcon />}
            onPress={() => {
              setShowModal(true);
            }}
          />
          <CustomButton
            type={ButtonTypes.outline}
            text={getTranslationLabel('view_volume_target')}
            icon={<VolumeTargetIcon />}
            onPress={() => {
              navigation.navigate('VolumeTarget', {
                categoryId: performanceData?.categoryId,
                categoryName: performanceData?.categoryName,
              });
            }}
          />
        </>
      )}
    </Layout>
  );
};

export default PrimarySalesPerformance;
