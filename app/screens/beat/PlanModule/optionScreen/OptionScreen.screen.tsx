import {View} from 'react-native';
import React, {useCallback, useEffect, useState} from 'react';
import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';
import {RootNavigationProp, RootNavigationTypes} from 'routes/RootNavigation';
import Layout from 'components/Layout';
import styles from './OptionScreen.style';
import DateCard from '../../components/dateCard/DateCard';
import {TextInput} from 'react-native-paper';
import PrimaryTextInput from 'components/textInput/PrimaryTextInput';
import CustomButton from 'components/button/CustomButton';
import Spacer from 'components/spacer';
import AccordionDataCard from 'components/accordionDataCard/AccordionDataCard';
// import DropDown from 'components/dropdown/Dropdown';
import RecurranceModal from './RecurranceModal';
import ModalComponent from 'modals/ModalComponent';
import SuccessFailureModal from 'modals/SuccessFailureModal';

import {ButtonTypes} from 'types/buttons';
import SearchIcon from '../../../../../assets/icons/searchIcon.svg';
import ArrowReloadIcon from '../../../../../assets/icons/arrowReload.svg';
import {
  getAreaDropdownData,
  getChannelPartnersData,
  getFormatedDate,
  getLeadsData,
  getSelectedBeatPlanItemData,
  submitBeatPlanItem,
} from '../Beat.business';
import {
  BeatRelationType,
  IAreaData,
  IAreaMapping,
  IAreaPincodeDropdownData,
  IChannelPartnerRequest,
  IFormatedChannelPartnerData,
  IItemBody,
  IOptionData,
  ISubmitBeatPlanItemRequest,
  Status,
} from 'screens/beat/Beat.interface';
import CommonStyles from 'utils/commonStyle';
import moment from 'moment';
import {DateFormats} from 'constants/dateFormat';
import {useSelector} from 'react-redux';
import {RootState} from 'store/redux/store';
import {EMPTY_DATA_DASH} from 'utils/Constants';
import {convertDateToDisplay, debounce} from 'utils/commonMethods';
import DropDown from 'components/beatDropdown/Dropdown';

