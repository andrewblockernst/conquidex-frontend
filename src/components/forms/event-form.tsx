import { useUser } from "@/contexts/UserContext";
import { useEffect, useState } from "react";
import Spinner1 from "../spinners/spinner-1";
import ErrorModal from "../modals/error-modal";
import SuccessModal from "../modals/success-modal";
import { triggerClubViewRefresh } from "@/utils/events/events";
import { useEvents } from "@/contexts/EventContext";
import { createEvent } from "@/lib/actions/event.actions";

interface Props {
    onClose?: () => void;
  }

export default function EventForm({ onClose }: Props) {
    const { club_id: clubId } = useUser().activeProfile!;
    const { refreshNewEvent } = useEvents();

    const today = new Date().toISOString();
    const [formData, setFormData] = useState<EventInsert>({
        city: null,
        club_id: clubId!,
        color: '#FFFFFF',
        date: today,
        description: '',
        name: '',
        state: null,
        street: null,
        street_number: null,
    });
    const [loading, setLoading] = useState(false);

    //modales
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<string | null>(null);

    const handleSave = async (formData: EventInsert) => {
        try {
            setLoading(true);
            const createdEvent = await createEvent(formData);
            if (createdEvent) {
              refreshNewEvent(createdEvent);
              setSuccess('Evento creado correctamente');
            }
          } catch (error) {
            setError((error as Error).message);
          } finally {
            setLoading(false);
          }
    };

    const handleSuccess = () => {
        setSuccess(null);
        triggerClubViewRefresh();
        onClose!();
    }
  
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
      const { name, value } = e.target;
      setFormData({ ...formData, [name]: value });
    };
  
    if (loading) return <Spinner1 />
  
    return (
      <>
      <form onSubmit={(e) => {
        e.preventDefault();        
        handleSave(formData);
      }} className="space-y-4">
        <div className="space-y-4">
          <input
            type="text"
            name="name"
            value={formData.name || ''}
            onChange={handleInputChange}
            placeholder="Nombre"
            className="w-full p-2 border rounded"
            required
          />
          <div className="flex items-center space-x-2">
            <label htmlFor="color" className="block font-medium">Color</label>
            <input
              type="color"
              id="color"
              name="color"
              value={formData.color || '#FFFFFF'}
              onChange={handleInputChange}
              className="w-12 h-12 p-0 border-none"
              required
            />
          </div>
        </div>
  
        <div className="flex justify-end space-x-2">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-white bg-red-500 rounded hover:bg-red-600"
          >
            Cancelar
          </button>
          <button
            type="submit"
            className="px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600"
            disabled={loading}
          >
            {loading ? 'Guardando...' : 'Guardar'}
          </button>
        </div>
      </form>
      {error && (
            <ErrorModal onClose={() => setError(null)}>
            {error}
            </ErrorModal>
         )}
        {success && (
            <SuccessModal onClose={handleSuccess}>
                {success}
            </SuccessModal>
        )}
      </>
    );
  }