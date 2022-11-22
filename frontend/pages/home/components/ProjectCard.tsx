import { useNavigate } from "react-router-dom";
import { PrimaryButton, Txt } from "../../../components/elements";
import { Project } from "../../../types";

type ProjectCardProps = {
  project: Project;
};

/** Single project with some information and nav button. */
export const ProjectCard = ({ project }: ProjectCardProps) => {
  // Data
  const { id, name, description } = project;

  // Router
  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate(`/projects/${id}`);
  };

  return (
    <div className="bg-gray-100 rounded-xl p-5 grid gap-4 hover:scale-105 transition-transform duration-300 ease-out">
      <Txt className="font-semibold">{name}</Txt>
      <Txt>{description}</Txt>

      <PrimaryButton onClick={handleNavigate}>View Details</PrimaryButton>
    </div>
  );
};
