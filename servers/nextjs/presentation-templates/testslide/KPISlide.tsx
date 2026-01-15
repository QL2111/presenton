import * as z from "zod";
import { IconSchema } from "@/presentation-templates/defaultSchemes";

export const Schema = z.object({
  title: z.string().default("Indicateurs Clés"),
  description: z.string().default("Aperçu de nos indicateurs de performance"),
  
  kpi1_value: z.string().default("45%"),
  kpi1_label: z.string().default("Croissance Annuelle"),
  
  kpi2_value: z.string().default("1.2M"),
  kpi2_label: z.string().default("Utilisateurs Actifs"),
  
  kpi3_value: z.string().default("98%"),
  kpi3_label: z.string().default("Satisfaction Client"),
});

type SchemaType = z.infer<typeof Schema>;

const SlideComponent = ({ data }: { data: SchemaType }) => {
  return (
    <div className="h-full w-full flex flex-col justify-center items-center font-sans bg-[#F7F5FF] relative overflow-hidden">
      {/* Decorative Gradient Orbs */}
      <div className="absolute top-[-10%] left-[-10%] w-[30%] h-[50%] rounded-full bg-[#CFA7FF] opacity-20 blur-3xl"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-[#8000FF] opacity-10 blur-3xl"></div>

      {/* Header */}
      <div className="z-10 text-center mb-16 max-w-4xl">
        <h1 className="text-5xl font-bold text-[#4B0082] mb-6">{data.title}</h1>
        <p className="text-xl text-slate-500 font-light">{data.description}</p>
      </div>

      {/* KPI Grid */}
      <div className="z-10 grid grid-cols-3 gap-10 w-full max-w-6xl px-12">
         {[
            { val: data.kpi1_value, lbl: data.kpi1_label },
            { val: data.kpi2_value, lbl: data.kpi2_label },
            { val: data.kpi3_value, lbl: data.kpi3_label }
         ].map((kpi, i) => (
             <div key={i} className="group bg-white p-10 rounded-3xl shadow-lg border-t-[6px] border-[#8000FF] hover:border-[#FFA500] flex flex-col items-center justify-center transform hover:-translate-y-2 transition-all duration-300">
                {/* Number with gradient */}
                <span className="text-7xl font-black bg-gradient-to-br from-[#4B0082] to-[#8000FF] bg-clip-text text-transparent mb-6 group-hover:from-[#FFA500] group-hover:to-[#FF0000] transition-all duration-300">
                  {kpi.val}
                </span>
                {/* Label */}
                <span className="text-lg font-bold text-slate-500 uppercase tracking-widest group-hover:text-[#4B0082] transition-colors">
                  {kpi.lbl}
                </span>
             </div>
         ))}
      </div>
    </div>
  );
};
export default SlideComponent;
