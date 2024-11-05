const CLOUDINARY_CLOUDNAME = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUDNAME

export const uploadSingleImage = async (file: File) => {
  const data = new FormData()
  data.append('file', file)
  data.append('upload_preset', 'clinica_upload')

  try {
    const response = await fetch(
      `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUDNAME}/image/upload`,
      {
        method: 'POST',
        body: data,
      }
    )

    const image = await response.json()
    return image.secure_url
  } catch (error) {
    console.log(error)
    throw error
  }
}
