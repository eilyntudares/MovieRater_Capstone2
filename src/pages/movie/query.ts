export const fetchMovieDetails  = async (movieId: string) => {
    const res = await fetch(
         `https://api.themoviedb.org/3/movie/${movieId}?language=en-US&page=1 `, 
       {
           headers: {
               Authorization: 
               "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiZTE5YjdlYTI1YmYzMDYyYjI1MDM1YWQ3ODNkYmRlYSIsIm5iZiI6MTczOTAzOTYxMy43Nzc5OTk5LCJzdWIiOiI2N2E3YTM3ZDFjMGYzYWJmODdlMDc2MWUiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.rEfbJfpxv0po8FUa_26GCb-2XWBDYUS4v2DC2s1RtbQ"
           },
       }
    );

    return res.json();
};