import { Container, Menu, Segment } from "semantic-ui-react";
import { useState } from "react";
import { DisplayType } from "../home";
import { Header } from "semantic-ui-react";


export const Rated = () => {
    const [activeTabs, setActiveTabs] = useState<string>(DisplayType.Movies);
    return (
    <Container style={{marginTop: "50px"}}> 
        {" "}
        <Menu pointing secondary>
            <Menu.Item name="Movies" active={activeTabs === DisplayType.Movies} 
            onClick={() => setActiveTabs(DisplayType.Movies)}
            />

            <Menu.Item name="Tv Shows" active={activeTabs === DisplayType.TvShows} 
            onClick={() => setActiveTabs(DisplayType.TvShows)}
            />

        </Menu>
        <Segment>
            {activeTabs === DisplayType.Movies ? (
                <div> 
                {" "}
                <Header as={"h2"}> Rated Movies</Header>{" "}
                </div>
                ): ("TV Shows"
                )}
        </Segment>
        </Container>
        );
};
