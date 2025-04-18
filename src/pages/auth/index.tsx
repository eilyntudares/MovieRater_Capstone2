import { Grid, Header, Form, Segment, Button } from "semantic-ui-react";
import { useMutation} from "@tanstack/react-query";
import { mutationLogin } from "./mutation";
import { useNavigate } from 'react-router-dom';
import { useState } from "react";

export const Auth = () => {
  const { data, mutate } = useMutation({
    mutationKey: ["login"],
    mutationFn: mutationLogin,
  });

  const navigate = useNavigate();
  const[isHovered, setIsHovered] = useState(false);

  const handleLogin = async () => {
    await mutate();
    localStorage.setItem("guest_session_id", data.guest_session_id);
    navigate("/");
  }; 


  return (
    <Grid textAlign="center" verticalAlign="middle" style={{ height: "100vh"}}>
        <Grid.Column style={{ maxWidth: 450 }}>
            <Header as="h2" style={{color:"#d6d5c9"}} textAlign="center">
                Welcome! Login by registering as a Guest below
            </Header>
            <Form size="large">
                <Button 
                  fluid onClick={handleLogin} onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}
                  style= {{backgroundColor: isHovered ? '#5e2a6b' : '#4b1036', color: "#f5f5f5"}} size= "large"> 
                  {" "}
                  Login </Button>
            </Form>
        </Grid.Column>
    </Grid>
 
  );
};

export default Auth;
 