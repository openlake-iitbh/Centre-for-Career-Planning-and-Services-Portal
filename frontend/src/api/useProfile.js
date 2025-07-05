const BASE_URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:3000/api/profile";

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
=======
  const BASE_URL = "http://localhost:3000/api/profile";

  export const createStudentProfile = async (userId, data) => {
    const res = await fetch(`${BASE_URL}/${userId}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(data),
    });

    if (!res.ok) {
      throw new Error("Failed to create profile");
    }

    return await res.json();
  };


  export const getStudentProfile = async (userId) => {
    const res = await fetch(`${BASE_URL}/${userId}`, {
      method: "GET",
      credentials: "include",
    });

    if (!res.ok) {
      throw new Error("Failed to fetch profile");
    }

    return await res.json();
  };  

  export const updateStudentProfile = async (userId,data) => {
    const res = await fetch(`${BASE_URL}/${userId}`, {
      method: "PUT",
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
