import { useQuery } from "@tanstack/react-query";
import { Txt } from "../../components/elements";
import { axiosClient } from "../../helpers";
import { Project } from "../../types";
import { ProjectCard } from "./components";

const HomePage = () => {
  // Query
  const { data, isLoading } = useQuery<Project[] | undefined>(
    ["projects"],
    ({ signal }) =>
      axiosClient
        .get("projects", {
          signal,
        })
        .then((res) => JSON.parse(res.data))
  );

  return (
    <>
      {/* Heading */}
      <Txt type="subtitle" className="mb-4">
        Projects
      </Txt>

      {/* Projects */}
      {isLoading || !data || data.length === 0 ? (
        <p>Loading...</p>
      ) : (
        <div className="grid grid-cols-3 gap-8">
          {data.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      )}
    </>
  );
};

export default HomePage;
