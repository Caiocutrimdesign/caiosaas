import { AbsoluteFill, useCurrentFrame, useVideoConfig, interpolate, spring } from "remotion";
import { loadFont } from "@remotion/google-fonts/Inter";

const { fontFamily } = loadFont("normal", { weights: ["700", "400", "600"], subsets: ["latin"] });

export const Scene6Contact = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const s = spring({ frame, fps, config: { damping: 20 } });
  const cardY = interpolate(s, [0, 1], [50, 0]);
  const op = interpolate(frame, [5, 30], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  const items = [
    { icon: "📞", text: "(98) 99198-8828" },
    { icon: "📍", text: "Av. Santos Dumont, 80 - Tirirical\nSão Luís - MA" },
    { icon: "📧", text: "contato@premiumlocacao.com.br" },
    { icon: "🌐", text: "www.premiumlocacao.com.br" },
  ];

  return (
    <AbsoluteFill style={{ background: "linear-gradient(135deg, #0A2540 0%, #0F2D4A 100%)", fontFamily, justifyContent: "center", alignItems: "center" }}>
      <div style={{ opacity: op, transform: `translateY(${cardY}px)`, textAlign: "center" }}>
        <div style={{ fontSize: 18, color: "#F5B041", letterSpacing: 6, marginBottom: 12 }}>ENTRE EM CONTATO</div>
        <div style={{ fontSize: 44, fontWeight: 700, color: "white", marginBottom: 50 }}>Fale Conosco</div>

        <div style={{ display: "flex", gap: 40, justifyContent: "center" }}>
          {items.map((item, i) => {
            const delay = 20 + i * 10;
            const itemOp = interpolate(frame - delay, [0, 15], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
            return (
              <div key={i} style={{
                opacity: itemOp, width: 260, background: "rgba(255,255,255,0.05)",
                borderRadius: 16, padding: "30px 20px", border: "1px solid rgba(245,176,65,0.15)",
              }}>
                <div style={{ fontSize: 36, marginBottom: 12 }}>{item.icon}</div>
                <div style={{ fontSize: 16, color: "rgba(255,255,255,0.8)", lineHeight: 1.5, whiteSpace: "pre-line" }}>{item.text}</div>
              </div>
            );
          })}
        </div>
      </div>
    </AbsoluteFill>
  );
};
