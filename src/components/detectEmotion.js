export const detectEmotion = async (imageFile) => {
  const formData = new FormData();
  formData.append("api_key", import.meta.env.VITE_FACEPP_API_KEY);
  formData.append("api_secret", import.meta.env.VITE_FACEPP_API_SECRET);
  formData.append("image_file", imageFile);
  formData.append("return_attributes", "emotion");

  try {
    const res = await fetch();
    // "https://api-us.faceplusplus.com/facepp/v3/detect",
    // {
    //   method: "POST",
    //   body: formData,
    // }
    const data = await res.json();
    if (data.faces && data.faces.length > 0) {
      const emotionData = data.faces[0].attributes.emotion;
      const dominantEmotion = Object.entries(emotionData).reduce((a, b) =>
        a[1] > b[1] ? a : b
      )[0];
      return { emotion: dominantEmotion, fullData: emotionData };
    } else {
      throw new Error("No face detected");
    }
  } catch (error) {
    console.error("Emotion detection error:", error);
    throw error;
  }
};
