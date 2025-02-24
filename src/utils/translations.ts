
type Translations = {
  [key: string]: {
    [key: string]: string;
  };
};

export const translations: Translations = {
  en: {
    dashboard: "Dashboard",
    totalMembers: "Total Members",
    activeTasks: "Active Tasks",
    monthlyIncome: "Monthly Income",
    upcomingEvents: "Upcoming Events",
    fromLastMonth: "from last month",
    dueThisWeek: "due this week",
    thisWeek: "This week",
    memberDirectory: "Member Directory",
    searchMembers: "Search members...",
    generalAssembly: "General Assembly",
    projectReview: "Project Review",
    newMemberOrientation: "New Member Orientation",
    meeting: "Meeting",
    event: "Event",
    income: "Income",
    expenses: "Expenses",
  },
  de: {
    dashboard: "Übersicht",
    totalMembers: "Gesamtmitglieder",
    activeTasks: "Aktive Aufgaben",
    monthlyIncome: "Monatliches Einkommen",
    upcomingEvents: "Kommende Ereignisse",
    fromLastMonth: "im Vergleich zum Vormonat",
    dueThisWeek: "diese Woche fällig",
    thisWeek: "Diese Woche",
    memberDirectory: "Mitgliederverzeichnis",
    searchMembers: "Mitglieder suchen...",
    generalAssembly: "Generalversammlung",
    projectReview: "Projektprüfung",
    newMemberOrientation: "Neue Mitgliederorientierung",
    meeting: "Besprechung",
    event: "Veranstaltung",
    income: "Einnahmen",
    expenses: "Ausgaben",
  }
};

export const useTranslation = (locale: 'en' | 'de' = 'de') => {
  return (key: string): string => {
    return translations[locale][key] || key;
  };
};
