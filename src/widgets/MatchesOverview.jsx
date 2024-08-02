import React, { useState, useEffect, useRef } from "react";
import Spring from "@components/Spring";
import ScrollContainer from "@components/ScrollContainer";
import { TabsList } from "@mui/base/TabsList";
import { TabPanel } from "@mui/base/TabPanel";
import { Tabs } from "@mui/base/Tabs";
import MatchCard from "@components/MatchCard";
import TabButton from "@ui/TabButton";
import useMeasure from "react-use-measure";

const MatchesOverview = ({ fixturesList }) => {
  const [activeTab, setActiveTab] = useState("live");
  const [ref, { height }] = useMeasure();
  const trackRef = useRef(null);

  // Filter fixtures based on their status
  const matchesFinished = fixturesList.filter(
    (match) => match.status.long === "Match Finished"
  );
  const matchesLive = fixturesList.filter(
    (match) => match.status.long === "Live"
  );
  const matchesUpcoming = fixturesList.filter(
    (match) => match.status.long === "Not Started"
  );

  useEffect(() => {
    if (trackRef.current) {
      trackRef.current.scrollTo(0, 0);
    }
  }, [activeTab]);

  return (
    <Spring className="card h-3">
      <Tabs className="h-100" value={activeTab}>
        <div className="card-padded" ref={ref}>
          <TabsList className="tab-nav col-3">
            <TabButton
              title="Finished"
              onClick={() => setActiveTab("finished")}
              active={activeTab === "finished"}
            />
            <TabButton
              title="Live"
              onClick={() => setActiveTab("live")}
              active={activeTab === "live"}
            />
            <TabButton
              title="Upcoming"
              onClick={() => setActiveTab("upcoming")}
              active={activeTab === "upcoming"}
            />
          </TabsList>
        </div>
        <ScrollContainer height={height}>
          <div
            className="track"
            style={{ padding: "0 var(--card-padding)" }}
            ref={trackRef}
          >
            <TabPanel className="h-100" value="finished">
              <div
                className="d-flex flex-column g-24"
                style={{ paddingBottom: 24 }}
              >
                {matchesFinished.map((match, index) => (
                  <MatchCard key={index} match={match} index={index} />
                ))}
              </div>
            </TabPanel>

            <TabPanel className="h-100" value="live">
              <div
                className="d-flex flex-column g-24"
                style={{ paddingBottom: 24 }}
              >
                {matchesLive.map((match, index) => (
                  <MatchCard key={index} match={match} index={index} />
                ))}
              </div>
            </TabPanel>

            <TabPanel className="h-100" value="upcoming">
              <div
                className="d-flex flex-column g-24"
                style={{ paddingBottom: 24 }}
              >
                {matchesUpcoming.map((match, index) => (
                  <MatchCard key={index} match={match} index={index} />
                ))}
              </div>
            </TabPanel>
          </div>
        </ScrollContainer>
      </Tabs>
    </Spring>
  );
};

export default MatchesOverview;
