import React from "react";
import { Link } from "react-router-dom";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { useInView } from "react-intersection-observer";

const LeagueCard = ({ name, image, id, loading }) => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  if (loading || !inView) {
    return (
      <div className="league-card" ref={ref}>
        <Skeleton width={60} height={60} style={{ marginBottom: "0.5rem" }} />
        <Skeleton width={100} />
      </div>
    );
  }

  const leagueName = name.replace(/\s+/g, "-").toLowerCase(); // Format league name for URL
  const leagueID = id;

  return (
    <Link to={`/leagues/${leagueName}/${leagueID}`}>
      <div className="league-card" ref={ref}>
        <div className="league-card-image">
          <img style={{ width: 60 }} src={image} />
        </div>
        <span>{name}</span>
      </div>
    </Link>
  );
};

export default LeagueCard;
