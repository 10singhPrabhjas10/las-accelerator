interface IAccordionCardItem {
  id: number;
  text: string | null | number;
  title: string;
}

export interface ISecondarySchemeSlab {
  accordionCard: IAccordionCardItem[];
  accordionHeader: string;
}

export interface IResponse {
  focName: string | null;
  rewardToBeEarned: string;
  rewardType: string;
  rewardUnit: number;
  slabCriteriaUOM: string;
  slabThresholdFrom: number;
  slabThresholdTo: number;
}
