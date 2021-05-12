export const getImageUrlForActivity = (activity: string) => {
  switch (activity) {
    case "Walking":
      return "https://media.self.com/photos/5fe261907e457d9a8b917a6f/4:3/w_2560%2Cc_limit/AdobeStock_292545314.jpeg";

    case "Front elevation of arms":
      return "https://www.saebo.com/wp-content/uploads/2017/01/get-moving-1024x683.jpg";

    case "Squats":
      return "https://i0.wp.com/post.healthline.com/wp-content/uploads/2020/05/man-squatting-outdoors-1296x728-header.jpg?w=1155&h=1528";

    case "Jump front & back":
      return "https://upl.stack.com/wp-content/uploads/2016/03/09143039/Vertical-Jump-STACK.jpg";

    case "Push ups":
      return "https://d2z0k43lzfi12d.cloudfront.net/blog/vcdn324/wp-content/uploads/2017/05/thumbnail_1200x800-1-1024x683.jpg";

    default:
      return "https://2rdnmg1qbg403gumla1v9i2h-wpengine.netdna-ssl.com/wp-content/uploads/sites/3/2013/09/inexpensiveExercise-1277759983-770x533-1-650x428.jpg";
  }
};

export const getUserFriendlyDate = (date: string) => {
  const dateLocal = new Date(date);

  return dateLocal.toLocaleDateString("pl", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });
};

export const getDifferenceBetweenDates = (
  dateStart: string,
  dateEnd: string
) => {
  const start = new Date(dateStart).getTime();
  const end = new Date(dateEnd).getTime();

  const differenceInMs = end - start;

  return milisecondsToHMS(differenceInMs);
};

const milisecondsToHMS = (ms: any) => {
  const seconds = Math.floor((ms / 1000) % 60);
  const minutes = Math.floor((ms / 1000 / 60) % 60);
  const hours = Math.floor((ms / 1000 / 3600) % 24);

  return `${hours}h ${minutes}m ${seconds}s `;
};
