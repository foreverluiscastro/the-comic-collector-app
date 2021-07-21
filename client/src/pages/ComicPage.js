import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router';
import { Box, Button } from '../styles';
import { Link } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import styled from "styled-components";


function ComicPage(props) {
    const [comic, setComic] = useState([])
    const history = useHistory();

    useEffect(() => {
        fetch(`/comics/${props.match.params.id}`)
        .then((r) => r.json())
        .then(setComic);
    }, [props.match.params.id]);

    const deleteComic = (id) => {
        fetch(`/comics/${props.match.params.id}`, {
            method: "DELETE",
            headers: {
                'Content-Type': 'application/json'
            },
        })
        .then(() => {
            history.push("/comics")
        })
    }

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
                <Button as={Link} to={`/comics/${comic.id}/edit`}>
                    Edit Comic
                </Button>
                
                <Button onClick={() => deleteComic(comic.id)}>
                    Remove Comic
                </Button>
            </Box>
        </Wrapper>
    )
}

const Wrapper = styled.section`
  max-width: 800px;
  margin: 40px auto;
  text-align: center;
`;

export default ComicPage;