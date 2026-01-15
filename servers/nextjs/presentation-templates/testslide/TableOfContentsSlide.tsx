import * as z from "zod";
import { ImageSchema } from "@/presentation-templates/defaultSchemes";

export const Schema = z.object({
  title: z.string().min(3).max(50).default("Table des Matières").meta({
    description: "Titre de la diapositive"
  }),
  // Background image for visual appeal
  image: ImageSchema.default({
    __image_url__: "https://images.pexels.com/photos/3183150/pexels-photo-3183150.jpeg",
    __image_prompt__: "Abstract minimal office background"
  }).meta({
    description: "Image d'arrière-plan (barre latérale)"
  }),
  // List of chapters/sections
  items: z.array(z.string()).min(2).max(8).default([
      "1. Analyse de Marché",
      "2. Problématique", 
      "3. Vue d'ensemble de la Solution",
      "4. Modèle Économique",
      "5. Stratégie de Lancement"
  ]).meta({
    description: "Liste des sections de la présentation"
  })
});

type SchemaType = z.infer<typeof Schema>;

const SlideComponent = ({ data }: { data: SchemaType }) => {
  return (
    <div className="h-full w-full flex font-sans bg-slate-50">
       {/* Left sidebar with image accent */}
       <div className="w-1/3 relative h-full overflow-hidden hidden md:block">
            <div className="absolute inset-0 bg-blue-900/80 z-10"></div>
            <img 
                src={data.image.__image_url__} 
                alt={data.image.__image_prompt__} 
                className="w-full h-full object-cover grayscale opacity-50"
            />
            {/* Large decorative number or text */}
            <div className="absolute bottom-10 left-10 z-20">
                <h2 className="text-white/20 text-9xl font-black leading-none tracking-tighter">INDEX</h2>
            </div>
       </div>

       {/* Right content area */}
       <div className="w-full md:w-2/3 p-16 flex flex-col justify-center">
            <h1 className="text-5xl font-bold text-slate-800 mb-12 tracking-tight">
                {data.title}
            </h1>

            <div className="space-y-6">
                {data.items.map((item, index) => (
                    <div key={index} className="flex items-center group cursor-default">
                        {/* Circle Number */}
                        <div className="w-10 h-10 rounded-full bg-white border-2 border-slate-200 flex items-center justify-center text-slate-400 font-bold group-hover:border-blue-500 group-hover:text-blue-600 transition-colors duration-300">
                            {index + 1}
                        </div>
                        
                        {/* Text */}
                        <div className="ml-6 flex-1 border-b border-slate-200 pb-2 group-hover:border-blue-200 transition-colors">
                            <span className="text-xl text-slate-600 font-medium group-hover:text-blue-800 transition-colors">
                                {item.replace(/^[0-9.]+\s*/, '')} {/* Strip existing numbers if any */}
                            </span>
                        </div>
                    </div>
                ))}
            </div>
       </div>
    </div>
  );
};

export default SlideComponent;
