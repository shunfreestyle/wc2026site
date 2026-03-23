export type Locale = "ja" | "en";

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
    stadiums: string;
  };
  home: {
    heroSubtitle: string;
    featuredTeamsTitle: string;
    featuredTeamsSub: string;
    seeAllTeams: string;
    groupStageTitle: string;
    groupStageSub: string;
    matchScheduleTitle: string;
    matchScheduleSub: string;
    seeAllMatches: string;
    hostCitiesTitle: string;
    hostCitiesSub: string;
    statsBarMatches: string;
    statsBarTeams: string;
    statsBarStadiums: string;
    countdownLabel: string;
  };
  teams: {
    pageTitle: string;
    pageSub: string;
    group: string;
    confederationTitle: string;
    uefa: string;
    conmebol: string;
    concacaf: string;
    afc: string;
    caf: string;
    teamInfo: string;
    wcAppearances: string;
    bestResult: string;
    confederation: string;
    overview: string;
    coachTitle: string;
    coachStyle: string;
    squad: string;
    captain: string;
  };
  japan: {
    pageTitle: string;
    groupLabel: string;
    nextMatchLabel: string;
    featuredPlayers: string;
    fullSquad: string;
    stats: { caps: string; goals: string; height: string; age: string; club: string };
  };
  quiz: {
    pageTitle: string;
    pageSub: string;
    startBtn: string;
    nextBtn: string;
    resultTitle: string;
    score: string;
    retry: string;
    categories: { japan: string; worldcup: string; england: string; scotland: string };
  };
  jleague: {
    pageTitle: string;
    pageSub: string;
    east: string;
    west: string;
    round: string;
    standings: string;
  };
  common: {
    seeMore: string;
    backToTop: string;
    loading: string;
    worldCup: string;
    worldCup2026: string;
    japanNT: string;
    samuraiBlue: string;
    group: string;
    match: string;
    venue: string;
    date: string;
    position: { GK: string; DF: string; MF: string; FW: string };
    confederation: { UEFA: string; CONMEBOL: string; CONCACAF: string; AFC: string; CAF: string; OFC: string };
  };
}
