import axios from 'axios';
import {
  getAccountOutstandingApi,
  getAccountStatementApi,
  getChannelFinanceApi,
} from 'services/methods/financialInformation';
import {handleApiError, setReduxLoading} from 'utils/CommonReduxMethods';
import {parseString} from 'xml2js';
import {Buffer} from 'buffer';
import {SetStateAction} from 'react';
import {ErrorEnum} from 'constants/errors';
import {
  createPDF,
  generateAccountOutstandingPdf,
  generateAccountStatementPdf,
} from './FinancialInformation.helper';
import {convertDateToDisplay} from 'utils/commonMethods';
import {
  ACCOUNT_DOCUMENT_TYPES,
  ACCOUNT_OUTSTANDING_TYPES,
  EMPTY_DATA_DASH,
  ID_ALL,
} from 'utils/Constants';
import {
  IAccountOdiChargedData,
  IAccountOdiWaivedData,
  IAccountOutstandingBankGuaranteeDataResponse,
  IAccountOutstandingHeaderDataResponse,
  IAccountOutstandingListData,
  IAccountOutstandingSapResponse,
  IAccountOutstandingTransactionProps,
  IAccountStatementProps,
  IAccountStatementTransactionProps,
} from './FinancialInformation.interface';
import {DateFormats} from 'constants/dateFormat';
import {HttpStatusCode, POST} from 'constants/httpConstants';
import NetworkRequest from 'services/networkRequest';
import {store} from 'store/redux/store';
import Config from 'react-native-config';

const generateSoapHeader = (isStatement: boolean) => ({
  headers: {
    'Content-Type': 'text/xml; charset=utf-8',
    SOAPAction: isStatement
      ? 'urn:sap-com:document:sap:soap:functions:mc-style:ZWS_ACC_STMT:ZwsAccStmtRequest'
      : 'urn:sap-com:document:sap:rfc:functions:ZWS_CUST_AGEING_CP:ZWS_CUST_AGEING_CPRequest',
    Authorization:
      'Basic ' +
      Buffer.from(`${Config.SAP_USERNAME}:${Config.SAP_PASSWORD}`).toString(
        'base64',
      ),
  },
});

const generateAccountStatementSoapXml = (fromDate: string, toDate: string) => {
  const customerCode = store.getState().channelPartner.channelPartnerId;
  return `<?xml version="1.0" encoding="utf-8"?>
    <soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:urn="urn:sap-com:document:sap:soap:functions:mc-style"> 
      <soapenv:Header/> 
      <soapenv:Body> 
          <urn:ZwsAccStmt> 
            <Bukrs>VGIL</Bukrs>     
            <Frdate>${fromDate}</Frdate>
            <Kunnr>${customerCode}</Kunnr>
            <Todate>${toDate}</Todate>
          </urn:ZwsAccStmt> 
      </soapenv:Body> 
    </soapenv:Envelope>`;
};

