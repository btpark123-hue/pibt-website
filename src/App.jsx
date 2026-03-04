import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { supabase } from './supabase';
import {
    BarChart3,
    BrainCircuit,
    GraduationCap,
    ShieldCheck,
    ChevronRight,
    Menu,
    X,
    Mail,
    Building2,
    User,
    Check,
    Download
} from 'lucide-react';

// --- SVG Logo Component ---
const Logo = ({ className = "h-10 w-auto" }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 480 200" className={className}>
        <defs>
            <linearGradient id="markGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" style={{ stopColor: '#1B3D6E' }} />
                <stop offset="100%" style={{ stopColor: '#0F2A4A' }} />
            </linearGradient>
            <linearGradient id="accentGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" style={{ stopColor: '#00E5C9' }} />
                <stop offset="100%" style={{ stopColor: '#38AFFF' }} />
            </linearGradient>
            <filter id="glow">
                <feGaussianBlur stdDeviation="3" result="coloredBlur" />
                <feMerge>
                    <feMergeNode in="coloredBlur" />
                    <feMergeNode in="SourceGraphic" />
                </feMerge>
            </filter>
        </defs>
        <rect width="480" height="200" fill="#080F1C" rx="12" />
        <pattern id="gridPattern" width="20" height="20" patternUnits="userSpaceOnUse">
            <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#FFFFFF" strokeWidth="0.3" opacity="0.04" />
        </pattern>
        <rect width="480" height="200" fill="url(#gridPattern)" rx="12" />
        <g transform="translate(100,100)">
            <polygon points="0,-72 62.4,-36 62.4,36 0,72 -62.4,36 -62.4,-36" fill="url(#markGrad)" stroke="url(#accentGrad)" strokeWidth="2" />
            <polygon points="0,-38 33,-19 33,19 0,38 -33,19 -33,-19" fill="none" stroke="#FFFFFF" strokeWidth="0.7" opacity="0.1" />
            <circle cx="0" cy="0" r="7" fill="url(#accentGrad)" filter="url(#glow)" />
            <line x1="0" y1="0" x2="34" y2="-28" stroke="url(#accentGrad)" strokeWidth="2.2" strokeLinecap="round" />
            <circle cx="34" cy="-28" r="5" fill="#00E5C9" filter="url(#glow)" />
            <line x1="0" y1="0" x2="34" y2="28" stroke="url(#accentGrad)" strokeWidth="2.2" strokeLinecap="round" />
            <circle cx="34" cy="28" r="5" fill="#38AFFF" filter="url(#glow)" />
            <line x1="0" y1="0" x2="-40" y2="0" stroke="url(#accentGrad)" strokeWidth="2.2" strokeLinecap="round" />
            <circle cx="-40" cy="0" r="5" fill="#00E5C9" filter="url(#glow)" opacity="0.9" />
            <path d="M 34,-28 Q 52,0 34,28" fill="none" stroke="url(#accentGrad)" strokeWidth="1.5" strokeDasharray="4 3" opacity="0.6" strokeLinecap="round" />
        </g>
        <text x="188" y="118" fontFamily="'Apple SD Gothic Neo', 'Noto Sans KR', 'Malgun Gothic', sans-serif" fontSize="72" fontWeight="800" letterSpacing="-2" fill="#FFFFFF">핍트</text>
        <rect x="188" y="128" width="188" height="3.5" rx="1.75" fill="url(#accentGrad)" opacity="0.9" />
    </svg>
);

// --- Components ---

