import type { IMenu, IMenuPost } from '../dto/menu';
import.meta.env.VITE_VARIABLE_NAME
const BASE_URL = import.meta.env.VITE_API_URL

/**
 * 
 */
export async function getMenus(): Promise<IMenu[]> {
  try {
    const response = await fetch(`${BASE_URL}/menu`);

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data: IMenu[] = await response.json();
    return data;
  } catch (error) {
    console.error('Failed to fetch:', error);
    throw error;
  }
}

export async function createMenu(menu: IMenuPost): Promise<IMenu> {
  const response = await fetch(`${BASE_URL}/menu`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(menu),
  });

  if (!response.ok) {
    throw new Error("Failed to create menu");
  }

  return response.json();
}

export async function updateMenu(menu: IMenu): Promise<IMenu> {
  const response = await fetch(`${BASE_URL}/menu`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(menu),
  });

  if (!response.ok) {
    throw new Error("Failed to create menu");
  }

  return response.json();
}


export async function deleteMenu(id: number): Promise<string> {
  const response = await fetch(`${BASE_URL}/menu`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(id),
  });

  if (!response.ok) {
    throw new Error("Failed to create menu");
  }

  return response.json();
}