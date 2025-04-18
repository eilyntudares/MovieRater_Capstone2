import {
    Loader,
    Segment,
    Header,
    Grid,
    Image,
    GridColumn,
    List,
    Label,
  } from "semantic-ui-react";
  import { useParams } from "react-router-dom";
  import { useQuery } from "@tanstack/react-query";
  import { fetchMovieDetails } from "./query";
  
  export const Movie = () => {
    const { id } = useParams<string>();
  
    if (!id) {
      return <div>Invalid Movie ID</div>;
    }
  
    const { data, isLoading } = useQuery({
      queryKey: ["movie"],
      queryFn: () => fetchMovieDetails(id),
    });
  
    if (isLoading) {
      return <Loader active />;
    }
  
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
            {data.title}
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
                    <List.Header style={{ color: "#9a8ea7" }}>
                      Is the Movie for Adults
                    </List.Header>
                    {data.adult ? "Yes" : "No"}
                  </List.Item>
  
                  <List.Item>
                    <List.Header style={{ color: "#9a8ea7" }}>Budget:</List.Header>
                    ${data.budget.toLocaleString()}
                  </List.Item>
  
                  <List.Item>
                    <List.Header style={{ color: "#9a8ea7" }}>Genres:</List.Header>
                    <div style={{ marginTop: "0.5rem" }}>
                      {data.genres.map((genre: any) => (
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
                      ))}
                    </div>
                  </List.Item>
  
                  <List.Item>
                    <List.Header style={{ color: "#9a8ea7" }}>IMDB ID:</List.Header>
                    {data.imdb_id}
                  </List.Item>
  
                  <List.Item>
                    <List.Header style={{ color: "#9a8ea7" }}>Popularity:</List.Header>
                    {data.popularity}
                  </List.Item>
  
                  <List.Item>
                    <List.Header style={{ color: "#9a8ea7" }}>
                      Production Companies:
                    </List.Header>
                    <span style={{ color: "#a59e94" }}>
                      {data.production_companies.map((company: any) => company.name).join(", ")}
                    </span>
                  </List.Item>
  
                  <List.Item>
                    <List.Header style={{ color: "#9a8ea7" }}>
                      Release Date:
                    </List.Header>
                    {data.release_date}
                  </List.Item>
  
                  <List.Item>
                    <List.Header style={{ color: "#9a8ea7" }}>Revenue:</List.Header>
                    ${data.revenue.toLocaleString()}
                  </List.Item>
  
                  <List.Item>
                    <List.Header style={{ color: "#9a8ea7" }}>Runtime:</List.Header>
                    {data.runtime} minutes
                  </List.Item>
  
                  <List.Item>
                    <List.Header style={{ color: "#9a8ea7" }}>
                      Vote Average:
                    </List.Header>
                    {data.vote_average}
                  </List.Item>
  
                  <List.Item>
                    <List.Header style={{ color: "#9a8ea7" }}>Language:</List.Header>
                    {data.original_language.toUpperCase()}
                  </List.Item>
                </List>
              </GridColumn>
            </Grid.Row>
          </Grid>
        </Segment>
      </div>
    );
  };
  