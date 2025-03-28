"use client";

import { EntityModal } from "@/app/components/EntityModal";

const TagsModal = () => {
  return <EntityModal name="Tags" endpoint="/api/tags" />;
};

export default TagsModal;
