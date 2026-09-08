import { CareerAnalysisResult } from '../types/career'

export const mockCareerAnalysis: CareerAnalysisResult = {
  recommendedRole: 'Junior Frontend Developer',
  roleDescription:
    'Your strong grasp of HTML, CSS, and JavaScript fundamentals, combined with project experience, positions you well for a Junior Frontend Developer role. This entry-level position involves building and maintaining web interfaces, collaborating with designers, and implementing responsive designs for Indian tech companies.',
  currentSkills: ['HTML', 'CSS', 'JavaScript', 'Git', 'Responsive Design'],
  partialSkills: ['React', 'TypeScript'],
  missingSkills: ['Next.js', 'REST APIs', 'Testing (Jest)', 'CI/CD basics', 'Accessibility (WCAG)'],
  roadmap: [
    {
      phase: 1,
      title: 'Solidify React & TypeScript',
      durationWeeks: 4,
      actions: [
        'Complete the official React docs tutorial',
        'Build 3 small projects: todo app, weather app, quiz app',
        'Learn TypeScript basics — types, interfaces, generics',
        'Type all 3 projects using TypeScript',
      ],
      resources: [
        { title: 'React Official Docs', url: 'https://react.dev/learn', type: 'doc' },
        { title: 'TypeScript for Beginners', url: 'https://www.typescriptlang.org/docs/', type: 'doc' },
        { title: 'The Odin Project — React Path', url: 'https://www.theodinproject.com/paths/full-stack-javascript/courses/react', type: 'course' },
      ],
    },
    {
      phase: 2,
      title: 'Learn REST APIs & State Management',
      durationWeeks: 3,
      actions: [
        'Consume public REST APIs in your React projects (OpenWeather, JSONPlaceholder)',
        'Learn useState, useEffect, useContext deeply',
        'Learn Zustand or Redux Toolkit for global state',
        'Build a movie search app consuming TMDB API',
      ],
      resources: [
        { title: 'JavaScript.info — Fetch', url: 'https://javascript.info/fetch', type: 'doc' },
        { title: 'Zustand Documentation', url: 'https://docs.pmnd.rs/zustand/getting-started/introduction', type: 'doc' },
        { title: 'REST API Crash Course — freeCodeCamp', url: 'https://www.freecodecamp.org/news/rest-api-best-practices-rest-endpoint-design-examples/', type: 'course' },
      ],
    },
    {
      phase: 3,
      title: 'Build a Portfolio Project',
      durationWeeks: 4,
      actions: [
        'Build a full-featured app (e.g. expense tracker with auth, job board, blog CMS)',
        'Deploy on Vercel or Netlify',
        'Write a README explaining the architecture',
        'Add responsive design and dark mode',
        'Learn basic SEO and web vitals (Lighthouse score > 90)',
      ],
      resources: [
        { title: 'Vercel Deployment Guide', url: 'https://vercel.com/docs', type: 'doc' },
        { title: 'Web Dev for Beginners — Microsoft', url: 'https://github.com/microsoft/Web-Dev-For-Beginners', type: 'course' },
        { title: 'Next.js Learn Course', url: 'https://nextjs.org/learn', type: 'course' },
      ],
    },
    {
      phase: 4,
      title: 'Interview Prep & Job Applications',
      durationWeeks: 3,
      actions: [
        'Solve 30 DSA problems on LeetCode (easy/medium, focus on arrays & strings)',
        'Practice 20 frontend interview questions (event loop, closures, prototypes)',
        'Polish LinkedIn and GitHub profiles',
        'Apply to 5 companies per day on Naukri, LinkedIn, and company career pages',
        'Prepare for take-home assignments with a reusable project template',
      ],
      resources: [
        { title: 'Frontend Interview Handbook', url: 'https://www.frontendinterviewhandbook.com/', type: 'doc' },
        { title: 'LeetCode Easy Problems', url: 'https://leetcode.com/problemset/?difficulty=EASY', type: 'project' },
        { title: 'JavaScript Interview Questions', url: 'https://github.com/sudheerj/javascript-interview-questions', type: 'doc' },
      ],
    },
  ],
  relatedRoles: [
    {
      title: 'UI/UX Developer',
      matchPercent: 78,
      reason: 'Your design sensibility and front-end skills translate well to a UX-focused dev role that bridges design and code.',
    },
    {
      title: 'React Native Developer',
      matchPercent: 71,
      reason: 'React knowledge transfers directly to mobile development — a growing segment in Indian startups.',
    },
    {
      title: 'WordPress / Webflow Developer',
      matchPercent: 65,
      reason: 'High demand from SMBs and agencies across India; quick way to earn while building portfolio.',
    },
    {
      title: 'Full Stack Developer (MERN)',
      matchPercent: 60,
      reason: 'Adding Node.js and MongoDB to your stack opens senior roles faster; natural progression path.',
    },
    {
      title: 'QA Engineer (Frontend)',
      matchPercent: 55,
      reason: 'Selenium and Cypress testing roles value your HTML/CSS/JS knowledge; less competitive, good entry point.',
    },
  ],
  salaryMin: 350000,
  salaryMax: 700000,
  topCompanies: [
    'Infosys',
    'Wipro',
    'TCS',
    'Razorpay',
    'Zomato',
    'CRED',
    'Freshworks',
    'BrowserStack',
    'Zoho',
    'Capgemini',
  ],
}
