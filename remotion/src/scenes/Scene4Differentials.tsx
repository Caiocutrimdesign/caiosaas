import { AbsoluteFill, useCurrentFrame, useVideoConfig, interpolate, spring, Sequence } from "remotion";
import { loadFont } from "@remotion/google-fonts/Inter";

const { fontFamily } = loadFont("normal", { weights: ["700", "400", "600"], subsets: ["latin"] });

const items = [
  { icon: "🛡️", label: "Certificação\nde Segurança", value: "NR-11 / NR-12" },
  { icon: "👷", label: "Equipe\nEspecializada", value: "Técnicos certificados" },
  { icon: "📞", label: "Suporte\n24 horas", value: "7 dias por semana" },
  { icon: "🏢", label: "Clientes\nAtendidos", value: "500+" },
];

export const Scene4Differentials = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const headerOp = interpolate(frame, [0, 25], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  return (
    <AbsoluteFill style={{ background: "linear-gradient(135deg, #0A2540 0%, #102a45 50%, #0A2540 100%)", fontFamily, padding: 80 }}>
      <div style={{ textAlign: "center", opacity: headerOp, marginBottom: 40 }}>
        <div style={{ fontSize: 18, color: "#F5B041", letterSpacing: 6 }}>POR QUE NOS ESCOLHER</div>
        <div style={{ fontSize: 44, fontWeight: 700, color: "white", marginTop: 12 }}>Nossos Diferenciais</div>
      </div>

      <Sequence from={20}>
        <div style={{ display: "flex", gap: 30, justifyContent: "center", alignItems: "center", flex: 1 }}>
          {items.map((item, i) => {
            const delay = i * 12;
            const s = spring({ frame: useCurrentFrame() - delay, fps, config: { damping: 18, stiffness: 120 } });
            const scale = interpolate(s, [0, 1], [0.7, 1]);
            const op = interpolate(useCurrentFrame() - delay, [0, 15], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

            return (
              <div key={i} style={{
                width: 280, background: "rgba(245,176,65,0.08)", borderRadius: 20,
                padding: 40, textAlign: "center", transform: `scale(${scale})`, opacity: op,
                border: "1px solid rgba(245,176,65,0.2)",
              }}>
                <div style={{ fontSize: 52, marginBottom: 16 }}>{item.icon}</div>
                <div style={{ fontSize: 22, fontWeight: 700, color: "white", lineHeight: 1.3, whiteSpace: "pre-line", marginBottom: 12 }}>{item.label}</div>
                <div style={{ fontSize: 16, color: "#F5B041", fontWeight: 600 }}>{item.value}</div>
              </div>
            );
          })}
        </div>
      </Sequence>
    </AbsoluteFill>
  );
};
