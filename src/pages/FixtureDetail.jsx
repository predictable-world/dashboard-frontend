import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import PageHeader from "@layout/PageHeader";

const FixtureDetail = () => {
  const { leagueID } = useParams();
  const [leagueDetail, setLeagueDetail] = useState(null);
  const [fixtures, setFixtures] = useState(null);
  const [error, setError] = useState(null);

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
      .then((result) => setLeagueDetail(result.response[0]))
      .catch((error) => setError(error));

    // Fetch fixtures
    fetch(
      `https://v3.football.api-sports.io/fixtures?league=${leagueID}&season=2024`,
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => setFixtures(result.response))
      .catch((error) => setError(error));
  }, [leagueID]);

  return (
    <>
      <PageHeader title="League Detail" />
      {error && <p>Error: {error.message}</p>}
      {leagueDetail ? (
        <div className="league-detail-wrapper">
          <header>
            <img
              src={leagueDetail.league.logo}
              alt={leagueDetail.league.name}
            />
            <h1>{leagueDetail.league.name}</h1>
          </header>
          <div className="league-origin">
            <div className="league-origin-card">
              <span>Type:</span> {leagueDetail.type}
            </div>
            <div className="league-origin-card">
              <span>Country:</span> {leagueDetail.country.name}
            </div>
            <div className="league-origin-card">
              <span>Season:</span> {leagueDetail.seasons[0].year}
            </div>
          </div>

          {/* Display fixtures */}
          <h2 className="fixture-title">Fixtures</h2>
          <div className="fixtures-wrapper">
            {fixtures ? (
              fixtures.map((fixture) => (
                <section className="fixtures-wrapper">
                  <div key={fixture.fixture.id} className="fixture-card">
                    <span className="fixture-date">
                      {new Date(fixture.fixture.date).toLocaleString()} -
                      {fixture.fixture.id}
                    </span>
                    fixture
                    <div className="fixture">
                      <span className="fixture-side">
                        {fixture.teams.home.name}
                        <img src={fixture.teams.home.logo} alt="" />
                      </span>{" "}
                      vs{" "}
                      <span className="fixture-side">
                        <img src={fixture.teams.away.logo} alt="" />
                        {fixture.teams.away.name}
                      </span>
                    </div>
                    <div>
                      <span>{fixture.fixture.status.long}</span>
                    </div>
                  </div>
                </section>
              ))
            ) : (
              <p>Loading fixtures...</p>
            )}
          </div>
        </div>
      ) : (
        <p>Loading league details...</p>
      )}
    </>
  );
};

export default FixtureDetail;
