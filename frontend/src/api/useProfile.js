const BASE_URL = "http://localhost:3000/api/profile";

export const getStudentProfile = async () => {
  const res = await fetch(BASE_URL, {
    method: "GET",
    credentials: "include",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch profile");
  }

  return await res.json();
};

export const updateStudentProfile = async (data) => {
  const res = await fetch(BASE_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    throw new Error("Failed to update profile");
  }

  return await res.json();
};
