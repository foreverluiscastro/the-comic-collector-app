import React from 'react';
import styled from 'styled-components';

function HomePage() {
    return (
        <Wrapper>
            <h1>Welcome to The Comic Collector App!</h1>
            <p>This application will allow you to keep a record of all the comic books you collect, as well as let you see what books other users are currently collecting.</p>
            
        </Wrapper>
    )
};

const Wrapper = styled.section`
  max-width: 500px;
  font-family: "Permanent Marker";
  text-shadow: -2px -2px 0 #000, 2px -2px 0 #000, -2px 2px 0 #000, 2px 2px 0 #000;
  font-size: 30px;
  color: deeppink;
  margin: 40px auto;
  padding: 16px;
  gap: 24px;
  text-align: center;
`;

export default HomePage;