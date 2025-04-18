import { Container, Loader, Menu, Segment, Header } from "semantic-ui-react";
import { useState } from "react";
import { DisplayType } from "../home";
import { useQuery } from "@tanstack/react-query";
import { fetchRatedMovies, fetchRatedTvShows } from "./query";
import { ColumnDisplay } from "../home/column-display";
import { Navigate } from "react-router-dom";

export const Rated = () => {
  const [activeTabs, setActiveTabs] = useState<string>(DisplayType.Movies);

  const {
    data: ratedMovies,
    isLoading: isLoadingRatedMovies,
  } = useQuery({
    queryKey: ["ratedMovies"],
    queryFn: fetchRatedMovies,
  });

  const {
    data: ratedTvShows,
    isLoading: isLoadingRatedTvShows,
  } = useQuery({
    queryKey: ["ratedTvShows"],
    queryFn: fetchRatedTvShows,
  });

  if (isLoadingRatedMovies || isLoadingRatedTvShows) {
    return <Loader active />;
  }

  if (localStorage.getItem("guest_session_id") === null) {
    return <Navigate to="/auth" />;
  }

  return (
    <Container style={{ marginTop: "50px" }}>
      <Menu
        secondary
        pointing
        style={{
          background: "transparent",
          display: "flex",
          justifyContent: "center",
          marginBottom: "2rem",
          borderBottom: "none",
        }}
      >
        <Menu.Item
          name="Movies"
          active={activeTabs === DisplayType.Movies}
          onClick={() => setActiveTabs(DisplayType.Movies)}
          style={{
            backgroundColor: activeTabs === DisplayType.Movies ? "#5e2a6b" : "transparent",
            color: "#fff",
            padding: "0.8rem 2rem",
            borderRadius: "12px",
            fontWeight: "bold",
            fontSize: "1rem",
            margin: "0 0.5rem",
            transition: "all 0.3s ease",
          }}
        />
        <Menu.Item
          name="TV Shows"
          active={activeTabs === DisplayType.TvShows}
          onClick={() => setActiveTabs(DisplayType.TvShows)}
          style={{
            backgroundColor: activeTabs === DisplayType.TvShows ? "#5e2a6b" : "transparent",
            color: "#fff",
            padding: "0.8rem 2rem",
            borderRadius: "12px",
            fontWeight: "bold",
            fontSize: "1rem",
            margin: "0 0.5rem",
            transition: "all 0.3s ease",
          }}
        />
      </Menu>

      <Segment
        style={{ background: "transparent", border: "none", boxShadow: "none" }}
      >
        {activeTabs === DisplayType.Movies ? (
          <div>
            <Header
              as="h2"
              style={{
                color: "var(--color-accent)",
                textAlign: "center",
                fontFamily: "var(--font-display)",
              }}
            >
              Rated Movies
            </Header>
            {ratedMovies?.results?.length > 0 ? (
              <ColumnDisplay
                data={ratedMovies.results}
                displayType={DisplayType.Movies}
                isRated
              />
            ) : (
              <p>No rated movies found.</p>
            )}
          </div>
        ) : (
          <div>
            <Header
              as="h2"
              style={{
                color: "var(--color-accent)",
                textAlign: "center",
                fontFamily: "var(--font-display)",
              }}
            >
              Rated TV Shows
            </Header>
            {ratedTvShows?.results?.length > 0 ? (
              <ColumnDisplay
                data={ratedTvShows.results}
                displayType={DisplayType.TvShows}
                isRated
              />
            ) : (
              <p>No rated TV shows found.</p>
            )}
          </div>
        )}
      </Segment>
    </Container>
  );
};
