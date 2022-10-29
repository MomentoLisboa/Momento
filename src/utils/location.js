export const getCurrentLocation = () => {
  return new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(
      (result) => {
        resolve(result);
      },
      (error) => {
        resolve(false);
      });
  });
}
