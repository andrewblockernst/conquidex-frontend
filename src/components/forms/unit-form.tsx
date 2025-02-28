import { useUser } from "@/contexts/UserContext";
import { useEffect, useState } from "react";
import Spinner1 from "../spinners/spinner-1";
import ErrorModal from "../modals/error-modal";
import SuccessModal from "../modals/success-modal";
import { createUnit } from "@/lib/actions/units.actions";
import { triggerClubViewRefresh } from "@/utils/events/events";

interface Props {
    onClose?: () => void;
  }

export default function UnitForm({ onClose }: Props) {
    const { club_id: clubId } = useUser().activeProfile!;

    const [formData, setFormData] = useState<UnitInsert>({
      club_id: clubId!,
      name: '',
      color: '#FFFFFF',
    });
    const [loading, setLoading] = useState(false);

    //modales
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<string | null>(null);

    const handleSave = async (formData: UnitInsert) => {
        try {
            setLoading(true);
            const success = await createUnit(formData);
            if (success) {
                setSuccess('Unidad creada con éxito.');
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