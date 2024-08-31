export interface ProblemInstance {
  instance_id?: number;
  problem_id: number;
  location_id: number;
  status: 'ONGOING' | 'IMPROVING' | 'WORSENING' | 'RESOLVED';
  severity: number;
  reported_by?: number;
  created_at?: string;
  updated_at?: string;
}