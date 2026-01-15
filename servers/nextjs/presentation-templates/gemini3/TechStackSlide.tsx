import * as z from "zod";
import { IconSchema } from "@/presentation-templates/defaultSchemes";

export const Schema = z.object({
  title: z.string().default("Stack Technique").meta({ description: "Titre" }),
  technologies: z.array(
    z.object({
      name: z.string().min(2).max(20),
      role: z.string().min(5).max(40),
      icon: IconSchema.default({
        __icon_url__: "/static/icons/placeholder.png",
        __icon_query__: "technology logo"
      })
    })
  ).min(4).max(8).meta({ description: "Liste des technologies utilisées" }),
});

type SchemaType = z.infer<typeof Schema>;

export default function TechStackSlide({ data }: { data: SchemaType }) {
  return (
    <div className="aspect-video max-w-[1280px] w-full bg-white p-12">
      <h2 className="text-4xl font-bold text-slate-800 mb-12">{data.title}</h2>
      
      <div className="grid grid-cols-4 gap-8">
        {data.technologies.map((tech, idx) => (
          <div key={idx} className="flex flex-col items-center p-6 bg-gray-50 rounded-xl border border-gray-100 shadow-sm">
            <div className="w-16 h-16 mb-4">
               {/* Note: Presenton gère la recherche d'icone via l'API, ou met un placeholder */}
               <img src={tech.icon?.__icon_url__} alt={tech.name} className="w-full h-full object-contain"/>
            </div>
            <h3 className="font-bold text-lg text-slate-900">{tech.name}</h3>
            <p className="text-sm text-gray-500 text-center mt-1">{tech.role}</p>
          </div>
        ))}
      </div>
    </div>
  );
}