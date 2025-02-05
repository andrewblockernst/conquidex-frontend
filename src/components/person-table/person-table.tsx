import { Group } from "lucide-react";
import PersonCard from "../person-card/person-card";
import GroupCard from "./group-card/group-card";

interface Props {
    data: GroupData[];
    groupType: 'units' | 'classes';
}

const PersonTable = ({ data, groupType }: Props) => {
  return(
    <div className="w-full">
    {data?.map(group => (
      <GroupCard
        key={groupType === 'units' ? (group as UnitGroup).unit_id : (group as ClassGroup).class_id}
        name={groupType === 'units' ? (group as UnitGroup).unit_name : (group as ClassGroup).class_name}
        color={group.color}
      >
          {group.persons.map(person => (
            <PersonCard key={person.id} person={person} />
          ))}
      </GroupCard>

    ))}
  </div>
)};

export default PersonTable;