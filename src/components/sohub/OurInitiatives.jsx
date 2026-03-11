import { useState, useEffect } from 'react';
import { ExternalLink } from 'lucide-react';

const BASE_URL = 'https://sohub.com.bd';
const API_URL = 'https://sohub.com.bd/api/initiatives.json';

const isConnect = (item) =>
    item.id === 'connect' || item.name.toLowerCase().includes('connect');

const DesktopOurInitiatives = ({ initiatives }) => {
    return (
        <section id="initiatives" className="py-16 md:py-20 bg-gray-50 dark:bg-[#1a1a1a] relative overflow-hidden">
            <div className="max-w-6xl mx-auto px-6 md:px-8 relative z-10">
                <div className="text-center mb-14">
                    <h2 className="text-3xl md:text-4xl font-semibold tracking-tight text-[#111111] dark:text-white">
                        Our Initiatives
                    </h2>
                </div>

                <div className="grid grid-cols-4 gap-5">
                    {initiatives.map((item, i) => {
                        const isCurrent = isConnect(item);

                        const CardContent = (
                            <>
                                <div className="flex items-center gap-3 flex-1 min-w-0">
                                    <img
                                        src={`${BASE_URL}${item.logo}`}
                                        alt={item.name}
                                        className="w-12 h-12 object-contain flex-shrink-0"
                                    />
                                    <span className="text-[12px] font-medium text-[#111111] dark:text-white whitespace-nowrap">
                                        {item.name}
                                    </span>
                                </div>
                                {item.href && (
                                    <ExternalLink className="w-5 h-5 text-[#6b7280] dark:text-[#9ca3af] flex-shrink-0 group-hover:text-[#111111] dark:group-hover:text-white transition-colors" />
                                )}
                            </>
                        );

                        const highlightClass = isCurrent
                            ? 'border-[#22C55E] bg-[#22C55E]/10 ring-2 ring-[#22C55E]/30'
                            : 'border-gray-200 dark:border-gray-700 hover:border-[#22C55E]/30 hover:shadow-sm';

                        return (
                            <div key={item.id}>
                                {item.href ? (
                                    <a
                                        href={item.href}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className={`group flex items-center justify-between bg-white dark:bg-[#1E1E1E] border rounded-2xl px-5 py-5 transition-all duration-200 cursor-pointer ${highlightClass}`}
                                    >
                                        {CardContent}
                                    </a>
                                ) : (
                                    <div className={`flex items-center justify-between bg-white dark:bg-[#1E1E1E] border rounded-2xl px-5 py-5 ${highlightClass}`}>
                                        {CardContent}
                                    </div>
                                )}
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};

const MobileOurInitiatives = ({ initiatives }) => {
    return (
        <section id="initiatives" className="py-10 bg-gray-50 dark:bg-[#1a1a1a]">
            <div className="px-4">
                <div className="text-center mb-6">
                    <h2 className="text-[22px] font-medium tracking-tight text-[#111111] dark:text-white leading-[1.2]">
                        Our Initiatives
                    </h2>
                </div>

                <div className="flex flex-col gap-2">
                    {initiatives.map((item) => {
                        const isCurrent = isConnect(item);

                        const highlightClass = isCurrent
                            ? 'border-[#22C55E] bg-[#22C55E]/10 ring-2 ring-[#22C55E]/30'
                            : 'border-gray-200 dark:border-gray-700';

                        const CardContent = (
                            <div className="flex items-center w-full px-4 py-4">
                                <img
                                    src={`${BASE_URL}${item.logo}`}
                                    alt={item.name}
                                    className="w-10 h-10 object-contain flex-shrink-0"
                                />
                                <span className="text-[12px] font-medium text-[#111111] dark:text-white ml-4 flex-1">
                                    {item.name}
                                </span>
                                {item.href && (
                                    <ExternalLink className="w-[18px] h-[18px] text-[#6b7280] dark:text-[#9ca3af] flex-shrink-0 ml-3" />
                                )}
                            </div>
                        );

                        return item.href ? (
                            <a
                                key={item.id}
                                href={item.href}
                                target="_blank"
                                rel="noopener noreferrer"
                                className={`block bg-white dark:bg-[#1E1E1E] border rounded-2xl active:bg-gray-100 dark:active:bg-[#2a2a2a] transition-colors ${highlightClass}`}
                            >
                                {CardContent}
                            </a>
                        ) : (
                            <div
                                key={item.id}
                                className={`block bg-white dark:bg-[#1E1E1E] border rounded-2xl ${highlightClass}`}
                            >
                                {CardContent}
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};

const OurInitiatives = () => {
    const [isMobile, setIsMobile] = useState(false);
    const [initiatives, setInitiatives] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const mq = window.matchMedia('(max-width: 767px)');
        const update = () => setIsMobile(mq.matches);
        update();
        mq.addEventListener('change', update);
        return () => mq.removeEventListener('change', update);
    }, []);

    useEffect(() => {
        fetch(API_URL)
            .then((res) => res.json())
            .then((data) => {
                const active = (data.initiatives || [])
                    .filter((i) => i.isActive)
                    .sort((a, b) => a.order - b.order);
                setInitiatives(active);
                setLoading(false);
            })
            .catch((err) => {
                console.error('Error fetching initiatives:', err);
                setLoading(false);
            });
    }, []);

    if (loading) {
        return null;
    }

    if (initiatives.length === 0) {
        return null;
    }

    if (isMobile) {
        return <MobileOurInitiatives initiatives={initiatives} />;
    }

    return <DesktopOurInitiatives initiatives={initiatives} />;
};

export { OurInitiatives };
export default OurInitiatives;