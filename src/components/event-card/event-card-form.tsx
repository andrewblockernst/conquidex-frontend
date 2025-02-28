import { useState, useEffect } from "react";
import RelativeTime from "../dates/relative-time";
import { useUser } from "@/contexts/UserContext";
import { useSearchParams } from "next/navigation";
import { urlToDate } from "@/lib/utils";
import Link from "next/link";
import { EVENTS as PARAMS } from "@/constants/url-params";

interface Props {
  event?: ClubEvent;
  onSubmit?: (formData: EventInsert | EventUpdate) => void;
}

//REUSABLE CARD FORM FOR BOTH INSERT AND UPDATE
//Params: new=y to create | edit=event.id to update
function EventCardForm({ event, onSubmit }: Props) {
  const [isExpanded, setIsExpanded] = useState(false);
  const { club_id: clubId } = useUser().activeProfile!;
  const [loading, setLoading] = useState(false);
  const searchParams = useSearchParams();
  
  // Format ISO date to YYYY-MM-DD for the date input
  const formatDateForInput = (date: Date) => {
    return date.toISOString().split('T')[0]; // Returns YYYY-MM-DD
  };

  //If form was created from a specific date, use that date as default
  const paramsDate = searchParams.get("date");
  const defaultDay = paramsDate ? urlToDate(paramsDate) : new Date(); //if not, create today's date

  // We'll keep a display version for the input and an ISO version for submission
  const [displayDate, setDisplayDate] = useState(formatDateForInput(defaultDay));

  // Remove the edit parameter from the URL when canceling
  const cancelParams = new URLSearchParams(searchParams.toString());
  cancelParams.delete(PARAMS.edit);
  cancelParams.delete(PARAMS.new);
  
  //event props come first in case we're just updating an existing event and passing down its data
  const [formData, setFormData] = useState<EventInsert | EventUpdate>({
    city: event?.city || null,
    club_id: clubId!,
    color: event?.color || '#FFFFFF',
    // Store the full ISO string for PostgreSQL
    date: event?.date || defaultDay.toISOString(),
    description: event?.description || null,
    id: event?.id || undefined,
    name: event?.name || '',
    state: event?.state || null,
    street: event?.street || null,
    street_number: event?.street_number || null,
    country: event?.country || null,
  });

  const handleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setDisplayDate(value);
    // Convert the YYYY-MM-DD to a full ISO string for PostgreSQL
    // This preserves the time and timezone information
    const newDate = new Date(value);
    
    // Set the time to noon to avoid timezone issues (optional)
    newDate.setHours(12, 0, 0, 0);
    
    // Update formData with the ISO string for PostgreSQL
    setFormData({ ...formData, [name]: newDate.toISOString() });
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    if (onSubmit) {
      // formData already contains the date in ISO format for PostgreSQL
      onSubmit(formData);
    }
    setLoading(false);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="p-3 md:p-4 rounded-md border-2 border-gray-300 shadow-lg"
      style={{ backgroundColor: formData.color! }}
      id="event-form"
    >
      {/* Header Section */}
      <div className="flex flex-wrap md:flex-nowrap justify-between items-center p-1 md:p-2 gap-2">
        <input
          name="name"
          className="text-xl font-bold overflow-hidden whitespace-pre-wrap w-full md:flex-grow p-2 border rounded-md"
          value={formData.name}
          onChange={handleInputChange}
          placeholder="Título"
          required
        />
        <div className="w-full flex items-center justify-between gap-2">
          <label htmlFor="color">Color:</label>
          <input
            type="color"
            id="color"
            name="color"
            value={formData.color || "#FFFFFF"}
            onChange={handleInputChange}
            className="w-8 h-8 md:w-10 md:h-10 border-none rounded-full"
          />
          <div className="whitespace-nowrap">
            <RelativeTime datetime={displayDate} lang="es"  />
          </div>
          <button
            type="button"
            onClick={handleExpand}
            className={`bg-transparent text-black text-xl font-bold transform transition-transform ${
              isExpanded ? "rotate-180" : "rotate-0"
            }`}
            aria-label={isExpanded ? "Collapse form" : "Expand form"}
          >
            ▼
          </button>
        </div>
      </div>

      {/* Expanded Form Section */}
      {isExpanded && (
        <div className="mt-3 md:mt-4">
          <div className="bg-gray-100 p-3 md:p-4 rounded-lg shadow-inner border border-gray-300">
            <main className="space-y-3">
              {/* Address Section */}
              <section className="flex flex-col md:flex-row md:items-center gap-2 md:gap-3">
                <div className="w-full md:w-3/5 flex gap-2">
                  <input
                    name="street"
                    value={formData.street || ""}
                    type="text"
                    className="w-full p-2 border rounded-md max-w-60"
                    onChange={handleInputChange}
                    placeholder="Calle"
                  />
                  <input
                    name="street_number"
                    value={formData.street_number || ""}
                    type="text"
                    className="p-2 border rounded-md max-w-14"
                    onChange={handleInputChange}
                    placeholder="N°"
                  />
                </div>
                <div className="w-full md:w-2/5">
                  <input
                    name="city"
                    value={formData.city || ""}
                    type="text"
                    className="p-2 border rounded-md w-full"
                    onChange={handleInputChange}
                    placeholder="Ciudad"
                  />
                </div>
              </section>

              {/* Region Section */}
              <section className="flex flex-col md:flex-row md:items-center gap-2 md:gap-3">
                <div className="w-full md:w-1/3">
                  <input
                    name="state"
                    value={formData.state || ""}
                    type="text"
                    className="p-2 border rounded-md w-full"
                    onChange={handleInputChange}
                    placeholder="Provincia"
                  />
                </div>
                <div className="w-full md:w-1/3">
                  <input
                    name="country"
                    value={formData.country || ""}
                    type="text"
                    className="p-2 border rounded-md w-full"
                    onChange={handleInputChange}
                    placeholder="País"
                  />
                </div>
                <div className="w-full md:w-1/3">
                  <input
                    name="date"
                    value={displayDate}
                    type="date"
                    className="p-2 border rounded-md w-full"
                    onChange={handleDateChange}
                    disabled={paramsDate !== null}
                    required
                  />
                </div>
              </section>

              {/* Description */}
              <div className="mt-2">
                <textarea
                  name="description"
                  value={formData.description || ""}
                  onChange={handleInputChange}
                  className="p-3 text-md bg-white rounded-md border border-gray-300 w-full h-20 md:h-24"
                  placeholder="Descripción del evento..."
                />
              </div>
            </main>
          </div>
        </div>
      )}

      <div className="mt-3 md:mt-4 flex justify-end gap-2">
        <Link href={`?${cancelParams.toString()}`} scroll={false}>
          <button
            className="bg-red-500 hover:bg-red-600 text-white px-3 py-2 rounded-md text-sm md:text-base"
          >
            Cancelar
          </button>
        </Link>
        <button
          type="submit"
          className="bg-green-500 hover:bg-green-600 text-white px-3 py-2 rounded-md text-sm md:text-base"
        >
          Guardar
        </button>
      </div>
    </form>
  );
}

export default EventCardForm;