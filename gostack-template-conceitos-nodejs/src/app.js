const express = require("express");
const { uuid, isUuid } = require("uuidv4")
const cors = require("cors");

// const { v4: uuid } = require('uuid');

const app = express();

app.use(express.json());
app.use(cors());

const repositories = [];

app.get("/repositories", (request, response) => {
  // TODO
    return response.json(repositories);
});

app.post("/repositories", (request, response) => {
  // TODO
    const { title, url, techs } = request.body;

    const repositorie = {
      id: uuid(),
      title,
      url,
      techs,
      likes: 0,
    };

    repositories.push(repositorie)

    return response.json(repositorie);
});

app.put("/repositories/:id", (request, response) => {
  // TODO
  const { id } = request.params;
  const {title, url, techs} = request.body;

  const projectIndex = repositories.findIndex(repositorie => repositorie.id === id);

  if (projectIndex < 0) {
    return response.status(400).json({error: 'project not found.'});
  }

  const repositorie = {
    id,
    title,
    url,
    techs,
  };

  repositories[projectIndex] = repositorie;

  return response.json(repositorie)
});

app.delete("/repositories/:id", (request, response) => {
  // TODO
  const { id } = request.params;

  const projectIndex = repositories.findIndex(repositorie => repositorie.id === id);

  if (projectIndex < 0) {
    return response.status(400).json({error: 'project not found.'});
  }

  repositories.splice(projectIndex, 1)

  return response.status(204).send()
});

app.post("/repositories/:id/like", (request, response) => {
  // TODO
  const { id } = request.params;

  const findRepositoryIndex = repositories.findIndex(repository =>
    repository.id === id
  );

  if (findRepositoryIndex === -1) {
    return response.status(400).json({ error: 'Repository does not exists.' });
  }

  repositories[findRepositoryIndex].likes += 1;

  return response.json(repositories[findRepositoryIndex]);
});

module.exports = app;
