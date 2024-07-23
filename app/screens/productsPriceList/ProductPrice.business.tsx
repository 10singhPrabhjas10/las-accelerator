import {GET, HttpStatusCode, POST} from 'constants/httpConstants';
import {SetStateAction} from 'react';
import NetworkRequest from 'services/networkRequest';
import {ID_ALL, YOUTUBE_LINK_REGEX} from 'utils/Constants';
import moment from 'moment';
import {convertDateToDisplay} from 'utils/commonMethods';
import {DateFormats} from 'constants/dateFormat';
import {
  getPRoductVideos,
  getPriceList,
  getProductDocument,
  getProductFilters,
} from 'services/methods/productPrice';
import {handleApiError, setReduxLoading} from 'utils/CommonReduxMethods';

export const getYouTubeVideoId = (youtubeLink: string) => {
  const match = youtubeLink?.match(YOUTUBE_LINK_REGEX);
  return match && match[1];
};

const mapApiResponseToCheckbox = (
  data: string[],
  filters: string[],
  skuFilter?: string,
) => {
  // Map product category data to checkbox format

  let checkboxData: {
    id: string;
    name: string;
    isChecked: boolean;
    skuId?: string;
  }[] = [];
  checkboxData = data?.map((item: string | any) => {
    let id, name, skuId;
    if (typeof item === 'string') {
      id = name = item;
    }
    if (typeof item !== 'string') {
      id = item.subCategoryId;
      name = item.subCategoryName ?? item?.skuProductName;
      skuId = item?.skuProduct;
    }
    const checked =
      skuFilter === 'sku' ? filters?.includes(skuId) : filters?.includes(id);
    return {id, name, isChecked: checked, skuId};
  });
  //Add 'Select All' checkbox item
  checkboxData.unshift({
    id: ID_ALL,
    name: 'Select All',
    isChecked: false,
  });

  return checkboxData;
};

export const getProductCategoryFilters = async (
  categoryId: string,
  subCategoryFilter: string[],
  skuFilter: string[],
  typeFilter: string[],
  setSKUData: SetStateAction<any>,
  setSubCategoryData: SetStateAction<any>,
  setContentType: SetStateAction<any>,
  isDocumentScreen: boolean,
) => {
  try {
    const result = await NetworkRequest(GET, getProductFilters(categoryId));
    if (result?.status === HttpStatusCode.OK && result?.data?.data) {
      const {data} = result?.data;
      if (data?.SKUproducts?.length > 0) {
        const response = mapApiResponseToCheckbox(
          data?.SKUproducts,
          skuFilter as string[],
          'sku',
        );
        setSKUData(response);
      }

      if (data?.subCategories?.length > 0) {
        const response = mapApiResponseToCheckbox(
          data?.subCategories,
          subCategoryFilter as string[],
        );
        setSubCategoryData(response);
      }

      if (isDocumentScreen) {
        if (data?.productDocumentContentType?.length > 0) {
          const response = mapApiResponseToCheckbox(
            data?.productDocumentContentType,
            typeFilter as string[],
          );
          setContentType(response);
        }
      } else {
        if (data?.productVideoContentType?.length > 0) {
          const response = mapApiResponseToCheckbox(
            data?.productVideoContentType,
            typeFilter as string[],
          );
          setContentType(response);
        }
      }
    }
  } catch (error: any) {
    handleApiError(error?.message);
  }
};

const mergeDataWithSubCategory = async (
  data: IProductListSubCategory[],
  newData: IProductListSubCategory[],
) => {
  const mergedData = [...data];

  // Iterate over newData
  for (const newCategory of newData) {
    // Check if subCategoryId already exists in mergedData
    const existingIndex = mergedData.findIndex(category => {
      return category.subCategoryId === newCategory.subCategoryId;
    });

    if (existingIndex !== -1) {
      mergedData[existingIndex].data.push(...newCategory.data);
    } else {
      mergedData.push(newCategory);
    }
  }

  return mergedData;
};

export const transformedDocData = (data: IProductListSubCategory[]) => {
  return data.map(category => ({
    label: category.subCategoryName,
    categoryId: category.subCategoryId,
    data: category.data.map(item => ({
      id: item.productDisplayPriceListId,
      title: item.description,
      subTitle: item?.youtubeCreatedAt
        ? convertDateToDisplay(
            item?.youtubeCreatedAt,
            DateFormats.DD_MMM_YYYY_2,
          )
        : '',
    })),
  }));
};

