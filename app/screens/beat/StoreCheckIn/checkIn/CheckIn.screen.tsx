import {FlatList, View} from 'react-native';
import {Divider, Icon, Text} from 'react-native-paper';
import React, {useEffect, useState} from 'react';
import {RootNavigationProp, RootNavigationTypes} from 'routes/RootNavigation';
import {RouteProp, useNavigation, useRoute} from '@react-navigation/core';

import Layout from 'components/Layout';
import CommonStyles from 'utils/commonStyle';
import CustomButton from 'components/button/CustomButton';
import {ButtonTypes} from 'types/buttons';
import ActionButton from 'components/button/ActionButton';
import DataCard from 'components/dataCard/DataCard';
import CustomRadioButton from 'components/radioButton/CustomRadioButton';
import Spacer from 'components/spacer';

import styles from './CheckIn.style';

import CallIcon from '../../../../../assets/icons/callIcon.svg';
import ArrowLeftIcon from '../../../../../assets/icons/leftArrow.svg';
import OrderIcon from '../../../../../assets/icons/orderIcon.svg';
import CollectionIcon from '../../../../../assets/icons/collectionIcon.svg';
import BalanceIcon from '../../../../../assets/icons/balanceIcon.svg';
import EpodIcon from '../../../../../assets/icons/epodIcon.svg';
import InventoryIcon from '../../../../../assets/icons/inventoryIcon.svg';
import FileIcon from '../../../../../assets/icons/fileIcon.svg';
import SchemeIcon from '../../../../../assets/icons/schemeIcon.svg';
import DMSIcon from '../../../../../assets/icons/dmsIcon.svg';
import TicketIcon from '../../../../../assets/icons/ticketIcon.svg';
import DataUpdateIcon from '../../../../../assets/icons/dataUpdate.svg';
import CollectionsIcon from '../../../../../assets/icons/collection.svg';
import LeftArrowIcon from '../../../../../assets/icons/leftArrow.svg';
import SuccessFailureModal from 'modals/SuccessFailureModal';
import {IStoreBeatPlanItem, Relation} from '../StoreCheckIn.interface';
import {createCheckOutTime} from '../StoreCheckIn.business';
import {useDispatch} from 'react-redux';
import {EMPTY_DATA_DASH, NavigationFrom} from 'utils/Constants';
import {setRelationId} from 'store/redux/channelPartnerSlice';
import {COLORS} from 'theme/colors';
import {
  getLeadsAddress,
  getSurveyResponses,
  submitCollection,
} from './CheckIn.business';
import {ISurveyResponse} from './CheckIn.interface';
import {convertDateToDisplay} from 'utils/commonMethods';
import {DateFormats} from 'constants/dateFormat';

interface ITilesCardProps {
  title: string;
  image: React.JSX.Element;
  onPress: () => void;
}

const radioButtonData = [
  {value: 'Yes', label: 'Yes'},
  {value: 'No', label: 'No'},
  {value: 'NA', label: 'NA'},
];

