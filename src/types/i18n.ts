export type Locale = "ja" | "en" | "de" | "fr" | "es" | "it" | "pt" | "nl" | "pl" | "ru" | "tr";

export interface Translations {
  nav: {
    home: string;
    japan: string;
    teams: string;
    quiz: string;
    jleague: string;
    articles: string;
    uniform: string;
    matches: string;
  };
  home: {
    heroTitle: string;
    heroSubtitle: string;
    groupStageTitle: string;
    statsBarMatches: string;
    statsBarTeams: string;
    statsBarStadiums: string;
  };
  common: {
    seeMore: string;
    backToTop: string;
    loading: string;
    position: { GK: string; DF: string; MF: string; FW: string };
  };
}
