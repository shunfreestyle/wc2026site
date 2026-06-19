// ============================================================
// FIFA World Cup 2026 – Ticket Resale Links (Knockout Stage)
// StubHub, SeatGeek, Gametime
// ============================================================

export type TicketLink = {
  stubhub: string;
  seatgeek: string;
  gametime: string;
};

export type TicketMatch = {
  matchNumber: number;
  stage: string;
  stageEn: string;
  date: string;
  localTime: string;
  timezone: string;
  venue: string;
  venueEn: string;
  city: string;
  cityEn: string;
  homeLabel: string;
  homeLabelEn: string;
  awayLabel: string;
  awayLabelEn: string;
  links: TicketLink;
};

export const ticketMatches: TicketMatch[] = [
  // ── ROUND OF 32 ──────────────────────────────────────────
  {
    matchNumber: 73, stage: "ラウンド32", stageEn: "Round of 32",
    date: "2026-06-28", localTime: "12:00", timezone: "PDT",
    venue: "ソフィ・スタジアム", venueEn: "SoFi Stadium",
    city: "ロサンゼルス", cityEn: "Los Angeles",
    homeLabel: "A組2位", homeLabelEn: "A 2nd",
    awayLabel: "B組2位", awayLabelEn: "B 2nd",
    links: {
      stubhub: "https://www.stubhub.com/world-cup-inglewood-tickets-6-28-2026/event/153020724/",
      seatgeek: "https://seatgeek.com/fifa-world-cup-tickets/international-soccer/2026-06-28-12-pm/17176208",
      gametime: "https://gametime.co/fifa/fifa-world-cup-match-73-round-of-32-tickets/6-28-2026-inglewood-ca-so-fi-stadium/events/66ac247a2e8443f895e2dfc0",
    },
  },
  {
    matchNumber: 74, stage: "ラウンド32", stageEn: "Round of 32",
    date: "2026-06-29", localTime: "16:30", timezone: "EDT",
    venue: "ジレット・スタジアム", venueEn: "Gillette Stadium",
    city: "ボストン", cityEn: "Boston",
    homeLabel: "E組1位", homeLabelEn: "E 1st",
    awayLabel: "3位(A/B/C/D/F)", awayLabelEn: "3rd (A/B/C/D/F)",
    links: {
      stubhub: "https://www.stubhub.com/world-cup-foxborough-tickets-6-29-2026/event/153023830/",
      seatgeek: "https://seatgeek.com/fifa-world-cup-tickets/international-soccer/2026-06-29-3-30-am/17307562",
      gametime: "https://gametime.co/fifa/fifa-world-cup-match-74-round-of-32-tickets/6-29-2026-foxborough-ma-gillette-stadium/events/66aa9291b418e74d23390f5d",
    },
  },
  {
    matchNumber: 75, stage: "ラウンド32", stageEn: "Round of 32",
    date: "2026-06-29", localTime: "19:00", timezone: "CST",
    venue: "エスタディオ・BBVA", venueEn: "Estadio BBVA",
    city: "モンテレイ", cityEn: "Monterrey",
    homeLabel: "F組1位", homeLabelEn: "F 1st",
    awayLabel: "C組2位", awayLabelEn: "C 2nd",
    links: {
      stubhub: "https://www.stubhub.com/world-cup-monterrey-tickets-6-29-2026/event/153033502/",
      seatgeek: "https://seatgeek.com/fifa-world-cup-tickets/international-soccer/2026-06-29-8-pm/17650348",
      gametime: "https://gametime.co/soccer/fifa-world-cup-match-75-tickets/6-29-2026-monterrey-estadio-bbva-bancomer/events/66b12149a7cf418b15c9ebb1",
    },
  },
  {
    matchNumber: 76, stage: "ラウンド32", stageEn: "Round of 32",
    date: "2026-06-29", localTime: "12:00", timezone: "CDT",
    venue: "NRGスタジアム", venueEn: "NRG Stadium",
    city: "ヒューストン", cityEn: "Houston",
    homeLabel: "C組1位", homeLabelEn: "C 1st",
    awayLabel: "F組2位", awayLabelEn: "F 2nd",
    links: {
      stubhub: "https://www.stubhub.com/world-cup-houston-tickets-6-29-2026/event/153021172/",
      seatgeek: "https://seatgeek.com/fifa-world-cup-tickets/international-soccer/2026-06-29-12-pm/17307564",
      gametime: "https://gametime.co/fifa/fifa-world-cup-match-76-round-of-32-tickets/6-29-2026-houston-tx-nrg-stadium/events/66b11d0929f31493b981d670",
    },
  },
  {
    matchNumber: 77, stage: "ラウンド32", stageEn: "Round of 32",
    date: "2026-06-30", localTime: "12:00", timezone: "CDT",
    venue: "AT&Tスタジアム", venueEn: "AT&T Stadium",
    city: "ダラス", cityEn: "Dallas",
    homeLabel: "E組2位", homeLabelEn: "E 2nd",
    awayLabel: "I組2位", awayLabelEn: "I 2nd",
    links: {
      stubhub: "https://www.stubhub.com/world-cup-arlington-tickets-6-30-2026/event/153021470/",
      seatgeek: "https://seatgeek.com/fifa-world-cup-tickets/international-soccer/2026-06-30-12-pm/17385147",
      gametime: "https://gametime.co/soccer/fifa-world-cup-match-77-round-of-32-tickets/6-30-2026-east-rutherford-nj-met-life-stadium/events/66a7ed47518ef7ae01c08518",
    },
  },
  {
    matchNumber: 78, stage: "ラウンド32", stageEn: "Round of 32",
    date: "2026-06-30", localTime: "17:00", timezone: "EDT",
    venue: "メットライフ・スタジアム", venueEn: "MetLife Stadium",
    city: "ニューヨーク/NJ", cityEn: "New York/NJ",
    homeLabel: "I組1位", homeLabelEn: "I 1st",
    awayLabel: "3位(C/D/F/G/H)", awayLabelEn: "3rd (C/D/F/G/H)",
    links: {
      stubhub: "https://www.stubhub.com/world-cup-east-rutherford-tickets-6-30-2026/event/153023840/",
      seatgeek: "https://seatgeek.com/fifa-world-cup-tickets/international-soccer/2026-06-30-5-pm/17269676",
      gametime: "https://gametime.co/fifa/fifa-world-cup-match-78-round-of-32-tickets/6-30-2026-arlington-tx-at-t-stadium/events/66ac2766c01625535d3803ff",
    },
  },
  {
    matchNumber: 79, stage: "ラウンド32", stageEn: "Round of 32",
    date: "2026-06-30", localTime: "19:00", timezone: "CST",
    venue: "エスタディオ・アステカ", venueEn: "Estadio Azteca",
    city: "メキシコシティ", cityEn: "Mexico City",
    homeLabel: "A組1位", homeLabelEn: "A 1st",
    awayLabel: "3位(C/E/F/H/I)", awayLabelEn: "3rd (C/E/F/H/I)",
    links: {
      stubhub: "https://www.stubhub.com/world-cup-ciudad-de-mexico-tickets-6-30-2026/event/153033506/",
      seatgeek: "https://seatgeek.com/fifa-world-cup-tickets/international-soccer/2026-06-30-8-pm/17650334",
      gametime: "https://gametime.co/2026-fifa-world-cup-tickets/performers/soccerworldcup",
    },
  },
  {
    matchNumber: 80, stage: "ラウンド32", stageEn: "Round of 32",
    date: "2026-07-01", localTime: "12:00", timezone: "EDT",
    venue: "メルセデス・ベンツ・スタジアム", venueEn: "Mercedes-Benz Stadium",
    city: "アトランタ", cityEn: "Atlanta",
    homeLabel: "L組1位", homeLabelEn: "L 1st",
    awayLabel: "3位(E/H/I/J/K)", awayLabelEn: "3rd (E/H/I/J/K)",
    links: {
      stubhub: "https://www.stubhub.com/world-cup-atlanta-tickets-7-1-2026/event/153023846/",
      seatgeek: "https://seatgeek.com/fifa-world-cup-tickets/international-soccer/2026-07-01-12-pm/17174345",
      gametime: "https://gametime.co/soccer/fifa-world-cup-match-80-tickets/7-1-2026-atlanta-ga-mercedes-benz-stadium/events/66ac29ddb082f2f98b480883",
    },
  },
  {
    matchNumber: 81, stage: "ラウンド32", stageEn: "Round of 32",
    date: "2026-07-01", localTime: "14:00", timezone: "PDT",
    venue: "リーバイス・スタジアム", venueEn: "Levi's Stadium",
    city: "サンフランシスコ", cityEn: "San Francisco",
    homeLabel: "D組1位", homeLabelEn: "D 1st",
    awayLabel: "3位(B/E/F/I/J)", awayLabelEn: "3rd (B/E/F/I/J)",
    links: {
      stubhub: "https://www.stubhub.com/world-cup-santa-clara-tickets-7-1-2026/event/153020696/",
      seatgeek: "https://seatgeek.com/fifa-world-cup-tickets/international-soccer/2026-07-01-5-pm/17171561",
      gametime: "https://gametime.co/fifa/fifa-world-cup-match-81-round-of-32-tickets/7-1-2026-santa-clara-ca-levis-stadium/events/66a1789a8c1e27b4cd2eb166",
    },
  },
  {
    matchNumber: 82, stage: "ラウンド32", stageEn: "Round of 32",
    date: "2026-07-01", localTime: "13:00", timezone: "PDT",
    venue: "ルーメン・フィールド", venueEn: "Lumen Field",
    city: "シアトル", cityEn: "Seattle",
    homeLabel: "G組1位", homeLabelEn: "G 1st",
    awayLabel: "3位(A/E/H/I/J)", awayLabelEn: "3rd (A/E/H/I/J)",
    links: {
      stubhub: "https://www.stubhub.com/world-cup-seattle-tickets-7-1-2026/event/153020573/",
      seatgeek: "https://seatgeek.com/fifa-world-cup-tickets/international-soccer/2026-07-01-1-pm/17248699",
      gametime: "https://gametime.co/fifa/fifa-world-cup-match-82-round-of-32-tickets/7-1-2026-seattle-wa-lumen-field/events/66ac2cc859eb64be1a22d640",
    },
  },
  {
    matchNumber: 83, stage: "ラウンド32", stageEn: "Round of 32",
    date: "2026-07-02", localTime: "12:00", timezone: "PDT",
    venue: "ソフィ・スタジアム", venueEn: "SoFi Stadium",
    city: "ロサンゼルス", cityEn: "Los Angeles",
    homeLabel: "H組1位", homeLabelEn: "H 1st",
    awayLabel: "J組2位", awayLabelEn: "J 2nd",
    links: {
      stubhub: "https://www.stubhub.com/world-cup-inglewood-tickets-7-2-2026/event/153020726/",
      seatgeek: "https://seatgeek.com/fifa-world-cup-tickets/international-soccer/2026-07-02-12-pm/17176209",
      gametime: "https://gametime.co/fifa/fifa-world-cup-match-84-round-of-32-tickets/7-2-2026-inglewood-ca-so-fi-stadium/events/66b11f384630e3640c62b1b3",
    },
  },
  {
    matchNumber: 84, stage: "ラウンド32", stageEn: "Round of 32",
    date: "2026-07-02", localTime: "19:00", timezone: "EDT",
    venue: "BMOフィールド", venueEn: "BMO Field",
    city: "トロント", cityEn: "Toronto",
    homeLabel: "K組2位", homeLabelEn: "K 2nd",
    awayLabel: "L組2位", awayLabelEn: "L 2nd",
    links: {
      stubhub: "https://www.stubhub.com/world-cup-toronto-tickets-7-2-2026/event/153023856/",
      seatgeek: "https://seatgeek.com/fifa-world-cup-tickets/international-soccer/2026-07-02-7-pm/17234772",
      gametime: "https://gametime.co/fifa/fifa-world-cup-match-83-round-of-32-tickets/7-2-2026-toronto-on-bmo-field/events/66ac22fbb745930d8d82e7b2",
    },
  },
  {
    matchNumber: 85, stage: "ラウンド32", stageEn: "Round of 32",
    date: "2026-07-02", localTime: "20:00", timezone: "PDT",
    venue: "BCプレイス", venueEn: "BC Place",
    city: "バンクーバー", cityEn: "Vancouver",
    homeLabel: "B組1位", homeLabelEn: "B 1st",
    awayLabel: "3位(E/F/G/I/J)", awayLabelEn: "3rd (E/F/G/I/J)",
    links: {
      stubhub: "https://www.stubhub.com/world-cup-vancouver-tickets-7-2-2026/event/153020498/",
      seatgeek: "https://seatgeek.com/fifa-world-cup-tickets/international-soccer/2026-07-02-8-pm/17249644",
      gametime: "https://gametime.co/fifa/fifa-world-cup-match-85-round-of-32-tickets/7-2-2026-vancouver-bc-bc-place-stadium/events/66aa9395bdf0fdb6eab47bf5",
    },
  },
  {
    matchNumber: 86, stage: "ラウンド32", stageEn: "Round of 32",
    date: "2026-07-03", localTime: "13:00", timezone: "CDT",
    venue: "AT&Tスタジアム", venueEn: "AT&T Stadium",
    city: "ダラス", cityEn: "Dallas",
    homeLabel: "D組2位", homeLabelEn: "D 2nd",
    awayLabel: "G組2位", awayLabelEn: "G 2nd",
    links: {
      stubhub: "https://www.stubhub.com/world-cup-arlington-tickets-7-3-2026/event/153021509/",
      seatgeek: "https://seatgeek.com/fifa-world-cup-tickets/international-soccer/2026-07-03-1-pm/17385148",
      gametime: "https://gametime.co/soccer/fifa-world-cup-match-88-tickets/7-3-2026-arlington-tx-at-t-stadium/events/66b1208626b2aeaba0dbc094",
    },
  },
  {
    matchNumber: 87, stage: "ラウンド32", stageEn: "Round of 32",
    date: "2026-07-03", localTime: "18:00", timezone: "EDT",
    venue: "ハード・ロック・スタジアム", venueEn: "Hard Rock Stadium",
    city: "マイアミ", cityEn: "Miami",
    homeLabel: "J組1位", homeLabelEn: "J 1st",
    awayLabel: "H組2位", awayLabelEn: "H 2nd",
    links: {
      stubhub: "https://www.stubhub.com/world-cup-miami-tickets-7-3-2026/event/153023861/",
      seatgeek: "https://seatgeek.com/fifa-world-cup-tickets/international-soccer/2026-07-03-6-pm/17164018",
      gametime: "https://gametime.co/soccer/fifa-world-cup-match-87-tickets/7-3-2026-kansas-city-mo-arrowhead-stadium/events/66ac2a7f241602551887699f",
    },
  },
  {
    matchNumber: 88, stage: "ラウンド32", stageEn: "Round of 32",
    date: "2026-07-03", localTime: "20:30", timezone: "CDT",
    venue: "アロウヘッド・スタジアム", venueEn: "Arrowhead Stadium",
    city: "カンザスシティ", cityEn: "Kansas City",
    homeLabel: "K組1位", homeLabelEn: "K 1st",
    awayLabel: "3位(D/E/I/J/L)", awayLabelEn: "3rd (D/E/I/J/L)",
    links: {
      stubhub: "https://www.stubhub.com/world-cup-arlington-tickets-7-3-2026/event/153021509/",
      seatgeek: "https://seatgeek.com/fifa-world-cup-tickets/international-soccer/2026-07-03-8-30-pm/17196237",
      gametime: "https://gametime.co/soccer/fifa-world-cup-match-88-tickets/7-3-2026-arlington-tx-at-t-stadium/events/66b1208626b2aeaba0dbc094",
    },
  },

  // ── ROUND OF 16 ──────────────────────────────────────────
  {
    matchNumber: 89, stage: "ラウンド16", stageEn: "Round of 16",
    date: "2026-07-04", localTime: "17:00", timezone: "EDT",
    venue: "リンカーン・ファイナンシャル・フィールド", venueEn: "Lincoln Financial Field",
    city: "フィラデルフィア", cityEn: "Philadelphia",
    homeLabel: "M74勝者", homeLabelEn: "W74",
    awayLabel: "M77勝者", awayLabelEn: "W77",
    links: {
      stubhub: "https://www.stubhub.com/world-cup-philadelphia-tickets-7-4-2026/event/153023863/",
      seatgeek: "https://seatgeek.com/fifa-world-cup-tickets/international-soccer/2026-07-04-5-pm/17213264",
      gametime: "https://gametime.co/soccer/fifa-world-cup-match-89-tickets/7-4-2026-philadelphia-pa-lincoln-financial-field/events/66b1237333f4650e2afaf109",
    },
  },
  {
    matchNumber: 90, stage: "ラウンド16", stageEn: "Round of 16",
    date: "2026-07-04", localTime: "12:00", timezone: "CDT",
    venue: "NRGスタジアム", venueEn: "NRG Stadium",
    city: "ヒューストン", cityEn: "Houston",
    homeLabel: "M73勝者", homeLabelEn: "W73",
    awayLabel: "M76勝者", awayLabelEn: "W76",
    links: {
      stubhub: "https://www.stubhub.com/world-cup-houston-tickets-7-4-2026/event/153021196",
      seatgeek: "https://seatgeek.com/fifa-world-cup-tickets/international-soccer/2026-07-04-12-pm/17307566",
      gametime: "https://gametime.co/2026-fifa-world-cup-tickets/performers/soccerworldcup",
    },
  },
  {
    matchNumber: 91, stage: "ラウンド16", stageEn: "Round of 16",
    date: "2026-07-05", localTime: "16:00", timezone: "EDT",
    venue: "メットライフ・スタジアム", venueEn: "MetLife Stadium",
    city: "ニューヨーク/NJ", cityEn: "New York/NJ",
    homeLabel: "M76勝者", homeLabelEn: "W76",
    awayLabel: "M78勝者", awayLabelEn: "W78",
    links: {
      stubhub: "https://www.stubhub.com/world-cup-east-rutherford-tickets-7-5-2026/event/153023886/",
      seatgeek: "https://seatgeek.com/fifa-world-cup-tickets/international-soccer/2026-07-05-4-pm/17269677",
      gametime: "https://gametime.co/fifa/fifa-world-cup-match-91-round-of-16-tickets/7-5-2026-east-rutherford-nj-met-life-stadium/events/66b11cdd55323e5c578fb508",
    },
  },
  {
    matchNumber: 92, stage: "ラウンド16", stageEn: "Round of 16",
    date: "2026-07-05", localTime: "18:00", timezone: "CST",
    venue: "エスタディオ・アステカ", venueEn: "Estadio Azteca",
    city: "メキシコシティ", cityEn: "Mexico City",
    homeLabel: "M79勝者", homeLabelEn: "W79",
    awayLabel: "M80勝者", awayLabelEn: "W80",
    links: {
      stubhub: "https://www.stubhub.com/world-cup-ciudad-de-mexico-tickets-7-5-2026/event/153033507/",
      seatgeek: "https://seatgeek.com/fifa-world-cup-tickets/international-soccer/2026-07-05-6-pm/17650335",
      gametime: "https://gametime.co/fifa/2026-fifa-world-cup-match-92-round-of-16-tickets/7-5-2026-rsula-coapa-estadio-azteca/events/66b12dd19db632268058a658",
    },
  },
  {
    matchNumber: 93, stage: "ラウンド16", stageEn: "Round of 16",
    date: "2026-07-06", localTime: "14:00", timezone: "CDT",
    venue: "AT&Tスタジアム", venueEn: "AT&T Stadium",
    city: "ダラス", cityEn: "Dallas",
    homeLabel: "M83勝者", homeLabelEn: "W83",
    awayLabel: "M84勝者", awayLabelEn: "W84",
    links: {
      stubhub: "https://www.stubhub.com/world-cup-arlington-tickets-7-6-2026/event/153021528/",
      seatgeek: "https://seatgeek.com/fifa-world-cup-tickets/international-soccer/2026-07-06-2-pm/17385149",
      gametime: "https://gametime.co/fifa/fifa-world-cup-match-93-round-of-16-tickets/7-6-2026-arlington-tx-at-t-stadium/events/66aa95dd3f423b24d0acebd5",
    },
  },
  {
    matchNumber: 94, stage: "ラウンド16", stageEn: "Round of 16",
    date: "2026-07-06", localTime: "14:00", timezone: "PDT",
    venue: "ルーメン・フィールド", venueEn: "Lumen Field",
    city: "シアトル", cityEn: "Seattle",
    homeLabel: "M81勝者", homeLabelEn: "W81",
    awayLabel: "M82勝者", awayLabelEn: "W82",
    links: {
      stubhub: "https://www.stubhub.com/world-cup-seattle-tickets-7-6-2026/event/153020574/",
      seatgeek: "https://seatgeek.com/fifa-world-cup-tickets/international-soccer/2026-07-06-5-pm/17248700",
      gametime: "https://gametime.co/fifa/fifa-world-cup-match-94-round-of-16-tickets/7-6-2026-seattle-wa-lumen-field/events/66a7e76989fae77676133f65",
    },
  },
  {
    matchNumber: 95, stage: "ラウンド16", stageEn: "Round of 16",
    date: "2026-07-07", localTime: "12:00", timezone: "EDT",
    venue: "メルセデス・ベンツ・スタジアム", venueEn: "Mercedes-Benz Stadium",
    city: "アトランタ", cityEn: "Atlanta",
    homeLabel: "M87勝者", homeLabelEn: "W87",
    awayLabel: "M86勝者", awayLabelEn: "W86",
    links: {
      stubhub: "https://www.stubhub.com/world-cup-atlanta-tickets-7-7-2026/event/155049347/",
      seatgeek: "https://seatgeek.com/fifa-world-cup-tickets/international-soccer/2026-07-07-12-pm/17174346",
      gametime: "https://gametime.co/soccer/fifa-world-cup-match-95-tickets/7-7-2026-atlanta-ga-mercedes-benz-stadium/events/66b13280ff1924044bb1d3bb",
    },
  },
  {
    matchNumber: 96, stage: "ラウンド16", stageEn: "Round of 16",
    date: "2026-07-07", localTime: "13:00", timezone: "PDT",
    venue: "BCプレイス", venueEn: "BC Place",
    city: "バンクーバー", cityEn: "Vancouver",
    homeLabel: "M85勝者", homeLabelEn: "W85",
    awayLabel: "M88勝者", awayLabelEn: "W88",
    links: {
      stubhub: "https://www.stubhub.com/world-cup-vancouver-tickets-7-7-2026/event/153020500/",
      seatgeek: "https://seatgeek.com/fifa-world-cup-tickets/international-soccer/2026-07-07-1-pm/17249644",
      gametime: "https://gametime.co/fifa/fifa-world-cup-match-96-round-of-16-tickets/7-7-2026-vancouver-bc-bc-place-stadium/events/66b12ec959eb64be1a22debe",
    },
  },

  // ── QUARTERFINALS ────────────────────────────────────────
  {
    matchNumber: 97, stage: "準々決勝", stageEn: "Quarterfinals",
    date: "2026-07-09", localTime: "16:00", timezone: "EDT",
    venue: "ジレット・スタジアム", venueEn: "Gillette Stadium",
    city: "ボストン", cityEn: "Boston",
    homeLabel: "M89勝者", homeLabelEn: "W89",
    awayLabel: "M90勝者", awayLabelEn: "W90",
    links: {
      stubhub: "https://www.stubhub.com/world-cup-foxborough-tickets-7-9-2026/event/153023895/",
      seatgeek: "https://seatgeek.com/fifa-world-cup-tickets/international-soccer/2026-07-09-4-pm/17307570",
      gametime: "https://gametime.co/fifa/fifa-world-cup-match-97-quarter-final-tickets/7-9-2026-foxborough-ma-gillette-stadium/events/66aa924860e10bbb3d60ee57",
    },
  },
  {
    matchNumber: 98, stage: "準々決勝", stageEn: "Quarterfinals",
    date: "2026-07-10", localTime: "12:00", timezone: "PDT",
    venue: "ソフィ・スタジアム", venueEn: "SoFi Stadium",
    city: "ロサンゼルス", cityEn: "Los Angeles",
    homeLabel: "M93勝者", homeLabelEn: "W93",
    awayLabel: "M94勝者", awayLabelEn: "W94",
    links: {
      stubhub: "https://www.stubhub.com/world-cup-inglewood-tickets-7-10-2026/event/153020733/",
      seatgeek: "https://seatgeek.com/world-cup-1-tickets/world-cup/2026-07-10-3-30-am/17176210",
      gametime: "https://gametime.co/soccer/fifa-world-cup-match-98-quarter-final-tickets/7-10-2026-inglewood-ca-so-fi-stadium/events/66a1789c56d58dfc9c0ea605",
    },
  },
  {
    matchNumber: 99, stage: "準々決勝", stageEn: "Quarterfinals",
    date: "2026-07-11", localTime: "17:00", timezone: "EDT",
    venue: "ハード・ロック・スタジアム", venueEn: "Hard Rock Stadium",
    city: "マイアミ", cityEn: "Miami",
    homeLabel: "M91勝者", homeLabelEn: "W91",
    awayLabel: "M92勝者", awayLabelEn: "W92",
    links: {
      stubhub: "https://www.stubhub.com/world-cup-miami-tickets-7-11-2026/event/153023896/",
      seatgeek: "https://seatgeek.com/fifa-world-cup-tickets/international-soccer/2026-07-11-5-pm/17164019",
      gametime: "https://gametime.co/2026-fifa-world-cup-tickets/performers/soccerworldcup",
    },
  },
  {
    matchNumber: 100, stage: "準々決勝", stageEn: "Quarterfinals",
    date: "2026-07-11", localTime: "20:00", timezone: "CDT",
    venue: "アロウヘッド・スタジアム", venueEn: "Arrowhead Stadium",
    city: "カンザスシティ", cityEn: "Kansas City",
    homeLabel: "M95勝者", homeLabelEn: "W95",
    awayLabel: "M96勝者", awayLabelEn: "W96",
    links: {
      stubhub: "https://www.stubhub.com/world-cup-kansas-city-tickets-7-11-2026/event/153021616/",
      seatgeek: "https://seatgeek.com/fifa-world-cup-tickets/international-soccer/2026-07-11-8-pm/17196238",
      gametime: "https://gametime.co/2026-fifa-world-cup-tickets/performers/soccerworldcup",
    },
  },

  // ── SEMIFINALS ───────────────────────────────────────────
  {
    matchNumber: 101, stage: "準決勝", stageEn: "Semifinals",
    date: "2026-07-14", localTime: "14:00", timezone: "CDT",
    venue: "AT&Tスタジアム", venueEn: "AT&T Stadium",
    city: "ダラス", cityEn: "Dallas",
    homeLabel: "M97勝者", homeLabelEn: "W97",
    awayLabel: "M98勝者", awayLabelEn: "W98",
    links: {
      stubhub: "https://www.stubhub.com/world-cup-arlington-tickets-7-14-2026/event/153021542/",
      seatgeek: "https://seatgeek.com/fifa-world-cup-tickets/international-soccer/2026-07-14-2-pm/17385150",
      gametime: "https://gametime.co/2026-fifa-world-cup-tickets/performers/soccerworldcup",
    },
  },
  {
    matchNumber: 102, stage: "準決勝", stageEn: "Semifinals",
    date: "2026-07-15", localTime: "15:00", timezone: "EDT",
    venue: "メルセデス・ベンツ・スタジアム", venueEn: "Mercedes-Benz Stadium",
    city: "アトランタ", cityEn: "Atlanta",
    homeLabel: "M99勝者", homeLabelEn: "W99",
    awayLabel: "M100勝者", awayLabelEn: "W100",
    links: {
      stubhub: "https://www.stubhub.com/world-cup-atlanta-tickets-7-15-2026/event/153023901/",
      seatgeek: "https://seatgeek.com/fifa-world-cup-tickets/international-soccer/2026-07-15-3-pm/17174347",
      gametime: "https://gametime.co/soccer/fifa-world-cup-match-102-semi-final-tickets/7-15-2026-atlanta-ga-mercedes-benz-stadium/events/66a7e8a5218fbd1123388be7",
    },
  },

  // ── THIRD PLACE ──────────────────────────────────────────
  {
    matchNumber: 103, stage: "3位決定戦", stageEn: "Third Place",
    date: "2026-07-18", localTime: "17:00", timezone: "EDT",
    venue: "ハード・ロック・スタジアム", venueEn: "Hard Rock Stadium",
    city: "マイアミ", cityEn: "Miami",
    homeLabel: "M101敗者", homeLabelEn: "L101",
    awayLabel: "M102敗者", awayLabelEn: "L102",
    links: {
      stubhub: "https://www.stubhub.com/world-cup-miami-tickets-7-18-2026/event/153023903/",
      seatgeek: "https://seatgeek.com/fifa-world-cup-tickets/international-soccer/2026-07-18-5-pm/17164020",
      gametime: "https://gametime.co/2026-fifa-world-cup-tickets/performers/soccerworldcup",
    },
  },

  // ── FINAL ────────────────────────────────────────────────
  {
    matchNumber: 104, stage: "決勝", stageEn: "Final",
    date: "2026-07-19", localTime: "15:00", timezone: "EDT",
    venue: "メットライフ・スタジアム", venueEn: "MetLife Stadium",
    city: "ニューヨーク/NJ", cityEn: "New York/NJ",
    homeLabel: "M101勝者", homeLabelEn: "W101",
    awayLabel: "M102勝者", awayLabelEn: "W102",
    links: {
      stubhub: "https://www.stubhub.com/world-cup-east-rutherford-tickets-7-19-2026/event/153020449/",
      seatgeek: "https://seatgeek.com/fifa-world-cup-tickets/international-soccer/2026-07-19-3-pm/17307574",
      gametime: "https://gametime.co/fifa/fifa-world-cup-match-104-final-tickets/7-19-2026-east-rutherford-nj-met-life-stadium/events/66ac2fe6b082f2f98b480923",
    },
  },
];

