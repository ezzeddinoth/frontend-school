import type { IStudent, IStudentPost } from '../dto/student';
import.meta.env.VITE_VARIABLE_NAME
const BASE_URL = import.meta.env.VITE_API_URL

/**
 * 
 */
export async function getStudents(): Promise<IStudent[]> {
  try {
    const response = await fetch(`${BASE_URL}/student`);

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data: IStudent[] = await response.json();
    return data;
  } catch (error) {
    console.error('Failed to fetch:', error);
    throw error;
  }
}

export async function createStudent(student: IStudentPost): Promise<IStudent> {
  const response = await fetch(`${BASE_URL}/student`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(student),
  });

  if (!response.ok) {
    throw new Error("Failed to create student");
  }

  return response.json();
}

export async function updateStudent(student: IStudent): Promise<IStudent> {
  const response = await fetch(`${BASE_URL}/student`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(student),
  });

  if (!response.ok) {
    throw new Error("Failed to create student");
  }

  return response.json();
}


export async function deleteStudent(id: number): Promise<string> {
  const response = await fetch(`${BASE_URL}/student`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(id),
  });

  if (!response.ok) {
    throw new Error("Failed to create student");
  }

  return response.json();
}