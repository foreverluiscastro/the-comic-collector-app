import React, { useState, useEffect } from "react";
import { useHistory } from "react-router";
import styled from "styled-components";
import ReactMarkdown from "react-markdown";
import { Button, Error, FormField, Input, Label, Textarea } from "../styles";

function EditComic(props) {
  const [errors, setErrors] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const history = useHistory();
  const [comic, setComic] = useState([])

  useEffect(() => {
    fetch(`/comics/${props.match.params.id}`)
    .then((r) => r.json())
    .then(setComic);
  }, [props.match.params.id]);

  function handleSubmit(e) {
    e.preventDefault();
    setIsLoading(true);
    fetch(`/comics/${props.match.params.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify({
        title: comic.title,
        publisher: comic.publisher,
        creators: comic.creators,
        img_url: comic.img_url,
        description: comic.description,
        price: comic.price,
      }),
    }).then((r) => {
      setIsLoading(false);
      if (r.ok) {
        history.push("/comics");
      } else {
        r.json().then((err) => setErrors(err.errors));
      }
    });
  }

  return (
    <Wrapper>
      <WrapperChild>
        <h2>Add Comic Book</h2>
        <form onSubmit={handleSubmit}>
          <FormField>
            <Label htmlFor="title">Title</Label>
            <Input
              type="text"
              id="title"
              value={comic.title}
              onChange={(e) => setComic({ title: e.target.value})}
            />
          </FormField>
          <FormField>
            <Label htmlFor="creators">Creator(s)</Label>
            <Input
              type="text"
              id="creators"
              value={comic.creators}
              onChange={(e) => setComic({ creators: e.target.value})}
            />
          </FormField>
          <FormField>
            <Label htmlFor="publisher">Publisher</Label>
            <Input 
              type="text"
              id="publisher"
              value={comic.publisher}
              onChange={(e) => setComic({ publisher: e.target.value})}
            />
          </FormField>
          <FormField>
            <Label htmlFor="price">Price</Label>
            <Input
            type="float"
            id="price"
            value={comic.price}
            onChange={(e) => setComic({ price: e.target.value})}
            />
          </FormField>
          <FormField>
            <Label htmlFor="imgUrl">Image URL Link</Label>
            <Input
              type="text"
              id="imgUrl"
              value={comic.img_url}
              onChange={(e) => setComic({ img_url: e.target.value})}
            />
          </FormField>
          <FormField>
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              rows="10"
              value={comic.description}
              onChange={(e) => setComic({ description: e.target.value})}
            />
          </FormField>
          <FormField>
            <Button color="primary" type="submit">
              {isLoading ? "Loading..." : "Submit Comic"}
            </Button>
          </FormField>
          <FormField>
            {errors.map((err) => (
              <Error key={err}>{err}</Error>
            ))}
          </FormField>
        </form>
      </WrapperChild>
      <WrapperChild>
        <h1>{comic.title}</h1>
        <p>
          <em>Created by: {comic.creators}</em>
          &nbsp;·&nbsp;
          <cite>Published by: {comic.publisher}</cite>

          <p>Price: ${comic.price}</p>
        </p>
        <img src={comic.img_url} alt=""/>
        <ReactMarkdown>{comic.description}</ReactMarkdown>
      </WrapperChild>
    </Wrapper>
  );
}

const Wrapper = styled.section`
  max-width: 1000px;
  margin: 40px auto;
  padding: 16px;
  display: flex;
  gap: 24px;
  background: #eee;
  border-radius: 6px;
  box-shadow: 0 0.5em 10em -0.125em rgb(10 10 10 / 25%),
    0 0 0 1px rgb(10 10 10 / 6%);
`;

const WrapperChild = styled.div`
  flex: 1;
`;

export default EditComic;