export interface Project {
  id: string;
  title: string;
  summary: string;
  problem: {
    description: string;
    constraints: string[];
  };
  system_overview: {
    type: string;
    input: string;
    output: string;
  };
  architecture: {
    diagram: string;
    components: string[];
  };
  your_contributions: string[];
  results: {
    metrics: Array<{ name: string; value: string }>;
    evaluation: string;
  };
  engineering_decisions: Array<{
    decision: string;
    reason: string;
  }>;
  limitations: string[];
  future_work: string[];
  stack: {
    languages: string[];
    frontend: string[];
    backend: string[];
    infra: string[];
  };
  links: {
    github: string | null;
    paper: string | null;
    demo: string | null;
  };
  short_card: {
    id: string;
    title: string;
    tagline: string;
    domain: string[];
    role: string;
    stack: string[];
    key_metric: Metric;
    secondary_metric: Metric;
    status: string;
    year: number;
    links: {
      details: string;
      github: string | null;
      demo: string | null;
    };
  };
}

interface Metric {
  label: string;
  value: string;
}