import * as z from "zod";
import { IconSchema } from "@/presentation-templates/defaultSchemes";

export const Schema = z.object({
  title: z.string().default("Architecture de la Solution"),
  state_of_art_title: z.string().default("État de l'Art"),
  state_of_art_text: z.string().default("Les approches existantes dépendent fortement des API cloud, créant de la latence et des risques de confidentialité. Nos recherches indiquent une transition vers le calcul en périphérie (edge computing)."),
  
  tech1: z.string().default("Next.js"),
  tech2: z.string().default("FastAPI"),
  tech3: z.string().default("Docker"),
  tech4: z.string().default("Ollama"),
  tech5: z.string().default("Tailwind"),
  tech6: z.string().default("PostgreSQL"),
});

type SchemaType = z.infer<typeof Schema>;

const SlideComponent = ({ data }: { data: SchemaType }) => {
  return (
    <div className="h-full w-full flex font-sans bg-white">
        {/* Left Side: Context / State of Art */}
        <div className="w-1/3 bg-[#F7F5FF] p-12 flex flex-col justify-center border-r border-slate-100 relative overflow-hidden">
             {/* Abstract shape */}
             <div className="absolute top-0 left-0 w-20 h-full bg-[#E1CCFF] opacity-30 skew-x-[-10deg] -ml-10"></div>
             
             <div className="relative z-10">
                <h5 className="text-[#8000FF] font-bold uppercase tracking-wider mb-2 text-sm">Context</h5>
                <h2 className="text-3xl font-bold text-[#4B0082] mb-6">{data.state_of_art_title}</h2>
                <p className="text-slate-600 leading-relaxed text-lg">
                    {data.state_of_art_text}
                </p>
                <div className="mt-8 w-12 h-1 bg-[#FFA500] rounded-full"></div>
             </div>
        </div>

        {/* Right Side: Technologies */}
        <div className="w-2/3 p-16 flex flex-col">
            <h1 className="text-5xl font-bold text-[#4B0082] mb-12">{data.title}</h1>
            
            <div className="grid grid-cols-2 gap-6">
                {[data.tech1, data.tech2, data.tech3, data.tech4, data.tech5, data.tech6].map((tech, i) => (
                    <div key={i} className="group relative bg-white border border-slate-200 p-6 rounded-xl hover:border-[#8000FF] hover:shadow-lg transition-all duration-300 flex items-center">
                        {/* Fake Logo Placeholder Circle */}
                        <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-[#F7F5FF] to-[#E1CCFF] flex items-center justify-center mr-4 group-hover:from-[#4B0082] group-hover:to-[#8000FF] transition-all">
                             <span className="text-[#4B0082] font-bold text-lg group-hover:text-white transition-colors">{tech.substring(0,1)}</span>
                        </div>
                        
                        <span className="text-xl font-semibold text-slate-700 group-hover:text-[#4B0082] transition-colors">{tech}</span>
                        
                        {/* Checkmark icon on hover */}
                        <div className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity text-[#00C853]">
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                        </div>
                    </div>
                ))}
            </div>
            
            <div className="mt-auto bg-[#FFF3DD] p-4 rounded-lg flex items-center border border-[#FFEDCC]">
                 <span className="text-[#FFA500] text-xl mr-3 font-bold">💡</span>
                 <p className="text-[#b37400] text-sm font-medium">Selected for performance, scalability and community support.</p>
            </div>
        </div>
    </div>
  );
};
export default SlideComponent;
