import pdfParse from 'pdf-parse'
import { ParsedResume } from '../types/jobs'

const KNOWN_SKILLS = [
  'JavaScript', 'TypeScript', 'Python', 'Java', 'C++', 'C', 'C#', 'Go', 'Rust', 'Ruby', 'PHP', 'Swift', 'Kotlin',
  'React', 'Angular', 'Vue', 'Next.js', 'Nuxt', 'Svelte', 'jQuery', 'Bootstrap', 'Tailwind',
  'Node.js', 'Express', 'NestJS', 'Django', 'Flask', 'FastAPI', 'Spring Boot', 'Laravel',
  'MySQL', 'PostgreSQL', 'MongoDB', 'SQLite', 'Redis', 'Cassandra', 'DynamoDB',
  'AWS', 'Azure', 'GCP', 'Docker', 'Kubernetes', 'Terraform', 'Linux', 'Nginx',
  'Git', 'GitHub', 'GitLab', 'CI/CD', 'Jest', 'Cypress', 'Selenium', 'Playwright',
  'HTML', 'CSS', 'SASS', 'REST', 'GraphQL', 'WebSockets', 'Figma', 'Adobe XD',
  'Machine Learning', 'Deep Learning', 'TensorFlow', 'PyTorch', 'Pandas', 'NumPy', 'scikit-learn',
  'Data Analysis', 'Power BI', 'Tableau', 'Excel', 'SQL', 'R',
  'React Native', 'Flutter', 'Android', 'iOS', 'Ionic',
  'Agile', 'Scrum', 'JIRA', 'Postman', 'Swagger',
]

const EDUCATION_PATTERNS = [
  /b\.?tech|bachelor\s+of\s+technology/gi,
  /b\.?e\.?|bachelor\s+of\s+engineering/gi,
  /b\.?sc\.?|bachelor\s+of\s+science/gi,
  /m\.?tech|master\s+of\s+technology/gi,
  /m\.?sc\.?|master\s+of\s+science/gi,
  /m\.?b\.?a/gi,
  /b\.?c\.?a|bachelor\s+of\s+computer\s+application/gi,
  /m\.?c\.?a|master\s+of\s+computer\s+application/gi,
  /12th|hsc|higher\s+secondary/gi,
  /10th|ssc|secondary\s+school/gi,
  /diploma/gi,
  /ph\.?d/gi,
]

export async function parseResume(buffer: Buffer): Promise<ParsedResume> {
  const data = await pdfParse(buffer)
  const text = data.text

  const skills = extractSkills(text)
  const education = extractEducation(text)
  const email = extractEmail(text)

  return { email, skills, education }
}

function extractSkills(text: string): string[] {
  const found: string[] = []
  const textLower = text.toLowerCase()

  for (const skill of KNOWN_SKILLS) {
    const pattern = new RegExp(`\\b${skill.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\b`, 'i')
    if (pattern.test(text) || textLower.includes(skill.toLowerCase())) {
      found.push(skill)
    }
  }

  return [...new Set(found)]
}

function extractEducation(text: string): string[] {
  const found: string[] = []

  for (const pattern of EDUCATION_PATTERNS) {
    const matches = text.match(pattern)
    if (matches) {
      const label = matches[0].trim()
      if (!found.some((e) => e.toLowerCase() === label.toLowerCase())) {
        found.push(label)
      }
    }
  }

  return found
}

function extractEmail(text: string): string | undefined {
  const match = text.match(/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/)
  return match?.[0]
}
