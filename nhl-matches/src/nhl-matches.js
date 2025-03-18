import React, { useState, useEffect } from "react";
import axios from "axios";

const NHLMatches = () => {
  //   const [matches, setMatches] = useState([]);
  const [goalies, setGoalies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const currentDate = new Date().toISOString().split("T")[0]; // Get today's date in YYYY-MM-DD format

  useEffect(() => {
    // const fetchMatches = async () => {
    //   try {
    //     const response = await axios.get("http://localhost:5000/nhl-schedule");
    //     const filteredMatches = response.data.gameWeek
    //       ? response.data.gameWeek.find((day) => day.date === currentDate)?.games || [] // Filter today's games
    //       : [];
    //     setMatches(filteredMatches);
    //   } catch (err) {
    //     setError("Failed to fetch NHL matches");
    //   } finally {
    //     setLoading(false);
    //   }
    // };

    const fetchGoalies = async () => {
      try {
        const response = await axios.get("http://localhost:5000/starting-goalies");
        const res = response.data.pageProps.data;
        console.log(res);
        setGoalies(res);
      } catch (err) {
        setError("Failed to fetch NHL Starting Goalies");
      } finally {
        setLoading(false);
      }
    };

    // fetchMatches();
    fetchGoalies();
  }, [currentDate]); // Adding currentDate to the dependency array to re-fetch if it changes

  if (loading) return <p>Loading NHL matches...</p>;
  if (error) return <p>{error}</p>;

  const formatMoneyline = (value) => {
    return value >= 0 ? `+${value}` : value;
  };

  return (
    <div>
      <img src="/images/Grid.png" alt="Logo" className="bg" />
      <div style={{ display: "flex", maxWidth: "1200px", margin: "auto", flexDirection: "column", padding: "20px" }}>
        <h2 style={{fontSize: '42px', color: 'white', letterSpacing: '-1px', marginTop: '0'}}>NHL Starting Goalies</h2>
        <div className="container">
          {goalies.length > 0 ? (
            goalies.map((goalie) => (
              <div key={goalie.awayGoalieId} className="match-container">
                <span className="title"> <img src="/images/hockey.svg" alt="Logo" style={{width: '10px'}} /> NHL</span>
                <div style={{ display: "flex", flexDirection: "row", justifyContent: "center", gap: "16px", alignItems: "flexStart" }}>
                  <div style={{ display: "flex", flexDirection: "column", alignItems: "center", minWidth: "120px" }}>
                    <img src={goalie.awayTeamLogoSvg} alt={goalie.awayTeamName} className="team-logo" />
                    <span
                      className={goalie.awayTeamSlug}
                      style={{
                        width: "40px",
                        height: "40px",
                        position: "absolute",
                        zIndex: "-1",
                        opacity: "0.4",
                        filter: "blur(20px)",
                        borderRadius: "50px",
                      }}></span>
                    <p style={{ fontSize: "12px", color: "#ffffff78", margin: "6px 0" }}>{goalie.awayTeamName}</p>
                    <h2 className="team-odds">{formatMoneyline(goalie.awayTeamMoneylinePointSpread)}</h2>
                    <h2 style={{ color: "#cdcecf", fontSize: "16px", letterSpacing: "-0.9px" }}>Starting Goalie</h2>
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                      }}>
                      <h3
                        style={{
                          margin: "0 0 10px 0",
                          color:
                            goalie.awayNewsStrengthName === null
                              ? "#f7665e"
                              : goalie.awayNewsStrengthName === "Confirmed"
                              ? "rgb(170 241 138)"
                              : goalie.awayNewsStrengthName === "Likely"
                              ? "rgb(248 175 49)"
                              : "black",
                          fontSize: "12px",
                        }}>
                        {goalie.awayNewsStrengthName === null ? (
                          "unconfirmed"
                        ) : (
                          <p style={{ margin: "0" }}>
                            {goalie.awayNewsStrengthName}
                            <a
                              href={goalie.awayNewsSourceUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              style={{ fontSize: "10px", marginLeft: "2px" }}>
                              <img src="/images/info.svg" alt="Logo" style={{ width: "10px" }} />
                            </a>
                          </p>
                        )}
                      </h3>
                      <img
                        src={goalie.awayGoalieHeadshotUrl}
                        alt={goalie.awayGoalieName}
                        className="goalie-headshot"
                        style={{
                          margin: "0 0 10px 0",
                          border:
                            goalie.awayNewsStrengthName === null
                              ? "1px solid #f7665e"
                              : goalie.awayNewsStrengthName === "Confirmed"
                              ? "1px solid rgb(170 241 138)"
                              : goalie.awayNewsStrengthName === "Likely"
                              ? "1px solid orange"
                              : "black",
                          fontSize: "12px",
                        }}
                      />
                      <h2 style={{ textAlign: "center", fontSize: "14px", color: "white", margin: "0" }}>{goalie.awayGoalieName}</h2>
                      <p style={{ margin: "4px 0 0 0", color: "#ffffff78", fontSize: "14px" }}>
                        {goalie.awayGoalieWins}-{goalie.awayGoalieLosses}-{goalie.awayGoalieOvertimeLosses}
                      </p>
                      <p style={{ margin: "0", color: "#ffffff78", fontSize: "14px" }}>SV% {goalie.awayGoalieSavePercentage}</p>
                    </div>
                  </div>
                  <div>
                    <p style={{ fontSize: "12px", color: "#ffffff78", marginTop: "20px", minWidth: "60px", textAlign: "center" }}>
                      {new Date(goalie.dateGmt).toLocaleTimeString([], { timeStyle: "short" })}
                    </p>
                  </div>
                  <div style={{ display: "flex", flexDirection: "column", alignItems: "center", minWidth: "120px" }}>
                    <img src={goalie.homeTeamLogoSvg} alt={goalie.homeTeamName} className="team-logo" />
                    <span
                      className={goalie.homeTeamSlug}
                      style={{
                        width: "56px",
                        height: "56px",
                        position: "absolute",
                        zIndex: "-1",
                        opacity: "0.2",
                        filter: "blur(20px)",
                        borderRadius: "50px",
                      }}></span>
                    <p style={{ fontSize: "12px", color: "#ffffff78", margin: "6px 0" }}>{goalie.homeTeamName}</p>
                    <h2 className="team-odds">{formatMoneyline(goalie.homeTeamMoneylinePointSpread)}</h2>
                    <h2 style={{ color: "#cdcecf", fontSize: "16px", letterSpacing: "-0.9px" }}>Starting Goalie</h2>
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                      }}>
                      <div style={{ display: "flex", flexDirection: "row", alignItems: "flex-start" }}>
                        <h3
                          style={{
                            margin: "0 0 10px 0",
                            color:
                              goalie.homeNewsStrengthName === null
                                ? "#f7665e"
                                : goalie.homeNewsStrengthName === "Confirmed"
                                ? "rgb(170 241 138)"
                                : goalie.homeNewsStrengthName === "Likely"
                                ? "rgb(248 175 49)"
                                : "black",
                            fontSize: "12px",
                          }}>
                          {goalie.homeNewsStrengthName === null ? (
                            "unconfirmed"
                          ) : (
                            <p style={{ margin: "0" }}>
                              {goalie.homeNewsStrengthName}
                              <a
                                href={goalie.homeNewsSourceUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                style={{ fontSize: "10px", marginLeft: "2px" }}>
                                <img src="/images/info.svg" alt="Logo" style={{ width: "10px" }} />
                              </a>
                            </p>
                          )}
                        </h3>
                      </div>
                      <img
                        src={goalie.homeGoalieHeadshotUrl}
                        alt={goalie.homeGoalieName}
                        className="goalie-headshot"
                        style={{
                          margin: "0 0 10px 0",
                          border:
                            goalie.homeNewsStrengthName === null
                              ? "1px solid #f7665e"
                              : goalie.homeNewsStrengthName === "Confirmed"
                              ? "1px solid #c8f4b4"
                              : goalie.homeNewsStrengthName === "Likely"
                              ? "1px solid orange"
                              : "black",
                          fontSize: "12px",
                        }}
                      />
                      <h2 style={{ textAlign: "center", fontSize: "14px", color: "white", margin: "0" }}>{goalie.homeGoalieName}</h2>
                      <p style={{ margin: "4px 0 0 0", color: "#ffffff78", fontSize: "14px" }}>
                        {goalie.homeGoalieWins}-{goalie.homeGoalieLosses}-{goalie.homeGoalieOvertimeLosses}
                      </p>
                      <p style={{ margin: "0", color: "#ffffff78", fontSize: "14px" }}>SV% {goalie.homeGoalieSavePercentage}</p>
                    </div>
                  </div>
                </div>
                {/* <span className="bar"></span> */}
              </div>
            ))
          ) : (
            <p>No games today</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default NHLMatches;
