import React from 'react';
import { Link } from 'react-router-dom';
import styled from "styled-components";
import '../App.css';


const PublicComicLink = ({comic}) => {
  // console.log({comic})
    return (
        <div>
            <Link to={`/allcomics/${comic.id}`}>
                <Logo><img className="thumbnail" src={comic.img_url} alt=""/>{comic.title} uploaded by: {comic.user.username}</Logo>
            </Link>
        </div>
    )
}

const Logo = styled.h1`
  font-family: "Permanent Marker", cursive;
  font-size: 40px;
  color: purple;
  text-shadow: -2px -2px 0 #000, 2px -2px 0 #000, -2px 2px 0 #000, 2px 2px 0 #000;
  margin: 0;
  line-height: 1;

  a {
    color: inherit;
    text-decoration: none;
  }
`;

export default PublicComicLink;