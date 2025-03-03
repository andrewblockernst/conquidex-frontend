import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useRouter, useSearchParams } from 'next/navigation';

interface Identifiable {
    id: number;
}

interface CarouselProps<T extends Identifiable> {
    objects: T[];
    renderCard: (selectedObject: T) => React.ReactNode; //función que renderiza una card
    paramName: string; // Nombre del parámetro en la URL
    //onSelect?: (selectedObject: T) => void;
}

const Carousel = <T extends Identifiable>({ 
    objects, 
    renderCard, 
    paramName,
    //onSelect 
}: CarouselProps<T>) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [selectedIndex, setSelectedIndex] = useState(0);
  //const [initialized, setInitialized] = useState(false);

  // Función para actualizar los params de URL
  const updateUrlParams = (paramToUpdate: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set(paramToUpdate, value);
    return params.toString();
  };

  // Efecto para inicializar el índice seleccionado basado en URL params
  useEffect(() => {
    if (objects.length === 0) return;

    // Obtener el ID del parámetro de URL
    const paramId = searchParams.get(paramName);
    
    if (paramId) {
      // Intentar encontrar el objeto con ese ID
      const index = objects.findIndex(obj => obj.id === parseInt(paramId));
      if (index >= 0) {
        setSelectedIndex(index); // Establecer el índice seleccionado y concluir efecto
        //setInitialized(true);
        return;
      } 
    }

    // No hay parámetro o no se encontró el objeto, establecer índice predeterminado
    setSelectedIndex(0);
    // Actualizar la URL con el ID del primer objeto
    if (objects.length > 0) {
      const newParams = updateUrlParams(paramName, objects[0].id.toString());
      router.replace(`?${newParams}`, { scroll: false });
    }
    
    //setInitialized(true);
  }, [objects, searchParams, paramName]); 

  // -----Efecto para notificar selección después de la inicialización
  // useEffect(() => {
  //   if (!initialized || objects.length === 0) return;
    
  //   if (onSelect && objects[selectedIndex]) {
  //     onSelect(objects[selectedIndex]);
  //   }
  // }, [selectedIndex, initialized, objects, onSelect]);

  const handlePrev = () => {
    if (objects.length === 0) return;
    
    const newIndex = selectedIndex === 0 ? objects.length - 1 : selectedIndex - 1;
    setSelectedIndex(newIndex);
    
    // Actualizar la URL cuando el usuario hace clic en prev
    const newParams = updateUrlParams(paramName, objects[newIndex].id.toString());
    router.replace(`?${newParams}`, { scroll: false });
  };

  const handleNext = () => {
    if (objects.length === 0) return;
    
    const newIndex = selectedIndex === objects.length - 1 ? 0 : selectedIndex + 1;
    setSelectedIndex(newIndex);
    
    // Actualizar la URL cuando el usuario hace clic en next
    const newParams = updateUrlParams(paramName, objects[newIndex].id.toString());
    router.replace(`?${newParams}`, { scroll: false });
  };

  const handleIndicatorClick = (index: number) => {
    setSelectedIndex(index);
    
    // Actualizar la URL cuando el usuario hace clic en un indicador
    const newParams = updateUrlParams(paramName, objects[index].id.toString());
    router.replace(`?${newParams}`, { scroll: false });
  };

  if (objects.length === 0) {
    return <div className="text-center py-4">No hay elementos disponibles</div>;
  }

  // Obtener los índices para mostrar en el carrusel
  const getPrevIndex = () => selectedIndex === 0 ? objects.length - 1 : selectedIndex - 1;
  const getNextIndex = () => selectedIndex === objects.length - 1 ? 0 : selectedIndex + 1;

  return (
    <div className="relative w-full h-auto">
      <div className="flex gap-4 items-center h-full">
        {/* Contenedor de la tarjeta izquierda con flecha */}
        <div className="flex-1 flex items-center justify-center relative min-w-0 transition-all duration-300">
          <div 
            className="w-full h-full max-w-xs opacity-50 transform scale-90 origin-right transition-all duration-300"
          >
            {objects[getPrevIndex()] && renderCard(objects[getPrevIndex()])}
          </div>
          <button 
            onClick={handlePrev}
            className="absolute -right-4 z-30 bg-white rounded-full p-1 shadow-md cursor-pointer"
            aria-label="Anterior"
          >
            <ChevronLeft size={32} className="text-black" />
          </button>
        </div>
        
        {/* Contenedor de la tarjeta central */}
        <div className="w-full flex flex-1 justify-center px-2 z-20 center-card">
          {objects[selectedIndex] && renderCard(objects[selectedIndex])}
        </div>
        
        {/* Contenedor de la tarjeta derecha con flecha */}
        <div className="flex-1 flex items-center justify-center relative min-w-0">
          <button 
            onClick={handleNext}
            className="absolute -left-4 z-30 bg-white rounded-full p-1 shadow-md cursor-pointer"
            aria-label="Siguiente"
          >
            <ChevronRight size={32} className="text-black" />
          </button>
          <div 
            className="w-full max-w-xs opacity-50 transform scale-90 origin-left transition-all duration-300"
            style={{ height: '100%' }}
          >
            {objects[getNextIndex()] && renderCard(objects[getNextIndex()])}
          </div>
        </div>
      </div>

      {/* Controles de navegación (indicadores) */}
      <div className="flex justify-center mt-4 gap-2">
        {objects.map((_, index) => (
          <button
            key={index}
            className={`w-2 h-2 rounded-full ${
              index === selectedIndex ? 'bg-blue-600' : 'bg-gray-300'
            }`}
            onClick={() => handleIndicatorClick(index)}
            aria-label={`Ir al elemento ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default Carousel;