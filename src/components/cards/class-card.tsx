interface Props{
    userClass: ClassWithItems;
}

function ClassCard({userClass}: Props) {
  return (
    <div className="flex items-center my-2 p-4 rounded-lg shadow-[4px_4px_0_0_#323232] border-2 border-slate-800" style={{ backgroundColor: userClass.color }}>
      <div className="ml-4">
        <h2 className="text-lg font-semibold">
            {userClass.name}
        </h2>
        <p className="text-sm text-gray-500"></p>
      </div>
    </div>
  )
}

export default ClassCard