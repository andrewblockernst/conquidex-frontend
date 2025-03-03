interface Props{
    unit: Unit;
}

function UnitCard({unit}: Props) {
  return (
    <div className="flex items-center justify-center my-2 p-4 rounded-lg shadow-[4px_4px_0_0_#323232] border-2 border-slate-800" style={{ backgroundColor: unit.color }}>
        <h2 className="w-full text-lg truncate text-center font-semibold">
            {unit.name}
        </h2>
    </div>
  )
}

export default UnitCard