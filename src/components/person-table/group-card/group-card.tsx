interface Props {
    name: string;
    color: string;
    children: React.ReactNode;
}

const GroupCard = ({name, color, children}: Props) => {
    const groupColor = '#'+color;
  return (
    <div className="my-2 rounded-lg shadow-md p-4" style={{backgroundColor: groupColor}}>
        <h2>{name}</h2>
        <div>
            {children}
        </div>
    </div>
  )
}

export default GroupCard;
