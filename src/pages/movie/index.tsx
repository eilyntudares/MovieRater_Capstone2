import { Loader, Segment, Header, Grid, Image, GridColumn, List, Label} from "semantic-ui-react";
import { useParams} from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { fetchMovieDetails } from "./query";


export const Movie = () => {
    const {id} =  useParams <string>();

    if (!id) {
        return <div>Invalid Movie ID</div>;
    }

const {data, isLoading} = useQuery ({
    queryKey: ["movie"],
    queryFn: () => fetchMovieDetails(id),

});

if (isLoading) {
return <Loader active />;
}

return (
    <div style={{marginTop: 50}}> 
        <Segment>
            <Header> {data.title} </Header>
            <Grid colums={2} divided textAlign="left" style ={{marginTop: 20}}>
                <Grid.Row>
                    <Grid.Column width={6}>
                        <div style={{
                            display: "flex", 
                            alignItems: "center", 
                            justifyContent: "center", 
                            height: "100%"
                            }}
                        >
                            <Image
                            src={`https://image.tmdb.org/t/p/original/${data.poster_path}`} 
                            size= "medium" 
                            centered
                            />
                            </div>

                    </Grid.Column>
                    <GridColumn width={10}>
                        <List>
                            <List.Item>
                            <List.Header> Is The Movie For Adults </List.Header>
                            {data.adult ? "Yes" : "No" }
                            </List.Item>
                            <List.Item>
                            <List.Header> Budget: </List.Header>
                            {data.budget}
                            </List.Item>
                            <List.Item>
                            <List.Header> Genres: </List.Header>
                            {data.genres.map((genre: any) => (<Label key={genre.id}> {genre.name} </Label>))}
                            </List.Item>
                            <List.Item>
                            <List.Header> IMDB ID: </List.Header>
                            {data.imdb_id}
                            </List.Item>
                            <List.Item>
                            <List.Header> Popularity </List.Header>
                            {data.popularity}
                            </List.Item>
                            <List.Item>
                            <List.Header> Production Companies </List.Header>
                            {data.production_companies.map((company: any) => company.name)
                            .join(", ")}
                            </List.Item>
                            <List.Item>
                            <List.Header> Release Date: </List.Header>
                            {data.release_date}
                            </List.Item>
                            <List.Item>
                            <List.Header> Revenue: </List.Header>
                            {data.revenue}
                            </List.Item>
                            <List.Item>
                            <List.Header> Runtime: </List.Header>
                            {data.runtime}
                            </List.Item>
                            <List.Item>
                            <List.Header> Vote Average: </List.Header>
                            {data.vote_average}
                            </List.Item>
                            <List.Item>
                            <List.Header> Language: </List.Header>
                            {data.original_language}
                            </List.Item>
                            
                        </List>

                    </GridColumn>
                </Grid.Row>
            </Grid>
        </Segment>
    </div>
);
};