const OptionScreen = () => {
  const navigation = useNavigation<RootNavigationProp>();
  const route = useRoute<RouteProp<RootNavigationTypes, 'OptionScreen'>>();
  const {navigationFrom, date, fromStoreCheckIn, beatPlanId, status} =
    route.params;
  const salesOffice = useSelector((state: RootState) => state.user.user);
  const [totalPages, setTotalPages] = useState(1);
  const [pageNumber, setPageNumber] = useState(1);

  const [searchText, setSearchText] = useState('');
  const [isFilterApplied, setIsFilterApplied] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showSaveModal, setShowSaveModal] = useState(false);
  const [buttonDisabled, setButtonDisabled] = useState(true);

  const [optionData, setOptionData] = useState<any>([]);
  const [leadsData, setLeadsData] = useState([]);
  const [mergedData, setMergedData] = useState<any[]>([]);
  const [recCardName, setRecCardName] = useState({
    cardName: '',
    code: '',
  });

  const searchIcon = () => <SearchIcon height={16} width={16} />;
  const formatedDate = moment(date, DateFormats.Do_MMMM_YYYY);

  // Dropown related code
  const [districtData, setDistrictData] = useState([]);
  const [dropdownData, setDropdownData] = useState<IAreaPincodeDropdownData[]>(
    [],
  );
  const [searchQuery, setSearchQuery] = useState('');

  const [showDistrictDropdown, setShowDistrictDropdown] = useState(false);
  const [showAreaDropdown, setShowAreaDropdown] = useState(false);

  const [districtValue, setDistrictValue] = useState('');
  const [areaValue, setAreaValue] = useState<string>('');

  const relation =
    navigationFrom === 'Primary'
      ? BeatRelationType.PRIMARY
      : navigationFrom === 'Secondary'
      ? BeatRelationType.SECONDARY
      : BeatRelationType.LEAD;

  const populateArea = (selectedPincodes: string[]): IAreaMapping[] => {
    const areas: IAreaData[] = [];

    selectedPincodes.forEach(selectedPincode => {
      dropdownData.forEach(item => {
        if (item.attributes.pincode === selectedPincode) {
          areas.push({
            value: item.attributes.area,
            label: item.attributes.area,
          });
        }
      });
    });
    return areas;
  };

  const getAreaData = useCallback(
    (searchPageNumber: number, searchValue?: string) => {
      getAreaDropdownData(
        salesOffice.salesOffice,
        setDistrictData,
        setDropdownData,
        setTotalPages,
        searchPageNumber,
        25,
        searchValue,
      );
      setIsFilterApplied(false);
    },
    [pageNumber],
  );

  const handleDistrictSearch = debounce((value: string) => {
    setDistrictData([]);
    setDropdownData([]);
    setPageNumber(1);
    getAreaData(1, value);
  }, 1000);

  useEffect(() => {
    if (pageNumber <= totalPages) {
      getAreaData(pageNumber, searchText);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pageNumber]);

  const getChannelPartners = useCallback((area: string) => {
    const requestBody: IChannelPartnerRequest = {
      area: area.split(','),
      type: navigationFrom,
    };

    getChannelPartnersData(requestBody, setOptionData, navigationFrom); //no need for LEADS
  }, []);

  const getLeads = useCallback((area: string) => {
    const areaData = area?.split(',');
    const queryString = areaData.map(area => `filters[area]=${area}`).join('&');

    getLeadsData(queryString, setLeadsData);
  }, []);

  useEffect(() => {
    const timeoutDuration = 2000;
    if (areaValue?.length > 0 && navigationFrom) {
      const timeoutId = setTimeout(() => {
        if (navigationFrom !== BeatRelationType.LEAD) {
          getChannelPartners(areaValue);
        } else {
          getLeads(areaValue);
        }
      }, timeoutDuration);

      return () => clearTimeout(timeoutId);
    }
  }, [areaValue]);

  useEffect(() => {
    if (optionData?.length > 0 && navigationFrom !== BeatRelationType.LEAD) {
      getSelectedBeatPlanItemData(
        getFormatedDate(date),
        relation,
        setMergedData,
        optionData,
      );
    } else if (
      leadsData?.length > 0 &&
      navigationFrom === BeatRelationType.LEAD
    ) {
      getSelectedBeatPlanItemData(
        getFormatedDate(date),
        relation,
        setMergedData,
        leadsData,
      );
    }
  }, [optionData?.length, areaValue?.length, leadsData?.length]);

  useEffect(() => {
    let isDisabled = true;

    mergedData?.forEach((option: IOptionData) => {
      if (option?.isChecked && option?.isFlag) {
        isDisabled = false;
        return;
      }

      if (option?.isFlag && option?.dateString?.length > 0) {
        isDisabled = false;
        return;
      }

      if (option?.isFlag && !option?.isChecked) {
        isDisabled = false;
        return;
      }
    });

    setButtonDisabled(isDisabled);
  }, [mergedData]);

  const createBeatPlanIem = () => {
    const items: IItemBody[] = [];
    const deletedData: any[] = [];

    const objects = mergedData?.flatMap((option: IOptionData) => {
      if (option?.isFlag === true && option?.dateString?.length > 0) {
        const newItems = option?.dateString?.map((date: string) => ({
          date: date,
          relationId: option?.code,
          relation,
          recurrencePattern: option?.recurrenceOn,
          recurrenceOn: option?.recurrencePattern,
          recurrenceEndDate: moment(option?.endDate).format(
            DateFormats.YYYY_MM_DD,
          ),
          beatItemPincodes: districtValue
            ?.split(',')
            ?.map(item => item?.split('-')?.[1]),
          beatItemAreas: areaValue?.split(','),
        }));
        items.push(...newItems);
      } else if (!option?.isChecked && option?.isFlag === true) {
        const newItem = {
          date: formatedDate.format(DateFormats.YYYY_MM_DD),
          relationId: option?.code,
          relation,
          beatItemPincodes: districtValue
            ?.split(',')
            ?.map(item => item?.split('-')?.[1]),
          beatItemAreas: areaValue?.split(','),
        };
        items.push(newItem);
      }
      if (option?.isChecked && option?.isFlag) {
        deletedData.push(option.beatplanItemId);
      }
    });

    const requestBody: ISubmitBeatPlanItemRequest = {
      beatplanId: beatPlanId,
      relation,
    };

    if (items.length > 0) {
      requestBody.items = items;
    }
    if (deletedData.length > 0) {
      requestBody.deletedItems = deletedData;
    }

    submitBeatPlanItem(requestBody, () => setShowSaveModal(true));
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  const filterData = () => {
    return mergedData?.filter((item: IFormatedChannelPartnerData) =>
      item?.name?.toLowerCase().includes(searchQuery?.toLowerCase()),
    );
  };

  const handleSaveButton = (data: any, name: string) => {
    setRecCardName({
      cardName: data?.name,
      code: data?.code,
    });
    const index = mergedData.findIndex((item: any) => item.code === data.code);
    const updatedData = [...mergedData];

    if (index !== -1) {
      updatedData[index] = {
        ...data,
        // isFlag: !data.isFlag,
        isFlag: data?.isFlag === true ? !data.isFlag : true,
      };
    } else {
      updatedData.push(data);
    }

    setMergedData(updatedData);
  };

  const formatCityName = (data: string) => {
    if (!data || typeof data !== 'string') {
      return '';
    }
    const parts = data.split('-');
    if (parts.length > 0) {
      return parts[0];
    } else {
      return '';
    }
  };

  const handleRecurrenceUpdate = useCallback(
    (code: string, recurrenceData: any) => {
      setRecCardName({cardName: '', code: ''});
      setMergedData((prevData: any) =>
        prevData.map((item: any) =>
          item.code === code ? {...item, ...recurrenceData} : item,
        ),
      );
    },
    [setMergedData],
  );

  const disableCheckbox = () => {
    if (status === Status.APPROVED || status === Status.SENT_FOR_APPROVAL) {
      return true;
    }
    return false;
  };

  return (
    <Layout
      isScrollable
      style={CommonStyles.padding}
      headerTitle={
        navigationFrom === 'Primary'
          ? 'Primary Channel Partner'
          : navigationFrom === 'Secondary'
          ? 'Secondary Retailer'
          : 'Leads'
      }>
      <View style={CommonStyles.flexOne}>
        <DateCard date={date} />

        <Spacer size={24} />

        <DropDown
          value={districtValue}
          multiSelect={true}
          list={districtData ?? []}
          label="District & Pin-Code"
          placeholder="Enter District"
          isRequired
          updateDisplayValue={value => {
            return formatCityName(value);
          }}
          isSearchRequired
          visible={showDistrictDropdown}
          onScrollEnd={searchText => {
            if (districtData?.length > 0) {
              setPageNumber(prev => prev + 1);
              setSearchText(searchText);
            }
          }}
          onChangeDropdownState={() => {
            setShowDistrictDropdown(!showDistrictDropdown);
            setAreaValue('');
            setOptionData([]);
            setLeadsData([]);
            setMergedData([]);
          }}
          setValue={data => {
            setDistrictValue(data);
          }}
          labelRequired
          handleDistrictSearch={handleDistrictSearch}
          // searchText={searchText}
        />

        <Spacer size={24} />
        <DropDown
          value={areaValue}
          multiSelect={true}
          list={
            populateArea(
              districtValue?.split(',')?.map(item => item?.split('-')?.[1]),
            ) ?? []
          }
          label="Area"
          placeholder="Enter Area"
          isRequired
          visible={showAreaDropdown}
          onChangeDropdownState={() => {
            setShowAreaDropdown(!showAreaDropdown);
          }}
          setValue={data => {
            setAreaValue(data);
          }}
        />

        <Spacer size={24} />

        <PrimaryTextInput
          placeHolder={
            navigationFrom === 'Primary'
              ? 'Search Primary Channel Partner'
              : navigationFrom === 'Secondary'
              ? 'Search Secondary Retailer'
              : 'Search Lead'
          }
          onChangeText={handleSearch}
          value={searchQuery}
          titleText=""
          containerStyle={styles.textInput}
          disabled={mergedData?.length === 0}
          right={<TextInput.Icon icon={() => searchIcon()} />}
        />

        {filterData()?.map((item: IFormatedChannelPartnerData) => {
          return (
            <View key={item?.id} style={styles.flatlist}>
              <AccordionDataCard
                key={item.id}
                onClickCheckbox={val =>
                  handleSaveButton(
                    {
                      ...item,
                      isChecked: item.isChecked,
                      isFlag: item?.isFlag ? item?.isFlag : false,
                    },
                    item?.name,
                  )
                }
                data={[
                  {title: 'Relation', text: item.relationShip},
                  {
                    title: 'Last Visit Date',
                    text:
                      item?.lastVisitDate === null
                        ? EMPTY_DATA_DASH
                        : convertDateToDisplay(
                            item.lastVisitDate,
                            DateFormats.DD_MM_YYYY_,
                          ),
                  },
                  {
                    title:
                      navigationFrom === 'Lead'
                        ? 'No. of Visit'
                        : 'Last Order Date',
                    text:
                      navigationFrom === 'Lead'
                        ? item?.noOfVisit
                        : item?.lastOrderDate !== null
                        ? convertDateToDisplay(
                            item.lastOrderDate,
                            DateFormats.DD_MM_YYYY_,
                          )
                        : EMPTY_DATA_DASH,
                  },
                  {
                    title: 'Recurrence',
                    text:
                      item?.recurrence === null ||
                      item?.recurrence === undefined
                        ? EMPTY_DATA_DASH
                        : item?.recurrence,
                  },
                ]}
                name={item?.name}
                item={item}
                footer={true}
                icon={<ArrowReloadIcon />}
                checkboxDisabled={item.isChecked && disableCheckbox()}
                checkedData={fromStoreCheckIn}
                setShowModal={(
                  modalFlag: boolean,
                  value: IFormatedChannelPartnerData,
                ) => {
                  setShowModal(modalFlag);
                  setRecCardName({cardName: value?.name, code: value?.code});
                }}
              />
            </View>
          );
        })}
      </View>
      <CustomButton
        type={ButtonTypes.contained}
        text="Save"
        onPress={createBeatPlanIem}
        isDisabled={buttonDisabled}
        style={styles.button}
      />
      <ModalComponent
        showModal={showModal}
        setShowModal={() => setShowModal(!showModal)}>
        <RecurranceModal
          setShowSuccessModal={setShowSuccessModal}
          setShowModal={setShowModal}
          recCardData={recCardName}
          dateData={date}
          submitRecurrenceValues={(
            day,
            recPattern,
            recDates,
            endDate,
            recCardData,
          ) =>
            handleRecurrenceUpdate(recCardData?.code, {
              dateString: recDates,
              recurrenceOn: day,
              recurrencePattern: recPattern,
              endDate: endDate,
              isFlag: true,
            })
          }
        />
      </ModalComponent>
      <SuccessFailureModal
        btnType="confirm"
        secondaryBtnTitle={'Dismiss'}
        title={'Recurrence Scheduled'}
        isSuccess
        label={'You have successfully scheduled recurrence'}
        onSecondaryBtnHandler={() => setShowSuccessModal(false)}
        setShowModal={() => setShowSuccessModal(false)}
        showModal={showSuccessModal}
      />
      <SuccessFailureModal
        btnType="confirm"
        secondaryBtnTitle={'Dismiss'}
        title={'Successful'}
        isSuccess
        label={`You have successfully selected ${
          navigationFrom === 'Primary'
            ? 'Primary Channel Partners'
            : navigationFrom === 'Secondary'
            ? 'Secondary Channel Partner'
            : 'Leads'
        }`}
        onSecondaryBtnHandler={() => {
          setShowSaveModal(false);
          navigation?.goBack();
        }}
        setShowModal={() => setShowSaveModal(false)}
        showModal={showSaveModal}
      />
    </Layout>
  );
};

export default OptionScreen;
