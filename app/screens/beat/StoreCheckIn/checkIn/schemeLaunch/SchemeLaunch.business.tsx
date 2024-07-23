import {
  getSecondarySchemes,
  getViewSchemeDetails,
  getEligibleProducts,
  getSkuDetails,
  getSchemeName,
  getCategoryDropdown,
} from 'services/methods/storeCheckIn';
import {GET, HttpStatusCode, POST} from 'constants/httpConstants';
import {SetStateAction} from 'react';
import NetworkRequest from 'services/networkRequest';
import {handleApiError, setReduxLoading} from 'utils/CommonReduxMethods';
import {EMPTY_DATA_DASH, ID_ALL} from 'utils/Constants';
import {
  ICategoryDropdownResponse,
  IResponseSecondaryScheme,
  ISKUDetailsRequestBody,
  ISchemeNameResponse,
  ISecondaryScheme,
  ISecondarySchemeDetails,
  ISecondarySchemeReqBody,
  ISlabDetailsResponse,
} from './SchemeLaunch.interface';
import {convertDateFormat} from 'constants/dateFormat';
import {
  IAccordionData,
  IEligibleProducts,
  ISeriesData,
  ISkuProductDetail,
  ISubCategory,
  ISubCategoryList,
} from './eligibleProducts/EligibleProducts.interface';
import {ISkuProductList} from './skuProductList/SkuProductList.interface';
import {getDataFromSFDC} from 'services/sfdcApi';
import {downloadPdfWithUrl} from 'utils/commonMethods';

const getArrayData = (schemeDetails: IResponseSecondaryScheme) => {
  return schemeDetails?.schemes?.map(
    (schemeCardData: ISecondarySchemeDetails) => {
      return {
        accordionHeader: `${schemeDetails.category}: ${schemeCardData.name}`,
        categoryId: schemeDetails.categoryId,
        secondarySchemeId: schemeCardData.secondarySchemeId,
        category: schemeDetails.category,
        schemeName: schemeCardData.name,
        accordionCard: [
          {
            id: schemeCardData?.id,
            title: 'Scheme Name',
            text: schemeCardData?.name ?? EMPTY_DATA_DASH,
          },
          {
            id: schemeCardData?.id,
            title: 'Start Date',
            text:
              convertDateFormat(schemeCardData?.targetActivationDate) ??
              EMPTY_DATA_DASH,
          },
          {
            id: schemeCardData?.id,
            title: 'End Date',
            text: convertDateFormat(schemeCardData?.endDate) ?? EMPTY_DATA_DASH,
          },
          {
            id: schemeCardData?.id,
            title: 'Type',
            text: schemeCardData?.schemeType ?? EMPTY_DATA_DASH,
          },
        ],
      };
    },
  );
};

//API to get Secondary Scheme details

export const getSecondarySchemeListData = async (
  relationId: string,
  body: ISecondarySchemeReqBody,
  setSecondarySchemeList: SetStateAction<any>,
  setPageCount: SetStateAction<any>,
) => {
  setReduxLoading(true);

  try {
    const result = await NetworkRequest(
      POST,
      getSecondarySchemes(relationId),
      body,
    );
    if (result?.status === HttpStatusCode.OK && result?.data) {
      const {
        data,
        meta: {
          pagination: {pageCount},
        },
      } = result?.data;

      const tmpHeader = data?.map(
        (secondaryScheme: IResponseSecondaryScheme) => {
          return {
            category: secondaryScheme.category,
            categoryId: secondaryScheme.categoryId,
            data: getArrayData(secondaryScheme),
          };
        },
      );
      setSecondarySchemeList((prev: ISecondaryScheme[]) => [
        ...prev,
        ...tmpHeader,
      ]);
      setPageCount(pageCount);
    }
  } catch (error: any) {
    handleApiError(error?.data?.errorMessage);
  } finally {
    setReduxLoading(false);
  }
};

const getTransformedSlabData = async (
  slabDetails: ISlabDetailsResponse[],
  setSkuProductList: SetStateAction<any>,
) => {
  const tmpData = slabDetails?.map(
    (data: ISlabDetailsResponse, index: number) => {
      return {
        accordionHeader: `Slab Criteria: ${data.slabThresholdFrom}-${data.slabThresholdTo}`,
        accordionCard: [
          {
            id: index,
            title: 'Slab Criteria UoM',
            text: data?.slabCriteriaUOM ?? EMPTY_DATA_DASH,
          },
          {
            id: index,
            title: 'Achievement',
            text: data?.achievement ?? EMPTY_DATA_DASH,
          },
          {
            id: index,
            title: 'Rewards Type',
            text: data?.rewardType ?? EMPTY_DATA_DASH,
          },
          {
            id: index,
            title: 'Rewards Description',
            text: data?.description ?? EMPTY_DATA_DASH,
          },
          {
            id: index,
            title: 'Reward Unit',
            text: data?.rewardUnit ?? EMPTY_DATA_DASH,
          },
        ],
      };
    },
  );
  return setSkuProductList(tmpData);
};

//API to fetch View Scheme Details (Fetch Slab)

