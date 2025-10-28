import { environment } from "../configs/environment";

export async function get<T>(url: string): Promise<Array<T>> {
  const response = await fetch(`${environment.baseURL}${url}`);
  const data = await response.json();
  return data;
}

export async function create<T>(newItem: T, url: string): Promise<T> {
  const response = await fetch(`${environment.baseURL}${url}`, {
    method: "POST",
    body: JSON.stringify(newItem),
  });
  const data = await response.json();
  return data;
}

export async function update<T>(itemToUpdate: T, url: string): Promise<T> {
  const response = await fetch(`${environment.baseURL}${url}`, {
    method: "PUT",
    body: JSON.stringify(itemToUpdate),
  });

  const data = await response.json();
  return data;
}

export async function deletefn(id: number, url: string): Promise<void> {
    await fetch(`${environment.baseURL}${url}/`, {
        method: 'DELETE'
    })
}
