"use client";

import { useUser } from "@/contexts/UserContext";
import Posting from "@/interfaces/Posting";
import { CircularProgress } from "@mui/material";
import Applications from "./Applications";
import NewApplication from "./NewApplication";

interface ApplicationSectionProps {
  posting: Posting;
}

const ApplicationSection = ({ posting }: ApplicationSectionProps) => {
  const { user, loading } = useUser();

  if (loading) {
    return (
      <div className="mt-5 flex h-full items-center justify-center">
        <CircularProgress />
      </div>
    );
  }

  if (!user || posting.owner.id !== user.id) {
    return <NewApplication posting={posting} />;
  }

  return <Applications posting={posting} />;
};

export default ApplicationSection;
