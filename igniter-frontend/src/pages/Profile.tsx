import React, { useState, useEffect } from "react";
import { DisplayProjects } from "../components";
import { useStateContext } from "../context";

// Define the Project interface
interface Project {
  founder: string;
  title: string;
  description: string;
  deadline: number;
}

const Profile = () => {
  // Initialize state variables with appropriate types
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [liveProjects, setLiveProjects] = useState<Project[]>([]);
  const [archivedProjects, setArchivedProjects] = useState<Project[]>([]);

  // Get address, contract, and getUserProjects from the context
  const { address, contract, getUserProjects } = useStateContext();

  // Fetch and filter user's projects
  const fetchProjects = async () => {
    setIsLoading(true);
    const data = await getUserProjects();
    if (data) {
      filterLiveAndArchivedProjects(data);
    }
    setIsLoading(false);
  };

  // Filter user's projects into live and archived
  const filterLiveAndArchivedProjects = (data: Project[]) => {
    // Create arrays to store archived and live projects
    const archivedProjectsArray: Project[] = [];
    const liveProjectsArray: Project[] = [];
    // Loop through each project and check if the deadline has passed or not;
    data.forEach((project) => {
      // If deadline has passed, push project into archived
      if (project.deadline < Date.now()) {
        archivedProjectsArray.push(project);
      }
      // If deadline has not passed, push project into live projects
      else {
        liveProjectsArray.push(project);
      }
    });
    // Set state variables for live and archived projects using the arrays
    setLiveProjects(liveProjectsArray);
    setArchivedProjects(archivedProjectsArray);
  };

  // Fetch user's projects when component mounts or updates
  useEffect(() => {
    if (contract) fetchProjects();
  }, [address, contract]);

  // Render two DisplayProjects components for live and archived projects
  return (
    <div>
      <DisplayProjects
        title="My Live Projects"
        isLoading={isLoading}
        projects={liveProjects}
      />
      <DisplayProjects
        title="My Archived Projects"
        isLoading={isLoading}
        projects={archivedProjects}
      />
    </div>
  );
};

export default Profile;
