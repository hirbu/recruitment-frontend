import { EntitySelect } from "@/app/components/EntitySelect";
import City from "@/interfaces/City";
import LocationOnIcon from "@mui/icons-material/LocationOn";

interface CitiesSelectProps {
  cities: City[];
  setCities: (cities: City[]) => void;
  required?: boolean;
}

const CitiesSelect = ({
  cities,
  setCities,
  required = false,
}: CitiesSelectProps) => {
  return (
    <EntitySelect<City>
      value={cities}
      setValue={setCities}
      endpoint="/api/cities"
      queryParam="name"
      label="Cities"
      placeholder="Search for cities"
      getOptionLabel={(city) => city.name}
      getOptionKey={(city) => city.id}
      required={required}
      icon={<LocationOnIcon />}
    />
  );
};

export default CitiesSelect;
