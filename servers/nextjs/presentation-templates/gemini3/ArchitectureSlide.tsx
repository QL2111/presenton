import * as z from "zod";
import { ImageSchema } from "@/presentation-templates/defaultSchemes";

export const Schema = z.object({
  title: z.string().default("Architecture du Système").meta({ description: "Titre" }),
  diagram: ImageSchema.default({
    __image_url__: "https://via.placeholder.com/1000x600?text=Architecture+Diagram",
    __image_prompt__: "Detailed software architecture diagram, system design, white background, technical schema",
  }).meta({ description: "Le schéma technique" }),
});

type SchemaType = z.infer<typeof Schema>;

export default function FullDiagramSlide({ data }: { data: SchemaType }) {
  return (
    <div className="aspect-video max-w-[1280px] w-full bg-white p-8 flex flex-col">
      <h2 className="text-3xl font-bold text-slate-800 mb-6 text-center">{data.title}</h2>
      <div className="flex-1 border-2 border-dashed border-gray-300 rounded-xl p-4 flex justify-center items-center bg-gray-50">
        <img 
            src={data.diagram?.__image_url__} 
            alt="Architecture" 
            className="max-w-full max-h-full object-contain shadow-md bg-white" 
        />
      </div>
    </div>
  );
}