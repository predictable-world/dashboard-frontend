import React, { useEffect, useState } from "react";
import PageHeader from "@layout/PageHeader";
import LeagueCard from "@widgets/LeagueCard";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const Leagues = () => {
  const [leagues, setLeagues] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const myHeaders = new Headers();
    myHeaders.append("x-rapidapi-key", "1eebd54a88b53d3516161b46a040fb38");
    myHeaders.append("x-rapidapi-host", "v3.football.api-sports.io");

    const requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };

    fetch("https://v3.football.api-sports.io/leagues", requestOptions)
      .then((response) => response.json())
      .then((result) => {
        setLeagues(result.response);
        setLoading(false);
      })
      .catch((error) => {
        setError(error);
        setLoading(false);
      });
  }, []);

  return (
    <>
      <PageHeader title="Leagues" />
      {error && <p>Error: {error.message}</p>}
      <section className="leagues-wrapper">
        {loading
          ? Array.from({ length: 10 }).map((_, index) => (
              <LeagueCard key={index} loading={loading} />
            ))
          : leagues.map((league) => (
              <LeagueCard
                key={league.league.id}
                id={league.league.id}
                name={league.league.name}
                image={league.league.logo}
                loading={loading}
              />
            ))}
      </section>
    </>
  );
};

export default Leagues;
