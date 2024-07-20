export interface Meeting {
  id: string;
  category: string;
  no: string;
  title: string[];
  score_summary_docs: (string | string[])[];
  meeting_docs: string[][];
}
