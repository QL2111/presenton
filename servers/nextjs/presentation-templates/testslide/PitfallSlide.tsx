import * as z from "zod";

export const Schema = z.object({
  title: z.string().default("Défis & Pièges"),
  subtitle: z.string().default("Leçons tirées de ce qui n'a pas fonctionné comme prévu."),
  
  fail1_title: z.string().default("Intégration Héritée"),
  fail1_desc: z.string().default("Tenter d'encapsuler les vieux systèmes COBOL s'est avéré instable."),
  
  fail2_title: z.string().default("Saisie Manuelle"),
  fail2_desc: z.string().default("Les utilisateurs ont trouvé le formulaire initial trop long, entraînant des abandons."),
  
  fail3_title: z.string().default("Traitement Synchrone"),
  fail3_desc: z.string().default("Bloquer l'UI pendant la génération a frustré les utilisateurs."),
});

type SchemaType = z.infer<typeof Schema>;

const SlideComponent = ({ data }: { data: SchemaType }) => {
  return (
    <div className="h-full w-full bg-[#1a1a1a] flex font-sans overflow-hidden text-white relative">
        {/* Background dark gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#1a1a1a] to-[#2d1b4e]"></div>
        
        {/* Header */}
        <div className="absolute top-0 left-0 w-full p-12 z-20 flex justify-between items-end border-b border-white/10 bg-[#1a1a1a]/50 backdrop-blur-md">
            <div>
                <h1 className="text-4xl font-bold text-white mb-2 flex items-center gap-3">
                    <span className="bg-[#FF0000] text-white w-10 h-10 rounded flex items-center justify-center text-2xl">!</span>
                    {data.title}
                </h1>
                <p className="text-slate-400">{data.subtitle}</p>
            </div>
        </div>

        {/* Content */}
        <div className="w-full h-full pt-40 px-12 pb-12 overflow-y-auto relative z-10 flex flex-col gap-6 justify-center">
            
            {[
                { t: data.fail1_title, d: data.fail1_desc },
                { t: data.fail2_title, d: data.fail2_desc },
                { t: data.fail3_title, d: data.fail3_desc }
            ].map((item, i) => (
                <div key={i} className="group flex items-start p-6 rounded-xl hover:bg-white/5 border border-transparent hover:border-[#FF0000]/30 transition-all duration-300">
                    {/* Failure Icon */}
                    <div className="flex-shrink-0 w-12 h-12 rounded-full bg-[#FF0000]/10 text-[#FF0000] flex items-center justify-center mr-6 border border-[#FF0000]/20 group-hover:bg-[#FF0000] group-hover:text-white transition-all">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                    </div>

                    <div className="flex-1">
                        <h3 className="text-2xl font-bold text-slate-200 mb-2 group-hover:text-white">{item.t}</h3>
                        <p className="text-slate-400 text-lg font-light leading-relaxed border-l-2 border-slate-700 pl-4 group-hover:border-[#FF0000] transition-colors duration-500">
                            {item.d}
                        </p>
                    </div>
                </div>
            ))}

        </div>
    </div>
  );
};
export default SlideComponent;
