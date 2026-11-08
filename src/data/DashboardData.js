const baseData = {
  "7": {
    revenue: 12480,
    revenueChange: 6.2,
    signups: 684,
    signupsChange: 4.8,
    totalUsers: 24582,
    totalUsersChange: 1.9,
    activeSessions: 1108,
    activeSessionsChange: -1.2,
    signupProgress: 61,
    userGrowth: [
      { month: "Mon", users: 23840 },
      { month: "Tue", users: 24020 },
      { month: "Wed", users: 24110 },
      { month: "Thu", users: 24280 },
      { month: "Fri", users: 24410 },
      { month: "Sat", users: 24520 },
      { month: "Sun", users: 24582 },
    ],
  },

  "30": {
    revenue: 48290,
    revenueChange: 12.8,
    signups: 2847,
    signupsChange: 8.4,
    totalUsers: 24582,
    totalUsersChange: 5.7,
    activeSessions: 1429,
    activeSessionsChange: -2.3,
    signupProgress: 72,
    userGrowth: [
      { month: "Jan", users: 18400 },
      { month: "Feb", users: 19100 },
      { month: "Mar", users: 19850 },
      { month: "Apr", users: 20700 },
      { month: "May", users: 21900 },
      { month: "Jun", users: 23100 },
      { month: "Jul", users: 24582 },
    ],
  },

  "90": {
    revenue: 142860,
    revenueChange: 18.6,
    signups: 8426,
    signupsChange: 11.2,
    totalUsers: 24582,
    totalUsersChange: 9.4,
    activeSessions: 1682,
    activeSessionsChange: 6.8,
    signupProgress: 84,
    userGrowth: [
      { month: "Jan", users: 17640 },
      { month: "Feb", users: 18420 },
      { month: "Mar", users: 19280 },
      { month: "Apr", users: 20150 },
      { month: "May", users: 21320 },
      { month: "Jun", users: 22580 },
      { month: "Jul", users: 24582 },
    ],
  },
};

const industryMultipliers = {
  "All Industries": 1,
  Technology: 1.12,
  Finance: 1.08,
  Healthcare: 0.94,
  Retail: 0.86,
  Education: 0.78,
};

const regionMultipliers = {
  "All Regions": 1,
  "North America": 1.18,
  Europe: 1.02,
  Asia: 0.96,
  "Middle East": 0.72,
  Africa: 0.58,
  Oceania: 0.64,
};

const regionData = [
  { region: "North America", users: 8420 },
  { region: "Europe", users: 7180 },
  { region: "Asia", users: 6240 },
  { region: "Middle East", users: 3890 },
  { region: "Africa", users: 2140 },
];

const deviceData = [
  { name: "Desktop", value: 52 },
  { name: "Mobile", value: 34 },
  { name: "Tablet", value: 14 },
];

export function getDashboardData(timeframe, industry, region) {
  const base = baseData[timeframe] || baseData["30"];

  const industryMultiplier =
    industryMultipliers[industry] || industryMultipliers["All Industries"];

  const regionMultiplier =
    regionMultipliers[region] || regionMultipliers["All Regions"];

  const multiplier = industryMultiplier * regionMultiplier;

  const totalUsers = Math.round(base.totalUsers * multiplier);
  const revenue = Math.round(base.revenue * multiplier);
  const signups = Math.round(base.signups * multiplier);
  const activeSessions = Math.round(base.activeSessions * multiplier);

  const changeMultiplier = Math.min(multiplier, 1.18);

  const filteredRegions =
    region === "All Regions"
      ? regionData.map((item) => ({
          ...item,
          users: Math.round(item.users * industryMultiplier),
        }))
      : regionData
          .filter((item) => item.region === region)
          .map((item) => ({
            ...item,
            users: Math.round(item.users * industryMultiplier),
          }));

  return {
    kpis: {
      revenue: `$${revenue.toLocaleString()}`,
      revenueChange: `${base.revenueChange >= 0 ? "+" : ""}${(
        base.revenueChange * changeMultiplier
      ).toFixed(1)}%`,
      signups: signups.toLocaleString(),
      signupsChange: `${base.signupsChange >= 0 ? "+" : ""}${(
        base.signupsChange * changeMultiplier
      ).toFixed(1)}%`,
      totalUsers: totalUsers.toLocaleString(),
      totalUsersChange: `${base.totalUsersChange >= 0 ? "+" : ""}${(
        base.totalUsersChange * changeMultiplier
      ).toFixed(1)}%`,
      activeSessions: activeSessions.toLocaleString(),
      activeSessionsChange: `${base.activeSessionsChange >= 0 ? "+" : ""}${(
        base.activeSessionsChange * changeMultiplier
      ).toFixed(1)}%`,
      activeSessionsTrend:
        base.activeSessionsChange >= 0 ? "up" : "down",
      signupProgress: Math.min(
        Math.round(base.signupProgress * multiplier),
        100
      ),
    },

    userGrowth: base.userGrowth.map((item) => ({
      ...item,
      users: Math.round(item.users * multiplier),
    })),

    regions: filteredRegions,

    devices: deviceData.map((item) => ({
      ...item,
      value: item.value,
    })),
  };
}
