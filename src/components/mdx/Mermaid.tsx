import { Box } from "@chakra-ui/layout";
import { useMermaid } from "@/hooks/useMermaid";

export interface MermaidProps {
  graph: string;
}

const Mermaid: React.FC<MermaidProps> = ({ graph }) => {
  const svg = useMermaid("demo", graph);

  return (
    <Box width="100%">
      {(svg && <div dangerouslySetInnerHTML={{ __html: svg }} />) || (
        <div>loading...</div>
      )}
    </Box>
  );
};

export default Mermaid;
