import {View} from 'react-native';
import React, {useEffect, useState} from 'react';
import CommonStyles from 'utils/commonStyle';
import {BottomSheetScrollView} from '@gorhom/bottom-sheet';
import BottomSheetFooter from 'bottomSheets/bottomSheetFooter/BottomSheetFooter';
import CustomRange from 'components/customRange/CustomRange';
import moment from 'moment';
import {
  getProductCategoryFilters,
  getSelectedIds,
} from '../ProductPrice.business';
import {CUSTOM_RANGE, DropDownData, ID_ALL} from 'utils/Constants';
import {DateFormats} from 'constants/dateFormat';
import {getTranslationLabel} from 'utils/commonMethods';
import FilterCheckbox from './FilterCheckbox';

interface IProductDisplayFilter {
  subCategoryFilter: string[];
  skuFilter: string[];
  categoryID: string;
  isDocumentScreen: boolean;
  typeFilter?: string[];
  dropDownType?: string;
  onApplyFilter: (
    subCategoryFilter: string[],
    skuFilter: string[],
    dateFilter: string[],
    dateFilterValue?: string,
    contentFilter?: string[],
  ) => void;
  onClearFilter: () => void;
  isPriceListScreen?: boolean;
  date?: any;
}

const ProductDisplayFilterScreen = ({
  subCategoryFilter,
  skuFilter,
  typeFilter = [],
  onApplyFilter,
  onClearFilter,
  dropDownType,
  isPriceListScreen,
  date,
  categoryID,
  isDocumentScreen,
}: IProductDisplayFilter) => {
  const [subCategoryData, setSubCategoryData] = useState<ICheckboxProps[]>([]);
  const [skuData, setSKUData] = useState<ICheckboxProps[]>([]);
  const [contentType, setContentType] = useState<ICheckboxProps[]>([]);
  const [clearFilters, setClearFilters] = useState<boolean>(false);
  const [dateValue, setDateValue] = useState<string[]>([]);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [selectedMonthName, setSelectedMonthName] = useState('');
  const [isDisabled, setIsDisabled] = useState(false);
  const [skuProducts, setSkuProducts] = useState<ISkuCheckboxProps[]>([]);

  useEffect(() => {
    getProductCategoryFilters(
      categoryID,
      subCategoryFilter,
      skuFilter,
      typeFilter,
      setSKUData,
      setSubCategoryData,
      setContentType,
      isDocumentScreen,
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [categoryID]);

  const currentDate = new Date();
  const oneYearAgo = new Date(
    currentDate.getFullYear() - 1,
    currentDate.getMonth(),
    currentDate.getDate(),
  );

  const validRangeStartDate = {
    startDate: oneYearAgo, // Start date
    endDate: currentDate, // End date
  };

  const validRangeEndDate = {
    startDate: new Date(startDate), // Start date
    endDate: currentDate, // End date
  };

  const selectedMonthIndex = selectedMonthName
    ? moment().month(selectedMonthName).month()
    : -1;
  const currentYear = moment().year();
  // Start date
  const startDateRange = moment({
    year: currentYear,
    month: selectedMonthIndex,
    day: 1,
  }).format(DateFormats.YYYY_MM_DD);

  // End date
  const endDateRange = moment({year: currentYear, month: selectedMonthIndex})
    .endOf('month')
    .format(DateFormats.YYYY_MM_DD);

  // Date range
  const dateRange = [startDateRange, endDateRange];

  useEffect(() => {
    if (
      selectedMonthName !== CUSTOM_RANGE &&
      !isPriceListScreen &&
      selectedMonthIndex !== -1
    ) {
      setDateValue(dateRange);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedMonthName, selectedMonthIndex]);

  useEffect(() => {
    if (
      selectedMonthName === CUSTOM_RANGE &&
      startDate !== '' &&
      endDate !== ''
    ) {
      setDateValue([startDate, endDate]);
    }

    if (isPriceListScreen && startDate !== '' && endDate !== '') {
      setDateValue([startDate, endDate]);
    }
  }, [startDate, endDate, selectedMonthName, isPriceListScreen]);

  useEffect(() => {
    const isAnySubCategoryChecked = subCategoryData.some(
      item => item.isChecked,
    );
    const isAnySkuCategoryChecked = skuData.some(item => item.isChecked);
    const isAnyContentTypeChecked = contentType.some(item => item.isChecked);

    const isDateFilled =
      selectedMonthName !== CUSTOM_RANGE && dateValue?.length > 0;
    const isCustomDateFilled =
      selectedMonthName === CUSTOM_RANGE && startDate !== '' && endDate !== '';

    const applyButtonEnabled =
      isAnySubCategoryChecked ||
      isAnySkuCategoryChecked ||
      isAnyContentTypeChecked ||
      (isDateFilled && !isCustomDateFilled) ||
      isCustomDateFilled;

    setIsDisabled(!applyButtonEnabled);
  }, [
    subCategoryData,
    skuData,
    contentType,
    startDate,
    endDate,
    dateValue,
    selectedMonthName,
  ]);

  const getSelectedSkuProd = (data: ISkuCheckboxProps[]) => {
    return data[0]?.isChecked
      ? data.filter(item => item.id !== ID_ALL).map(item => item?.skuId)
      : data.filter(item => item.isChecked).map(item => item?.skuId);
  };

  const handleAppliedFilter = () => {
    let subCategoryArr = getSelectedIds(subCategoryData);

    let skuArr = getSelectedSkuProd(skuProducts);

    let contentArr = getSelectedIds(contentType);

    onApplyFilter(
      subCategoryArr,
      skuArr as string[],
      dateValue,
      selectedMonthName,
      contentArr,
    );
  };

  const handleDropdown = (data: string) => {
    if (data === CUSTOM_RANGE && !isPriceListScreen) {
      setDateValue([]);
    } else {
      setDateValue(dateRange);
    }
  };

  const handleClearFilter = () => {
    setDateValue([]);
    setStartDate('');
    setEndDate('');
    setSelectedMonthName('');
    setClearFilters(true);
    onClearFilter();
  };

  useEffect(() => {
    const selectAllSubcategory = subCategoryData.find(
      category => category.id === ID_ALL && category.isChecked,
    );
    if (selectAllSubcategory) {
      // If "Select All" is checked, display all SKU products
      setSkuProducts(skuData);
    } else {
      // Filter SKU products based on the selected subcategories
      const selectedSubcategoryIds = subCategoryData
        .filter(category => category.isChecked && category.id !== ID_ALL)
        .map(category => category.id);
      const updatedSKUProducts = skuData.filter(product => {
        return selectedSubcategoryIds.includes(product.id);
      });
      selectedSubcategoryIds?.length > 0 &&
        updatedSKUProducts?.unshift({
          id: ID_ALL,
          name: 'Select All',
          isChecked: false,
        });
      setSkuProducts(updatedSKUProducts);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [subCategoryData]);

  const handleCheckboxChange = (item: ISkuCheckboxProps) => {
    setSkuProducts((prevCheckboxes: ISkuCheckboxProps[]) => {
      if (item.id === ID_ALL) {
        let checked = prevCheckboxes[0].isChecked;
        return prevCheckboxes?.map(checkbox => ({
          ...checkbox,
          isChecked: !checked,
        }));
      }

      return prevCheckboxes?.map(checkbox => {
        return checkbox.skuId === item?.skuId
          ? {...checkbox, isChecked: !checkbox.isChecked}
          : checkbox;
      });
    });
  };

  useEffect(() => {
    setDateValue(date);
    setSelectedMonthName(dropDownType);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <View style={CommonStyles.flexOne}>
      <BottomSheetScrollView style={CommonStyles.scrollViewContainer}>
        <FilterCheckbox
          title={getTranslationLabel('sub_category_lead')}
          data={subCategoryData}
          setData={setSubCategoryData}
          showSearch={true}
          isUncheckCheckbox={clearFilters}
        />
        <FilterCheckbox
          title={getTranslationLabel('sku')}
          data={skuProducts ?? []}
          setData={setSkuProducts}
          showSearch={skuProducts?.length > 0}
          isUncheckCheckbox={clearFilters}
          handleCheckbox={handleCheckboxChange}
        />
        <CustomRange
          validRangeEndDate={validRangeEndDate}
          validRangeStartDate={validRangeStartDate}
          handleDropdown={data => handleDropdown(data)}
          startDate={startDate ? startDate : dateValue[0]}
          setStartDate={val => setStartDate(val)}
          endDate={endDate ? endDate : dateValue[1]}
          setEndDate={val => setEndDate(val)}
          dropDownType={dropDownType}
          setDateFilter={data => setSelectedMonthName(data)}
          dateFilterType={DropDownData}
          dateFilter={selectedMonthName}
          showDropdown={isPriceListScreen}
          dateViewStyle={CommonStyles.dateViewStyle}
          containerStyle={CommonStyles.flexOne}
        />
        {!isPriceListScreen && (
          <FilterCheckbox
            title={getTranslationLabel('contenttype_supportfilter')}
            data={contentType}
            setData={setContentType}
            showSearch={true}
            isUncheckCheckbox={clearFilters}
          />
        )}
      </BottomSheetScrollView>
      <BottomSheetFooter
        isFilterButtonDisabled={false}
        isApplyButtonDisabled={isDisabled}
        handleApplyFilters={() => handleAppliedFilter()}
        handleClearFilters={() => handleClearFilter()}
      />
    </View>
  );
};

export default ProductDisplayFilterScreen;
