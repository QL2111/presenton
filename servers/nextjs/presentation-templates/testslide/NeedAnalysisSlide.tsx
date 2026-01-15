import * as z from "zod";
import { IconSchema } from "@/presentation-templates/defaultSchemes";

export const Schema = z.object({
  title: z.string().default("Analyse des Besoins"),
  description: z.string().default("Définition des exigences fondamentales du projet."),

  who_title: z.string().default("Qui ?"),
  who_text: z.string().default("Public cible incluant développeurs, designers et chefs de projet cherchant l'efficacité."),
  who_icon: IconSchema.default({ __icon_url__: "/static/icons/placeholder.png", __icon_query__: "users group avatar" }),

  why_title: z.string().default("Pourquoi ?"),
  why_text: z.string().default("Les solutions actuelles sont trop chères, lentes ou manquent de fonctionnalités de confidentialité essentielles pour la conformité."),
  why_icon: IconSchema.default({ __icon_url__: "/static/icons/placeholder.png", __icon_query__: "question mark reason" }),

  what_title: z.string().default("Quoi ?"),
  what_text: z.string().default("Un générateur de présentations alimenté par IA sur site qui respecte la souveraineté des données."),
  what_icon: IconSchema.default({ __icon_url__: "/static/icons/placeholder.png", __icon_query__: "bulb idea product" }),
});

type SchemaType = z.infer<typeof Schema>;

const SlideComponent = ({ data }: { data: SchemaType }) => {
  return (
    <div className="h-full w-full flex flex-col font-sans bg-slate-50 relative overflow-hidden px-16 py-12">
        {/* Background Accents */}
        <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-[#4B0082] via-[#8000FF] to-[#FFA500]"></div>
        <div className="absolute -bottom-24 -right-24 w-64 h-64 bg-[#CFA7FF] rounded-full opacity-20 blur-3xl"></div>

        {/* Header */}
        <div className="text-center mb-14 relative z-10">
            <h1 className="text-5xl font-bold text-[#4B0082] mb-4">{data.title}</h1>
            <p className="text-xl text-slate-500 max-w-2xl mx-auto">{data.description}</p>
        </div>

        {/* 3 Columns Grid */}
        <div className="grid grid-cols-3 gap-8 h-full items-start relative z-10">
            {/* Who Block */}
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 hover:shadow-xl hover:border-[#8000FF] transition-all duration-300 group h-full flex flex-col">
                <div className="w-16 h-16 bg-[#F7F5FF] rounded-xl flex items-center justify-center mb-6 group-hover:bg-[#8000FF] transition-colors duration-300">
                     <img src={data.who_icon.__icon_url__} className="w-8 h-8 opacity-60 group-hover:opacity-100 group-hover:invert transition-all" alt="Who icon" />
                </div>
                <h2 className="text-2xl font-bold text-[#4B0082] mb-4">{data.who_title}</h2>
                <p className="text-slate-600 leading-relaxed">{data.who_text}</p>
                <div className="mt-auto pt-6">
                    <div className="w-full h-1 bg-gradient-to-r from-[#8000FF] to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                </div>
            </div>

            {/* Why Block (Highlighted) */}
            <div className="bg-[#4B0082] p-8 rounded-2xl shadow-xl transform scale-105 border border-[#4B0082] relative overflow-hidden h-full flex flex-col text-white">
                <div className="absolute top-0 right-0 w-32 h-32 bg-[#FFFFFF] opacity-5 rounded-bl-full pointer-events-none"></div>
                
                <div className="w-16 h-16 bg-[#ffffff20] rounded-xl flex items-center justify-center mb-6 backdrop-blur-sm">
                     <img src={data.why_icon.__icon_url__} className="w-8 h-8 invert brightness-0" alt="Why icon" />
                </div>
                <h2 className="text-2xl font-bold text-white mb-4">{data.why_title}</h2>
                <p className="text-white/80 leading-relaxed font-light">{data.why_text}</p>
            </div>

            {/* What Block */}
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 hover:shadow-xl hover:border-[#FFA500] transition-all duration-300 group h-full flex flex-col">
                <div className="w-16 h-16 bg-[#FFF3DD] rounded-xl flex items-center justify-center mb-6 group-hover:bg-[#FFA500] transition-colors duration-300">
                     <img src={data.what_icon.__icon_url__} className="w-8 h-8 opacity-60 group-hover:opacity-100 group-hover:brightness-0 group-hover:invert transition-all" alt="What icon" />
                </div>
                <h2 className="text-2xl font-bold text-[#4B0082] mb-4">{data.what_title}</h2>
                <p className="text-slate-600 leading-relaxed">{data.what_text}</p>
                 <div className="mt-auto pt-6">
                    <div className="w-full h-1 bg-gradient-to-r from-[#FFA500] to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                </div>
            </div>
        </div>
    </div>
  );
};
export default SlideComponent;
