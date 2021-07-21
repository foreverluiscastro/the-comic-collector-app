import { useState } from "react";
import { useHistory } from "react-router";
import styled from "styled-components";
import ReactMarkdown from "react-markdown";
import { Button, Error, FormField, Input, Label, Textarea } from "../styles";

function NewComic({ user }) {
  const [title, setTitle] = useState("Enter Comic Title Here");
  const [img_url, setImgUrl] = useState("Add an Image Link");
  const [price, setPrice] = useState("30.00");
  const [description, setDescription] = useState("Add a Description");
  const [creators, setCreators] = useState("Add the Creator(s)");
  const [publisher, setPublisher] = useState("Add a Publisher");
  const [errors, setErrors] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const history = useHistory();

  function handleSubmit(e) {
    e.preventDefault();
    setIsLoading(true);
    fetch("/comics", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title,
        publisher,
        creators,
        img_url,
        description,
        price: price,
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
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              onClick={() => setTitle("")}
            />
          </FormField>
          <FormField>
            <Label htmlFor="creators">Creator(s)</Label>
            <Input
              type="text"
              id="creators"
              value={creators}
              onChange={(e) => setCreators(e.target.value)}
              onClick={() => setCreators("")}
            />
          </FormField>
          <FormField>
            <Label htmlFor="publisher">Publisher</Label>
            <Input 
              type="text"
              id="publisher"
              value={publisher}
              onChange={(e) => setPublisher(e.target.value)}
              onClick={() => setPublisher("")}
            />
          </FormField>
          <FormField>
            <Label htmlFor="price">Price</Label>
            <Input
            type="float"
            id="price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            />
          </FormField>
          <FormField>
            <Label htmlFor="imgUrl">Image URL Link</Label>
            <Input
              type="text"
              id="imgUrl"
              value={img_url}
              onChange={(e) => setImgUrl(e.target.value)}
              onClick={() => setImgUrl("")}
            />
          </FormField>
          <FormField>
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              rows="10"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              onClick={() => setDescription("")}
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
        <h1>{title}</h1>
        <p>
          <em>Created by: {creators}</em>
          &nbsp;·&nbsp;
          <cite>Published by: {publisher}</cite>

          <p>Price: ${price}</p>
        </p>
        <img src={img_url} alt=""/>
        <ReactMarkdown>{description}</ReactMarkdown>
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

export default NewComic;