const DiagnosisModal = ({ isOpen, onClose }) => {
    const [formData, setFormData] = useState({
        name: '',
        companyName: '',
        email: ''
    });
    const [status, setStatus] = useState('idle'); // idle, loading, success, error

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus('loading');

        try {
            const { error } = await supabase
                .from('diagnostic_requests')
                .insert([
                    {
                        name: formData.name,
                        company_name: formData.companyName,
                        email: formData.email
                    }
                ]);

            if (error) throw error;

            setStatus('success');
            setFormData({ name: '', companyName: '', email: '' });
        } catch (error) {
            console.error('Error saving diagnosis request:', error);
            setStatus('error');
            alert('신청 중 오류가 발생했습니다. 잠시 후 다시 시도해 주세요.');
        } finally {
            if (status !== 'error') {
                // Keep success state visible or reset after timeout if needed
            }
        }
    };

    const handleClose = () => {
        onClose();
        // Reset state after closure
        setTimeout(() => {
            setStatus('idle');
            setFormData({ name: '', companyName: '', email: '' });
        }, 300);
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={handleClose}
                        className="absolute inset-0 bg-black/80 backdrop-blur-sm"
                    />
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 20 }}
                        className="relative w-full max-w-md glass-card p-8 rounded-3xl border border-white/20 shadow-2xl overflow-hidden"
                    >
                        <div className="absolute -top-24 -right-24 w-48 h-48 bg-electric-blue/20 blur-3xl rounded-full"></div>

                        {status !== 'success' ? (
                            <>
                                <div className="flex justify-between items-start mb-6 relative z-10">
                                    <div>
                                        <h3 className="text-2xl font-bold text-white mb-2">무료 AI 도입 자가진단</h3>
                                        <p className="text-gray-400 text-sm">정보를 입력하시면 맞춤형 리포트를 보내드립니다.</p>
                                    </div>
                                    <button onClick={handleClose} className="text-gray-400 hover:text-white transition-colors p-1">
                                        <X className="w-6 h-6" />
                                    </button>
                                </div>

                                <form onSubmit={handleSubmit} className="space-y-4 relative z-10">
                                    <div>
                                        <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">존함</label>
                                        <input
                                            type="text"
                                            name="name"
                                            required
                                            value={formData.name}
                                            onChange={handleChange}
                                            placeholder="홍길동"
                                            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-electric-blue/50 transition-colors"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">회사명</label>
                                        <input
                                            type="text"
                                            name="companyName"
                                            required
                                            value={formData.companyName}
                                            onChange={handleChange}
                                            placeholder="핍트 (PiBT)"
                                            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-electric-blue/50 transition-colors"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">이메일 주소</label>
                                        <input
                                            type="email"
                                            name="email"
                                            required
                                            value={formData.email}
                                            onChange={handleChange}
                                            placeholder="contact@pibt.ai"
                                            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-electric-blue/50 transition-colors"
                                        />
                                    </div>
                                    <button
                                        type="submit"
                                        disabled={status === 'loading'}
                                        className={`w-full py-4 bg-electric-blue hover:bg-blue-600 text-white rounded-xl font-bold transition-all mt-6 shadow-lg shadow-blue-500/20 flex items-center justify-center ${status === 'loading' ? 'opacity-70 cursor-not-allowed' : ''}`}
                                    >
                                        {status === 'loading' ? (
                                            <span className="flex items-center">
                                                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                                </svg>
                                                처리 중...
                                            </span>
                                        ) : '진단 리포트 신청하기'}
                                    </button>
                                </form>
                            </>
                        ) : (
                            <div className="text-center py-8 relative z-10">
                                <div className="w-20 h-20 bg-green-500/20 border border-green-500/30 rounded-full flex items-center justify-center mx-auto mb-6">
                                    <Check className="text-green-500 w-10 h-10" />
                                </div>
                                <h3 className="text-2xl font-bold text-white mb-2">신청이 완료되었습니다!</h3>
                                <p className="text-gray-400 mb-8 leading-relaxed">
                                    24시간 내로 리포트를 보내드립니다.
                                </p>
                                <div className="space-y-3">
                                    <a href="#" className="flex items-center justify-center w-full py-3 bg-white/10 hover:bg-white/20 text-white rounded-xl text-sm font-semibold transition-all border border-white/10">
                                        <Download className="w-4 h-4 mr-2" /> 자가진단 체크리스트 PDF 다운로드
                                    </a>
                                    <button onClick={handleClose} className="block w-full text-gray-500 hover:text-white text-sm transition-colors py-2">
                                        닫기
                                    </button>
                                </div>
                            </div>
                        )}
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
};

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    return (
        <nav className="fixed w-full z-50 glass border-b border-white/10">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-20 items-center">
                    <div className="flex items-center space-x-2">
                        <Logo className="h-10 w-auto" />
                    </div>
                    <div className="hidden md:flex space-x-8 text-sm font-medium text-gray-300">
                        <a href="#hero" className="hover:text-electric-blue transition-colors">Home</a>
                        <a href="#ceo" className="hover:text-electric-blue transition-colors">CEO</a>
                        <a href="#services" className="hover:text-electric-blue transition-colors">Services</a>
                    </div>
                    <div className="md:hidden">
                        <button onClick={() => setIsOpen(!isOpen)} className="text-white">
                            {isOpen ? <X /> : <Menu />}
                        </button>
                    </div>
                </div>
            </div>
        </nav>
    );
};

