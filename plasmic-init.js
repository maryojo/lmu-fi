import { initPlasmicLoader } from "@plasmicapp/loader-nextjs";

import { 
  SupabaseProvider, 
  SupabaseProviderMeta,
  SupabaseUserGlobalContext,
  SupabaseUserGlobalContextMeta,
  SupabaseUppyUploader,
  SupabaseUppyUploaderMeta,
  SupabaseStorageGetSignedUrl,
  SupabaseStorageGetSignedUrlMeta,
} from "plasmic-supabase"
import QuizComponent from "./my-code-components/QuizComponent"
import SimpleGlobalProvider from "./my-contexts/SimpleGlobalProvider"
import AdminRoleSpecificProvider from "./my-contexts/AdminRoleSpecificProvider"
import StudentRoleSpecificProvider from "./my-contexts/StudentRoleSpecificProvider"
import InstructorRoleSpecificProvider from "./my-contexts/InstructorRoleSpecificProvider"

import CustomAccordionItem from "./my-code-components/CustomAccordionItem"

export const PLASMIC = initPlasmicLoader({
  projects: [
    {
      id: process.env.NEXT_PUBLIC_PLASMIC_PROJECT_ID,
      token: process.env.PLASMIC_TOKEN,
    },
  ],

  // By default Plasmic will use the last published version of your project.
  // For development, you can set preview to true, which will use the unpublished
  // project, allowing you to see your designs without publishing.  Please
  // only use this for development, as this is significantly slower.
  preview: process.env.NEXT_PUBLIC_ENVIRONMENT !== "production",
});

// You can register any code components that you want to use here; see
// https://docs.plasmic.app/learn/code-components-ref/
// And configure your Plasmic project to use the host url pointing at
// the /plasmic-host page of your nextjs app (for example,
// http://localhost:3000/plasmic-host).  See
// https://docs.plasmic.app/learn/app-hosting/#set-a-plasmic-project-to-use-your-app-host

// PLASMIC.registerComponent(...);

//Register global context
PLASMIC.registerGlobalContext(SupabaseUserGlobalContext, SupabaseUserGlobalContextMeta)

//Register components
PLASMIC.registerComponent(QuizComponent, {
  name: "QuizComponent",
  displayName: "Quiz Component",
  importPath: "./my-code-components/QuizComponent",
  props: {
    quizTitle: {
      type: "string",
      defaultValue: "React Quiz",
    },
    onStart: {
      type: "eventHandler",
      argTypes: [],
    },
    resetKey: "number", 
    onQuizComplete: {
      type: "eventHandler",
      argTypes: [
        {
          name: "quizComplete",
          type: "object",
        },
      ],
    }, 
    timeLimit: {
      type: "number",
      defaultValue: 120, // Default to 120 seconds
      description: "Time limit for the entire quiz (in seconds)",
    },
    questions: {
      type: "array",
      defaultValue: [
        {
          question_text: "What is React?",
          options: ["A Library", "A Framework", "A Language"],
          correct_answer: "A Library",
        },
        {
          question_text: "Which hook is used for state management?",
          options: ["useEffect", "useState", "useReducer"],
          correct_answer: "useState",
        },
      ],
    },
  },
});
PLASMIC.registerComponent(CustomAccordionItem, {
  name: "CustomAccordionItem",
  importPath: "./my-code-components/CustomAccordionItem",
  props: {
    summary: {
      type: "slot",
      defaultValue: "Accordion Summary",
    },
    children: {
      type: "slot",
      defaultValue: "Accordion content goes here",
    },
    className: {
      type: "class",
    },
    expandIcon: { type: "slot", defaultValue: ">" },
  },
});

PLASMIC.registerComponent(SimpleGlobalProvider, {
  name: "SimpleCustomGlobalProvider",
  importPath: "/my-contexts/SimpleGlobalProvider",
  providesData: true,
  props: {
    userData: {
      type: "object",
      displayName: "User Data"
    },
    children: {
      type: "slot"
    },
    className: {
      type: "class"
    }
  }
});

PLASMIC.registerComponent(AdminRoleSpecificProvider, {
  name: "AdminRoleSpecificProvider",
  importPath: "/my-contexts/AdminRoleSpecificProvider",
  providesData: true,
  props: {
    allCoursesData: {
      type: "object",
      displayName: "All courses data",
    },
    allStudentsData: {
      type: "object",
      displayName: "All students data",
    },
    allInstructorsData: {
      type: "object",
      displayName: "All instructors data",
    },
    adminCoursesData: {
      type: "object",
      displayName: "Admin specific courses data",
    },
    children: {
      type: "slot"
    },
    className: {
      type: "class"
    }
  }
});

PLASMIC.registerComponent(StudentRoleSpecificProvider, {
  name: "StudentRoleSpecificProvider",
  importPath: "/my-contexts/StudentRoleSpecificProvider",
  providesData: true,
  props: {
    allAvailableCoursesData: {
      type: "object",
      displayName: "All available courses data",
    },
    allUserEnrolledCoursesData: {
      type: "object",
      displayName: "All user enrolled courses data",
    },
    allCoursesProgressData: {
      type: "object",
      displayName: "All user courses progress data",
    },
    children: {
      type: "slot"
    },
    className: {
      type: "class"
    }
  }
});

PLASMIC.registerComponent(InstructorRoleSpecificProvider, {
  name: "InstructorRoleSpecificProvider",
  importPath: "/my-contexts/InstructorRoleSpecificProvider",
  providesData: true,
  props: {
    allEnrolledStudentsData: {
      type: "object",
      displayName: "All enrolled students data",
    },
    allCoursesData: {
      type: "object",
      displayName: "All courses data",
    },
    children: {
      type: "slot"
    },
    className: {
      type: "class"
    }
  }
});

PLASMIC.registerComponent(SupabaseProvider, SupabaseProviderMeta);
PLASMIC.registerComponent(SupabaseUppyUploader, SupabaseUppyUploaderMeta);
PLASMIC.registerComponent(SupabaseStorageGetSignedUrl, SupabaseStorageGetSignedUrlMeta);
