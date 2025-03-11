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
      title: `Season ${season.season_number}`,
      content: {
        content: (
          <Card
            style={{ height: "70px" }}
            meta={season.air_date}
            description={`${season.episode_count} episodes`}
          ></Card>
        ),
      },
    }));
  
    return (
      <div style={{ marginTop: 50 }}>
        <Segment>
          <Header>{data.name}</Header>
          <Grid columns={2} divided textAlign="left" style={{ marginTop: 20 }}>
            <Grid.Row>
              <Grid.Column width={6}>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    height: "100%",
                  }}
                >
                  <Image
                    src={`https://image.tmdb.org/t/p/original/${data.poster_path}`}
                    size="medium"
                    centered
                  />
                </div>
              </Grid.Column>
              <GridColumn width={10}>
                <List>
                  <List.Item>
                    <List.Header>Created By:</List.Header>
                    <List.Description>
                      {data.created_by?.map((creator: any) => creator.name).join(", ") || "N/A"}
                    </List.Description>
                  </List.Item>
                  <List.Item>
                    <List.Header>Episodes Run Time:</List.Header>
                    {data.episode_run_time?.join(", ") || "N/A"}
                  </List.Item>
                  <List.Item>
                    <List.Header>Genres:</List.Header>
                    {data.genres?.map((genre: any) => (
                      <Label key={genre.id}>{genre.name}</Label>
                    )) || "N/A"}
                  </List.Item>
                  <List.Item>
                    <List.Header>First Air Date:</List.Header>
                    {data.first_air_date || "N/A"}
                  </List.Item>
                  <List.Item>
                    <List.Header>Networks:</List.Header>
                    {data.networks?.map((network: any) => (
                      <Image
                        key={network.id}
                        src={`https://image.tmdb.org/t/p/original/${network.logo_path}`}
                        size="small"
                        style={{ marginRight: 10 }}
                      />
                    )) || "N/A"}
                  </List.Item>
                  <List.Item>
                    <List.Header>Production Companies:</List.Header>
                    {data.production_companies?.map((company: any) => company.name).join(", ") || "N/A"}
                  </List.Item>
                  <List.Item>
                    <List.Header>Number of Episodes:</List.Header>
                    {data.number_of_episodes || "N/A"}
                  </List.Item>
                  <List.Item>
                    <List.Header>Number of Seasons:</List.Header>
                    {data.number_of_seasons || "N/A"}
                  </List.Item>
                  <List.Item>
                    <List.Header>Seasons:</List.Header>
                    <List.Description>
                      <Accordion defaultActiveIndex={0} panels={seasonPanels} styled />
                    </List.Description>
                  </List.Item>
                  <List.Item>
                    <List.Header>Vote Average:</List.Header>
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
  