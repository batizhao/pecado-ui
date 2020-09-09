
export interface SystemLog {
  id: number;
  httpRequestMethod: string;
  className: string;
  classMethod: string;
  description: string;
  parameter?: string;
  result?: string;
  spend: number;
  clientId?: string;
  username?: string;
  url: string;
  ip: string;
  createdTime: Date;  
}
