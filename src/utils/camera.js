export const loadCameraStream = async () => {
  // check if browser/device has camera support
  if ("mediaDevices" in navigator && "getUserMedia" in navigator.mediaDevices) {
    console.log("Camera support exists");
  } else {
    console.log("We dont have camera support");
    return false;
  }

  // check for permissions for video access
  try {
    const stream = await navigator.mediaDevices.getUserMedia({
      video: true
    });
    return stream;
  } catch (err) {
    console.log("Access to the camera isn't allowed.");
    console.log(err);
    return false;
  }
}
