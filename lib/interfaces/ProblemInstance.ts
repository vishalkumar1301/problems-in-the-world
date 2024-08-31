import { ProblemStatus } from '../enums/ProblemStatus';

export interface ProblemInstance {
  instance_id?: number;
  problem_id: number;
  location_id: number;
  status: ProblemStatus;
  severity: number;
  reported_by?: number;
  created_at?: string;
  updated_at?: string;
}