const mapApiResponseToAccountStatement = (data: IAccountStatementProps) => {
  const customerDetails = {
    name: data?.Name?.[0],
    address: data?.Address?.[0],
    city: data?.City?.[0],
    pinCode: data?.Pincode?.[0],
    state: data?.State?.[0],
    GSTIN: data?.Gstin?.[0],
    PAN: data?.Pan?.[0],
    mobile: data?.Mobile?.[0],
  };
  const accountSummary = {
    securityDeposit: data?.SecDeposit?.[0],
    bankGuarantee: data?.BankGrntee?.[0],
    closingBalance: data?.ClBalance?.[0],
    // Moved here due to match pdf format
    contact: data?.Person?.[0],
    email: data?.Email?.[0],
  };

  const transactions: IAccountStatementTransactionProps[] = [];

  if (
    data?.StmtLitems.length > 0 &&
    data?.StmtLitems[0]?.item &&
    data?.StmtLitems[0]?.item?.length > 0
  ) {
    for (const item of data?.StmtLitems[0]?.item) {
      transactions.push({
        date: item?.Bldat?.[0],
        documentNumber: item?.Belnr?.[0],
        documentType: item?.Purpose?.[0],
        invoiceNumber: item?.Xblnr?.[0],
        particulars: item?.Particular?.[0],
        debit: item?.Shkzg?.[0],
        credit: item?.ShkzgD?.[0],
        balance: item?.Balance?.[0],
      });
    }
  }

  const odiChargedData: IAccountOdiChargedData[] = [];
  const odiWaivedData: IAccountOdiWaivedData[] = [];

  let totalOdi = 0;
  let totalInterestWaived = 0;

  if (
    data?.StmtAnnex1.length > 0 &&
    data?.StmtAnnex1[0]?.item &&
    data?.StmtAnnex1[0]?.item?.length > 0
  ) {
    for (const item of data?.StmtAnnex1[0]?.item) {
      totalOdi += Number(item?.INTEREST?.[0]);
      odiChargedData.push({
        docType: item?.DOCTYPE?.[0],
        invoiceNo: item?.BELNR?.[0],
        invoiceDate: item?.BUDAT?.[0],
        dueDate: item?.ZFBDT?.[0],
        invoiceAmount: item?.DMBTR?.[0],
        baseAmount: item?.INT_BASAMT?.[0],
        from: item?.FROMDATE?.[0],
        to: item?.TODATE?.[0],
        days: item?.DAYS?.[0],
        interestGST: item?.INTEREST?.[0],
        debitNoteNo: item?.DEBIT?.[0],
      });

      totalInterestWaived += Number(item?.CR_AMT?.[0]);
      odiWaivedData.push({
        invoiceNo: item?.BELNR?.[0],
        debitNoteDate: item?.BUDAT?.[0],
        debitNoteNo: item?.DEBIT?.[0],
        debitNoteAmount: item?.DMBTR?.[0],
        creditNote: item?.CREDIT?.[0],
        creditNoteAmount: item?.CR_AMT?.[0],
        creditNoteDate: item?.CR_DATE?.[0],
      });
    }
  }

  return {
    customerDetails,
    accountSummary,
    transactions,
    odiChargedData,
    odiWaivedData,
    totalOdi,
    totalInterestWaived,
  };
};

export const getAccountStatementData = async (
  fromDate: string,
  toDate: string,
) => {
  setReduxLoading(true);
  try {
    const xml = generateAccountStatementSoapXml(fromDate, toDate);
    const response = await axios.post(
      getAccountStatementApi(),
      xml,
      generateSoapHeader(true),
    );
    parseString(response.data, function (_err, result) {
      const data =
        result['soap-env:Envelope']['soap-env:Body'][0][
          'n0:ZwsAccStmtResponse'
        ][0].ZaccStmt[0];

      const mappedData = mapApiResponseToAccountStatement(data);

      const statementPeriod = {
        startDate: convertDateToDisplay(fromDate, DateFormats.DD_MM_YYYY_2),
        endDate: convertDateToDisplay(toDate, DateFormats.DD_MM_YYYY_2),
      };

      const finalResult = {
        statementPeriod: statementPeriod,
        ...mappedData,
      };

      const generatedHtml = generateAccountStatementPdf(finalResult);
      createPDF(generatedHtml);
      if (_err) {
        handleApiError(ErrorEnum.somethingWentWrong);
      }
    });
  } catch (error: any) {
    handleApiError(error.message);
  } finally {
    setReduxLoading(false);
  }
};

const generateAccountOutstandingSoapXml = (
  date: string,
  customerCode: string,
) => {
  return `<?xml version="1.0" encoding="utf-8"?>
    <soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:urn="urn:sap-com:document:sap:rfc:functions">
      <soapenv:Header/>
      <soapenv:Body>
          <urn:ZWS_CUST_AGEING_CP>
            <I_DATE>${date}</I_DATE>
            <I_KUNNR>${customerCode}</I_KUNNR>
          </urn:ZWS_CUST_AGEING_CP>
      </soapenv:Body>
    </soapenv:Envelope>`;
};

