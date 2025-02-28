declare namespace JSX {
    interface IntrinsicElements {
      'relative-time': {
        datetime?: string; // Define las propiedades que acepta el componente
        [key: string]: any; // Permite otras props si no las conoces todas
      };
    }
  }