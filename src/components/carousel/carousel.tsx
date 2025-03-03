import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface Identifiable {
    id: number;
}

interface CarouselProps<T extends Identifiable> {
    objects: T[];
    renderCard: (selectedObject: T) => React.ReactNode; //función que renderiza una card
    initialSelectedId?: number;
    onSelect: (selectedObject: T) => void;
}

const Carousel = <T extends Identifiable>({ objects, renderCard, initialSelectedId, onSelect }: CarouselProps<T>) => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
    // Encontrar el índice inicial basado en el ID proporcionado o usar 0

useEffect(() => {
    const findInitialIndex = () => {
        if (!initialSelectedId || objects.length === 0) return 0;
        const index = objects.findIndex(obj => obj.id === initialSelectedId);
        return index >= 0 ? index : 0;
    };

    setSelectedIndex(findInitialIndex());
    setIsLoading(false);
    }, [initialSelectedId, objects]);
  

  useEffect(() => {
    if (objects.length > 0) {
      onSelect(objects[selectedIndex]);
    }
  }, [selectedIndex, objects]);

  const handlePrev = () => {
    setSelectedIndex((prevIndex) => {
      return prevIndex === 0 ? objects.length - 1 : prevIndex - 1;
    });
  };

  const handleNext = () => {
    setSelectedIndex((prevIndex) => {
      return prevIndex === objects.length - 1 ? 0 : prevIndex + 1;
    });
  };

  if (objects.length === 0) {
    return <div className="text-center py-4">No hay unidades disponibles</div>;
  }

  if (isLoading) {
    return <div>Cargando...</div>;
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
            {renderCard(objects[getPrevIndex()])}
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
          {renderCard(objects[selectedIndex])}
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
            {renderCard(objects[getNextIndex()])}
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
            onClick={() => setSelectedIndex(index)}
            aria-label={`Ir a la unidad ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default Carousel;