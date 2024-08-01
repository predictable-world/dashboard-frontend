import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

// components
import PageHeader from "@layout/PageHeader";
import AppGrid from "@layout/AppGrid";
import LeagueRating from "@widgets/LeagueRating";
import MatchesOverview from "@widgets/MatchesOverview";
import TeamStatsCard from "@components/TeamStatsCard";
import TeamPulse from "@widgets/TeamPulse";
import GamesCalendar from "@widgets/GamesCalendar";
import Standings from "@widgets/Standings";
import BallPossessionAreaChart from "@widgets/BallPossessionAreaChart";
import LineDotsChart from "@widgets/LineDotsChart";
import WidgetGroup from "@components/WidgetGroup";

const LeagueOverview = () => {
  const { leagueID } = useParams();
  const [leagueDetail, setLeagueDetail] = useState(null);
  const [fixtures, setFixtures] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [fixturesLoading, setFixturesLoading] = useState(true);

  useEffect(() => {
    const myHeaders = new Headers();
    myHeaders.append("x-rapidapi-key", "1eebd54a88b53d3516161b46a040fb38");
    myHeaders.append("x-rapidapi-host", "v3.football.api-sports.io");

    const requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };

    // Fetch league details
    fetch(
      `https://v3.football.api-sports.io/leagues?id=${leagueID}`,
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        setLeagueDetail(result.response[0]);
        setLoading(false);
      })
      .catch((error) => {
        setError(error);
        setLoading(false);
      });

    // Fetch fixtures
    fetch(
      `https://v3.football.api-sports.io/fixtures?league=${leagueID}&season=2024`,
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        setFixtures(result.response);
        setFixturesLoading(false);
      })
      .catch((error) => {
        setError(error);
        setFixturesLoading(false);
      });
  }, [leagueID]);

  const widgets = {
    league_rating: (
      <LeagueRating
        image={leagueDetail?.league?.logo || "Loading..."}
        title={leagueDetail?.league?.name || "Loading..."}
      />
    ),
    matches_overview: <MatchesOverview />,
    team_stats: (
      <WidgetGroup>
        <TeamStatsCard id="manunited" value={14} />
        <TeamStatsCard id="chelsea" value={12} />
      </WidgetGroup>
    ),
    team_pulse: <TeamPulse />,
    calendar: <GamesCalendar />,
    standings: <Standings />,
    ball_possession: <BallPossessionAreaChart />,
    dots_chart: <LineDotsChart />,
  };

  return (
    <>
      <PageHeader title={loading ? "Loading..." : leagueDetail?.league?.name} />
      <AppGrid id="league_overview" widgets={widgets} />
    </>
  );
};

export default LeagueOverview;
