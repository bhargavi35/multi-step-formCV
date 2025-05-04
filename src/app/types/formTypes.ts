export interface Skill {
    name: string;
    level: string;
  }
  
  export interface Education {
    degree: string;
    institution: string;
    year: string;
  }
  
  export interface FormData {
    resume: File | null;
    name: string;
    email: string;
    phone: string;
    skills: Skill[];
    education: Education[];
  }
  