import { post, get, postFormData } from "./http/http.client"

export async function createObituary(
  id,
  name,
  birthDate,
  deathDate,
  imageData
) {
  const url =
    "https://7kq6pai4iuapmzallto2k72dva0hbffd.lambda-url.ap-south-1.on.aws"
  const request = {
    name: name,
    birth_date: birthDate,
    death_date: deathDate,
    imageData,
  }

  const formData = new FormData()
  formData.append("id", id)
  formData.append("name", name)
  formData.append("birth_date", birthDate)
  formData.append("death_date", deathDate)
  formData.append("image_data", imageData)

  console.log("posting..", request)
  const response = await postFormData(url, formData)
  return response.body
}

export async function getAll() {
  const url =
    "https://tjse66g54jzw4bgcctrocv7rgi0mzkir.lambda-url.ap-south-1.on.aws"

  const response = await get(url)
  return response.body
}
