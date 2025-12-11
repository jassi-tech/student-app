SCHOOLAPP/
│
├── app/
│   ├── _layout.tsx                    ← Root layout (Stack)
│   │
│   ├── (auth)/                        ← Auth screens
│   │     ├── _layout.tsx
│   │     └── login.tsx
│   │
│   ├── (main)/                        ← Protected area after login
│   │     ├── _layout.tsx              ← Drawer layout
│   │     ├── dashboard.tsx
│   │     ├── attendance.tsx
│   │     ├── homework.tsx
│   │     ├── fees.tsx
│   │     └── profile.tsx
│   │
│   └── index.tsx                      ← Redirect to login
│
├── assets/
│   ├── images/
│   ├── icons/
│   └── fonts/
│
├── components/
│   ├── CustomButton.tsx
│   ├── InputField.tsx
│   └── DashboardCard.tsx
│
├── constants/
│   ├── colors.ts
│   ├── fonts.ts
│   └── sizes.ts
│
├── hooks/
│   ├── useAuth.ts
│   └── useFetch.ts
│
├── context/
│   └── AuthContext.tsx
│
├── services/
│   ├── firebase.ts
│   └── storage.ts
│
├── utils/
│   ├── validators.ts
│   └── formatDate.ts
│
├── package.json
├── app.json
├── tsconfig.json
└── README.md



 npx tsc --noEmit
 npm run lint