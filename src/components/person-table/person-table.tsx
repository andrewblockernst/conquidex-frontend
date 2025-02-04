import PersonCard from "../person-card/person-card";

interface Props {
    data: GroupData[];
    groupType: 'units' | 'classes';
}

const PersonTable = ({ data, groupType }: Props) => (
    <div>
    {data?.map(group => (
      <div key={groupType === 'units' 
        ? (group as UnitGroup).unit_id 
        : (group as ClassGroup).class_id
      }>
        <h2>{groupType === 'units' 
          ? (group as UnitGroup).unit_name 
          : (group as ClassGroup).class_name
        }</h2>
        <div>
          {group.persons.map(person => (
            <PersonCard key={person.id} person={person} />
          ))}
        </div>
      </div>
    ))}
  </div>
  );

export default PersonTable;