import { Grid, Card, Form, Label } from "semantic-ui-react";
import { DisplayType } from ".";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { rateMovie, rateTvShow } from "./mutation";
import { toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import { useQueryClient } from "@tanstack/react-query";


interface DisplayData {
    id: number;
    overview: string;
    poster_path: string;
    title?: string;
    name?: string;
    vote_average: number;
    release_date: string;
    rating?: number;
}

interface Props {
    data: DisplayData[];
    displayType: DisplayType;
    isRated?: boolean;
}

export const ColumnDisplay = (props: Props) => {
    const { data, displayType, isRated } = props;
    const [rating, setRating] = useState<number>(0)
    const queryClient = useQueryClient();

    const onSuccess = () => {
        toast.success("Rated successfully!",
            {autoClose: 1000,
            theme: "colored"}
        );

        if (displayType === DisplayType.Movies) {
            queryClient.invalidateQueries({ queryKey: ["ratedMovies"] });
        } else {
            queryClient.invalidateQueries({ queryKey: ["ratedTvShows"] });
        }
    }
    const onError = () => {
        toast.error("Failed to rate!", 
            {autoClose: 1000,
            theme: "colored"}
        );
    }
    const{mutate: rateMovieMutation} = useMutation(
        {mutationKey: ["rateMovie"], 
        mutationFn: ({ id, value }: { id: number; value: number }) => rateMovie(id, value),
        onSuccess,
        onError,
    });

    const{mutate: rateTvShowMutation} = useMutation(
        {mutationKey: ["rateTvShow"], 
        mutationFn: ({ id, value }: { id: number; value: number }) => rateTvShow(id, value),
        onSuccess,
        onError,
    });

    const rate = 
        displayType === DisplayType.Movies ? rateMovieMutation : rateTvShowMutation;

    return (
        <Grid 
            columns={3} // Fixed typo
            stackable 
            centered 
            verticalAlign="top" 
            padded="vertically"
        >  
            {data.map((displayData: DisplayData) => (
                <Grid.Column key={displayData.id}>
                    <Card.Group>
                        <Link to={`/${displayType === DisplayType.Movies ? "movie" : "tvshow"}/${displayData.id}`}>
                        <Card 
                         style={{height: 820}}
                            fluid 
                            image={`https://image.tmdb.org/t/p/original/${displayData.poster_path}`} // Fixed template string
                            header={
                                displayType === DisplayType.Movies  
                                    ? displayData.title  
                                    : displayData.name
                            } 
                            meta={`Release Date: ${displayData.release_date} | Rating: ${displayData.vote_average}`} // Fixed template string
                            description={`${displayData.overview.slice(0, 350)}...`} // Ensured proper string slicing
                        />{""}
                        {isRated && displayData.rating !== undefined && (
                            <Label color="green">Your Rating: {displayData.rating}</Label>
                        )}
                        </Link>
                        <Form style={{marginTop: "10"}}> 
                            <Form.Group incline>
                                <Form.Field>
                                    <Form.Input type="number" 
                                    min="0" 
                                    max="10" 
                                    step="0.5" 
                                    onChange={(e: React.ChangeEvent<HTMLInputElement>)=> setRating(Number(e.target.value))} 
                                    action={{
                                        labelPosition: "right",
                                        icon: "star",
                                        content: "Rate",
                                        color: "violet",
                                        onClick: () => {
                                            rate({id: displayData.id, value: rating});
                                        }
                                    }}
                                    />
                                </Form.Field>
                            </Form.Group>
                        </Form>
                    </Card.Group>
                </Grid.Column>
            ))}
        </Grid>
    );
};