// Stage round links (category pages)
export const stageLinks = {
  "ラウンド32": {
    stubhub: "https://www.stubhub.com/soccer-world-cup-round-of-32-tickets/grouping/150446029",
    seatgeek: "https://seatgeek.com/fifa-world-cup-round-of-32-tickets",
    gametime: "https://gametime.co/2026-fifa-world-cup-tickets/performers/soccerworldcup",
  },
  "ラウンド16": {
    stubhub: "https://www.stubhub.com/world-cup-round-of-16-tickets/category/138308813",
    seatgeek: "https://seatgeek.com/fifa-world-cup-round-of-16-tickets",
    gametime: "https://gametime.co/2026-fifa-world-cup-tickets/performers/soccerworldcup",
  },
  "準々決勝": {
    stubhub: "https://www.stubhub.com/soccer-world-cup-quarter-finals-tickets/category/138309386",
    seatgeek: "https://seatgeek.com/fifa-world-cup-quarterfinals-tickets",
    gametime: "https://gametime.co/2026-fifa-world-cup-tickets/performers/soccerworldcup",
  },
  "準決勝": {
    stubhub: "https://www.stubhub.com/soccer-world-cup-semi-finals-tickets/category/138308814",
    seatgeek: "https://seatgeek.com/fifa-world-cup-semifinals-tickets",
    gametime: "https://gametime.co/2026-fifa-world-cup-tickets/performers/soccerworldcup",
  },
  "3位決定戦": {
    stubhub: "https://www.stubhub.com/soccer-world-cup-final-tickets/grouping/1520075",
    seatgeek: "https://seatgeek.com/fifa-world-cup-third-place-tickets",
    gametime: "https://gametime.co/2026-fifa-world-cup-tickets/performers/soccerworldcup",
  },
  "決勝": {
    stubhub: "https://www.stubhub.com/soccer-world-cup-final-tickets/grouping/1520075",
    seatgeek: "https://seatgeek.com/fifa-world-cup-final-tickets",
    gametime: "https://gametime.co/2026-fifa-world-cup-tickets/performers/soccerworldcup",
  },
};
