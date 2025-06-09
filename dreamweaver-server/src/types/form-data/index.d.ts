// src/types/form-data/index.d.ts

// This is a stub so TS can resolve imports of 'form-data'
// You can expand these definitions as you actually need them.

declare module "form-data" {
  interface FormData {
    append(name: string, value: any, options?: any): void;
    getHeaders(): { [key: string]: string };
    // add any other methods or properties you actually use...
  }

  // The module exports a class
  const FormDataClass: {
    new (): FormData;
  };

  export = FormDataClass;
}
