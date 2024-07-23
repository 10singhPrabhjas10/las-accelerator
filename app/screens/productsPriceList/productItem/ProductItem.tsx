import React, {useCallback, useEffect, useState} from 'react';
import {View} from 'react-native';
import {Text} from 'react-native-paper';
import {COLORS} from 'theme/colors';
import BulletIcon from '../../../../assets/icons/bullet.svg';
import styles from './ProductItem.style';
import ProductHeader from '../productHeader/ProductHeader';
import {convertDateToDisplay, downloadPdfWithUrl} from 'utils/commonMethods';
import {getDataFromSFDC} from 'services/sfdcApi';
import {DateFormats} from 'constants/dateFormat';

const ProductItem = ({item}: {item: IProductItemData}) => {
  const imageSource = require('../../../../assets/images/pdf.png');
  const [entityIds, setEntityIds] = useState('');
  const [productData, setProductData] = useState<IProductSfdcResponse[]>([]);

  useEffect(() => {
    const entityId = item?.data?.map(prodId => prodId?.id);
    setEntityIds(entityId?.join(','));
  }, [item?.data]);

  const getProductDataFromSfdc = useCallback(async (id: string) => {
    const response = await getDataFromSFDC(id);

    if (response?.TotalFile > 0) {
      setProductData(response?.ListContentVersion);
    }
  }, []);

  useEffect(() => {
    if (entityIds !== '') {
      getProductDataFromSfdc(entityIds);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [entityIds]);

  const handleDownloadPdf = async (
    fileName: string,
    isShare: boolean,
    url: string,
  ) => {
    await downloadPdfWithUrl(
      {
        title: fileName,
        url: url,
      },
      isShare,
    );
  };

  return (
    <View style={styles.containerStyle}>
      <Text style={styles.labelStyle} variant="labelSmall">
        {item?.label}
      </Text>
      {productData?.map((docCategory, index) => {
        return (
          docCategory?.Id && (
            <View style={styles.viewStyle} key={docCategory.Id + index}>
              <ProductHeader
                imageUri={imageSource}
                title={docCategory?.PathOnClient ?? ''}
                titleVariant="titleSmall"
                subTitle={
                  docCategory.CreatedDate
                    ? convertDateToDisplay(
                        docCategory?.CreatedDate,
                        DateFormats.DD_MMM_YYYY_2,
                      )
                    : ''
                }
                subTitleVariant="bodyLarge"
                subTitleStyle={{color: COLORS.grey2}}
                profileStyle={styles.profileStyle}
                customCardStyle={styles.customCardStyle}
                rightIcon={<BulletIcon fill={COLORS.red2} />}
                isMenuRequired={true}
                downloadPdf={() =>
                  handleDownloadPdf(
                    docCategory?.PathOnClient,
                    false,
                    docCategory?.ContentDownloadUrl,
                  )
                }
                sharePdf={() =>
                  handleDownloadPdf(
                    docCategory?.PathOnClient,
                    true,
                    docCategory?.ContentDownloadUrl,
                  )
                }
              />
            </View>
          )
        );
      })}
    </View>
  );
};

export default ProductItem;
