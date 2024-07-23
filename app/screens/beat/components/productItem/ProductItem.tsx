import React from 'react';
import {View} from 'react-native';
import {COLORS} from 'theme/colors';
import BulletIcon from '../../../../../assets/icons/bullet.svg';
import CommonStyles from 'utils/commonStyle';
import styles from './ProductItem.style';
import ProductHeader from '../productHeader/ProductHeader';
import {ITransformedScheme} from 'screens/beat/StoreCheckIn/checkIn/schemeLaunch/primaryScheme/PSchemeLaunch.interface';
import {downloadPdfData} from 'screens/beat/StoreCheckIn/checkIn/schemeLaunch/primaryScheme/PSchemeLaunch.business';

const ProductItem = ({item}: {item: ITransformedScheme}) => {
  const handleDownloadPdf = async (
    id: string,
    fileName: string,
    isShare: boolean,
  ) => {
    //api integration
    downloadPdfData(id, isShare, fileName);
  };

  return (
    <View>
      <View style={[CommonStyles.flexOne, styles.viewStyle]}>
        <ProductHeader
          imageUri={require('../../../../../assets/images/pdf.png')}
          title={`${item?.title}.pdf` ?? ''}
          titleVariant="labelLarge"
          subTitle={item?.subTitle ?? ''}
          subTitleVariant="bodyMedium"
          subTitleStyle={{color: COLORS.grey2}}
          profileStyle={styles.profileStyle}
          customCardStyle={styles.customCardStyle}
          rightIcon={<BulletIcon fill={COLORS.red2} />}
          isMenuRequired={true}
          downloadPdf={() =>
            handleDownloadPdf(item?.documentId, item?.title, false)
          }
          sharePdf={() =>
            handleDownloadPdf(item?.documentId, item?.title, true)
          }
        />
      </View>
    </View>
  );
};

export default ProductItem;
