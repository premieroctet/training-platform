import { useEffect, useState } from "react";

export const useMermaid = (id: string, content: string) => {
  const [svg, setSvg] = useState<string | null>(null);
  const mermaid = require("mermaid");
  mermaid.mermaidAPI.initialize({
    theme: "neutral",
    logLevel: 3,
    flowchart: { curve: "linear" },
    gantt: { axisFormat: "%m/%d/%Y" },
    sequence: { actorMargin: 20 },
  });

  useEffect(() => {
    mermaid.mermaidAPI.render(id, content, (svgraph: any) => {
      setSvg(svgraph);
    });
  }, [id, content]);

  return svg;
};
