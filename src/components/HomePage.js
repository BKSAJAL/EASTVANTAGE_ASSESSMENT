import axios from "axios";
import { useEffect, useState } from "react";
import { Button, Box, Typography, Stack } from "@mui/material";

const HomePage = () => {
  const [name, setName] = useState(null);
  const [email, setEmail] = useState(null);

  const performUpdate = (userObj) => {    
    localStorage.setItem("User", JSON.stringify(userObj.results[0]));
    const { name, email } = userObj.results[0];
    let concatName = name.title + " " + name.first + " " + name.last;
    setName(concatName);
    setEmail(email);
  };

  const getData = async () => {
    const res = await axios.get("https://randomuser.me/api");
    return res.data;
  };

  useEffect(() => {
    (async () => {
      const userObj = await getData();
      performUpdate(userObj);
    })();
  }, []);

  return (
    <div
      style={{
        height: "100vh",
        width: "100vw",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",        
      }}
    >
      <Box style={{border:"1px solid black",padding:'1.5rem',borderRadius:"1.5rem"}}>
        <Stack>
          <Typography variant="h6">{name}</Typography>

          <Typography variant="h6" gutterBottom>{email}</Typography>

          <Button
            variant="contained"
            onClick={async () => {
              const res = await getData();
              performUpdate(res);
            }}
          >
            Refresh
          </Button>
        </Stack>
      </Box>
    </div>
  );
};

export default HomePage;