export const getSchemeSlabList = async (
  relationId: string,
  schemeId: string,
  setSkuProductList: SetStateAction<any>,
) => {
  setReduxLoading(true);

  try {
    const result = await NetworkRequest(
      GET,
      getViewSchemeDetails(relationId, schemeId),
    );
    if (result.status === HttpStatusCode.OK && result?.data) {
      getTransformedSlabData(result?.data?.slabDetails, setSkuProductList);
    }
  } catch (error: any) {
    handleApiError(error?.data?.message);
  } finally {
    setReduxLoading(false);
  }
};

const getTransformedEligibleProducts = (
  eligibleProductsList: IEligibleProducts[],
  setEligibleProductsList: SetStateAction<any>,
) => {
  const subCategoryList: ISubCategoryList[] = eligibleProductsList?.map(
    (productListData: IEligibleProducts) => {
      const {secondarySchemeId, category, categoryId, data} = productListData;
      let accordionData: IAccordionData[] = [];
      let seriesList: ISeriesData[] = [];
      accordionData = data?.map((subCategoryCardData: ISubCategory) => {
        const {subCategory, subCategoryId, skuProductDetail} =
          subCategoryCardData;
        seriesList = skuProductDetail?.map(
          (skuProductSeriesList: ISkuProductDetail) => {
            const {skuId, series} = skuProductSeriesList;
            return {
              secondarySchemeId,
              categoryId,
              subCategoryId,
              id: skuId,
              title: 'Series Name',
              series,
              text: series ?? EMPTY_DATA_DASH,
            };
          },
        );
        return {
          accordionHeader: `Sub Category: ${subCategory}`,
          accordionCard: seriesList,
        };
      });
      return {header: category, data: accordionData};
    },
  );
  setEligibleProductsList(subCategoryList);
};

//API to fetch View Scheme Details (Fetch Slab)

export const getEligibleProductsList = async (
  relationId: string,
  schemeId: string,
  categoryId: string,
  setEligibleProductsList: SetStateAction<any>,
  type: string,
) => {
  setReduxLoading(true);

  try {
    const result = await NetworkRequest(
      GET,
      getEligibleProducts(relationId, schemeId, categoryId, type),
    );
    if (result.status === HttpStatusCode.OK && result?.data) {
      const {data} = result;
      getTransformedEligibleProducts([data], setEligibleProductsList);
    }
  } catch (error: any) {
    handleApiError(error?.message);
  } finally {
    setReduxLoading(false);
  }
};

//API to fetch Sku Details

export const getSkuProductList = async (
  relationId: string,
  body: ISKUDetailsRequestBody,
  skuProductListData: ISkuProductList,
  setSkuProductListData: SetStateAction<any>,
  setPageCount: SetStateAction<any>,
  type: string,
) => {
  setReduxLoading(true);

  try {
    const result = await NetworkRequest(
      POST,
      getSkuDetails(relationId, type),
      body,
    );

    if (result?.status === HttpStatusCode.OK) {
      const {
        data,
        meta: {pageCount},
      } = result?.data;

      setSkuProductListData({
        header: data?.series,
        skuProductList: [
          ...skuProductListData?.skuProductList,
          ...data?.skuProductList,
        ],
      });
      setPageCount(pageCount);
    }
  } catch (error: any) {
    handleApiError(error?.data?.errorMessage);
  } finally {
    setReduxLoading(false);
  }
};

export const mapApiResponseToCheckbox = (data: ISchemeNameResponse[]) => {
  let result = [{id: ID_ALL, name: 'Select All'}];
  data.map(item =>
    result.push({id: item?.secondarySchemeId, name: item?.name}),
  );
  return result;
};

//API to get scheme Name Filter

export const getSchemeNameList = async (
  setSchemeNameList: SetStateAction<any>,
) => {
  setReduxLoading(true);

  try {
    const result = await NetworkRequest(GET, getSchemeName());
    if (result.status === HttpStatusCode.OK && result?.data) {
      const {data} = result;
      const schemeListData = mapApiResponseToCheckbox(data);
      setSchemeNameList(schemeListData);
    }
  } catch (error: any) {
    handleApiError(error?.message);
  } finally {
    setReduxLoading(false);
  }
};

//API to fetch Category Names in Filter Screen

export const mapCategoryResponseToCheckbox = (
  data: ICategoryDropdownResponse[],
) => {
  let result = [{id: ID_ALL, name: 'Select All'}];
  data.map(item =>
    result.push({id: item?.categoryId, name: item?.categoryName}),
  );
  return result;
};

export const getCategoryNameData = async (
  relationId: string,
  setCategoryNames: SetStateAction<any>,
) => {
  setReduxLoading(true);

  try {
    const result = await NetworkRequest(GET, getCategoryDropdown(relationId));
    if (result.status === HttpStatusCode.OK && result?.data) {
      const {data} = result;
      const categoryNameData = mapCategoryResponseToCheckbox(data);
      setCategoryNames(categoryNameData);
    }
  } catch (error: any) {
    handleApiError(error?.message);
  } finally {
    setReduxLoading(false);
  }
};

//API to download slab details PDF

export const getDownloadSecondarySchemeSlabDetails = (
  secondarySchemeId: string,
) => {
  setReduxLoading(true);
  getDataFromSFDC(secondarySchemeId)
    .then(async response => {
      const data = response?.ListContentVersion[0];
      downloadPdfWithUrl({
        title: data?.PathOnClient,
        url: data?.ContentDownloadUrl,
      });
    })
    .catch(err => {
      handleApiError(err?.message);
    })
    .finally(() => setReduxLoading(false));
};
