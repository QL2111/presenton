import * as z from "zod";
import { ImageSchema } from "@/presentation-templates/defaultSchemes";

export const Schema = z.object({
  title: z.string().default("Diagramme d'Architecture"),
  description: z.string().default("Vue d'ensemble des composants système et flux de données."),
  image: ImageSchema.default({
    __image_url__: "https://images.pexels.com/photos/17483874/pexels-photo-17483874/free-photo-of-an-artist-s-illustration-of-artificial-intelligence-ai-this-image-represents-the-concept-of-logic-it-was-created-by-nidia-dias-as-part-of-the-visualising-ai-project-launched-by.png",
    __image_prompt__: "Complex software architecture diagram white background"
  })
});

type SchemaType = z.infer<typeof Schema>;

const SlideComponent = ({ data }: { data: SchemaType }) => {
  return (
    <div className="h-full w-full flex flex-col font-sans bg-slate-50 p-12">
        {/* Header */}
        <div className="mb-8 flex justify-between items-end border-b border-slate-200 pb-4">
            <div>
                 <h2 className="text-4xl font-bold text-[#4B0082]">{data.title}</h2>
                 <p className="text-lg text-slate-500 mt-2">{data.description}</p>
            </div>
            <div className="flex gap-2">
                <div className="w-4 h-4 rounded-full bg-[#4B0082]"></div>
                <div className="w-4 h-4 rounded-full bg-[#8000FF]"></div>
                <div className="w-4 h-4 rounded-full bg-[#FFA500]"></div>
            </div>
        </div>

        {/* Main Diagram Area */}
        <div className="flex-1 bg-white rounded-2xl shadow-lg border border-slate-100 p-6 flex items-center justify-center overflow-hidden relative group">
             {/* "Lightbox" effect on hover */}
             <div className="absolute inset-0 bg-[#4B0082]/5 transition-opacity opacity-0 group-hover:opacity-100 pointer-events-none"></div>
             
             <img 
                src={data.image.__image_url__} 
                alt={data.image.__image_prompt__} 
                className="w-full h-full object-contain"
            />
        </div>
    </div>
  );
};
export default SlideComponent;
