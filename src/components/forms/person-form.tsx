import { useUser } from "@/contexts/UserContext";
import { useEffect, useState } from "react";
import { createPerson, fetchRoles, fetchClasses } from '@/lib/actions/person.actions';
import Spinner1 from "../spinners/spinner-1";
import ErrorModal from "../modals/error-modal";
import SuccessModal from "../modals/success-modal";
import { fetchUnits } from "@/lib/actions/units.actions";
import { useClub } from "@/contexts/ClubContext";

interface Props {
    onClose?: () => void;
  }

export default function PersonForm({ onClose }: Props) {
    const { club_id: clubId } = useUser().activeProfile!;
    const { refreshAllData } = useClub();

    const [formData, setFormData] = useState<PersonFormData>({
      name: '',
      surname: '',
      nickname: '',
      email: '',
      club_id: clubId!,
      last_enrollment: null,
      role_id: 1,
      auth_user_uuid: null,
      units: [],
      classes: []
    });
  
    const [roles, setRoles] = useState<Role[]>([]);
    const [units, setUnits] = useState<Unit[]>([]);
    const [classes, setClasses] = useState<Class[]>([]);
    const [loading, setLoading] = useState(true);

    //modales
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<string | null>(null);

    const handleSave = async (formData: PersonFormData) => {
        try {
            setLoading(true);
            const success = await createPerson(formData);
            if (success) {
                setSuccess('Miembro creado con éxito.');
            }
          } catch (error) {
            setError((error as Error).message);
          } finally {
            setLoading(false);
          }
    };

    const handleSuccess = () => {
        setSuccess(null);
        refreshAllData();
        if (onClose){
          onClose()
        }
    }
  
    useEffect(() => {
      const loadFormData = async () => {
        try {
          const [rolesData, unitsData, classesData] = await Promise.all([
            fetchRoles(),
            fetchUnits(clubId!),
            fetchClasses()
          ]);
  
          setRoles(rolesData);
          setUnits(unitsData);
          setClasses(classesData);
        } catch (error) {
          console.error('Error loading form data:', error);
        } finally {
          setLoading(false);
        }
      };
  
      loadFormData();
    }, [clubId]);
  
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
      const { name, value } = e.target;
      setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value, checked } = e.target;
      setFormData(prev => {
        const values = checked
          ? [...prev[name as keyof PersonFormData] as number[], Number(value)]
          : (prev[name as keyof PersonFormData] as number[]).filter((id: number) => id !== Number(value));
        return { ...prev, [name]: values };
      });
    };
  
    if (loading) return <Spinner1 />
  
    return (
      <>
      <form onSubmit={(e) => {
        e.preventDefault();        
        handleSave(formData);
      }} className="space-y-4">
        <div className="space-y-2">
          <input
            type="text"
            name="name"
            value={formData.name || ''}
            onChange={handleInputChange}
            placeholder="Nombre"
            className="w-full p-2 border rounded"
            required
          />
          <input
            type="text"
            name="surname"
            value={formData.surname || ''}
            onChange={handleInputChange}
            placeholder="Apellido"
            className="w-full p-2 border rounded"
            required
          />
          <input
            type="text"
            name="nickname"
            value={formData.nickname || ''}
            onChange={handleInputChange}
            placeholder="Apodo"
            className="w-full p-2 border rounded"
          />
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            placeholder="Email"
            className="w-full p-2 border rounded"
            required
          />
          
          <select
            name="role_id"
            value={formData.role_id}
            onChange={handleInputChange}
            className="w-full p-2 border rounded"
            required
          >
            <option value="">Seleccionar Rol</option>
            {roles.map(role => (
              <option key={role.id} value={role.id}>
                {role.name}
              </option>
            ))}
          </select>
          {/* UNIDADES Y CLASES */}
          <div className="flex flex-row justify-around">
            <div>
              <label className="block font-medium">Unidades</label>
              {units.map(unit => (
                <div key={unit.id} className="flex items-center" style={{ backgroundColor: unit.color }}>
                  <input
                    type="checkbox"
                    name="units"
                    value={unit.id}
                    checked={formData.units.includes(unit.id)}
                    onChange={handleCheckboxChange}
                    className="mr-2"
                  />
                  <label>{unit.name}</label>
                </div>
              ))}
            </div>
            <div>
              <label className="block font-medium">Clases</label>
              {classes.map(class_ => (
                <div key={class_.id} className="flex items-center" style={{ backgroundColor: class_.color }}>
                  <input
                    type="checkbox"
                    name="classes"
                    value={class_.id}
                    checked={formData.classes.includes(class_.id)}
                    onChange={handleCheckboxChange}
                    className="mr-2"
                  />
                  <label>{class_.name}</label>
                </div>
              ))}
            </div>
          </div>
        </div>
  
        <div className="flex justify-end space-x-2">
          {onClose &&
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-white bg-red-500 rounded hover:bg-red-600"
          >
            Cancelar
          </button>}
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