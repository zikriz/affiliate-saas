export type Stats = {
  totalScheduled: number;
  totalSent: number;
  totalCampaigns: number;
  totalClicks: number;
};

export type Campaign = {
  id: string;
  name: string;
  status: string;
  scheduledFor?: string;
};

export type ContentItem = {
  id: string;
  title: string;
  platform: string;
  status: string;
  scheduledAt?: string;
};