export const calculateOutstandingListData = (
  data: IAccountOutstandingSapResponse[],
) => {
  const categorySet: Set<string> = new Set();
  const mappedData: IAccountOutstandingListData[] = [];

  if (data?.length > 0) {
    for (const item of data) {
      const itemData = {
        date: item?.BUDAT[0]
          ? convertDateToDisplay(item.BUDAT[0])
          : EMPTY_DATA_DASH,
        category: item?.PROD_DESC[0],
        overdueDays: Number(item?.ZODDS?.[0] ?? 0),
        amount: Number(item?.DMBTR?.[0] ?? 0),
        data: [
          {title: 'Doc. No.', text: item?.BELNR[0] || EMPTY_DATA_DASH},
          {
            title: 'Product Division',
            text: item?.PROD_DESC[0] || EMPTY_DATA_DASH,
          },
          {
            title: 'Amount',
            text: Number(item?.DMBTR?.[0] ?? 0),
            formatValueInRupees: true,
          },
          {title: 'Invoice No.', text: item?.VBELN[0] || EMPTY_DATA_DASH},
          {
            title: 'Doc. Type',
            text: item?.BLART[0]
              ? ACCOUNT_DOCUMENT_TYPES[item.BLART[0]]
              : EMPTY_DATA_DASH,
          },
          {
            title: 'Debit/Credit',
            text: item?.SHKZG[0]
              ? ACCOUNT_OUTSTANDING_TYPES[item.SHKZG[0]]
              : EMPTY_DATA_DASH,
          },
          {
            title: 'Due Date',
            text: item?.ZDUEDT[0]
              ? convertDateToDisplay(item?.ZDUEDT[0])
              : EMPTY_DATA_DASH,
          },
          {title: 'Days Overdue', text: item?.ZODDS[0] || EMPTY_DATA_DASH},
        ],
      };

      mappedData.push(itemData);

      if (!categorySet.has(item?.PROD_DESC?.[0])) {
        categorySet.add(item?.PROD_DESC?.[0]);
      }
    }
  }

  return {categoryArr: [...categorySet], mappedData};
};

export const mapApiResponseToCheckbox = (data: string[]) => {
  let result = [{id: ID_ALL, name: 'Select All'}];
  data.map(item => result.push({id: item, name: item}));
  return result;
};

export const getAccountOutstandingData = async (
  date: string,
  setAccountsData: SetStateAction<any>,
  setCategoryData: SetStateAction<any>,
  setPdfData: SetStateAction<any>,
) => {
  setReduxLoading(true);
  const customerCode = store.getState().channelPartner.channelPartnerId;
  try {
    const xml = generateAccountOutstandingSoapXml(date, customerCode);
    const response = await axios.post(
      getAccountOutstandingApi(),
      xml,
      generateSoapHeader(false),
    );
    parseString(response.data, function (_err, result) {
      const data =
        result['soap-env:Envelope']['soap-env:Body'][0][
          'n0:ZWS_CUST_AGEING_CPResponse'
        ][0];

      if (
        data?.OUTPUT &&
        data.OUTPUT?.length > 0 &&
        data.OUTPUT?.[0]?.item &&
        data.OUTPUT[0].item?.length > 0
      ) {
        const listData = calculateOutstandingListData(data.OUTPUT[0].item);
        setAccountsData(listData.mappedData);
        const categoryData = mapApiResponseToCheckbox(listData.categoryArr);
        setCategoryData(categoryData);

        const pdfData = mapApiResponseToAccountOutstandingPdf(
          data.OUTPUT[0].item,
        );

        setPdfData(pdfData);
      }
    });
  } catch (error: any) {
    handleApiError(error.message);
  } finally {
    setReduxLoading(false);
  }
};

const mapApiResponseToBankDeposit = (
  data: IAccountOutstandingBankGuaranteeDataResponse[],
) => {
  return data?.map(item => ({
    data: [
      {
        title: 'Bank Guarantee',
        text: Number(item?.DMBTR?.[0] || 0),
        formatValueInRupees: true,
      },
      {
        title: 'Expiry Date',
        text: item.ZFBDT[0]
          ? convertDateToDisplay(item?.ZFBDT?.[0])
          : EMPTY_DATA_DASH,
      },
    ],
  }));
};

export const mapApiResponseToOutstandingData = (
  responseData: IAccountOutstandingSapResponse[],
  headerData: IAccountOutstandingHeaderDataResponse,
) => {
  let totalAmount = 0;
  let maxOverdueDays = 0;
  const ODI = Number(headerData?.ODI?.[0] ?? 0);
  const EV_CREDIT = Number(headerData?.EV_CREDIT?.[0] ?? 0);

  const pieChartData = [
    {value: 0, label: 'Not Due Amount'},
    {value: 0, label: 'Due but not Overdue'},
    {value: 0, label: 'Overdue Amount'},
    {value: ODI, label: 'Overdue Interest'},
    {value: EV_CREDIT, label: 'Unadjusted Credit'},
  ];

  for (const item of responseData) {
    const overdueDays = Number(item?.ZODDS?.[0] ?? 0);
    const amount = Number(item?.DMBTR?.[0] ?? 0);
    totalAmount += amount;
    maxOverdueDays = Math.max(maxOverdueDays, overdueDays);

    if (overdueDays === 0) {
      pieChartData[0].value += amount;
    } else if (overdueDays > 0 && overdueDays < 90) {
      pieChartData[1].value += amount;
    } else if (overdueDays > 90) {
      pieChartData[2].value += amount;
    }
  }

  const totalOutstanding = totalAmount + ODI + EV_CREDIT;

  return {totalOutstanding, maxOverdueDays, pieChartData};
};

