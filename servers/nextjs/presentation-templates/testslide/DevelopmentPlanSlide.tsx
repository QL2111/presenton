import * as z from "zod";
import { ImageSchema } from "@/presentation-templates/defaultSchemes";

export const Schema = z.object({
  title: z.string().default("Plan de Développement"),
  
  phase1: z.string().default("Phase 1: Recherche"),
  desc1: z.string().default("Collecte des besoins et étude de faisabilité."),
  
  phase2: z.string().default("Phase 2: MVP"),
  desc2: z.string().default("Implémentation des fonctionnalités clés et tests initiaux."),
  
  phase3: z.string().default("Phase 3: Échelle"),
  desc3: z.string().default("Optimisation et déploiement en production."),
  
  image: ImageSchema.default({
    __image_url__: "https://images.pexels.com/photos/7376/startup-photos.jpg",
    __image_prompt__: "Agile kanban board"
  })
});

type SchemaType = z.infer<typeof Schema>;

const SlideComponent = ({ data }: { data: SchemaType }) => {
  return (
    <div className="h-full w-full flex flex-col font-sans bg-white relative overflow-hidden">
        {/* Top Header */}
        <div className="px-16 py-10 z-10">
             <h2 className="text-4xl font-bold text-[#4B0082]">{data.title}</h2>
        </div>

        {/* Diagonal Split Background */}
        <div className="absolute top-0 right-0 w-1/2 h-full bg-[#F7F5FF] skew-x-12 origin-top translate-x-32 z-0"></div>

        {/* Content Area */}
        <div className="flex-1 flex items-center px-16 relative z-10 gap-12">
            
            {/* Left: Timeline */}
            <div className="w-1/2 space-y-8">
                {[
                    { p: data.phase1, d: data.desc1 },
                    { p: data.phase2, d: data.desc2 },
                    { p: data.phase3, d: data.desc3 }
                ].map((item, i) => (
                    <div key={i} className="relative pl-10 group">
                        {/* Timeline Line */}
                        {i !== 2 && <div className="absolute left-[11px] top-8 w-0.5 h-20 bg-slate-200 group-hover:bg-[#CFA7FF] transition-colors"></div>}
                        
                        {/* Dot */}
                        <div className="absolute left-0 top-1 w-6 h-6 rounded-full border-4 border-white bg-[#FFA500] shadow-md z-10 group-hover:scale-125 transition-transform"></div>
                        
                        <h3 className="text-xl font-bold text-[#8000FF] mb-1">{item.p}</h3>
                        <p className="text-slate-600 bg-white/80 p-3 rounded-lg border border-slate-100 shadow-sm">{item.d}</p>
                    </div>
                ))}
            </div>

            {/* Right: Image */}
            <div className="w-1/2 h-96 relative">
                 <div className="absolute inset-0 bg-[#4B0082] rounded-3xl transform rotate-3 opacity-20"></div>
                 <img 
                    src={data.image.__image_url__} 
                    alt={data.image.__image_prompt__} 
                    className="w-full h-full object-cover rounded-3xl shadow-xl transform -rotate-2 hover:rotate-0 transition-all duration-500"
                />
            </div>
        </div>
    </div>
  );
};
export default SlideComponent;
