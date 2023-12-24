import { computed } from "vue";

export const store = computed(async () => {
  try {
    const response = await fetch(`http://localhost:3000/auth`);
    const isAuth = (await response.status()) == 200;
    return isAuth;
  } catch (error) {
    console.error("Error fetching expense:", error);
    throw error; // Re-throw the error to propagate it further if needed
  }
});
