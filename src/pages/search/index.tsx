import { useSearchParams, Navigate } from "react-router-dom";
import { ColumnDisplay } from "../home/column-display";
import { DisplayType } from "../home";
import { useQuery } from "@tanstack/react-query";
import { fetchMovies, fetchTvShows } from "../home/query";

export const Search = () => {
    const [searchParams] = useSearchParams();
    const query = searchParams.get("q");
    const type = searchParams.get("type") || "movie";

    // If there's no search query, redirect to home
    if (!query?.trim()) {
        return <Navigate to="/" replace />;
    }

    const { data: movieData, isLoading: isLoadingMovies } = useQuery({
        queryKey: ["search-movies", query],
        queryFn: () => fetchMovies(query),
        enabled: type === "movie",
    });

    const { data: tvShowData, isLoading: isLoadingTvShows } = useQuery({
        queryKey: ["search-tvshows", query],
        queryFn: () => fetchTvShows(query),
        enabled: type === "tv",
    });

    if (localStorage.getItem("guest_session_id") === null) {
        return <Navigate to="/auth" />;
    }

    const data = type === "movie" ? movieData?.results : tvShowData?.results;

    return (
        <div className="container">
            <h2 style={{color:"#d6d5c9"}} className="search-title">
                Search Results for "{query}" in {type === "movie" ? "Movies" : "TV Shows"}
            </h2>
            {isLoadingMovies || isLoadingTvShows ? (
                <div style={{color:"#d6d5c9"}} className="loading">Loading...</div>
            ) : data && data.length > 0 ? (
                <ColumnDisplay
                    data={data}
                    displayType={type === "movie" ? DisplayType.Movies : DisplayType.TvShows}
                />
            ) : (
                <div style={{color:"#d6d5c9"}} className="no-results">No results found for "{query}"</div>
            )}
        </div>
    );
}; 