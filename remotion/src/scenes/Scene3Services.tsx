import { AbsoluteFill, useCurrentFrame, useVideoConfig, interpolate, spring, Sequence } from "remotion";
import { loadFont } from "@remotion/google-fonts/Inter";

const { fontFamily } = loadFont("normal", { weights: ["700", "400", "600"], subsets: ["latin"] });

const services = [
  { icon: "🚛", title: "Transporte\nEspecializado", desc: "Transporte de cargas pesadas e indivisíveis com segurança e eficiência" },
  { icon: "🏗️", title: "Remoção\nIndustrial", desc: "Remoção e instalação de máquinas e equipamentos industriais" },
  { icon: "⚙️", title: "Locação de\nEquipamentos", desc: "Guindastes, plataformas e equipamentos para sua operação" },
];

const ServiceCard = ({ icon, title, desc, index }: { icon: string; title: string; desc: string; index: number }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const delay = index * 15;
  const s = spring({ frame: frame - delay, fps, config: { damping: 15, stiffness: 100 } });
  const y = interpolate(s, [0, 1], [60, 0]);
  const opacity = interpolate(frame - delay, [0, 20], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  return (
    <div style={{
      flex: 1, background: "rgba(255,255,255,0.05)", borderRadius: 24,
      padding: 50, textAlign: "center", transform: `translateY(${y}px)`, opacity,
      border: "1px solid rgba(245,176,65,0.15)",
    }}>
      <div style={{ fontSize: 64, marginBottom: 20 }}>{icon}</div>
      <div style={{ fontSize: 28, fontWeight: 700, color: "white", lineHeight: 1.3, whiteSpace: "pre-line", marginBottom: 16 }}>
        {title}
      </div>
      <div style={{ fontSize: 16, color: "rgba(255,255,255,0.6)", lineHeight: 1.6 }}>{desc}</div>
    </div>
  );
};

export const Scene3Services = () => {
  const frame = useCurrentFrame();
  const headerOpacity = interpolate(frame, [0, 25], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const lineW = interpolate(frame, [10, 50], [0, 80], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  return (
    <AbsoluteFill style={{ background: "linear-gradient(180deg, #0A2540 0%, #0D3055 100%)", fontFamily, padding: 80 }}>
      {/* Header */}
      <div style={{ textAlign: "center", opacity: headerOpacity, marginBottom: 20 }}>
        <div style={{ fontSize: 18, color: "#F5B041", letterSpacing: 6, marginBottom: 12 }}>NOSSOS SERVIÇOS</div>
        <div style={{ fontSize: 44, fontWeight: 700, color: "white" }}>O que fazemos</div>
        <div style={{ width: lineW, height: 3, background: "#F5B041", margin: "16px auto 0", borderRadius: 2 }} />
      </div>

      {/* Cards */}
      <Sequence from={30}>
        <div style={{ display: "flex", gap: 40, flex: 1, alignItems: "center", padding: "0 40px" }}>
          {services.map((s, i) => (
            <ServiceCard key={i} {...s} index={i} />
          ))}
        </div>
      </Sequence>
    </AbsoluteFill>
  );
};
