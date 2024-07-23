import React, {SetStateAction, useCallback, useEffect, useState} from 'react';
import Layout from 'components/Layout';
import CommonStyles from 'utils/commonStyle';
import Spacer from 'components/spacer';
import ComplianceCard from '../components/complianceCard/ComplianceCard';
import {getComplianceData} from '../PerformanceMgmt.business';
import {
  IComplianceReqBody,
  IComplianceResponse,
  ReportType,
  Reports,
} from '../PerformanceMgmt.interface';
import {EMPTY_DATA_DASH} from 'utils/Constants';
import moment from 'moment';
import {currentMonthShort, currentYearShort} from 'utils/commonMethods';

const buttons = [
  {
    value: 'Monthly',
    label: 'MTD',
  },
  {
    value: 'Daily',
    label: 'Daily',
  },
];

const CompliancePerformance = () => {
  const [complianceData, setComplianceData] = useState<IComplianceResponse>({
    beatPlanCompliance: {
      planned: 0,
      completed: 0,
      percentage: '',
    },
    visitPlanCompliance: {
      target: 0,
      actual: 0,
      percentage: '',
    },
    utilizationCompliance: {
      loggedInHours: '',
      expectedHours: '',
      percentage: '',
    },
    attendanceCompliance: {
      workingDays: 0,
      loggedInDays: '',
      percentage: '',
    },
  });

  const getCompliancePerformance = useCallback(
    (reqBody: IComplianceReqBody, setState: SetStateAction<any>) => {
      getComplianceData(reqBody, setState);
    },
    [],
  );

  useEffect(() => {
    const reqBody: IComplianceReqBody = {
      reportType: ReportType.MONTHLY,
      reports: [
        Reports.BEAT_COMPLIANCE,
        Reports.ATTENDANCE_COMPLIANCE,
        Reports.UTILIZATION_COMPLIANCE,
        Reports.VISIT_COMPLIANCE,
      ],
    };
    getCompliancePerformance(reqBody, setComplianceData);
  }, []);

  return (
    <Layout
      isScrollable
      headerTitle="Compliance Performance"
      style={CommonStyles.padding}>
      <ComplianceCard
        buttons={buttons}
        title="Beat Plan Compliance"
        leftValue="Planned Visits"
        rightValue="Completed Visits"
        thirdValue="Beat Plan Compliance"
        data={{
          leftTitle:
            complianceData?.beatPlanCompliance?.planned?.toString() ||
            EMPTY_DATA_DASH,
          rightTitle:
            complianceData?.beatPlanCompliance?.completed?.toString() ||
            EMPTY_DATA_DASH,
          thirdTitle:
            complianceData?.beatPlanCompliance?.percentage?.toString() ||
            EMPTY_DATA_DASH,
        }}
        onClick={value => {
          const reqBody: IComplianceReqBody = {
            reportType:
              value === ReportType.MONTHLY
                ? ReportType.MONTHLY
                : ReportType?.DAILY,
            reports: [Reports.BEAT_COMPLIANCE],
          };
          getCompliancePerformance(reqBody, (data: IComplianceResponse) => {
            setComplianceData(prevData => ({
              ...prevData,
              beatPlanCompliance: data.beatPlanCompliance,
            }));
          });
        }}
      />
      <Spacer size={16} />
      <ComplianceCard
        buttons={buttons}
        title="Visit Plan Compliance"
        leftValue="Minimum No. of Store Visit"
        rightValue="Actual No. of Store Visit"
        thirdValue="Store Visit Compliance"
        data={{
          leftTitle:
            complianceData?.visitPlanCompliance?.target?.toString() ||
            EMPTY_DATA_DASH,
          rightTitle:
            complianceData?.visitPlanCompliance?.actual?.toString() ||
            EMPTY_DATA_DASH,
          thirdTitle:
            complianceData?.visitPlanCompliance?.percentage?.toString() ||
            EMPTY_DATA_DASH,
        }}
        onClick={value => {
          const reqBody: IComplianceReqBody = {
            reportType:
              value === ReportType.MONTHLY
                ? ReportType.MONTHLY
                : ReportType?.DAILY,
            reports: [Reports.VISIT_COMPLIANCE],
          };
          getCompliancePerformance(reqBody, (data: IComplianceResponse) => {
            setComplianceData(prevData => ({
              ...prevData,
              visitPlanCompliance: data.visitPlanCompliance,
            }));
          });
        }}
      />
      <Spacer size={16} />
      <ComplianceCard
        buttons={buttons}
        title="Utilisation Compliance"
        subTitle={`Period: ${currentMonthShort} ${currentYearShort}'`}
        leftValue="Expected Hours"
        rightValue="Logged Hours"
        thirdValue="Attendance Compliance"
        data={{
          leftTitle:
            complianceData?.utilizationCompliance?.expectedHours?.toString() ||
            EMPTY_DATA_DASH,
          rightTitle:
            complianceData?.utilizationCompliance?.loggedInHours?.toString() ||
            EMPTY_DATA_DASH,
          thirdTitle:
            complianceData?.utilizationCompliance?.percentage?.toString() ||
            EMPTY_DATA_DASH,
        }}
        onClick={value => {
          const reqBody: IComplianceReqBody = {
            reportType:
              value === ReportType.MONTHLY
                ? ReportType.MONTHLY
                : ReportType?.DAILY,
            reports: [Reports.UTILIZATION_COMPLIANCE],
          };
          getCompliancePerformance(reqBody, (data: IComplianceResponse) => {
            setComplianceData(prevData => ({
              ...prevData,
              utilizationCompliance: data.utilizationCompliance,
            }));
          });
        }}
      />
      <Spacer size={16} />
      <ComplianceCard
        buttons={buttons}
        title="Attendance Compliance"
        subTitle={`Period: ${currentMonthShort} ${currentYearShort}'`}
        leftValue="Minimum Working Days"
        rightValue="Logged In Days"
        thirdValue="Attendance Compliance"
        data={{
          leftTitle:
            complianceData?.attendanceCompliance?.workingDays?.toString() ||
            EMPTY_DATA_DASH,
          rightTitle:
            complianceData?.attendanceCompliance?.loggedInDays?.toString() ||
            EMPTY_DATA_DASH,
          thirdTitle:
            complianceData?.attendanceCompliance?.percentage?.toString() ||
            EMPTY_DATA_DASH,
        }}
        onClick={value => {
          const reqBody: IComplianceReqBody = {
            reportType:
              value === ReportType.MONTHLY
                ? ReportType.MONTHLY
                : ReportType?.DAILY,
            reports: [Reports.ATTENDANCE_COMPLIANCE],
          };
          getCompliancePerformance(reqBody, (data: IComplianceResponse) => {
            setComplianceData(prevData => ({
              ...prevData,
              attendanceCompliance: data.attendanceCompliance,
            }));
          });
        }}
      />
    </Layout>
  );
};

export default CompliancePerformance;