const CheckInScreen = () => {
  const navigation = useNavigation<RootNavigationProp>();
  const route = useRoute<RouteProp<RootNavigationTypes, 'CheckIn'>>();
  const {item, date, refreshData} = route.params;
  const [showModal, setShowModal] = useState(false);
  const [showCheckoutModal, setShowCheckoutModal] = useState(false);
  const [surveyData, setSurveyData] = useState<ISurveyResponse>();
  const dispatch = useDispatch();
  const userRole = item?.relation === 'Lead' ? item?.leadType : item?.relation;
  const [lastVisitDate, setLastVisitDate] = useState('');

  useEffect(() => {
    dispatch(setRelationId(item?.relationId));
  }, []);

  useEffect(() => {
    if (
      [Relation.SECONDARY_LEAD, Relation.PRIMARY_LEAD]?.includes(
        userRole as Relation,
      )
    ) {
      getLeadsAddress(item?.relationId, undefined, setLastVisitDate);
    } else {
      getSurveyResponses(item?.relationId, setSurveyData);
    }
  }, []);

  const checkout = (beatItem: IStoreBeatPlanItem) => {
    const requestBody = {
      checkOutDate: date,
    };
    if (date !== '') {
      createCheckOutTime(beatItem?.beatplanItemId, requestBody, () => {
        navigation?.goBack();
      });
    }
  };

  const handleCollections = () => {
    const requestBody = {
      collection: true,
    };
    submitCollection(item?.beatplanItemId, requestBody, () => {
      setShowModal(true);
    });
  };

  const handlePrimaryScheme = () => {
    const requestBody = {
      schemeLaunch: true,
    };
    submitCollection(item?.beatplanItemId, requestBody, () => {});
  };

  const tilesData = [
    {
      title: 'Order Taking Task',
      image: <OrderIcon height={24} width={24} />,
      onPress: () =>
        navigation?.navigate('OrderTask', {
          relation: userRole,
          navigationFrom: NavigationFrom.STORE_CHECKIN,
        }),
      roles: [
        Relation.PRIMARY_CHANNEL_PARTNER,
        Relation.SECONDARY_CHANNEL_PARTNER,
        Relation.SECONDARY_LEAD,
      ],
    },
    {
      title: 'Collection Task',
      image: <CollectionIcon height={24} width={24} />,
      onPress: () => navigation?.navigate('CollectionTask'),
      roles: [Relation.PRIMARY_CHANNEL_PARTNER],
    },
    {
      title: 'Balance Confirmation',
      image: <BalanceIcon height={24} width={24} />,
      onPress: () =>
        navigation?.navigate('BalanceConfirmation', {
          beatPlanItemId: item?.beatplanItemId,
        }),
      roles: [Relation.PRIMARY_CHANNEL_PARTNER],
    },
    {
      title: 'EPOD',
      image: <EpodIcon height={24} width={24} />,
      onPress: () => navigation?.navigate('Epod'),
      roles: [Relation.PRIMARY_CHANNEL_PARTNER],
    },
    {
      title: 'Inventory Check',
      image: <InventoryIcon height={24} width={24} />,
      onPress: () => navigation?.navigate('InventoryCheck'),
      roles: [Relation.PRIMARY_CHANNEL_PARTNER],
    },
    {
      title: 'Competitive Intelligence',
      image: <FileIcon height={24} width={24} />,
      onPress: () =>
        navigation?.navigate('CompetitiveIntelligence', {relation: userRole}),
      roles: [
        Relation.PRIMARY_CHANNEL_PARTNER,
        Relation.SECONDARY_CHANNEL_PARTNER,
        Relation.SECONDARY_LEAD,
      ],
    },
    {
      title: 'Collections',
      image: <CollectionsIcon height={24} width={24} />,
      onPress: () => {
        handleCollections();
      },
      roles: [Relation.SECONDARY_CHANNEL_PARTNER],
    },
    {
      title: 'BTL',
      image: <CollectionIcon height={24} width={24} />,
      onPress: () =>
        navigation?.navigate('BTL', {
          navigationFrom: NavigationFrom.STORE_CHECKIN,
          relation: userRole,
        }),
      roles: [
        Relation.PRIMARY_CHANNEL_PARTNER,
        Relation.SECONDARY_CHANNEL_PARTNER,
      ],
    },
    {
      title: 'Scheme Launch',
      image: <SchemeIcon height={24} width={24} />,
      onPress: () => {
        navigation?.navigate('PSchemeLaunch', {
          navigationFrom: NavigationFrom.STORE_CHECKIN,
        });
        handlePrimaryScheme();
      },
      roles: [Relation.PRIMARY_CHANNEL_PARTNER],
    },
    {
      title: 'Scheme Launch',
      image: <SchemeIcon height={24} width={24} />,
      onPress: () =>
        navigation?.navigate('SSchemeLaunch', {
          navigationFrom: NavigationFrom.STORE_CHECKIN,
        }),
      roles: [Relation.SECONDARY_CHANNEL_PARTNER],
    },
    {
      title: 'DMS Data Hygiene',
      image: <DMSIcon height={24} width={24} />,
      onPress: () => navigation?.navigate('DmsData'),
      roles: [Relation.PRIMARY_CHANNEL_PARTNER],
    },
    {
      title: 'Grievance Redressal',
      image: <TicketIcon height={24} width={24} />,
      onPress: () =>
        navigation?.navigate('GrievanceRedressal', {
          navigationFrom: NavigationFrom.STORE_CHECKIN,
        }),
      roles: [Relation.PRIMARY_CHANNEL_PARTNER],
    },
    {
      title: 'Grievance Redressal',
      image: <TicketIcon height={24} width={24} />,
      onPress: () =>
        navigation?.navigate('SecondaryGrivance', {
          navigationFrom: NavigationFrom.STORE_CHECKIN,
        }),
      roles: [Relation.SECONDARY_CHANNEL_PARTNER],
    },
    {
      title: 'Data Update',
      image: <DataUpdateIcon height={24} width={24} />,
      onPress: () =>
        navigation.navigate('SecondaryEditProfile', {
          navigationFrom: NavigationFrom.STORE_CHECKIN,
        }),
      roles: [Relation.SECONDARY_CHANNEL_PARTNER],
    },
  ];

  const filteredTiles = tilesData.filter(tile => {
    return tile.roles.includes(userRole as Relation);
  });

  const renderCheckInCard = ({item}: {item: ITilesCardProps}) => {
    return (
      <ActionButton
        title={item.title}
        icon={item.image}
        onPress={item.onPress}
      />
    );
  };

  return (
    <Layout style={CommonStyles.padding16} headerTitle="Store Check-In">
      <View style={styles.header}>
        <Text style={styles.titleText} variant="bodySmall">
          {item?.title}
        </Text>
        <Text style={styles.subTitle} variant="titleLarge">
          {item?.subTitle}
        </Text>
      </View>
      <Divider style={CommonStyles.horizontalDivider} />

      <View style={styles.subHeaderView}>
        <View style={styles.emailView}>
          <Icon source={'email-outline'} size={22} />
          <Text variant="bodySmall">{item?.email}</Text>
        </View>
        <View style={styles.emailView}>
          <CallIcon />
          <Text style={styles.phone} variant="bodySmall">
            {item?.mobileNumber ? `+91 ${item?.mobileNumber}` : EMPTY_DATA_DASH}
          </Text>
        </View>
      </View>

      <Spacer size={24} />
      <DataCard
        data={[
          {
            title: 'Last Visit Date',
            text: lastVisitDate
              ? convertDateToDisplay(lastVisitDate, DateFormats.DD_MM_YYYY_)
              : surveyData?.channelPartner?.lastOrderDate
              ? convertDateToDisplay(
                  surveyData?.channelPartner?.lastOrderDate,
                  DateFormats.DD_MM_YYYY_,
                )
              : EMPTY_DATA_DASH,
          },
        ]}
        footer={
          ![Relation.SECONDARY_LEAD, Relation.PRIMARY_LEAD]?.includes(
            userRole as Relation,
          ) && (
            <>
              <Divider style={CommonStyles.horizontalDivider} />
              <CustomRadioButton
                data={radioButtonData}
                title="Survey Filled"
                onChange={val => {}}
                value={
                  surveyData?.surveyFilled === null
                    ? 'NA'
                    : surveyData?.surveyFilled?.responseValue !== ''
                    ? 'Yes'
                    : 'No'
                }
                disabled
              />
            </>
          )
        }
      />

      <FlatList
        style={styles.flatlist}
        data={filteredTiles}
        renderItem={renderCheckInCard}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.contentContainerStyle}
      />
      <View style={CommonStyles.flexOne} />
      <CustomButton
        type={ButtonTypes.outline}
        text={'Check-Out'}
        onPress={() => {
          setShowCheckoutModal(true);
        }}
        icon={<ArrowLeftIcon />}
        style={CommonStyles.marginTop}
      />
      <SuccessFailureModal
        btnType="both"
        title="Check-Out"
        label="Are you sure you want to Check-Out ?"
        primaryButtonTitle="Dismiss"
        secondaryBtnTitle="Check-Out"
        showModal={showCheckoutModal}
        setShowModal={() => setShowCheckoutModal(false)}
        onPrimaryBtnHandler={() => setShowCheckoutModal(false)}
        onSecondaryBtnHandler={() => checkout(item)}
        icon={<LeftArrowIcon width={40} height={40} />}
        theme={{colors: {onSurface: COLORS.black}}}
      />
      <SuccessFailureModal
        btnType="confirm"
        label={
          'Please ask the retailer to clear out the required outstanding with the distributor'
        }
        secondaryBtnTitle={'Dismiss'}
        title="Information Saved"
        isSuccess
        showModal={showModal}
        onSecondaryBtnHandler={() => {
          setShowModal(false);
        }}
        setShowModal={() => setShowModal(false)}
      />
    </Layout>
  );
};

export default CheckInScreen;
