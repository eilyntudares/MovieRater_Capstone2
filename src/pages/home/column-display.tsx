import { Grid, Card, Form, Label } from "semantic-ui-react";
import { DisplayType } from ".";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { rateMovie, rateTvShow } from "./mutation";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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
  const [reviewText, setReviewText] = useState<{ [id: number]: string }>({});

  const onSuccess = () => {
    toast.success("Rated successfully!", {
      autoClose: 1000,
      theme: "colored",
    });
  };

  const onError = () => {
    toast.error("Failed to rate!", {
      autoClose: 1000,
      theme: "colored",
    });
  };

  const { mutate: rateMovieMutation } = useMutation({
    mutationKey: ["rateMovie"],
    mutationFn: (params: { id: number; score: number }) =>
      rateMovie(params.id, params.score),
    onSuccess,
    onError,
  });

  const { mutate: rateTvShowMutation } = useMutation({
    mutationKey: ["rateTvShow"],
    mutationFn: (params: { id: number; score: number }) =>
      rateTvShow(params.id, params.score),
    onSuccess,
    onError,
  });

  const rate =
    displayType === DisplayType.Movies ? rateMovieMutation : rateTvShowMutation;

  const getRatingFromReview = async (review: string): Promise<number> => {
    console.log("Retrieving rating for review: " + review)
    const response = await fetch("http://localhost:5000/review-to-score", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ review }),
    });

    if (!response.ok) {
      throw new Error("Failed to get score from review");
    }

    const data = await response.json();
    console.log("Received Data: " + data.score)
    return data.score;
  };

  return (
    <Grid
      columns={3}
      stackable
      centered
      verticalAlign="top"
      padded="vertically"
    >
      {data.map((displayData: DisplayData) => (
        <Grid.Column key={displayData.id}>
          <Card.Group>
            <Link
              to={`/${
                displayType === DisplayType.Movies ? "movie" : "tvshow"
              }/${displayData.id}`}
            >
              <Card
                style={{ height: 820 }}
                fluid
                image={`https://image.tmdb.org/t/p/original/${displayData.poster_path}`}
                header={
                  displayType === DisplayType.Movies
                    ? displayData.title
                    : displayData.name
                }
                meta={`Release Date: ${displayData.release_date} | Rating: ${displayData.vote_average}`}
                description={`${displayData.overview.slice(0, 350)}...`}
              />
              {isRated && (
                <Label color="green">
                  Your Rating : {displayData.rating}
                </Label>
              )}
            </Link>
            <Form style={{ marginTop: "10px" }}>
              <Form.TextArea
                placeholder="Write your review..."
                value={reviewText[displayData.id] || ""}
                onChange={(e, { value }) => {
                  setReviewText({
                    ...reviewText,
                    [displayData.id]: value as string,
                  });
                }}
              />
              <Form.Button
                color="violet"
                content="Rate"
                icon="star"
                labelPosition="right"
                onClick={async () => {
                  const review = reviewText[displayData.id];
                  if (!review) {
                    toast.warn("Please write a review first!");
                    return;
                  }

                  try {
                    const score = await getRatingFromReview(review);
                    rate({ id: displayData.id, score });
                  } catch (error) {
                    toast.error("Error processing review!");
                  }
                }}
              />
            </Form>
          </Card.Group>
        </Grid.Column>
      ))}
    </Grid>
  );
};