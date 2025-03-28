"use client";

import Application from "@/app/posting/[id]/Application";
import { useSnackbar } from "@/contexts/SnackbarContext";
import ApplicationInterface from "@/interfaces/Application";
import Posting from "@/interfaces/Posting";
import { authService } from "@/services/auth";
import { Chip, Divider } from "@mui/material";
import { useEffect, useState } from "react";

interface ApplicationsProps {
  posting: Posting;
}

const Applications = ({ posting }: ApplicationsProps) => {
  const { showSnackbar } = useSnackbar();

  const [applications, setApplications] = useState<ApplicationInterface[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const data = await authService.getApplications(posting.id.toString());
        setApplications(data);
      } catch (error: Error | unknown) {
        const errorMessage = error instanceof Error ? error.message : "Error fetching applications";
        showSnackbar(errorMessage, "error");
      } finally {
        setLoading(false);
      }
    };

    fetchApplications();
  }, [posting.id, showSnackbar]);

  return (
    <div className="my-5">
      <Divider textAlign="left">
        <Chip label="APPLICATIONS" size="medium" />
      </Divider>

      <div className="mt-5 flex flex-col gap-5">
        {!loading && applications.length === 0 ? (
          <p>No applications were found.</p>
        ) : (
          applications.map((application) => (
            <Application key={application.id} application={application} />
          ))
        )}
      </div>
    </div>
  );
};

export default Applications;
