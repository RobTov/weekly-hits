import { environment } from "../configs/environment";

const getAuthHeaders = () => {
  const token = localStorage.getItem('access_token');
  return {
    'Content-Type': 'application/json',
    ...(token && { 'Authorization': `Bearer ${token}` }),
  };
};

export async function get<T>(url: string): Promise<T> {
  const fullUrl = url.startsWith('http') ? url : `${environment.baseURL}${url}`;
  const response = await fetch(fullUrl, {
    headers: getAuthHeaders(),
  });
  if (!response.ok) {
    throw new Error('Error fetching data');
  }
  return response.json();
}

export async function getAuth<T>(url: string): Promise<T> {
  const fullUrl = url.startsWith('http') ? url : `${environment.baseURL}${url}`;
  const response = await fetch(fullUrl, {
    headers: getAuthHeaders(),
    credentials: 'include',
  });
  if (!response.ok) {
    throw new Error('Error fetching data');
  }
  return response.json();
}

export async function create<T>(newItem: T, url: string): Promise<T> {
  const fullUrl = url.startsWith('http') ? url : `${environment.baseURL}${url}`;
  const response = await fetch(fullUrl, {
    method: "POST",
    headers: getAuthHeaders(),
    body: JSON.stringify(newItem),
  });
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.detail || error.error || 'Error creating item');
  }
  return response.json();
}

export async function createAuth<T>(newItem: T, url: string): Promise<T> {
  const fullUrl = url.startsWith('http') ? url : `${environment.baseURL}${url}`;
  const response = await fetch(fullUrl, {
    method: "POST",
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(newItem),
  });
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.detail || error.error || 'Error creating item');
  }
  return response.json();
}

export async function update<T>(itemToUpdate: T, url: string): Promise<T> {
  const fullUrl = url.startsWith('http') ? url : `${environment.baseURL}${url}`;
  const response = await fetch(fullUrl, {
    method: "PUT",
    headers: getAuthHeaders(),
    body: JSON.stringify(itemToUpdate),
  });
  if (!response.ok) {
    throw new Error('Error updating item');
  }
  return response.json();
}

export async function patch<T>(itemToUpdate: T, url: string): Promise<T> {
  const fullUrl = url.startsWith('http') ? url : `${environment.baseURL}${url}`;
  const response = await fetch(fullUrl, {
    method: "PATCH",
    headers: getAuthHeaders(),
    body: JSON.stringify(itemToUpdate),
  });
  if (!response.ok) {
    throw new Error('Error updating item');
  }
  return response.json();
}

export async function deletefn(url: string): Promise<void> {
  const fullUrl = url.startsWith('http') ? url : `${environment.baseURL}${url}`;
  const response = await fetch(fullUrl, {
    method: 'DELETE',
    headers: getAuthHeaders(),
  });
  if (!response.ok) {
    throw new Error('Error deleting item');
  }
}

export async function refreshToken(): Promise<{ access: string }> {
  const refresh = localStorage.getItem('refresh_token');
  const response = await fetch(`${environment.baseURL}auth/refresh/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ refresh }),
  });
  if (!response.ok) {
    throw new Error('Error refreshing token');
  }
  return response.json();
}

