import { sqliteTable, text, integer } from 'drizzle-orm/sqlite-core'

export const users = sqliteTable('users', {
  id: text('id').primaryKey(),
  name: text('name').notNull(),
  email: text('email').notNull().unique(),
  password: text('password').notNull(),
  createdAt: integer('created_at', { mode: 'timestamp' }).notNull().$defaultFn(() => new Date()),
  updatedAt: integer('updated_at', { mode: 'timestamp' }).notNull().$defaultFn(() => new Date()),
})

export const userProfiles = sqliteTable('user_profiles', {
  id: text('id').primaryKey(),
  userId: text('user_id').notNull().references(() => users.id, { onDelete: 'cascade' }).unique(),
  age: integer('age'),
  education: text('education'), // 'undergraduate' | 'graduate' | 'postgraduate'
  state: text('state'),
  city: text('city'),
  skills: text('skills'), // JSON: string[]
  experienceType: text('experience_type'), // 'theoretical' | 'practical'
  projectTitle: text('project_title'),
  techStack: text('tech_stack'), // JSON: string[]
  completed: integer('completed', { mode: 'boolean' }).default(false),
  createdAt: integer('created_at', { mode: 'timestamp' }).notNull().$defaultFn(() => new Date()),
  updatedAt: integer('updated_at', { mode: 'timestamp' }).notNull().$defaultFn(() => new Date()),
})

export const careerAnalyses = sqliteTable('career_analyses', {
  id: text('id').primaryKey(),
  userId: text('user_id').notNull().references(() => users.id, { onDelete: 'cascade' }),
  recommendedRole: text('recommended_role').notNull(),
  roleDescription: text('role_description'),
  currentSkills: text('current_skills'), // JSON: string[]
  missingSkills: text('missing_skills'), // JSON: string[]
  partialSkills: text('partial_skills'), // JSON: string[]
  roadmap: text('roadmap'), // JSON: RoadmapPhase[]
  relatedRoles: text('related_roles'), // JSON: RelatedRole[]
  salaryMin: integer('salary_min'),
  salaryMax: integer('salary_max'),
  topCompanies: text('top_companies'), // JSON: string[]
  profileHash: text('profile_hash'),
  generatedAt: integer('generated_at', { mode: 'timestamp' }).notNull().$defaultFn(() => new Date()),
})

export type User = typeof users.$inferSelect
export type NewUser = typeof users.$inferInsert
export type UserProfile = typeof userProfiles.$inferSelect
export type NewUserProfile = typeof userProfiles.$inferInsert
export type CareerAnalysis = typeof careerAnalyses.$inferSelect
export type NewCareerAnalysis = typeof careerAnalyses.$inferInsert
