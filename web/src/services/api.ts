import { environment } from "../configs/environment";
import { Artist } from "../types/artists";

export async function get<T>(url: string): Promise<Array<any>> {
  const response = await fetch(`${environment.baseURL}${url}`);
  const data = await response.json();
  return data;
}

export async function create<T>(newItem: Artist, url: string): Promise<T> {
  const response = await fetch(`${environment.baseURL}${url}`, {
    method: "POST",
    body: JSON.stringify(newItem),
  });
  console.log(JSON.stringify(newItem))
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

export async function deletefn(url: string): Promise<void> {
    await fetch(`${environment.baseURL}${url}`, {
        method: 'DELETE'
    })
}
