export type UniformItem = {
  id: number;
  type: "home" | "away";
  name: string;
  affiliateUrl: string;
  imgSrc: string;
  imgHref: string;
};

export type NationalTeam = {
  id: string;
  name: string;
  flag: string;
  themeColor: string;
  brand: "adidas";
  uniforms: UniformItem[];
};

export const NATIONAL_TEAMS: NationalTeam[] = [
  {
    id: "japan",
    name: "日本代表",
    flag: "🇯🇵",
    themeColor: "#002868",
    brand: "adidas",
    uniforms: [
      {
        id: 1,
        type: "home",
        name: "ホーム 長袖",
        affiliateUrl: "https://hb.afl.rakuten.co.jp/ichiba/521aa121.b7b3d243.521aa122.9bcc9825/?pc=https%3A%2F%2Fitem.rakuten.co.jp%2Fadidas%2Fjz9680%2F&link_type=picttext&ut=eyJwYWdlIjoiaXRlbSIsInR5cGUiOiJwaWN0dGV4dCIsInNpemUiOiI0MDB4NDAwIiwibmFtIjoxLCJuYW1wIjoicmlnaHQiLCJjb20iOjEsImNvbXAiOiJkb3duIiwicHJpY2UiOjAsImJvciI6MSwiY29sIjoxLCJiYnRuIjoxLCJwcm9kIjowLCJhbXAiOmZhbHNlfQ%3D%3D",
        imgSrc: "https://hbb.afl.rakuten.co.jp/hgb/521aa121.b7b3d243.521aa122.9bcc9825/?me_id=1268947&item_id=10234422&pc=https%3A%2F%2Fthumbnail.image.rakuten.co.jp%2F%400_mall%2Fadidas%2Fcabinet%2Fp96%2Fjz9680_l.jpg%3F_ex%3D400x400&s=400x400&t=picttext",
        imgHref: "https://hb.afl.rakuten.co.jp/ichiba/521aa121.b7b3d243.521aa122.9bcc9825/?pc=https%3A%2F%2Fitem.rakuten.co.jp%2Fadidas%2Fjz9680%2F&link_type=picttext&ut=eyJwYWdlIjoiaXRlbSIsInR5cGUiOiJwaWN0dGV4dCIsInNpemUiOiI0MDB4NDAwIiwibmFtIjoxLCJuYW1wIjoicmlnaHQiLCJjb20iOjEsImNvbXAiOiJkb3duIiwicHJpY2UiOjAsImJvciI6MSwiY29sIjoxLCJiYnRuIjoxLCJwcm9kIjowLCJhbXAiOmZhbHNlfQ%3D%3D",
      },
      {
        id: 2,
        type: "home",
        name: "ホーム 半袖",
        affiliateUrl: "https://hb.afl.rakuten.co.jp/ichiba/521aa121.b7b3d243.521aa122.9bcc9825/?pc=https%3A%2F%2Fitem.rakuten.co.jp%2Fadidas%2Fkd3345-mn1%2F&link_type=pict&ut=eyJwYWdlIjoiaXRlbSIsInR5cGUiOiJwaWN0Iiwic2l6ZSI6IjQwMHg0MDAiLCJuYW0iOjEsIm5hbXAiOiJyaWdodCIsImNvbSI6MSwiY29tcCI6ImRvd24iLCJwcmljZSI6MCwiYm9yIjoxLCJjb2wiOjEsImJidG4iOjEsInByb2QiOjAsImFtcCI6ZmFsc2V9",
        imgSrc: "https://hbb.afl.rakuten.co.jp/hgb/521aa121.b7b3d243.521aa122.9bcc9825/?me_id=1268947&item_id=10234426&pc=https%3A%2F%2Fthumbnail.image.rakuten.co.jp%2F%400_mall%2Fadidas%2Fcabinet%2Fp96%2Fkd3345_l.jpg%3F_ex%3D400x400&s=400x400&t=pict",
        imgHref: "https://hb.afl.rakuten.co.jp/ichiba/521aa121.b7b3d243.521aa122.9bcc9825/?pc=https%3A%2F%2Fitem.rakuten.co.jp%2Fadidas%2Fkd3345-mn1%2F&link_type=pict&ut=eyJwYWdlIjoiaXRlbSIsInR5cGUiOiJwaWN0Iiwic2l6ZSI6IjQwMHg0MDAiLCJuYW0iOjEsIm5hbXAiOiJyaWdodCIsImNvbSI6MSwiY29tcCI6ImRvd24iLCJwcmljZSI6MCwiYm9yIjoxLCJjb2wiOjEsImJidG4iOjEsInByb2QiOjAsImFtcCI6ZmFsc2V9",
      },
      {
        id: 3,
        type: "away",
        name: "アウェイ 長袖",
        affiliateUrl: "https://hb.afl.rakuten.co.jp/ichiba/521aa121.b7b3d243.521aa122.9bcc9825/?pc=https%3A%2F%2Fitem.rakuten.co.jp%2Fadidas%2Fjz9697%2F&link_type=pict&ut=eyJwYWdlIjoiaXRlbSIsInR5cGUiOiJwaWN0Iiwic2l6ZSI6IjQwMHg0MDAiLCJuYW0iOjEsIm5hbXAiOiJyaWdodCIsImNvbSI6MSwiY29tcCI6ImRvd24iLCJwcmljZSI6MSwiYm9yIjoxLCJjb2wiOjEsImJidG4iOjEsInByb2QiOjAsImFtcCI6ZmFsc2V9",
        imgSrc: "https://hbb.afl.rakuten.co.jp/hgb/521aa121.b7b3d243.521aa122.9bcc9825/?me_id=1268947&item_id=10237312&pc=https%3A%2F%2Fthumbnail.image.rakuten.co.jp%2F%400_mall%2Fadidas%2Fcabinet%2Fp107%2Fjz9697_l.jpg%3F_ex%3D400x400&s=400x400&t=pict",
        imgHref: "https://hb.afl.rakuten.co.jp/ichiba/521aa121.b7b3d243.521aa122.9bcc9825/?pc=https%3A%2F%2Fitem.rakuten.co.jp%2Fadidas%2Fjz9697%2F&link_type=pict&ut=eyJwYWdlIjoiaXRlbSIsInR5cGUiOiJwaWN0Iiwic2l6ZSI6IjQwMHg0MDAiLCJuYW0iOjEsIm5hbXAiOiJyaWdodCIsImNvbSI6MSwiY29tcCI6ImRvd24iLCJwcmljZSI6MSwiYm9yIjoxLCJjb2wiOjEsImJidG4iOjEsInByb2QiOjAsImFtcCI6ZmFsc2V9",
      },
      {
        id: 4,
        type: "away",
        name: "アウェイ 半袖",
        affiliateUrl: "https://hb.afl.rakuten.co.jp/ichiba/521aa121.b7b3d243.521aa122.9bcc9825/?pc=https%3A%2F%2Fitem.rakuten.co.jp%2Fadidas%2Fjn1872%2F&link_type=picttext&ut=eyJwYWdlIjoiaXRlbSIsInR5cGUiOiJwaWN0dGV4dCIsInNpemUiOiI0MDB4NDAwIiwibmFtIjoxLCJuYW1wIjoicmlnaHQiLCJjb20iOjEsImNvbXAiOiJkb3duIiwicHJpY2UiOjAsImJvciI6MSwiY29sIjoxLCJiYnRuIjoxLCJwcm9kIjowLCJhbXAiOmZhbHNlfQ%3D%3D",
        imgSrc: "https://hbb.afl.rakuten.co.jp/hgb/521aa121.b7b3d243.521aa122.9bcc9825/?me_id=1268947&item_id=10237314&pc=https%3A%2F%2Fthumbnail.image.rakuten.co.jp%2F%400_mall%2Fadidas%2Fcabinet%2Fp107%2Fjn1872_l.jpg%3F_ex%3D400x400&s=400x400&t=picttext",
        imgHref: "https://hb.afl.rakuten.co.jp/ichiba/521aa121.b7b3d243.521aa122.9bcc9825/?pc=https%3A%2F%2Fitem.rakuten.co.jp%2Fadidas%2Fjn1872%2F&link_type=picttext&ut=eyJwYWdlIjoiaXRlbSIsInR5cGUiOiJwaWN0dGV4dCIsInNpemUiOiI0MDB4NDAwIiwibmFtIjoxLCJuYW1wIjoicmlnaHQiLCJjb20iOjEsImNvbXAiOiJkb3duIiwicHJpY2UiOjAsImJvciI6MSwiY29sIjoxLCJiYnRuIjoxLCJwcm9kIjowLCJhbXAiOmZhbHNlfQ%3D%3D",
      },
    ],
  },
  {
    id: "argentina",
    name: "アルゼンチン代表",
    flag: "🇦🇷",
    themeColor: "#74ACDF",
    brand: "adidas",
    uniforms: [
      {
        id: 10,
        type: "home",
        name: "ホーム 半袖",
        affiliateUrl: "https://hb.afl.rakuten.co.jp/ichiba/521aa121.b7b3d243.521aa122.9bcc9825/?pc=https%3A%2F%2Fitem.rakuten.co.jp%2Fadidas%2Fjm8396%2F&link_type=pict&ut=eyJwYWdlIjoiaXRlbSIsInR5cGUiOiJwaWN0Iiwic2l6ZSI6IjQwMHg0MDAiLCJuYW0iOjEsIm5hbXAiOiJyaWdodCIsImNvbSI6MSwiY29tcCI6ImRvd24iLCJwcmljZSI6MCwiYm9yIjoxLCJjb2wiOjEsImJidG4iOjEsInByb2QiOjAsImFtcCI6ZmFsc2V9",
        imgSrc: "https://hbb.afl.rakuten.co.jp/hgb/521aa121.b7b3d243.521aa122.9bcc9825/?me_id=1268947&item_id=10234450&pc=https%3A%2F%2Fthumbnail.image.rakuten.co.jp%2F%400_mall%2Fadidas%2Fcabinet%2Fp96%2Fjm8396_l.jpg%3F_ex%3D400x400&s=400x400&t=pict",
        imgHref: "https://hb.afl.rakuten.co.jp/ichiba/521aa121.b7b3d243.521aa122.9bcc9825/?pc=https%3A%2F%2Fitem.rakuten.co.jp%2Fadidas%2Fjm8396%2F&link_type=pict&ut=eyJwYWdlIjoiaXRlbSIsInR5cGUiOiJwaWN0Iiwic2l6ZSI6IjQwMHg0MDAiLCJuYW0iOjEsIm5hbXAiOiJyaWdodCIsImNvbSI6MSwiY29tcCI6ImRvd24iLCJwcmljZSI6MCwiYm9yIjoxLCJjb2wiOjEsImJidG4iOjEsInByb2QiOjAsImFtcCI6ZmFsc2V9",
      },
      {
        id: 11,
        type: "home",
        name: "ホーム 長袖",
        affiliateUrl: "https://hb.afl.rakuten.co.jp/ichiba/521aa121.b7b3d243.521aa122.9bcc9825/?pc=https%3A%2F%2Fitem.rakuten.co.jp%2Fadidas%2Fka8126%2F&link_type=pict&ut=eyJwYWdlIjoiaXRlbSIsInR5cGUiOiJwaWN0Iiwic2l6ZSI6IjQwMHg0MDAiLCJuYW0iOjEsIm5hbXAiOiJyaWdodCIsImNvbSI6MSwiY29tcCI6ImRvd24iLCJwcmljZSI6MCwiYm9yIjoxLCJjb2wiOjEsImJidG4iOjEsInByb2QiOjAsImFtcCI6ZmFsc2V9",
        imgSrc: "https://hbb.afl.rakuten.co.jp/hgb/521aa121.b7b3d243.521aa122.9bcc9825/?me_id=1268947&item_id=10234452&pc=https%3A%2F%2Fthumbnail.image.rakuten.co.jp%2F%400_mall%2Fadidas%2Fcabinet%2Fp96%2Fka8126_l.jpg%3F_ex%3D400x400&s=400x400&t=pict",
        imgHref: "https://hb.afl.rakuten.co.jp/ichiba/521aa121.b7b3d243.521aa122.9bcc9825/?pc=https%3A%2F%2Fitem.rakuten.co.jp%2Fadidas%2Fka8126%2F&link_type=pict&ut=eyJwYWdlIjoiaXRlbSIsInR5cGUiOiJwaWN0Iiwic2l6ZSI6IjQwMHg0MDAiLCJuYW0iOjEsIm5hbXAiOiJyaWdodCIsImNvbSI6MSwiY29tcCI6ImRvd24iLCJwcmljZSI6MCwiYm9yIjoxLCJjb2wiOjEsImJidG4iOjEsInByb2QiOjAsImFtcCI6ZmFsc2V9",
      },
      {
        id: 12,
        type: "away",
        name: "アウェイ",
        affiliateUrl: "",
        imgSrc: "",
        imgHref: "",
      },
    ],
  },
  {
    id: "germany",
    name: "ドイツ代表",
    flag: "🇩🇪",
    themeColor: "#000000",
    brand: "adidas",
    uniforms: [
      {
        id: 20,
        type: "home",
        name: "ホーム 半袖",
        affiliateUrl: "https://hb.afl.rakuten.co.jp/ichiba/521aa121.b7b3d243.521aa122.9bcc9825/?pc=https%3A%2F%2Fitem.rakuten.co.jp%2Fadidas%2Fkd8363%2F&link_type=pict&ut=eyJwYWdlIjoiaXRlbSIsInR5cGUiOiJwaWN0Iiwic2l6ZSI6IjQwMHg0MDAiLCJuYW0iOjEsIm5hbXAiOiJyaWdodCIsImNvbSI6MSwiY29tcCI6ImRvd24iLCJwcmljZSI6MCwiYm9yIjoxLCJjb2wiOjEsImJidG4iOjEsInByb2QiOjAsImFtcCI6ZmFsc2V9",
        imgSrc: "https://hbb.afl.rakuten.co.jp/hgb/521aa121.b7b3d243.521aa122.9bcc9825/?me_id=1268947&item_id=10234453&pc=https%3A%2F%2Fthumbnail.image.rakuten.co.jp%2F%400_mall%2Fadidas%2Fcabinet%2Fp96%2Fkd8363_l.jpg%3F_ex%3D400x400&s=400x400&t=pict",
        imgHref: "https://hb.afl.rakuten.co.jp/ichiba/521aa121.b7b3d243.521aa122.9bcc9825/?pc=https%3A%2F%2Fitem.rakuten.co.jp%2Fadidas%2Fkd8363%2F&link_type=pict&ut=eyJwYWdlIjoiaXRlbSIsInR5cGUiOiJwaWN0Iiwic2l6ZSI6IjQwMHg0MDAiLCJuYW0iOjEsIm5hbXAiOiJyaWdodCIsImNvbSI6MSwiY29tcCI6ImRvd24iLCJwcmljZSI6MCwiYm9yIjoxLCJiYnRuIjoxLCJwcm9kIjowLCJhbXAiOmZhbHNlfQ%3D%3D",
      },
      {
        id: 21,
        type: "home",
        name: "ホーム 長袖",
        affiliateUrl: "https://hb.afl.rakuten.co.jp/ichiba/521aa121.b7b3d243.521aa122.9bcc9825/?pc=https%3A%2F%2Fitem.rakuten.co.jp%2Fadidas%2Fjm1380%2F&link_type=pict&ut=eyJwYWdlIjoiaXRlbSIsInR5cGUiOiJwaWN0Iiwic2l6ZSI6IjQwMHg0MDAiLCJuYW0iOjEsIm5hbXAiOiJyaWdodCIsImNvbSI6MSwiY29tcCI6ImRvd24iLCJwcmljZSI6MCwiYm9yIjoxLCJjb2wiOjEsImJidG4iOjEsInByb2QiOjAsImFtcCI6ZmFsc2V9",
        imgSrc: "https://hbb.afl.rakuten.co.jp/hgb/521aa121.b7b3d243.521aa122.9bcc9825/?me_id=1268947&item_id=10234459&pc=https%3A%2F%2Fthumbnail.image.rakuten.co.jp%2F%400_mall%2Fadidas%2Fcabinet%2Fp96%2Fjm1380_l.jpg%3F_ex%3D400x400&s=400x400&t=pict",
        imgHref: "https://hb.afl.rakuten.co.jp/ichiba/521aa121.b7b3d243.521aa122.9bcc9825/?pc=https%3A%2F%2Fitem.rakuten.co.jp%2Fadidas%2Fjm1380%2F&link_type=pict&ut=eyJwYWdlIjoiaXRlbSIsInR5cGUiOiJwaWN0Iiwic2l6ZSI6IjQwMHg0MDAiLCJuYW0iOjEsIm5hbXAiOiJyaWdodCIsImNvbSI6MSwiY29tcCI6ImRvd24iLCJwcmljZSI6MCwiYm9yIjoxLCJjb2wiOjEsImJidG4iOjEsInByb2QiOjAsImFtcCI6ZmFsc2V9",
      },
      {
        id: 22,
        type: "away",
        name: "アウェイ",
        affiliateUrl: "",
        imgSrc: "",
        imgHref: "",
      },
    ],
  },
  {
    id: "italy",
    name: "イタリア代表",
    flag: "🇮🇹",
    themeColor: "#003399",
    brand: "adidas",
    uniforms: [
      {
        id: 30,
        type: "home",
        name: "ホーム 半袖",
        affiliateUrl: "https://hb.afl.rakuten.co.jp/ichiba/521aa121.b7b3d243.521aa122.9bcc9825/?pc=https%3A%2F%2Fitem.rakuten.co.jp%2Fadidas%2Fjl6937%2F&link_type=pict&ut=eyJwYWdlIjoiaXRlbSIsInR5cGUiOiJwaWN0Iiwic2l6ZSI6IjQwMHg0MDAiLCJuYW0iOjEsIm5hbXAiOiJyaWdodCIsImNvbSI6MSwiY29tcCI6ImRvd24iLCJwcmljZSI6MCwiYm9yIjoxLCJjb2wiOjEsImJidG4iOjEsInByb2QiOjAsImFtcCI6ZmFsc2V9",
        imgSrc: "https://hbb.afl.rakuten.co.jp/hgb/521aa121.b7b3d243.521aa122.9bcc9825/?me_id=1268947&item_id=10234433&pc=https%3A%2F%2Fthumbnail.image.rakuten.co.jp%2F%400_mall%2Fadidas%2Fcabinet%2Fp96%2Fjl6937_l.jpg%3F_ex%3D400x400&s=400x400&t=pict",
        imgHref: "https://hb.afl.rakuten.co.jp/ichiba/521aa121.b7b3d243.521aa122.9bcc9825/?pc=https%3A%2F%2Fitem.rakuten.co.jp%2Fadidas%2Fjl6937%2F&link_type=pict&ut=eyJwYWdlIjoiaXRlbSIsInR5cGUiOiJwaWN0Iiwic2l6ZSI6IjQwMHg0MDAiLCJuYW0iOjEsIm5hbXAiOiJyaWdodCIsImNvbSI6MSwiY29tcCI6ImRvd24iLCJwcmljZSI6MCwiYm9yIjoxLCJjb2wiOjEsImJidG4iOjEsInByb2QiOjAsImFtcCI6ZmFsc2V9",
      },
      {
        id: 31,
        type: "away",
        name: "アウェイ 半袖",
        affiliateUrl: "https://hb.afl.rakuten.co.jp/ichiba/521aa121.b7b3d243.521aa122.9bcc9825/?pc=https%3A%2F%2Fitem.rakuten.co.jp%2Fadidas%2Fjy5681%2F&link_type=pict&ut=eyJwYWdlIjoiaXRlbSIsInR5cGUiOiJwaWN0Iiwic2l6ZSI6IjQwMHg0MDAiLCJuYW0iOjEsIm5hbXAiOiJyaWdodCIsImNvbSI6MSwiY29tcCI6ImRvd24iLCJwcmljZSI6MCwiYm9yIjoxLCJjb2wiOjEsImJidG4iOjEsInByb2QiOjAsImFtcCI6ZmFsc2V9",
        imgSrc: "https://hbb.afl.rakuten.co.jp/hgb/521aa121.b7b3d243.521aa122.9bcc9825/?me_id=1268947&item_id=10237359&pc=https%3A%2F%2Fthumbnail.image.rakuten.co.jp%2F%400_mall%2Fadidas%2Fcabinet%2Fp107%2Fjy5681_l.jpg%3F_ex%3D400x400&s=400x400&t=pict",
        imgHref: "https://hb.afl.rakuten.co.jp/ichiba/521aa121.b7b3d243.521aa122.9bcc9825/?pc=https%3A%2F%2Fitem.rakuten.co.jp%2Fadidas%2Fjy5681%2F&link_type=pict&ut=eyJwYWdlIjoiaXRlbSIsInR5cGUiOiJwaWN0Iiwic2l6ZSI6IjQwMHg0MDAiLCJuYW0iOjEsIm5hbXAiOiJyaWdodCIsImNvbSI6MSwiY29tcCI6ImRvd24iLCJwcmljZSI6MCwiYm9yIjoxLCJjb2wiOjEsImJidG4iOjEsInByb2QiOjAsImFtcCI6ZmFsc2V9",
      },
    ],
  },
  {
    id: "spain",
    name: "スペイン代表",
    flag: "🇪🇸",
    themeColor: "#AA151B",
    brand: "adidas",
    uniforms: [
      { id: 40, type: "home", name: "ホーム", affiliateUrl: "", imgSrc: "", imgHref: "" },
      { id: 41, type: "away", name: "アウェイ", affiliateUrl: "", imgSrc: "", imgHref: "" },
    ],
  },
  {
    id: "mexico",
    name: "メキシコ代表",
    flag: "🇲🇽",
    themeColor: "#006847",
    brand: "adidas",
    uniforms: [
      { id: 50, type: "home", name: "ホーム", affiliateUrl: "", imgSrc: "", imgHref: "" },
      { id: 51, type: "away", name: "アウェイ", affiliateUrl: "", imgSrc: "", imgHref: "" },
    ],
  },
  {
    id: "belgium",
    name: "ベルギー代表",
    flag: "🇧🇪",
    themeColor: "#ED2939",
    brand: "adidas",
    uniforms: [
      { id: 60, type: "home", name: "ホーム", affiliateUrl: "", imgSrc: "", imgHref: "" },
      { id: 61, type: "away", name: "アウェイ", affiliateUrl: "", imgSrc: "", imgHref: "" },
    ],
  },
  {
    id: "colombia",
    name: "コロンビア代表",
    flag: "🇨🇴",
    themeColor: "#FCD116",
    brand: "adidas",
    uniforms: [
      { id: 70, type: "home", name: "ホーム", affiliateUrl: "", imgSrc: "", imgHref: "" },
      { id: 71, type: "away", name: "アウェイ", affiliateUrl: "", imgSrc: "", imgHref: "" },
    ],
  },
  {
    id: "wales",
    name: "ウェールズ代表",
    flag: "🏴󠁧󠁢󠁷󠁬󠁳󠁿",
    themeColor: "#C8102E",
    brand: "adidas",
    uniforms: [
      { id: 80, type: "home", name: "ホーム", affiliateUrl: "", imgSrc: "", imgHref: "" },
      { id: 81, type: "away", name: "アウェイ", affiliateUrl: "", imgSrc: "", imgHref: "" },
    ],
  },
  {
    id: "sweden",
    name: "スウェーデン代表",
    flag: "🇸🇪",
    themeColor: "#006AA7",
    brand: "adidas",
    uniforms: [
      { id: 90, type: "home", name: "ホーム", affiliateUrl: "", imgSrc: "", imgHref: "" },
      { id: 91, type: "away", name: "アウェイ", affiliateUrl: "", imgSrc: "", imgHref: "" },
    ],
  },
  {
    id: "hungary",
    name: "ハンガリー代表",
    flag: "🇭🇺",
    themeColor: "#CE2939",
    brand: "adidas",
    uniforms: [
      { id: 100, type: "home", name: "ホーム", affiliateUrl: "", imgSrc: "", imgHref: "" },
      { id: 101, type: "away", name: "アウェイ", affiliateUrl: "", imgSrc: "", imgHref: "" },
    ],
  },
  {
    id: "northern-ireland",
    name: "北アイルランド代表",
    flag: "🇬🇧",
    themeColor: "#007A33",
    brand: "adidas",
    uniforms: [
      { id: 110, type: "home", name: "ホーム", affiliateUrl: "", imgSrc: "", imgHref: "" },
      { id: 111, type: "away", name: "アウェイ", affiliateUrl: "", imgSrc: "", imgHref: "" },
    ],
  },
  {
    id: "scotland",
    name: "スコットランド代表",
    flag: "🏴󠁧󠁢󠁳󠁣󠁴󠁿",
    themeColor: "#003078",
    brand: "adidas",
    uniforms: [
      { id: 120, type: "home", name: "ホーム", affiliateUrl: "", imgSrc: "", imgHref: "" },
      { id: 121, type: "away", name: "アウェイ", affiliateUrl: "", imgSrc: "", imgHref: "" },
    ],
  },
  {
    id: "venezuela",
    name: "ベネズエラ代表",
    flag: "🇻🇪",
    themeColor: "#CF142B",
    brand: "adidas",
    uniforms: [
      { id: 130, type: "home", name: "ホーム", affiliateUrl: "", imgSrc: "", imgHref: "" },
      { id: 131, type: "away", name: "アウェイ", affiliateUrl: "", imgSrc: "", imgHref: "" },
    ],
  },
  {
    id: "peru",
    name: "ペルー代表",
    flag: "🇵🇪",
    themeColor: "#D91023",
    brand: "adidas",
    uniforms: [
      { id: 140, type: "home", name: "ホーム", affiliateUrl: "", imgSrc: "", imgHref: "" },
      { id: 141, type: "away", name: "アウェイ", affiliateUrl: "", imgSrc: "", imgHref: "" },
    ],
  },
  {
    id: "chile",
    name: "チリ代表",
    flag: "🇨🇱",
    themeColor: "#D52B1E",
    brand: "adidas",
    uniforms: [
      { id: 150, type: "home", name: "ホーム", affiliateUrl: "", imgSrc: "", imgHref: "" },
      { id: 151, type: "away", name: "アウェイ", affiliateUrl: "", imgSrc: "", imgHref: "" },
    ],
  },
  {
    id: "paraguay",
    name: "パラグアイ代表",
    flag: "🇵🇾",
    themeColor: "#D52B1E",
    brand: "adidas",
    uniforms: [
      { id: 160, type: "home", name: "ホーム", affiliateUrl: "", imgSrc: "", imgHref: "" },
      { id: 161, type: "away", name: "アウェイ", affiliateUrl: "", imgSrc: "", imgHref: "" },
    ],
  },
  {
    id: "jamaica",
    name: "ジャマイカ代表",
    flag: "🇯🇲",
    themeColor: "#009B3A",
    brand: "adidas",
    uniforms: [
      { id: 170, type: "home", name: "ホーム", affiliateUrl: "", imgSrc: "", imgHref: "" },
      { id: 171, type: "away", name: "アウェイ", affiliateUrl: "", imgSrc: "", imgHref: "" },
    ],
  },
  {
    id: "costa-rica",
    name: "コスタリカ代表",
    flag: "🇨🇷",
    themeColor: "#CE1126",
    brand: "adidas",
    uniforms: [
      { id: 180, type: "home", name: "ホーム", affiliateUrl: "", imgSrc: "", imgHref: "" },
      { id: 181, type: "away", name: "アウェイ", affiliateUrl: "", imgSrc: "", imgHref: "" },
    ],
  },
  {
    id: "algeria",
    name: "アルジェリア代表",
    flag: "🇩🇿",
    themeColor: "#006233",
    brand: "adidas",
    uniforms: [
      { id: 190, type: "home", name: "ホーム", affiliateUrl: "", imgSrc: "", imgHref: "" },
      { id: 191, type: "away", name: "アウェイ", affiliateUrl: "", imgSrc: "", imgHref: "" },
    ],
  },
  {
    id: "trinidad-tobago",
    name: "トリニダード・トバゴ代表",
    flag: "🇹🇹",
    themeColor: "#CE1126",
    brand: "adidas",
    uniforms: [
      { id: 200, type: "home", name: "ホーム", affiliateUrl: "", imgSrc: "", imgHref: "" },
      { id: 201, type: "away", name: "アウェイ", affiliateUrl: "", imgSrc: "", imgHref: "" },
    ],
  },
];
