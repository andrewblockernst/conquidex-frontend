const AVATARS: { [key: number]: string } = {
    1: "/images/avatar_conqui.png",
    2: "/images/avatar_counselor.png",
    3: "/images/avatar_staff.png",
    0: "/images/avatar_default.png"
};

interface Props {
    person: Person;
}

const PersonCard = ({ person }: Props) => {

    const avatar = AVATARS[person.role_id] || AVATARS[0];

    return (
        <div className="flex items-center my-2 p-4 bg-gray-200 rounded-lg shadow-lg">
            <img
                src={avatar}
                alt={person.name!}
                className="w-12 h-12 rounded-full"
            />
            <div className="ml-4">
                <h2 className="text-lg font-semibold">{person.name} {person.nickname ? `"${person.nickname}"`:""} {person.surname}</h2>
                <p className="text-sm text-gray-500">{person.email}</p>
            </div>
        </div>
    );
}

export default PersonCard;