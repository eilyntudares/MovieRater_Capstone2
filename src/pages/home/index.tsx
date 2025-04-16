import { useState } from "react";
import { Tab } from "semantic-ui-react";
import { useQuery } from "@tanstack/react-query";
import { Navigate } from "react-router-dom";
import { fetchMovies, fetchTvShows } from "./query";
import { ColumnDisplay } from "./column-display";

export enum DisplayType {
    Movies = "movie",
    TvShows = "tv"
}

export const Home = () => {
    const [activeTab, setActiveTab] = useState<DisplayType>(DisplayType.Movies);

    const { data: movies, isLoading: isLoadingMovies } = useQuery({
        queryKey: ["popular-movies"],
        queryFn: () => fetchMovies(),
        enabled: activeTab === DisplayType.Movies,
    });

    const { data: tvShows, isLoading: isLoadingTvShows } = useQuery({
        queryKey: ["popular-tvshows"],
        queryFn: () => fetchTvShows(),
        enabled: activeTab === DisplayType.TvShows,
    });

    if (localStorage.getItem("guest_session_id") === null) {
        return <Navigate to="/auth" />;
    }

    const panes = [
        {
            menuItem: "Movies",
            render: () => (
                <Tab.Pane>
                    {isLoadingMovies ? (
                        <div className="loading">Loading...</div>
                    ) : movies?.results ? (
                        <ColumnDisplay
                            data={movies.results}
                            displayType={DisplayType.Movies}
                        />
                    ) : null}
                </Tab.Pane>
            ),
        },
        {
            menuItem: "TV Shows",
            render: () => (
                <Tab.Pane>
                    {isLoadingTvShows ? (
                        <div className="loading">Loading...</div>
                    ) : tvShows?.results ? (
                        <ColumnDisplay
                            data={tvShows.results}
                            displayType={DisplayType.TvShows}
                        />
                    ) : null}
                </Tab.Pane>
            ),
        },
    ];

    return (
        <div className="container">
            <Tab
                panes={panes}
                activeIndex={activeTab === DisplayType.Movies ? 0 : 1}
                onTabChange={(_, data) => {
                    setActiveTab(data.activeIndex === 0 ? DisplayType.Movies : DisplayType.TvShows);
                }}
            />
        </div>
    );
};