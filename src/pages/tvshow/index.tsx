import {
  Loader,
  Segment,
  Header,
  Grid,
  Image,
  GridColumn,
  List,
  Label,
  Accordion,
  Card,
} from "semantic-ui-react";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

export const fetchTvShowDetails = async (tvShowId: string) => {
  const res = await fetch(
    `https://api.themoviedb.org/3/tv/${tvShowId}?language=en-US&page=1`,
    {
      headers: {
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiZTE5YjdlYTI1YmYzMDYyYjI1MDM1YWQ3ODNkYmRlYSIsIm5iZiI6MTczOTAzOTYxMy43Nzc5OTk5LCJzdWIiOiI2N2E3YTM3ZDFjMGYzYWJmODdlMDc2MWUiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.rEfbJfpxv0po8FUa_26GCb-2XWBDYUS4v2DC2s1RtbQ",
      },
    }
  );

  return res.json();
};

export const TvShow = () => {
  const { id } = useParams<{ id: string }>();

  if (!id) {
    return <div>Invalid TV Show ID</div>;
  }

  const { data, isLoading } = useQuery({
    queryKey: ["tvShow", id],
    queryFn: () => fetchTvShowDetails(id),
  });

  if (isLoading) {
    return <Loader active />;
  }

  if (!data) {
    return <div>Error fetching TV show details</div>;
  }

  const seasonPanels = data.seasons?.map((season: any) => ({
    key: season.id,
    title: {
      content: (
        <div
          style={{
            fontWeight: 600,
            fontSize: "1rem",
            color: "#f5f5f5",
            backgroundColor: "#5e2a6b",
            padding: "0.5rem 1rem",
            borderRadius: "10px",
            marginBottom: "0.4rem",
            textAlign: "center",
            boxShadow: "0 0 8px rgba(94, 42, 107, 0.5)",
            transition: "background-color 0.3s ease",
            cursor: "pointer",
          }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLDivElement).style.backgroundColor = "#4b1036";
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLDivElement).style.backgroundColor = "#5e2a6b";
          }}
        >
          Season {season.season_number}
        </div>
      ),
    },
    
    content: {
      content: (
        <div
          style={{
            backgroundColor: "#5e2a6b",
            borderRadius: "10px",
            padding: "1rem",
            color: "#f5f5f5",
            fontSize: "0.95rem",
            lineHeight: "1.6",
            marginBottom: "1rem",
            boxShadow: "inset 0 0 6px rgba(0, 0, 0, 0.5)",
            maxWidth: "300px",
            marginLeft: "auto",
            marginRight: "auto",
            textAlign: "center",
          }}
        >
          <p>
            <strong>Air Date:</strong> {season.air_date || "N/A"}
          </p>
          <p>
            <strong>Episodes:</strong> {season.episode_count || "N/A"}
          </p>
        </div>
      ),
    },
  }));
  
  return (
    <div style={{ marginTop: "70px", padding: "2rem" }}>
      <Segment
        style={{
          backgroundColor: "#1a1e1b",
          borderRadius: "20px",
          boxShadow: "0 4px 20px rgba(0, 0, 0, 0.5)",
          color: "#d6d5c9",
        }}
      >
        <Header
          style={{
            fontSize: "2rem",
            fontFamily: "'Bebas Neue', sans-serif",
            color: "#d6d5c9",
            marginBottom: "1.5rem",
            textAlign: "center",
          }}
        >
          {data.name}
        </Header>

        <Grid columns={2} stackable>
          <Grid.Row>
            <Grid.Column width={6}>
              <Image
                src={`https://image.tmdb.org/t/p/original/${data.poster_path}`}
                style={{
                  borderRadius: "12px",
                  boxShadow: "0 4px 16px rgba(0, 0, 0, 0.6)",
                }}
                centered
              />
            </Grid.Column>

            <GridColumn width={10}>
              <List divided relaxed size="large">
                <List.Item>
                  <List.Header style={{ color: "#9a8ea7" }}>Created By:</List.Header>
                  <List.Description>
                    {data.created_by?.map((creator: any) => creator.name).join(", ") || "N/A"}
                  </List.Description>
                </List.Item>

                <List.Item>
                  <List.Header style={{ color: "#9a8ea7" }}>Episodes Run Time:</List.Header>
                  {data.episode_run_time?.join(", ") || "N/A"}
                </List.Item>

                <List.Item>
                  <List.Header style={{ color: "#9a8ea7" }}>Genres:</List.Header>
                  <div style={{ marginTop: "0.5rem" }}>
                    {data.genres?.map((genre: any) => (
                      <Label
                        key={genre.id}
                        style={{
                          backgroundColor: "#5e2a6b",
                          color: "#fff",
                          marginRight: "0.5rem",
                          marginBottom: "0.5rem",
                          borderRadius: "999px",
                          fontWeight: "bold",
                        }}
                      >
                        {genre.name}
                      </Label>
                    )) || "N/A"}
                  </div>
                </List.Item>

                <List.Item>
                  <List.Header style={{ color: "#9a8ea7" }}>First Air Date:</List.Header>
                  {data.first_air_date || "N/A"}
                </List.Item>

                <List.Item>
                  <List.Header style={{ color: "#9a8ea7" }}>Networks:</List.Header>
                  {data.networks?.map((network: any) => (
                    <Image
                      key={network.id}
                      src={`https://image.tmdb.org/t/p/original/${network.logo_path}`}
                      size="small"
                      style={{
                        marginRight: 10,
                        backgroundColor: "#fff",
                        padding: 5,
                        borderRadius: "8px",
                      }}
                    />
                  )) || "N/A"}
                </List.Item>

                <List.Item>
                  <List.Header style={{ color: "#9a8ea7" }}>Production Companies:</List.Header>
                  <span style={{ color: "#a59e94" }}>
                    {data.production_companies?.map((company: any) => company.name).join(", ") || "N/A"}
                  </span>
                </List.Item>

                <List.Item>
                  <List.Header style={{ color: "#9a8ea7" }}>Number of Episodes:</List.Header>
                  {data.number_of_episodes || "N/A"}
                </List.Item>

                <List.Item>
                  <List.Header style={{ color: "#9a8ea7" }}>Number of Seasons:</List.Header>
                  {data.number_of_seasons || "N/A"}
                </List.Item>

                <List.Item>
                  <List.Header style={{ color: "#9a8ea7" }}>Seasons:</List.Header>
                  <Accordion defaultActiveIndex={0} panels={seasonPanels} />
                </List.Item>

                <List.Item>
                  <List.Header style={{ color: "#9a8ea7" }}>Vote Average:</List.Header>
                  {data.vote_average || "N/A"}
                </List.Item>
              </List>
            </GridColumn>
          </Grid.Row>
        </Grid>
      </Segment>
    </div>
  );
};