export const getProductDocumentData = async (
  body: IDocumentRequestBody,
  documentData: any,
  setDocumentData: SetStateAction<any>,
  setSubCateFilter: SetStateAction<any>,
  setSkuFilter: SetStateAction<any>,
  setDocumentFilter: SetStateAction<any>,
  setDateValue: SetStateAction<any>,
  setTotalPages: SetStateAction<any>,
) => {
  setReduxLoading(true);
  try {
    const result = await NetworkRequest(POST, getProductDocument(), body);

    if (result?.status === HttpStatusCode.OK) {
      const {
        data,
        meta: {
          pagination: {pageCount},
          filters: {subCategoryId, skuProduct, documentType, uploadedAt},
        },
      } = result?.data;

      let $gte;
      let $lte;

      if (uploadedAt) {
        $gte = uploadedAt.$gte;
        $lte = uploadedAt.$lte;
      }

      const updatedDocumentData = await mergeDataWithSubCategory(
        documentData,
        data,
      );
      setDocumentData(updatedDocumentData);
      setSubCateFilter(subCategoryId);
      setSkuFilter(skuProduct?.$containsi);
      setDocumentFilter(documentType?.$containsi);
      if ($gte !== undefined && $lte !== undefined) {
        setDateValue([$gte, $lte]);
      }
      setTotalPages(pageCount);
    }
  } catch (error: any) {
    handleApiError(error?.message);
  } finally {
    setReduxLoading(false);
  }
};

export const getPriceListData = async (
  body: IPriceListRequestBody,
  priceList: IProductListSubCategory[],
  setPriceList: SetStateAction<any>,
  setSubCateFilter: SetStateAction<any>,
  setSkuFilter: SetStateAction<any>,
  setDateValue: SetStateAction<any>,
  setTotalPages: SetStateAction<any>,
) => {
  setReduxLoading(true);
  try {
    const result = await NetworkRequest(POST, getPriceList(), body);

    if (result?.status === HttpStatusCode.OK) {
      const {
        data,
        meta: {
          pagination: {pageCount},
          filters: {subCategoryId, skuProduct, uploadedAt},
        },
      } = result?.data;

      let $gte;
      let $lte;

      if (uploadedAt) {
        $gte = uploadedAt.$gte;
        $lte = uploadedAt.$lte;
      }

      const updatedPriceList = await mergeDataWithSubCategory(priceList, data);
      setPriceList(updatedPriceList);
      setSubCateFilter(subCategoryId);
      setSkuFilter(skuProduct?.$containsi);
      if ($gte !== undefined && $lte !== undefined) {
        setDateValue([$gte, $lte]);
      }
      setTotalPages(pageCount);
    }
  } catch (error: any) {
    handleApiError(error?.message);
  } finally {
    setReduxLoading(false);
  }
};

export const transformedData = (data: IProductListSubCategory[]) => {
  return data.map(category => ({
    label: category?.subCategoryName,
    categoryId: category?.subCategoryId,
    data: category?.data?.map(item => ({
      id: item.id,
      title: item.description,
      link: item.youtubeLink,
      subTitle: moment(item.youtubeCreatedAt).format(DateFormats.DD_MMM_YYYY_2),
    })),
  }));
};

export const getProductVideos = async (
  body: IVideoRequestBody,
  videos: IProductListSubCategory[],
  setVideos: SetStateAction<any>,
  setSubCateFilter: SetStateAction<any>,
  setSkuFilter: SetStateAction<any>,
  setDocumentFilter: SetStateAction<any>,
  setDateValue: SetStateAction<any>,
  setTotalPages: SetStateAction<any>,
) => {
  setReduxLoading(true);
  try {
    const result = await NetworkRequest(POST, getPRoductVideos(), body);

    if (result?.status === HttpStatusCode.OK) {
      const {
        data,
        meta: {
          pagination: {pageCount},
          filters: {subCategoryId, documentType, skuProduct, youtubeCreatedAt},
        },
      } = result?.data;
      let $gte;
      let $lte;

      if (youtubeCreatedAt) {
        $gte = youtubeCreatedAt.$gte;
        $lte = youtubeCreatedAt.$lte;
      }
      const updatedVideos = await mergeDataWithSubCategory(videos, data);
      setVideos(updatedVideos);

      setSubCateFilter(subCategoryId);
      setSkuFilter(skuProduct?.$containsi);
      setDocumentFilter(documentType?.$containsi);
      if ($gte !== undefined && $lte !== undefined) {
        setDateValue([$gte, $lte]);
      }
      setTotalPages(pageCount);
    }
  } catch (error: any) {
    handleApiError(error?.message);
  } finally {
    setReduxLoading(false);
  }
};

export const getSelectedIds = (data: ILeadTypeCheckboxProps[]) => {
  return data[0]?.isChecked
    ? data.filter(item => item.id !== ID_ALL).map(item => item.id)
    : data.filter(item => item.isChecked).map(item => item.id);
};
