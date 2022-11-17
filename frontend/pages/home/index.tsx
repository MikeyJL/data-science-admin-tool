import { useQuery } from "@tanstack/react-query";
import { Txt } from "../../components/elements";
import { axiosClient } from "../../helpers";
import { Project } from "../../types";

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
      <Txt type="title" className="mb-4">
        Dashboard
      </Txt>

      {/* Projects */}
      {isLoading || !data || data.length === 0 ? (
        <p>Loading...</p>
      ) : (
        <div className="p-5 bg-gray-100 rounded-xl">
          <Txt type="subtitle" className="mb-4">
            Projects
          </Txt>

          {data.map(({ id, name, description }) => (
            <div key={id} className="flex">
              <Txt className="mr-4">{name}</Txt>
              <Txt>{description}</Txt>
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default HomePage;
