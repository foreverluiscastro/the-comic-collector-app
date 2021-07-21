import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import ComicLink from "../components/ComicLink";
import { Button } from "../styles";

function ComicList() {
  const [comics, setComics] = useState([]);

  useEffect(() => {
    fetch("/comics")
      .then((r) => r.json())
      .then(setComics);
  }, []);

  return (
    <Wrapper>
      {comics.length > 0 ? (
        comics.map((comic) => (
          <ComicLink key={comic.id} comic={comic}/>
        ))
      ) : (
        <>
          <h2>No Comics Found</h2>
          <Button as={Link} to="/new">
            Add a New Comic
          </Button>
        </>
      )}
    </Wrapper>
  );
}

const Wrapper = styled.section`
  max-width: 800px;
  margin: 40px auto;
`;

export default ComicList;