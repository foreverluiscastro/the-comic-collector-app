import React, { useState, useEffect } from 'react'
import { Box } from '../styles';
import ReactMarkdown from 'react-markdown';
import styled from "styled-components";


function PublicComicPage(props) {
    const [comic, setComic] = useState([])

    useEffect(() => {
        fetch(`/allcomics/${props.match.params.id}`)
        .then((r) => r.json())
        .then(setComic);
    }, [props.match.params.id]);
    

    return (
        <Wrapper>
            <Box>
                <h2>{comic.title}</h2>
                    <p>
                        <img src={comic.img_url} alt=""/>
                        <br/>
                        <em>Created by: {comic.creators}</em>
                        &nbsp;·&nbsp;
                        <cite>Published by: {comic.publisher}</cite>
                        <p>${comic.price}</p>
                    </p>
                <ReactMarkdown>{comic.description}</ReactMarkdown>
            </Box>
        </Wrapper>
    )
}

const Wrapper = styled.section`
  max-width: 800px;
  margin: 40px auto;
  text-align: center;
`;

export default PublicComicPage;