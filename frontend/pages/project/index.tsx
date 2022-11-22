import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Txt } from "../../components/elements";
import { axiosClient } from "../../helpers";
import { Project } from "../../types";

const ProjectPage = () => {
  // Router
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  // Query
  const { data, isLoading, isError } = useQuery<Project>(
    ["project"],
    ({ signal }) =>
      axiosClient
        .get(`projects/${id}`, {
          signal,
        })
        .then((res) => JSON.parse(res.data))
  );

  useEffect(() => {
    if (isError) navigate("/404");
  }, [isError]);

  if (isLoading) return <Txt>Loading...</Txt>;

  const { name, description } = data as Project;

  return (
    <>
      <Txt type="title" className="mb-4">
        {name}
      </Txt>
      <Txt type="subtitle">{description}</Txt>
    </>
  );
};

export default ProjectPage;
