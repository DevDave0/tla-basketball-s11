import * as google_sheets from "./constants";

export const createSchedule = async () => {
  const range = "S10 Schedule!A4:J49";
  const full_url =
    google_sheets.base_url +
    google_sheets.sheet_id +
    "/gviz/tq?sheet=" +
    google_sheets.sheet_title +
    "&range=" +
    range;
  console.log(full_url);

  const res = await fetch(full_url);
  const rep = await res.text();
  const data = JSON.parse(rep.substring(47, rep.length - 2));
  console.log(data);

  return data.table.rows.map((row) => {
    const week = row.c[0].v;
    console.log("week", week);
    const date = row.c[1].f;
    console.log("date", date);
    const time = row.c[2].v;
    console.log("time", time);
    const court = row.c[3].v;
    console.log("court", court);
    const homeTeam = row.c[4]?.v || "TBD";
    console.log("homeTeam", homeTeam);
    const homeScore = row.c[5]?.v || "-";
    console.log("homeScore", homeScore);
    const awayScore = row.c[6]?.v || "-";
    console.log("awayScore", awayScore);
    const awayTeam = row.c[7]?.v || "TBD";
    console.log("awayTeam", awayTeam);
    const game = row.c[9]?.v || "-";
    console.log("game", game);

    return {
      week,
      date,
      time,
      court,
      homeTeam,
      homeScore,
      awayScore,
      awayTeam,
      game
    };
  });
};
