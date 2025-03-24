import { EntitySelect } from "@/app/components/EntitySelect";
import Tag from "@/entities/Tag";
import LabelIcon from "@mui/icons-material/Label";

interface TagsSelectProps {
  tags: Tag[];
  setTags: (tags: Tag[]) => void;
}

const TagsSelect = ({ tags, setTags }: TagsSelectProps) => {
  return (
    <EntitySelect<Tag>
      value={tags}
      setValue={setTags}
      endpoint="/api/tags"
      queryParam="name"
      label="Tags"
      placeholder="Search for tags"
      getOptionLabel={(tag) => tag.name}
      getOptionKey={(tag) => tag.id}
      icon={<LabelIcon />}
      required={true}
    />
  );
};

export default TagsSelect;
