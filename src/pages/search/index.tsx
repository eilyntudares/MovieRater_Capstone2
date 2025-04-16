import { useSearchParams } from "react-router-dom";
import { ColumnDisplay } from "../home/column-display";
import { DisplayType } from "../home";
import { useQuery } from "@tanstack/react-query";
import { fetchMovies, fetchTvShows } from "../home/query";
import { Navigate } from "react-router-dom";
import { useEffect } from "react";

export const Search = () => {
    const [searchParams] = useSearchParams();
    const query = searchParams.get("q") || "";
    const type = searchParams.get("type") || DisplayType.Movies;

    const { data: movieData, isLoading: isLoadingMovies } = useQuery({
        queryKey: ["movies", query],
        queryFn: () => fetchMovies(query),
        enabled: type === DisplayType.Movies && query.length > 0,
    });

    const { data: tvShowData, isLoading: isLoadingTvShows } = useQuery({
        queryKey: ["tvshows", query],
        queryFn: () => fetchTvShows(query),
        enabled: type === DisplayType.TvShows && query.length > 0,
    });

    if (localStorage.getItem("guest_session_id") === null) {
        return <Navigate to="/auth" />;
    }

    const data = type === DisplayType.Movies ? movieData?.results : tvShowData?.results;

    return (
        <div style={{ marginTop: 50, padding: '0 20px' }}>
            <h2 style={{ marginBottom: '20px', color: '#6a1b9a' }}>
                {query ? (
                    <>Search Results for "{query}" in {type === DisplayType.Movies ? "Movies" : "TV Shows"}</>
                ) : (
                    <>Please enter a search query</>
                )}
            </h2>
            {isLoadingMovies || isLoadingTvShows ? (
                <div>Loading...</div>
            ) : data && data.length > 0 ? (
                <ColumnDisplay
                    data={data}
                    displayType={type as DisplayType}
                />
            ) : query ? (
                <div style={{ fontSize: '1.2rem', color: '#666' }}>No results found for "{query}"</div>
            ) : null}
        </div>
    );
}; 