export const getFinancialSummaryData = async (
  customerCode: string,
  date: string,
  setVgilData: SetStateAction<any>,
  setBankGuaranteeData?: SetStateAction<any>,
  setSecurityDepositData?: SetStateAction<any>,
  setOutstandingData?: SetStateAction<any>,
) => {
  setReduxLoading(true);
  try {
    const xml = generateAccountOutstandingSoapXml(date, customerCode);
    const response = await axios.post(
      getAccountOutstandingApi(),
      xml,
      generateSoapHeader(false),
    );
    parseString(response.data, function (_err, result) {
      const data =
        result['soap-env:Envelope']['soap-env:Body'][0][
          'n0:ZWS_CUST_AGEING_CPResponse'
        ][0];

      const bankGuaranteeData: IAccountOutstandingBankGuaranteeDataResponse[] =
        data?.OUTPUT_BANK_GUARANTEE?.[0]?.item;

      const headerData: IAccountOutstandingHeaderDataResponse =
        data?.OUTPUT_HEADER?.[0]?.item?.[0];

      setVgilData({
        totalCreditLimit: Number(headerData?.KLIMK?.[0] || 0),
        utilizedCreditLimit: Number(headerData?.TOTAL_OUTSTANDING?.[0] || 0),
        availableCreditLimit:
          Number(headerData?.KLIMK?.[0] || 0) -
          Number(headerData?.TOTAL_OUTSTANDING?.[0] || 0),
        pei: Number(headerData?.DBPAY?.[0] || 0),
      });

      const depositData: IDataCard[] = [
        {
          title: 'Security Deposit',
          text: headerData.DMBTR_SD[0],
          formatValueInRupees: true,
        },
      ];

      setSecurityDepositData && setSecurityDepositData(depositData);

      if (bankGuaranteeData) {
        setBankGuaranteeData &&
          setBankGuaranteeData(mapApiResponseToBankDeposit(bankGuaranteeData));
      }

      if (data?.OUTPUT?.[0]?.item && headerData) {
        setOutstandingData &&
          setOutstandingData(
            mapApiResponseToOutstandingData(
              data?.OUTPUT?.[0]?.item,
              headerData,
            ),
          );
      }
    });
  } catch (error: any) {
    handleApiError(error.message);
  } finally {
    setReduxLoading(false);
  }
};

const mapApiResponseToAccountOutstandingPdf = (
  data: IAccountOutstandingSapResponse[],
) => {
  const transactions: IAccountOutstandingTransactionProps[] = [];
  for (const item of data) {
    transactions.push({
      date: item?.BUDAT?.[0]
        ? convertDateToDisplay(item?.BUDAT?.[0], DateFormats.DD_MM_YYYY_)
        : '',
      documentNumber: item?.BELNR?.[0],
      invoiceNumber: item?.VBELN?.[0],
      productName: item?.PROD_DESC?.[0],
      documentType: ACCOUNT_DOCUMENT_TYPES[item.BLART[0]] ?? '',
      amount: item?.DMBTR?.[0],
      drCr: item?.SHKZG?.[0],
      dueDate: item?.ZDUEDT?.[0],
      overdueDays: item?.ZODDS?.[0],
    });
  }

  return generateAccountOutstandingPdf(transactions);
};

export const getChannelFinanceData = async (
  channelPartnerId: string,
  setChannelFinanceData: SetStateAction<any>,
) => {
  setReduxLoading(true);
  try {
    const response = await NetworkRequest(POST, getChannelFinanceApi(), {
      channelPartnerId,
    });
    if (response?.status === HttpStatusCode.OK && response?.data) {
      setChannelFinanceData(response?.data?.data?.attributes);
    }
  } catch (error: any) {
    handleApiError(error.message);
  } finally {
    setReduxLoading(false);
  }
};