const Hero = ({ onOpenModal }) => {
    return (
        <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
            {/* Background with Generated Image */}
            <div className="absolute inset-0 z-0">
                <img
                    src="C:/Users/박병태/.gemini/antigravity/brain/8dad252e-3f96-4c44-8623-49f80b22d481/pibt_hero_background_1772527032076.png"
                    alt="AI Background"
                    className="w-full h-full object-cover opacity-60"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-[#0c0e1a]/80 via-transparent to-[#0c0e1a]"></div>
            </div>

            <div className="relative z-10 max-w-7xl mx-auto px-4 text-center">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    <span className="inline-block px-4 py-1 rounded-full bg-electric-blue/10 border border-electric-blue/30 text-electric-blue text-sm font-semibold mb-6">
                        AI Business Partner
                    </span>
                    <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
                        비즈니스 잠재력을<br />
                        <span className="text-gradient">AI로 현실화하다</span>
                    </h1>
                    <p className="text-xl text-gray-400 mb-10 max-w-2xl mx-auto">
                        핍트(PIBT)는 기업의 디지털 트랜스포메이션을 넘어,<br />
                        실질적인 ROI를 창출하는 맞춤형 AI 솔루션을 제공합니다.
                    </p>
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                        <a href="#services" className="px-8 py-4 bg-electric-blue hover:bg-blue-600 text-white rounded-full font-bold transition-all transform hover:scale-105 shadow-lg shadow-blue-500/20">
                            서비스 둘러보기
                        </a>
                        <button onClick={onOpenModal} className="px-8 py-4 glass text-white rounded-full font-bold hover:bg-white/10 transition-all border border-white/20">
                            무료 AI 진단 시작
                        </button>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

const CEOMessage = () => {
    return (
        <section id="ceo" className="py-24 bg-[#0c0e1a]">
            <div className="max-w-7xl mx-auto px-4">
                <div className="grid md:grid-cols-2 gap-16 items-center">
                    <motion.div
                        whileInView={{ opacity: 1, x: 0 }}
                        initial={{ opacity: 0, x: -50 }}
                        className="relative flex justify-center md:justify-end"
                    >
                        <div className="relative w-full max-w-sm">
                            <div className="aspect-[3/4] rounded-3xl overflow-hidden border border-white/10 bg-gradient-to-br from-deep-navy to-electric-blue/20 group">
                                <img src="/ceo.jpg" alt="박병태 대표" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                            </div>
                            <div className="absolute -bottom-4 -right-4 p-6 glass rounded-2xl border border-electric-blue/20 shadow-2xl">
                                <p className="text-white font-bold text-lg mb-0.5">박병태</p>
                                <p className="text-gray-400 text-xs">CEO of 핍트</p>
                            </div>
                        </div>
                    </motion.div>

                    <motion.div
                        whileInView={{ opacity: 1, x: 0 }}
                        initial={{ opacity: 0, x: 50 }}
                    >
                        <span className="text-electric-blue font-bold uppercase tracking-widest text-sm">CEO Message</span>
                        <h2 className="text-4xl font-bold text-white mt-4 mb-8 leading-snug">
                            "AI는 더 이상 선택이 아닌,<br />
                            현재의 생존 전략입니다."
                        </h2>
                        <div className="space-y-6 text-gray-300 text-lg leading-relaxed">
                            <p>
                                기술의 발전 속도가 경영의 의사결정 속도를 앞지르는 시대입니다.
                                핍트(PIBT)는 복잡한 AI 기술을 기업의 실제 언어로 번역하고, 인프라 구축부터 인재 양성까지 전 과정을 동행합니다.
                            </p>
                            <p>
                                우리의 목표는 단순한 자동화가 아닙니다.
                                구성원 모두가 AI를 도구로서 자유롭게 활용하여, 기업 고유의 잠재력을 극대화하는 것입니다.
                            </p>
                            <p className="font-semibold text-white">
                                당신의 비즈니스를 AI 현실로 연결하겠습니다.
                            </p>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

const Services = () => {
    const services = [
        {
            icon: <BarChart3 className="w-8 h-8 text-electric-blue" />,
            title: "AI 컨설팅",
            desc: "비즈니스 프로세스 분석을 통한 최적의 AI 도입 전략 및 기대 ROI(투자 대비 효율) 도출.",
            tag: "Process Optimization"
        },
        {
            icon: <BrainCircuit className="w-8 h-8 text-electric-blue" />,
            title: "LLM 구축",
            desc: "기업 내부 데이터를 활용한 전용 보안 LLM 및 RAG(검색 증강 생성) 시스템 설계 및 구현.",
            tag: "Security AI"
        },
        {
            icon: <GraduationCap className="w-8 h-8 text-electric-blue" />,
            title: "AI 교육",
            desc: "임직원 수준별 실전 프롬프트 엔지니어링 및 AI 리터러시 강화 교육 프로그램 제공.",
            tag: "Digital Literacy"
        }
    ];

    return (
        <section id="services" className="py-24 relative overflow-hidden">
            <div className="max-w-7xl mx-auto px-4">
                <div className="text-center mb-16">
                    <h2 className="text-4xl font-bold text-white mb-4">Core Services</h2>
                    <p className="text-gray-400">핍트만의 3대 핵심 사업으로 기업의 AI 기반 성장을 가속화합니다.</p>
                </div>

                <div className="grid md:grid-cols-3 gap-8">
                    {services.map((item, idx) => (
                        <motion.div
                            key={idx}
                            whileHover={{
                                y: -15,
                                boxShadow: "0 20px 40px -15px rgba(41, 121, 255, 0.4)",
                                borderColor: "rgba(41, 121, 255, 0.8)"
                            }}
                            className="glass-card p-10 rounded-3xl border border-white/10 relative overflow-hidden group"
                        >
                            {/* Hover Glow Effect */}
                            <div className="absolute inset-0 bg-gradient-to-br from-electric-blue/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                            <div className="relative z-10">
                                <div className="mb-6 transform group-hover:scale-110 transition-transform duration-300">{item.icon}</div>
                                <span className="text-xs font-bold text-electric-blue uppercase tracking-tighter mb-2 block">{item.tag}</span>
                                <h3 className="text-2xl font-bold text-white mb-4">{item.title}</h3>
                                <p className="text-gray-400 leading-relaxed mb-6">
                                    {item.desc}
                                </p>
                                <div className="flex items-center text-white text-sm font-semibold group cursor-pointer hover:text-electric-blue transition-colors">
                                    Learn More <ChevronRight className="ml-1 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

const Footer = () => {
    return (
        <footer className="py-12 border-t border-white/10 bg-[#0c0e1a]">
            <div className="max-w-7xl mx-auto px-4 text-center sm:text-left">
                <div className="flex flex-col sm:flex-row justify-between items-center gap-8 mb-8">
                    <div>
                        <div className="flex items-center mb-4 justify-center sm:justify-start">
                            <Logo className="h-8 w-auto" />
                        </div>
                        <p className="text-gray-500 text-sm max-w-xs">
                            Potentials into AI Reality. <br />
                            비즈니스의 잠재력을 AI로 가장 빠르고 안전하게 현실화합니다.
                        </p>
                    </div>
                    <div className="text-sm text-gray-500 space-y-1">
                        <p>대표이사: 박병태</p>
                        <p>Email: contact@pibt.ai</p>
                        <p>© 2026 핍트 Corp. All rights reserved.</p>
                    </div>
                </div>
            </div>
        </footer>
    );
};

// --- Main App ---

export default function App() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);

    return (
        <div className="bg-[#0c0e1a] selection:bg-electric-blue selection:text-white">
            <Navbar />
            <Hero onOpenModal={() => setIsModalOpen(true)} />
            <CEOMessage />
            <Services />
            <Footer />

            <DiagnosisModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
            />
        </div>
    );
}
