
import { MemberGrowthChart } from "./MemberGrowthChart";
import { MemberTypeChart } from "./MemberTypeChart";
import { MemberStatusChart } from "./MemberStatusChart";
import { MemberEngagementChart } from "./MemberEngagementChart";

interface AnalyticsData {
  memberGrowthData: Array<{
    month: string;
    members: number;
  }>;
  memberTypeData: Array<{
    name: string;
    value: number;
  }>;
  memberStatusData: Array<{
    name: string;
    value: number;
  }>;
  memberEngagementData: Array<{
    month: string;
    meetings: number;
    votes: number;
    events: number;
  }>;
}

interface AnalyticsOverviewTabProps {
  data: AnalyticsData;
  colors: string[];
}

export const AnalyticsOverviewTab = ({ data, colors }: AnalyticsOverviewTabProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <MemberGrowthChart data={data.memberGrowthData} />
      <MemberTypeChart data={data.memberTypeData} colors={colors} />
      <MemberStatusChart data={data.memberStatusData} colors={colors} />
      <MemberEngagementChart data={data.memberEngagementData} />
    </div>
  );
};
