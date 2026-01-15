import React from 'react';
import * as z from 'zod';
import { ImageSchema } from '@/presentation-templates/defaultSchemes';

export const Schema = z.object({
  title: z.string().default("Stack Technique"),
  description: z.string().default("Les outils et technologies qui propulsent notre solution."),
  
  frontend_title: z.string().default("Frontend"),
  frontend_desc: z.string().default("Next.js, React, TailwindCSS"),
  
  backend_title: z.string().default("Backend"),
  backend_desc: z.string().default("FastAPI, Python, TensorFlow"),
  
  infra_title: z.string().default("Infrastructure"),
  infra_desc: z.string().default("Docker, Kubernetes, AWS"),
  
  image: ImageSchema.default({
     __image_url__: "https://images.pexels.com/photos/1181675/pexels-photo-1181675.jpeg",
     __image_prompt__: "Ecran de code moderne et technologique"
  }),
});

type SchemaType = z.infer<typeof Schema>;

const SlideComponent = ({ data }: { data: SchemaType }) => {
  return (
    <div className="h-full w-full bg-slate-50 p-12 flex flex-col font-sans">
      <div className="mb-8 border-b-2 border-blue-600 pb-4">
        <h2 className="text-4xl font-bold text-slate-800">{data.title}</h2>
      </div>

      <div className="grid grid-cols-2 gap-8 items-center h-full">
        <div className="space-y-6">
            <p className="text-xl text-gray-600 mb-8">{data.description}</p>
            
            <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-blue-500">
                <h3 className="text-xl font-bold text-gray-800">{data.frontend_title}</h3>
                <p className="text-gray-600 mt-1">{data.frontend_desc}</p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-green-500">
                <h3 className="text-xl font-bold text-gray-800">{data.backend_title}</h3>
                <p className="text-gray-600 mt-1">{data.backend_desc}</p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-purple-500">
                <h3 className="text-xl font-bold text-gray-800">{data.infra_title}</h3>
                <p className="text-gray-600 mt-1">{data.infra_desc}</p>
            </div>
        </div>
        
        <div className="h-full max-h-[600px] p-4 bg-white rounded-2xl shadow-xl">
             <img 
                src={data.image.__image_url__} 
                alt="Tech Stack"
                className="rounded-xl object-cover w-full h-full"
            />
        </div>
      </div>
    </div>
  );
};
export default SlideComponent;
